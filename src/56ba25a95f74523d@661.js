import define1 from "./b2bbebd2f186ed03@1834.js";
import define2 from "./368459df18c17371@201.js";
import define3 from "./1e5e29cc45055e52@1759.js";

function _d3(require) {
  return require("d3@6")
}

function _Vegalite(require) {
  return require("vega-embed@6")
}

function _type() {
  return null
}

function _time() {
  return null
}

// === 1) VM Filter
function _vmFilter(html) {
  const div = html`<div>
    <label><input type="checkbox" name="vm" value="Blue VM 1" checked> Blue VM 1</label>
    <label><input type="checkbox" name="vm" value="Blue VM 2" checked> Blue VM 2</label>
  </div>`;
  return div;
}

function _selectedVMs(vmFilter) {
  return Array.from(vmFilter.querySelectorAll("input[name='vm']:checked")).map(d => d.value);
}

// === 2) Protocol Dropdown
function _selectedProtocolDropdown(html) {
  const select = html`<select>
    <option value="TCP" selected>TCP</option>
    <option value="UDP">UDP</option>
  </select>`;
  return select;
}

function _selectedProtocol(viewofSelectedProtocolDropdown) {
  return viewofSelectedProtocolDropdown.value;
}

// === 3) Live Data from Two VMs
function _liveData(Generators) {
  return Generators.observe(notify => {
    let running = true;
    const fetchAndUpdate = async () => {
      const res = await fetch("http://localhost:8080/data.json");
      const fresh = await res.json();
      const now = Date.now();
      const trimmed = fresh.filter(d => {
        const ts = parseFloat(d.timestamp) * 1000;
        return now - ts <= 5 * 60 * 1000;
      });
      if (running) notify(trimmed.map(d => ({ ...d, source: "Blue VM 1" })));
    };
    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 5000);
    return () => {
      running = false;
      clearInterval(interval);
    };
  });
}

function _liveData2(Generators) {
  return Generators.observe(notify => {
    let running = true;
    const fetchAndUpdate = async () => {
      const res = await fetch("http://localhost:8081/data.json");
      const fresh = await res.json();
      const now = Date.now();
      const trimmed = fresh.filter(d => {
        const ts = parseFloat(d.timestamp) * 1000;
        return now - ts <= 5 * 60 * 1000;
      });
      if (running) notify(trimmed.map(d => ({ ...d, source: "Blue VM 2" })));
    };
    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 5000);
    return () => {
      running = false;
      clearInterval(interval);
    };
  });
}

// === 4) Clean and unify traffic, applying VM filter
function _cleanedTraffic(liveData, liveData2, selectedVMs) {
  // Combine from both streams
  const combined = [...liveData, ...liveData2]
    .filter(d => selectedVMs.includes(d.source));

  return combined.map(d => {
    const clean = Object.fromEntries(
      Object.entries(d).map(([k,v]) => [k.replace(/\./g,""), v])
    );
    // Map numeric protocol to text
    const protocol = clean.ipproto === "6" ? "TCP" :
                     clean.ipproto === "17" ? "UDP" : "Other";
    const port = clean.tcpdstport || clean.udpdstport || "Unknown";

    // Gather flags
    const flags = ["SYN","ACK","FIN","RST"].filter(f => {
      const key = "tcpflags" + f.toLowerCase();
      return String(clean[key]).toLowerCase() === "true";
    });

    return {
      Time: new Date(parseFloat(clean.timestamp) * 1000),
      SourceIP: clean.ipsrc || "Unknown",
      DestinationIP: clean.ipdst || "Unknown",
      Protocol: protocol,
      Port: port,
      PacketSize: +clean.framelen || 0,
      flagPattern: flags.length>0 ? flags.join("+") : "NONE",
      source: d.source || "Unknown"
    };
  });
}

// === 5) processedTraffic: filters by Protocol as well
function _processedTraffic(cleanedTraffic) {
  return cleanedTraffic.map(d => {
    const copy = { ...d };
    copy.Time = new Date(d.Time);
    copy.protocol = d.Protocol;
    copy.destinationPort = d.Port || "Unknown";
    const vm = copy.source === "Blue VM 1" ? "VM1" : "VM2";
    copy.protocolVM = `${copy.protocol} - ${vm}`;
    return copy;
  });
}


// === 6) The Dashboard
function _dashBoard(Vegalite, processedTraffic) {
  return Vegalite({
    vconcat: [
      {
        hconcat: [
          // Line Chart
          {
            width: 900,
            height: 200,
            data: { values: processedTraffic },
            mark: "line",
            selection: {
              timeBrush: {
                type: "interval",
                encodings: ["x"],
                name: "timeBrush"
              }
            },
            encoding: {
              x: { field: "Time", type: "temporal", title: "Time" },
              y: { aggregate: "count", type: "quantitative", title: "Packet Count" },
              color: {
                field: "protocolVM",
                type: "nominal",
                scale: {
                  domain: ["TCP - VM1", "TCP - VM2", "UDP - VM1", "UDP - VM2"],
                  range: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
                }
              }
            }
          },

          // Pie Chart
          {
            width: 300,
            height: 200,
            data: { values: processedTraffic },
            mark: "arc",
            encoding: {
              theta: { aggregate: "count", type: "quantitative" },
              color: {
                field: "protocolVM",
                type: "nominal",
                title: "Protocol + VM",
                scale: {
                  domain: ["TCP - VM1", "TCP - VM2", "UDP - VM1", "UDP - VM2"],
                  range: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
                }
              },
              tooltip: [
                { field: "protocolVM", type: "nominal" },
                { aggregate: "count", type: "quantitative", title: "Packet Count" }
              ]
            },
            view: { stroke: null }
          }
        ]
      },

      {
        hconcat: [
          // Port Group Bar (horizontal)
          {
            width: 600,
            height: 300,
            data: { values: processedTraffic },
            transform: [
              { filter: { selection: "timeBrush" } },
              {
                calculate: `datum.destinationPort <= 1023 ? '0-1023 (System)' 
                  : datum.destinationPort <= 49151 ? '1024-49151 (Registered)' 
                  : '49152-65535 (Dynamic)'`,
                as: "portGroup"
              },
              {
                aggregate: [{ op: "count", as: "packetCount" }],
                groupby: ["portGroup", "protocolVM"]
              }
            ],
            mark: "bar",
            encoding: {
              y: { field: "portGroup", type: "nominal", sort: "-x", title: "Port Group" },
              x: { field: "packetCount", type: "quantitative", title: "Packet Count" },
              color: {
                field: "protocolVM",
                type: "nominal",
                scale: {
                  domain: ["TCP - VM1", "TCP - VM2", "UDP - VM1", "UDP - VM2"],
                  range: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
                }
              }
            }
          },

          // TCP Flags Bar (horizontal)
          {
            width: 600,
            height: 300,
            data: { values: processedTraffic },
            transform: [
              { filter: { selection: "timeBrush" } },
              {
                aggregate: [{ op: "count", as: "packetCount" }],
                groupby: ["flagPattern", "protocolVM"]
              }
            ],
            mark: "bar",
            encoding: {
              y: { field: "flagPattern", type: "nominal", sort: "-x", title: "TCP Flag Pattern" },
              x: { field: "packetCount", type: "quantitative", title: "Packet Count" },
              color: {
                field: "protocolVM",
                type: "nominal",
                scale: {
                  domain: ["TCP - VM1", "TCP - VM2", "UDP - VM1", "UDP - VM2"],
                  range: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
                }
              }
            }
          }
        ]
      },

      // Dot Plot (full width)
      {
        width: 1200,
        height: 300,
        data: { values: processedTraffic },
        mark: { type: "point", tooltip: true },
        encoding: {
          x: { field: "Time", type: "temporal", title: "Timestamp" },
          y: { field: "SourceIP", type: "nominal", title: "Source IP" },
          color: {
            field: "protocolVM",
            type: "nominal",
            scale: {
              domain: ["TCP - VM1", "TCP - VM2", "UDP - VM1", "UDP - VM2"],
              range: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
            }
          },
          tooltip: [
            { field: "Time", type: "temporal" },
            { field: "SourceIP", type: "nominal" },
            { field: "DestinationIP", type: "nominal" },
            { field: "protocolVM", type: "nominal" },
            { field: "destinationPort", type: "nominal" },
            { field: "flagPattern", type: "nominal" }
          ]
        }
      }
    ]
  });
}

// === 7) Time brush signal
function _addTimeBrushSignal(dashBoard, mutableTime) {
  dashBoard.addSignalListener("timeBrush", function(name, value) {
    if (value == null)
      mutableTime.value = null;
    else
      mutableTime.value = value;
  });
}

// === 8) Final define() block
export default function define(runtime, observer) {
  const main = runtime.module();

  // Dependencies
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("Vegalite")).define("Vegalite", ["require"], _Vegalite);

  // Mutable signals
  main.variable(observer("type")).define("type", ["mutable type"], _ => _.generator);
  main.define("initial type", _type);
  main.variable(observer("mutable type")).define("mutable type", ["Mutable", "initial type"], (M,_)=> new M(_));

  main.variable(observer("time")).define("time", ["mutable time"], _ => _.generator);
  main.define("initial time", _time);
  main.variable(observer("mutable time")).define("mutable time", ["Mutable", "initial time"], (M,_)=> new M(_));

  // VM Filter
  main.variable(observer("viewof vmFilter")).define("viewof vmFilter", ["html"], _vmFilter);
  main.variable(observer("selectedVMs")).define("selectedVMs", ["viewof vmFilter"], _selectedVMs);

  // Protocol dropdown
  main.variable(observer("viewof selectedProtocol")).define("viewof selectedProtocol", ["html"], _selectedProtocolDropdown);
  main.variable(observer("selectedProtocol")).define("selectedProtocol", ["viewof selectedProtocol"], _selectedProtocol);

  // Live data
  main.variable(observer("liveData")).define("liveData", ["Generators"], _liveData);
  main.variable(observer("liveData2")).define("liveData2", ["Generators"], _liveData2);

  // Clean + filter by VM
  main.variable(observer("cleanedTraffic"))
    .define("cleanedTraffic", ["liveData","liveData2","selectedVMs"], _cleanedTraffic);

  // Filter by protocol
  main.variable(observer("processedTraffic"))
    .define("processedTraffic", ["cleanedTraffic","selectedProtocol","selectedVMs"], _processedTraffic);

  // The chart
  main.variable(observer("viewof dashBoard"))
    .define("viewof dashBoard", ["Vegalite","processedTraffic"], _dashBoard);
  main.variable(observer("dashBoard")).define("dashBoard", ["Generators","viewof dashBoard"], (G,_)=>G.input(_));

  main.variable(observer()).define(["dashBoard","mutable time"], _addTimeBrushSignal);

  return main;
}
