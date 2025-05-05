from flask import Flask, jsonify
from flask_cors import CORS
from threading import Thread
from collections import deque
import csv
import time

CSV_FILE = "/tmp/live_packets.csv"  # Adjust if needed
BUFFER_SECONDS = 120  # 2 minutes

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:8081"])

packet_buffer = deque()

# Tail CSV and parse
def tail_csv():
    with open(CSV_FILE, "r") as f:
        reader = csv.DictReader(f)
        while True:
            try:
                row = next(reader)
                epoch = float(row["frame.time_epoch"])

                parsed = {
                    "timestamp": epoch,                    # For Observable's existing code
                    "frame.time_epoch": epoch,             # For compatibility
                    "ip.src": row["ip.src"],
                    "ip.dst": row["ip.dst"],
                    "ip.proto": row["ip.proto"],
                    "tcp.dstport": row["tcp.dstport"],
                    "udp.dstport": row["udp.dstport"],
                    "tcp.flags.syn": row["tcp.flags.syn"],
                    "tcp.flags.ack": row["tcp.flags.ack"],
                    "tcp.flags.fin": row["tcp.flags.fin"],
                    "tcp.flags.reset": row["tcp.flags.reset"],
                    "frame.len": int(row["frame.len"] or 0)
                }

                if not parsed["ip.src"] or not parsed["ip.dst"] or not parsed["ip.proto"]:
                    continue

                packet_buffer.append(parsed)

                now = time.time()
                while packet_buffer and (now - packet_buffer[0]["timestamp"] > BUFFER_SECONDS):
                    packet_buffer.popleft()

            except StopIteration:
                time.sleep(0.05)
            except Exception as e:
                print(f"[Parse Error] {e}")
                time.sleep(0.1)

@app.route("/data.json")
def serve_data():
    return jsonify(list(packet_buffer))

if __name__ == "__main__":
    thread = Thread(target=tail_csv, daemon=True)
    thread.start()
    app.run(host="0.0.0.0", port=8080)

