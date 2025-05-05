function _1(md){return(
md`# Recommended libraries

To help you get work done quickly, the [Observable standard library](https://github.com/observablehq/stdlib) provides a handful of recommended open-source libraries by default in all notebooks. (Use [require](/@observablehq/introduction-to-require) to load any other library you desire.)`
)}

function _recLibsTable(aq,d3,htl,Inputs,L,Plot,md){return(
md`| Symbol | Name | Version |
|-|-|-|
| _ | Lodash | 4.17.21 |
| aq | Arquero | ${aq.version} |
| Arrow | Apache Arrow | 4.0.1 |
| d3 | D3.js | ${d3.version} |
| dot | Graphviz | 0.2.1 |
| htl | Hypertext Literal | ${htl.version} |
| Inputs | Observable Inputs | ${Inputs.version} |
| L | Leaflet | ${L.version} |
| mermaid | Mermaid | 9.1.6 |
| Plot | Observable Plot | ${Plot.version} |
| SQLite | SQL.js | 1.7.0 |
| topojson | TopoJSON Client | 3.1.0 |
| vl | Vega, Vega-Lite | 5.22.1, 5.2.0 |`
)}

function _3(md){return(
md`---

### [Lodash](https://lodash.com/docs/4.17.21)

Lodash takes the hassle out of working with data.`
)}

function _4(_){return(
_
)}

function _5(_){return(
_.mean([25, 24, 26, 12])
)}

function _6(md){return(
md`---

### [Arquero](https://uwdata.github.io/arquero/)

Arquero is a library for “query processing and transformation of array-backed data tables.” It is often (but not always) used in conjunction with Apache Arrow.`
)}

function _7(aq){return(
aq
)}

function _8(md){return(
md`---

### [Apache Arrow](https://arrow.apache.org/docs/js/)

Apache Arrow is a columnar file format and accompanying JavaScript library for in-memory data analysis. See [Brian Hulette’s introduction](/@theneuralbit/introduction-to-apache-arrow) for more.`
)}

function _9(Arrow){return(
Arrow
)}

function _10(md){return(
md`---

### [D3.js](https://d3js.org)

D3 is a low-level library for visualizing and analyzing data.`
)}

function _11(d3){return(
d3
)}

function _12(d3){return(
d3.mean([25, 24, 26, 12])
)}

function _13(d3){return(
d3.create("svg")
    .attr("width", 128)
    .attr("height", 128)
  .call(svg => svg.selectAll("circle")
    .data(d3.range(128, 0, -8))
    .join("circle")
      .attr("fill", d3.scaleSequential(d3.interpolateViridis).domain([0, 128]))
      .attr("r", d => d))
  .node()
)}

function _14(md){return(
md`---

### [Graphviz](https://github.com/observablehq/graphviz)

[Graphviz](http://www.graphviz.org) visualizes abstract graphs and networks, such as flow charts.`
)}

function _15(dot){return(
dot
)}

function _16(dot){return(
dot`digraph { rankdir = RL; x -> y -> z; }`
)}

function _17(md){return(
md`---

### [Hypertext Literal](/@observablehq/htl)

Hypertext Literal lets you safely generate dynamic HTML or SVG. (This is a more powerful substitute for the \`html\` tagged template literal which is also in the standard library; when Observable supports standard library versioning, this will be available as \`html\` instead of \`htl.html\`.)`
)}

function _18(htl){return(
htl
)}

function _19(htl){return(
htl.html`Hello, <i>world</i>!`
)}

function _20(md){return(
md`---

### [Observable Inputs](/@observablehq/inputs)

These lightweight interface components — buttons, sliders, dropdowns, tables, and the like — help you explore data and build interactive displays.`
)}

function _21(Inputs){return(
Inputs
)}

function _gain(Inputs){return(
Inputs.range([0, 11], {value: 5, step: 0.1, label: "Gain"})
)}

function _23(gain){return(
gain
)}

function _24(md){return(
md`---

### [Leaflet](/@observablehq/hello-leaflet)

Leaflet lets you create mobile-friendly interactive maps.`
)}

function _25(L){return(
L
)}

function* _map(htl,L)
{
  const container = yield htl.html`<div style="height: 400px; max-width: 640px;">`;
  const map = L.map(container).setView([37.774, -122.423], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors"
  }).addTo(map);
}


function _27(md){return(
md`---

### [Mermaid](/@observablehq/mermaid)

Mermaid lets you create diagrams and visualizations using text and code.`
)}

function _28(mermaid){return(
mermaid
)}

function _29(mermaid){return(
mermaid`graph TD
A-->B
A-->C
B-->D
C-->D`
)}

function _30(md){return(
md`---

### [Observable Plot](/@observablehq/plot)

Plot helps you quickly visualize tabular data.`
)}

function _31(Plot){return(
Plot
)}

function _32(Plot,movies){return(
Plot.rectY(movies, Plot.binX({y: "count"}, {x: "IMDB Rating"})).plot()
)}

function _33(md){return(
md`---

### [SQL.js](https://sql.js.org/)

SQL.js is an Emscripten port of SQLite. It’s typically used with a SQLite [file attachment](/@observablehq/file-attachments) to get a [SQLite database client](/@observablehq/sqlite).`
)}

function _34(SQLite){return(
SQLite
)}

function _chinook(FileAttachment){return(
FileAttachment("chinook.db").sqlite()
)}

async function _36(Inputs,chinook){return(
Inputs.table(await chinook.query(`SELECT * FROM albums`))
)}

function _37(md){return(
md`---

### [TopoJSON Client](https://github.com/topojson/topojson-client)

TopoJSON is a topology-encoding geometry format that is often used for mapping.`
)}

function _38(topojson){return(
topojson
)}

function _39(md){return(
md`---

### [Vega-Lite](https://vega.github.io/vega-lite-api/)

Vega-Lite is a high-level grammar for visual analysis.`
)}

function _40(vl){return(
vl
)}

function _41(vl,movies){return(
vl.markBar()
  .data(movies)
  .encode(vl.x().fieldQ('IMDB Rating').bin(true), vl.y().count())
  .render()
)}

function _movies(FileAttachment){return(
FileAttachment("movies.json").json()
)}

function _43(md){return(
md`---

## FAQ`
)}

function _44(md){return(
md`**What about performance?** Isn’t it slow to load all these libraries on every notebook? No! Thanks to static analysis and the magic of [Observable dataflow](/@observablehq/how-observable-runs), a library isn’t loaded unless you reference it. Your notebooks are as fast as ever (and possibly faster, since we can make some optimizations).`
)}

function _45(md){return(
md`**What about versioning?** When new patch or minor versions are released, we’ll upgrade the Observable standard library so that your notebook gets the latest version automatically. In the future, we plan to let you control when (and if) you want to upgrade; for now you can override the standard library in your notebook if you need to specify a different version.`
)}

function _46(md){return(
md`**What if I want to use something else?** Go right ahead! You can override anything in Observable’s standard library simply by defining a cell with the same name in your notebook. See our [introduction to require](/@observablehq/introduction-to-require) for more on loading libraries.`
)}

function _47(md){return(
md`**What about my favorite library?** Let us know what you’d like added! We’re tracking suggestions as [issues on GitHub](https://github.com/observablehq/stdlib/issues). For now we’re only including a few of the most popular open-source libraries and libraries of our own. Soon we plan to allow you to add (or change) what’s available by default in your notebooks. Stay tuned.`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["movies.json", {url: new URL("./files/ef1053b80e60ecf7aaeec165f1f2a1a512c0fa864e90aa0d6d8e8c80e307ebc921ed12eae87144f76f13764c683a7e2c818502f6a287a5cfff9a93a501eb27e3.json", import.meta.url), mimeType: "application/json", toString}],
    ["chinook.db", {url: new URL("./files/b3711cfd9bdf50cbe4e74751164d28e907ce366cd4bf56a39a980a48fdc5f998c42a019716a8033e2b54defdd97e4a55ebe4f6464b4f0678ea0311532605a115", import.meta.url), mimeType: "application/x-sqlite3", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("recLibsTable")).define("recLibsTable", ["aq","d3","htl","Inputs","L","Plot","md"], _recLibsTable);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["_"], _4);
  main.variable(observer()).define(["_"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["aq"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Arrow"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["d3"], _11);
  main.variable(observer()).define(["d3"], _12);
  main.variable(observer()).define(["d3"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["dot"], _15);
  main.variable(observer()).define(["dot"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["htl"], _18);
  main.variable(observer()).define(["htl"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["Inputs"], _21);
  main.variable(observer("viewof gain")).define("viewof gain", ["Inputs"], _gain);
  main.variable(observer("gain")).define("gain", ["Generators", "viewof gain"], (G, _) => G.input(_));
  main.variable(observer()).define(["gain"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["L"], _25);
  main.variable(observer("map")).define("map", ["htl","L"], _map);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["mermaid"], _28);
  main.variable(observer()).define(["mermaid"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["Plot"], _31);
  main.variable(observer()).define(["Plot","movies"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["SQLite"], _34);
  main.variable(observer("chinook")).define("chinook", ["FileAttachment"], _chinook);
  main.variable(observer()).define(["Inputs","chinook"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["topojson"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["vl"], _40);
  main.variable(observer()).define(["vl","movies"], _41);
  main.variable(observer("movies")).define("movies", ["FileAttachment"], _movies);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  return main;
}
