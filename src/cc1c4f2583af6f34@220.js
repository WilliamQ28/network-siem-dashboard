function _1(md){return(
md`# Mock Database Client

Smoke-and-mirrors version of [database clients](/@observablehq/connecting-to-databases) to demonstrate their API. Please pardon the deception. Real clients are 👌🏼.`
)}

function _MockDatabaseClient(FileAttachment){return(
function MockDatabaseClient(name) {
  switch (name) {
    case "Baby Names": return FileAttachment("names.db").sqlite();
    case "Weather": return FileAttachment("weather.sqlite").sqlite();
    default: throw new Error(`database not found: ${name}`);
  }
}
)}

function _3(MockDatabaseClient){return(
MockDatabaseClient("does_not_exist")
)}

function _dc(MockDatabaseClient){return(
MockDatabaseClient("Baby Names")
)}

function _5(dc){return(
dc.query(`
  SELECT *
  FROM names
  WHERE name IN (?, ?)
`, ["Loki", "Thor"])
)}

function _6(dc){return(
dc.explain(`
  SELECT *
  FROM names
  WHERE name = 'Loki'
`)
)}

function _desc(dc){return(
dc.describe("names")
)}

function _8(desc){return(
desc
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["names.db", {url: new URL("./files/cc700299c584e475b7be5515a46959ef3738c1cb4fa4b37361fc39af7741a3570c48aad382bdbd3c43f40067b1871fb33b99a429998c1664cece7339ebf635b5", import.meta.url), mimeType: "application/x-sqlite3", toString}],
    ["weather.sqlite", {url: new URL("./files/6881885b5070b08eb770beb9fce63ddc1a3cec471500e44fdde016e120704da8b3b2cb651b8f5f17a75255f74bce29e3ea356027ee3fe77c9c6daa813dec419c", import.meta.url), mimeType: "application/x-sqlite3", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("MockDatabaseClient")).define("MockDatabaseClient", ["FileAttachment"], _MockDatabaseClient);
  main.variable(observer()).define(["MockDatabaseClient"], _3);
  main.variable(observer("dc")).define("dc", ["MockDatabaseClient"], _dc);
  main.variable(observer()).define(["dc"], _5);
  main.variable(observer()).define(["dc"], _6);
  main.variable(observer("viewof desc")).define("viewof desc", ["dc"], _desc);
  main.variable(observer("desc")).define("desc", ["Generators", "viewof desc"], (G, _) => G.input(_));
  main.variable(observer()).define(["desc"], _8);
  return main;
}
