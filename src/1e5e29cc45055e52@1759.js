import define1 from "./cc1c4f2583af6f34@220.js";
import define2 from "./8b1f9ed1e23e12f9@502.js";

function _1(md){return(
md`# Standard library`
)}

function _2(md){return(
md`Many capabilities that you will find useful are provided in the [Observable standard library](https://github.com/observablehq/stdlib/blob/master/README.md). This notebook describes those capabilities in brief, and provides links when there are notebooks that go into greater detail. (Older functionality is listed in [Deprecated / No Longer Recommended](#deprecatedSection).)`
)}

function _3(md){return(
md`## Table of Contents
- [currentUser](#currentUserSection) - Identify the current user.
- [DatabaseClient](#databaseClientSection) - Create a database client.
- [DOM](#domSection) - Create HTML and SVG elements.
- [FileAttachment](#fileAttachmentSection) - Read local or remote files.
- [Generators](#generatorsSection) - Utilities for generators and iterators.
- [Graphviz and the dot template](#graphvizSection) - Use the dot template and Graphviz to create charts.
- [html](#htmlSection) - Render HTML.
- [Inputs](#inputsSection) (see [Observable Inputs](https://observablehq.com/@observablehq/inputs?collection=@observablehq/getting-data-in-and-out))
- [invalidation](#invalidationSection) - Dispose of resources.
- [md](#mdSection) - Render Markdown.
- [now](#nowSection) - Return the current value of Date.now.
- [Promises](#promisesSection) - Utilities for promises.
- [require](#requireSection) - Load third-party libraries.
- [Sample Datasets](#sampleDataSection) - Sample datasets for experimentation.
- [Secrets](#secretsSection) - Store access keys to make private data accessible without revealing the keys.
- [SVG](#svgSection) - Render Scalable Vector Graphics.
- [tex](#texSection) - Render LaTeX.
- [visibility](#visibilitySection) - A special promise that waits for visibility.
- [width](#widthSection) - Returns the current page width.


- [Recommended Libraries](#additionalLibrariesSection)
- [Deprecated/No Longer Recommended](#deprecatedSection)
`
)}

function _currentUserSection(md){return(
md ` ## currentUser
The \`currentUser\` object is a special addition to the standard library, only available within private [Team](https://observablehq.com/pricing) notebooks. \`currentUser\` provides information about the team member currently viewing the page:
`
)}

function _5(currentUser){return(
currentUser
)}

function _databaseClientSection(md){return(
md `## DatabaseClient`
)}

function _7(md){return(
md`For most uses, the _[data table cell](https://observablehq.com/@observablehq/data-table-cell?collection=@observablehq/getting-data-in-and-out)_ or _[SQL cell](https://observablehq.com/@observablehq/sql-cell?collection=@observablehq/getting-data-in-and-out)_ are preferable to creating a database client programmatically. Their results can be accessed as variables just like any other cell.

To programmatically create a database client for a configured database:`
)}

function _client(DatabaseClient){return(
DatabaseClient("Baby Names")
)}

function _9(md){return(
md`This returns a promise to the client for the database with the specified name. You then can use a \`query\` method that returns a promise to the array of results:`
)}

function _names(client){return(
client.query(
  `SELECT name, gender, year, SUM(number) AS number
  FROM names
  WHERE year > ?
  GROUP BY name, gender, year`,
  [1920]
)
)}

function _11(md){return(
md`The database client has the following methods available:

| Name | Description |
|-|-|
| [databaseClient.query()](#clientQuery) | Run the specified SQL query, returning a promise to the array of results. |
| [databaseClient.queryRow()](#clientQueryRow) | Similar to databaseClient.query but returns a promise to a single row of results. |
| [client.sql\\\`\\\`](#clientSQL) | Similar to query(), but allows easy interpolation of variables into the query string |
| [databaseClient.explain()](#clientExplain) | Explains the query plan for the specified query, returning a promise to an HTML element. (PostgreSQL databases only.)|
| [databaseClient.describe()](#clientDescribe) | Describes the schema for the table with the specified name, returning a promise to an HTML table. |
`
)}

function _clientQuery(md){return(
md`### *client*.query(*query*[, *parameters*])
Run the specified SQL *query*, returning a promise to the array of results. (You can either explicitly await the promise as part of a larger expression, or rely on Observable’s [implicit cell-level await](/@observablehq/introduction-to-promises).)

If *parameters* is specified, it is an array of values to bind to query parameters. The parameter syntax depends on the database type: 
- BigQuery can use named (\\\`@age\\\`, \\\`@name\\\`, …) or ordered (repeating \\\`?\\\`) parameters 
- Databricks uses numbered parameters (\\\`:1\\\`, \\\`:2\\\`, …)
- Mongo SQL uses ordered parameters (repeating \\\`?\\\`)
- MySQL uses ordered parameters (repeating \\\`?\\\`)
- Oracle can use named (\\\`:age\\\`, \\\`:name\\\`, …) or ordered (repeating \\\`?\\\`) parameters 
- PostgreSQL uses numbered parameters (\\\`$1\\\`, \\\`$2\\\`, …)
- Snowflake  uses numbered parameters (\\\`:1\\\`, \\\`:2\\\`, …)
- SQL Server can use named (\\\`@age\\\`, \\\`@name\\\`, …) parameters  

Please refer to the respective documentation: 
- [BigQuery](https://cloud.google.com/bigquery/docs/parameterized-queries)
- [Databricks](https://docs.databricks.com/)
- [Mongo](https://www.mongodb.com/docs/)
- [MySQL](https://github.com/mysqljs/mysql/blob/master/Readme.md#escaping-query-values)
- [Oracle](https://node-oracledb.readthedocs.io/en/latest/user_guide/bind.html#in-bind-parameters)
- [PostgreSQL](https://node-postgres.com/features/queries#parameterized-query)
- [Snowflake](https://docs.snowflake.com/en/user-guide/nodejs-driver-use.html#binding-statement-parameters)
- [SQL Server](https://github.com/tediousjs/node-mssql#input-name-type-value)`
)}

function _clientQueryRow(md){return(
md`### *client*.queryRow(*query*[, *parameters*])

An alternative to [*client*.query](#query) that returns a single row instead of an array of results.`
)}

function _14(client){return(
client.queryRow(
  `SELECT MIN(year) AS year
  FROM names
  WHERE name = ?`,
  ["Loki"]
)
)}

function _15(md){return(
md`### *client*.sql\\\`*query*\\\`
Run the specified SQL *query* returning a promise to the array of results. Interpolated expressions are treated as query parameters. (Like with [*client*.query](#clientQuery), you can either explicitly await the promise as part of a larger expression, or rely on Observable’s [implicit cell-level await](/@observablehq/introduction-to-promises).)`
)}

function _year(){return(
1950
)}

function _17(client,year){return(
client.sql`SELECT name, gender, year, SUM(number) AS number
FROM names
WHERE year > ${year}
GROUP BY name, gender, year`
)}

function _clientExplain(md){return(
md`### *client*.explain(*query*[, *parameters*])

Explains the query plan for the specified *query*, returning a promise to an HTML element. Currently this is only supported for PostgreSQL databases.`
)}

function _19(client){return(
client.explain(
  `SELECT MIN(year) AS year
  FROM names
  WHERE name = ?`,
  ["Loki"]
)
)}

function _20(md){return(
md`### *client*.describe([*name*])

Describes the schema for the table with the specified *name*, returning a promise to an HTML table. The exact output depends on the database type.`
)}

function _table(client){return(
client.describe("names")
)}

function _22(md){return(
md`In addition to the returned HTML table, you can access the table schema programmatically as *table*.value. The returned array contains an object for each of the table’s columns.`
)}

function _23(table){return(
table.value
)}

function _24(md){return(
md`If you don’t specify a table *name*, *client*.describe instead describes the available tables in the database.`
)}

function _25(client){return(
client.describe()
)}

function _domSection(md){return(
md `## DOM

The following [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) methods are supported.

### DOM.context2d(_width_, _height_[, _dpi_]))
Returns a new canvas context with the specified _width_ and _height_ and the specified device pixel ratio _dpi_. If _dpi_ is not specified, it defaults to [\`_window_.devicePixelRatio\`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). To access the context's canvas, use [\`_context_.canvas\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas). For example, to create a 960x500 canvas:
`
)}

function _27(md){return(
md`\`\`\`JavaScript
{
  const context = DOM.context2d(960, 500);
  return context.canvas;
}
\`\`\``
)}

function _28(md){return(
md`To expand the DOM, click the black triangle next to "Object":`
)}

function _29(DOM){return(
DOM
)}

function _30(md){return(
md`Another example: the following code creates a small canvas and adds text:`
)}

function _31(DOM,width)
{
  const context = DOM.context2d(width, 33);
  context.fillText("Hello, I am a canvas!", 0, 20);
  return context.canvas;
}


function _32(md){return(
md`\`DOM.context2d\` is helpful if you are using [2D Canvas](https://www.w3.org/TR/2dcontext/) (rather than [WebGL](https://webglfundamentals.org/)), because of automatic pixel density scaling.
`
)}

function _33(md){return(
md`### DOM.uid([_name_])
Returns a new unique _identifier_. If _name_ is specified, the _identifier_.\`id\` will be derived from the specified _name_, which may be useful for debugging. If \`DOM.uid\` is called repeatedly with the same _name_, every returned _identifier_ is still unique (that is, different). 

Identifiers are useful in SVG: 
- Use _identifier_.\`href\` for IRI references, such as the [xlink:href](https://www.w3.org/TR/SVG/animate.html#HrefAttribute) attribute.
- Use _identifier_.\`toString\` for functional notation, such as the [clip-path](https://www.w3.org/TR/css-masking/#the-clip-path) presentation attribute.`
)}

function _34(md){return(
md`For example, to clip the image of the Mona Lisa (attached to this notebook) to a circle of radius 320 px:`
)}

async function _35(DOM,svg,FileAttachment)
{
  const clip = DOM.uid("clip");
  return svg`<svg width="128" height="128" viewBox="0 0 640 640">
  <defs>
    <clipPath id="${clip.id}">
      <circle cx="320" cy="320" r="320"></circle>
    </clipPath>
  </defs>
  <image
    clip-path="${clip}"
    width="640" height="640"
    preserveAspectRatio="xMidYMin slice"
    xlink:href="${await FileAttachment("image@1.png").url()}"
  ></image>
</svg>`;
}


function _36(md){return(
md`Using \`DOM.uid\` is strongly recommended over hand-coding as it ensures that your identifiers are still unique if your code is imported into another notebook. Because _identifier_.\`href\` and _identifier_.\`toString\` return absolute rather than local IRIs, it also works well in conjunction with a notebook’s [base URL](https://developer.mozilla.org/docs/Web/HTML/Element/base).`
)}

function _fileAttachmentSection(md){return(
md ` ## FileAttachment
To read in local files, use one of the [FileAttachment](#fileAttachmentSection) methods or a [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).
See [File Attachments](https://observablehq.com/@observablehq/file-attachments) for examples and more explanation. 
`
)}

function _38(md){return(
md`### fileAttachment.arrayBuffer()
Returns a promise to the file's contents as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).`
)}

function _39(md){return(
md`\`\`\`JavaScript
const city = shapefile.read(await FileAttachment("sf.shp").arrayBuffer());
\`\`\``
)}

function _40(md){return(
md`### fileAttachment.blob()
Returns a promise to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) containing the raw content of the file.`
)}

function _41(md){return(
md`\`\`\`JavaScript
const blob = await FileAttachment("binary-data.dat").blob();
\`\`\``
)}

function _42(md){return(
md`### fileAttachment.csv({_array_ = false, _typed_ = false} = {})
Returns a promise to the file’s contents, parsed as comma-separated values (CSV) into an array.`
)}

function _43(md){return(
md`\`\`\`JavaScript
const data = await FileAttachment("cars.csv").csv();
\`\`\``
)}

function _44(md){return(
md`If _array_ is true, an array of arrays is returned; otherwise, the first row is assumed to be the header row and an array of objects is returned, and the returned array has a _data_.\`columns\` property that is an array of column names. (See [\`d3.csvParseRows\`](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parseRows).) If _typed_ is true, [automatic type inference](https://observablehq.com/@d3/d3-autotype) is applied; only use this feature if you know your data is compatible.`
)}

function _45(md){return(
md`### fileAttachment.image()
Returns a promise to a file loaded as an [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image). The promise resolves when the image has finished loading, making this useful for reading the image pixels in Canvas, or for loading the image into a WebGL texture. Consider [\`fileAttachment.url\`](#fileAttachmentUrlSection) if you want to embed an image in HTML or Markdown.`
)}

function _46(md){return(
md`\`\`\`JavaScript
const image = await FileAttachment("sunset.jpg").image();
\`\`\``
)}

function _47(md){return(
md`### fileAttachment.json()
Returns a promise to the file's contents, parsed as JSON into JavaScript values.`
)}

function _48(md){return(
md`\`\`\`JavaScript
const logs = await FileAttachment("weekend-logs.json").json();
\`\`\``
)}

function _49(md){return(
md`### fileAttachment.stream()
Returns a promise to a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) of the file's contents.`
)}

function _50(md){return(
md`\`\`\`JavaScript
const stream = await FileAttachment("metrics.csv").stream();
const reader = stream.getReader();
let done, value;
while (({done, value} = await reader.read()), !done) {
  yield value;
}
\`\`\``
)}

function _51(md){return(
md`### fileAttachment.text()
Returns a promise to the file's contents as a JavaScript string.`
)}

function _52(md){return(
md`\`\`\`JavaScript
const hello = await FileAttachment("hello.txt").text();
\`\`\``
)}

function _53(md){return(
md`### fileAttachment.tsv({_array_ = false, _typed_ = false} = {})
Returns a promise to the file’s contents, parsed as tab-separated values (CSV) into an array.`
)}

function _54(md){return(
md`\`\`\`JavaScript
const data = await FileAttachment("cars.tsv").tsv();
\`\`\``
)}

function _55(md){return(
md`If _array_ is true, an array of arrays is returned; otherwise, the first row is assumed to be the header row and an array of objects is returned, and the returned array has a _data_.\`columns\` property that is an array of column names. (See [\`d3.csvParseRows\`](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parseRows).) If _typed_ is true, [automatic type inference](https://observablehq.com/@d3/d3-autotype) is applied; only use this feature if you know your data is compatible.`
)}

function _fileAttachmentUrlSection(md){return(
md `### fileAttachment.url()
Returns a promise to the URL at which the file may be retrieved.`
)}

function _57(md){return(
md`\`\`\`JavaScript
const url = await FileAttachment("file.txt").url();
\`\`\``
)}

function _fileAttachmentXLSXSection(md){return(
md `### fileAttachment.xlsx()
Returns an array of sheetnames from a given XLSX file.`
)}

function _workbook(FileAttachment){return(
FileAttachment("Laser_Report_2020.xlsx").xlsx()
)}

function _60(md){return(
md`See [FileAttachment.xlsx](https://observablehq.com/@observablehq/xlsx) for examples and more explanation.`
)}

function _fileAttachmentZipSection(md){return(
md `### fileAttachment.zip()
Returns an array of filenames from a given ZIP archive.`
)}

function _dogZip(FileAttachment){return(
FileAttachment("Dog_Photos.zip").zip()
)}

function _63(md){return(
md`See [FileAttachment.zip](https://observablehq.com/@observablehq/zip) for examples and more explanation.`
)}

function _64(md){return(
md`Note that the \`Files.text()\`, \`Files.url()\`, and \`Files.buffer()\` methods in [Reading Local Files](https://observablehq.com/@mbostock/reading-local-files) are deprecated now.`
)}

function _generatorsSection(md){return(
md `## Generators
Use the methods in this section to create generators. (See [Introduction to Generators](https://observablehq.com/@observablehq/introduction-to-generators) for an explanation of what generators are used for.)
`
)}

function _generatorsInputSection(md){return(
md ` ### Generators.input(_input_)
Note: Consider using the [\`viewof\`](https://observablehq.com/@observablehq/introduction-to-views) operator. 

Returns a new generator that yields promises to the current value of the specified _input_ element; each promise resolves when the _input_ element emits an event. (The promise resolves when the event is emitted, even if the value of the input is unchanged.) If the initial value of the _input_ is not undefined, the returned generator’s first yielded value is a resolved promise with the initial value of the _input_.
`
)}

function _67(md){return(
md`The type of event that triggers promise resolution depends on the _input_ type as follows:
- For button, submit, and checkbox inputs, _click_ events.
- For file inputs, _change_ events.
- For all other types, _input_ events.

The resolved value is likewise dependent on the _input_.\`type\` as follows:
- For range and number inputs, _input_.\`valueAsNumber\`.
- For date inputs, _input_.\`valueAsDate\`.
- For checkbox inputs, _input_.\`checked\`.
- For single-file inputs (_input_.\`multiple\` is falsey), _input_.\`files[0]\`.
- For multi-file inputs (_input_.\`multiple\` is truthy), _input_.\`files\`.
- For all other types, _input_.\`value\`.
  
The specified _input_ need not be an \`HTMLInputElement\`, but it must support the _target_.\`addEventListener\` and _target_.\`remoteEventListener\` methods of the [\`EventTarget\`](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener) interface.

\`Generators.input\` is used by Observable’s [\`viewof\` operator](https://observablehq.com/@observablehq/introduction-to-views) to define the current value of a view, and is based on [\`Generators.observe\`](#generatorsObserveSection). Usually you do not use \`Generators.input\` directly, but it can be used to define a [generator cell](https://observablehq.com/@observablehq/generator-cells-functions-and-objects) exposing the current value of an input, and you can also read the yielded values by hand. For example, to accumulate the first four values:`
)}

function _68(md){return(
md`\`\`\`JavaScript
{
  const values = [];
  for (const value of Generators.input(element)) {
    if (values.push(await value) >= 4) {
      return values;
    }
  }
}
\`\`\``
)}

function _69(md){return(
md`\`Generators.input\` is lossy and may skip values: if more than one event is emitted before the next promise is pulled from the generator (more than once per animation frame), then the next promise returned by the generator will be resolved with the latest input value, potentially skipping intermediate values. See [\`Generators.queue\`](#generatorsQueueSection) for a non-debouncing generator.`
)}

function _generatorsObserveSection(md){return(
md ` ### Generators.observe(_initialize_)
Returns a generator that yields promises to an observable value, adapting a push-based data source (such as an [\`Observable\`](https://github.com/tc39/proposal-observable/blob/master/README.md), an [\`EventEmitter\`](https://nodejs.org/api/events.html#events_class_eventemitter) or an [\`EventTarget\`](https://developer.mozilla.org/docs/Web/API/EventTarget)) to a pull-based one.
`
)}

function _71(md){return(
md`The specified _initialize_ function is invoked before \`Generators.observe\` returns, being passed a _change_ function; calling _change_ triggers the resolution of the current promise with the passed value. The _initialize_ function may also return a _dispose_ function; this function will be called when the generator is [disposed](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator/return). (See [invalidation](#invalidationSection).)

For example, to observe the current value of a text input element, you might say:`
)}

function _72(md){return(
md`\`\`\`JavaScript
Generators.observe(change => {

  // An event listener to yield the element’s new value.
  const inputted = () => change(element.value);

  // Attach the event listener.
  element.addEventListener("input", inputted);

  // Yield the element’s initial value.
  change(element.value);

  // Detach the event listener when the generator is disposed.
  return () => element.removeEventListener("input", inputted);
})
\`\`\``
)}

function _73(md){return(
md`(See also [\`Generators.input\`](#generatorsInputSection).)`
)}

function _74(md){return(
md`\`Generators.observe\` is typically used to define a [generator cell](https://observablehq.com/@mbostock/generator-cells-functions-and-objects), but you can also read the yielded values by hand. For example, to accumulate the first four values:`
)}

function _75(md){return(
md`\`\`\`JavaScript
{
  const generator = Generators.observe(…);
  const values = [];
  for (const value of generator) {
    if (values.push(await value) >= 4) {
      return values;
    }
  }
}
\`\`\``
)}

function _76(md){return(
md`\`Generators.observe\` is lossy and may skip values: if _change_ is called more than once before the next promise is pulled from the generator (more than once per animation frame), then the next promise returned by the generator will be resolved with the latest value passed to _change_, potentially skipping intermediate values. See [\`Generators.queue\`](#generatorsQueueSection) for a non-debouncing generator.`
)}

function _generatorsQueueSection(md){return(
md ` ### Generators.queue(_initialize_)
Returns a generator that yields promises to an observable value, adapting a push-based data source (such as an [\`Observable\`](https://github.com/tc39/proposal-observable/blob/master/README.md), an [\`EventEmitter\`](https://nodejs.org/api/events.html#events_class_eventemitter) or an [\`EventTarget\`](https://developer.mozilla.org/docs/Web/API/EventTarget)) to a pull-based one.
`
)}

function _78(md){return(
md`The specified _initialize_ function is invoked before \`Generators.queue\` returns, being passed a _change_ function; calling _change_ triggers the resolution of the current promise with the passed value. The _initialize_ function may also return a _dispose_ function; this function will be called when the generator is [disposed](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator/return). (See [invalidation](#invalidationSection).)

For example, to observe the current value of a text input element, you might say:`
)}

function _79(md){return(
md`\`\`\`JavaScript
Generators.queue(change => {

  // An event listener to yield the element’s new value.
  const inputted = () => change(element.value);

  // Attach the event listener.
  element.addEventListener("input", inputted);

  // Yield the element’s initial value.
  change(element.value);

  // Detach the event listener when the generator is disposed.
  return () => element.removeEventListener("input", inputted);
})

\`\`\``
)}

function _80(md){return(
md`(See also [\`Generators.input\`](#generatorsInputSection).)`
)}

function _81(md){return(
md`\`Generators.queue\` is typically used to define a [generator cell](https://observablehq.com/@mbostock/generator-cells-functions-and-objects), but you can also read the yielded values by hand. For example, to accumulate the first four values:`
)}

function _82(md){return(
md`\`\`\`JavaScript
{
  const generator = Generators.queue(…);
  const values = [];
  for (const value of generator) {
    if (values.push(await value) >= 4) {
      return values;
    }
  }
}
\`\`\``
)}

function _83(md){return(
md`\`Generators.queue\` is non-lossy and, as a result, may yield “stale” values: if _change_ is called more than once before the next promise is pulled from the generator (more than once per animation frame), the passed values are queued in order and the generator will return resolved promises until the queue is empty again. See [\`Generators.observe\`](#generatorsObserveSection) for a debouncing generator.`
)}

function _84(md){return(
md`See [Introduction to Generators](https://observablehq.com/@observablehq/introduction-to-generators) for examples and more explanation.`
)}

function _graphvizSection(md){return(
md `## Graphviz and the \`\`\`dot\`\`\` template`
)}

function _86(md){return(
md`Observable supports the \`dot\` template for convenient use of the [Graphviz](https://observablehq.com/@observablehq/dot) language to render graphs:`
)}

function _87(dot){return(
dot`digraph { event -> consequence; }`
)}

function _88(md){return(
md`See [Graphviz](https://observablehq.com/@observablehq/dot) for more examples.`
)}

function _htmlSection(md){return(
md `## html \`\`\` \`string\` \`\`\` (Create an HTML element)`
)}

function _htmlNote(note,htl){return(
note(htl.html`<b>Note</b>: The <code>html</code> function is supported, but consider using the HTML cell mode available from the <a href="https://observablehq.com/@observablehq/adding-cells?collection=@observablehq/notebook-fundamentals">Add Cell menu</a>, which allows you to type HTML code without the <code>html</code> keyword and without needing to enclose the text in backticks.`)
)}

function _91(md){return(
md`Use \`html\` to create an HTML element. For example, to create an H3 element whose content is "Hello, world!":
`
)}

function _92(html){return(
html`<h3>Hello, world!`
)}

function _93(md){return(
md`The \`html\` function returns the HTML element represented by the specified HTML [_string literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals). The function is intended to be used as a [tagged template literal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals_and_escape_sequences). Leading and trailing whitespace is automatically trimmed. `
)}

function _94(md){return(
md`If the resulting HTML fragment is not a single HTML element or node, it is wrapped in a DIV element. For example, consider the following expression:`
)}

function _95(html){return(
html`Hello, <b>world</b>!`
)}

function _96(md){return(
md`This expression is equivalent to the next expression:`
)}

function _97(html){return(
html`<div>Hello, <b>world</b>!</div>`
)}

function _98(md){return(
md`If an embedded expression is a DOM element, it is embedded in generated HTML. For example, to embed TeX within HTML:`
)}

function _99(html,tex){return(
html`I like ${tex`\KaTeX`} for math.`
)}

function _100(md){return(
md`If an embedded expression is an array, the elements of the array are embedded in the generated HTML. For example, to create a table from an array of values:`
)}

function _101(html){return(
html`<table>
  <tbody>${["zero", "one", "two"].map((name, i) => html`<tr>
    <td>${name}</td><td>${i}</td>
  </tr>`)}</tbody>
</table>`
)}

function _102(md){return(
md`A few more examples:`
)}

function _103(html){return(
html`<span style="background:yellow;">
  Use a &lt;span&gt; element to set the background color.
</span>`
)}

function _104(html){return(
html`<input type=range min=0 max=10 step=1>`
)}

function _105(html){return(
html`<select>
  <option>one</option>
  <option>two</option>
  <option>three</option>
</select>`
)}

function _inputsSection(md){return(
md`## Inputs (see [Observable Inputs](https://observablehq.com/@observablehq/inputs?collection=@observablehq/getting-data-in-and-out))
Observable has a wide variety of inputs, such as buttons, sliders, radio buttons, checkboxes, text entry inputs and more. These are part of the [Recommended Libraries](https://observablehq.com/@observablehq/recommended-libraries?collection=@observablehq/libraries), but there is a separate [notebook](https://observablehq.com/@observablehq/inputs?collection=@observablehq/getting-data-in-and-out) devoted solely to Observable Inputs.`
)}

function _invalidationSection(md){return(
md ` ## invalidation
To free up resources when a cell is re-evaluated, such as cancelling timers or disposing WebGL contexts, use the \`invalidation\` promise. This promise resolves when the current cell is re-evaluated: when the cell’s code changes, when it is run using Shift-Enter, or when a referenced input changes. This promise is typically used to dispose of resources that were allocated by the cell. For example, to abort a fetch if the cell is invalidated:
`
)}

function _108(md){return(
md`\`\`\`JavaScript
{
  const controller = new AbortController;
  invalidation.then(() => controller.abort());
  const response = await fetch(url, {signal: controller.signal});
  return response.json();
}
\`\`\``
)}

function _109(md){return(
md`The invalidation promise is provided by the runtime rather than the standard library, because it resolves to a new promise each time a cell is evaluated.

See [Invalidation](https://observablehq.com/@observablehq/invalidation) for examples and more explanation.`
)}

function _mdSection(md){return(
md `## md \`\`\` \`string\` \`\`\` (Write Markdown code) `
)}

function _mdNote(note,htl){return(
note(htl.html`<b>Note</b>: The <code>md</code> function is supported, but consider using the Markdown cell mode available from the <a href="https://observablehq.com/@observablehq/adding-cells?collection=@observablehq/notebook-fundamentals">Add Cell menu</a>, which allows you to type Markdown code without the <code>md</code> keyword and without needing to enclose the text in backticks.`)
)}

function _112(md){return(
md`The \`md\` function returns the HTML element represented by the specified Markdown [_string literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals). For example, to create an H3 element whose content is “Hello, world!”:`
)}

function _113(md){return(
md`### Hello, world!`
)}

function _114(md){return(
md`The Markdown compiler used is [Marked](https://marked.js.org). Leading and trailing whitespace is automatically trimmed.`
)}

function _115(md){return(
md`If an embedded expression is a DOM element, it is embedded in generated HTML. For example, to embed [LaTeX](#texSection) within Markdown:`
)}

function _116(md,tex){return(
md`My *favorite* number is ${tex`\tau`}.`
)}

function _117(md){return(
md`If an embedded expression is an array, the elements of the array are embedded in the generated HTML. The elements may either be strings, which are interpreted as Markdown, or DOM elements. For example, given the following array of data:`
)}

function _elements(){return(
[
  {symbol: "Co", name: "Cobalt", number: 27},
  {symbol: "Cu", name: "Copper", number: 29},
  {symbol: "Sn", name: "Tin", number: 50},
  {symbol: "Pb", name: "Lead", number: 82}
]
)}

function _119(md){return(
md`To create a table from the previous array of data, you would use the following Markdown code:`
)}

function _120(md,elements){return(
md`
| Name      | Symbol      | Atomic number |
|-----------|-------------|---------------|${elements.map(e => `
| ${e.name} | ${e.symbol} | ${e.number}   |`)}
`
)}

function _nowSection(md){return(
md ` ## now`
)}

function _122(md){return(
md`A reactive variable that returns the current value of \`Date.now\`.`
)}

function _123(now){return(
now
)}

function _124(md){return(
md`To display the current time in a Markdown string:`
)}

function _125(md,now){return(
md`The current time is: ${new Date(now).toISOString()}`
)}

function _promisesSection(md){return(
md ` ## Promises`
)}

function _promisesDelaySection(md){return(
md `### Promises.delay(_duration_[, _value_])
Returns a promise that resolves with the specified _value_ after the specified _duration_ in milliseconds. For example, to define a cell that increments approximately every second:
`
)}

function _128(md){return(
md`\`\`\`JavaScript
i = {
  let i = 0;
  yield i;
  while (true) {
    yield Promises.delay(1000, ++i);
  }
}
\`\`\``
)}

function _129(md){return(
md`If you desire precise synchronization, such as a timer that ticks exactly every second, use [\`Promises.tick\`](#promisesTickSection) instead of \`Promises.delay\`.`
)}

function _promisesTickSection(md){return(
md `### Promises.tick()`
)}

function _131(md){return(
md`Returns a promise that resolves with the specified _value_ at the next integer multiple of _milliseconds_ since the UNIX epoch. This is much like [\`Promises.delay\`](#promisesDelaySection), except it allows promises to be synchronized. For example, to define a cell that increments every second, on the second:`
)}

function _132(md){return(
md`\`\`\`JavaScript
i = {
  let i = 0;
  yield i;
  while (true) {
    yield Promises.tick(1000, ++i);
  }
}
\`\`\``
)}

function _133(md){return(
md`Or, to define a cell that is an async generator:`
)}

function _134(md){return(
md`\`\`\`JavaScript
i = {
  let i = 0;
  while (true) {
    yield i++;
    await Promises.tick(1000);
  }
}
\`\`\``
)}

function _135(md){return(
md`### Promises.when(_date_[, _value_])
Returns a promise that resolves with the specified value at the specified date. This method relies on [\`setTimeout\`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout), and thus the specified date must be no longer than 2,147,483,647 milliseconds (24.9 days) from now.`
)}

function _requireSection(md){return(
md `## require (Load third-party libraries)
- \`require.resolve()\`
- \`require.alias()\`

These are supported, but consider using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
`
)}

function _137(md){return(
md`### require(_names...)`
)}

function _138(md){return(
md`Returns a promise of the [asynchronous module definition](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) (AMD) with the specified names, loaded from [\`jsDelivr\`](https://jsdelivr.com/). Each module name can be a package (or scoped package) name optionally followed by the at sign (@) and a semver range. For example, to load [\`d3-array\`](https://github.com/d3/d3-array):`
)}

function _139(md){return(
md`\`\`\`JavaScript
d3 = require("d3-array")
\`\`\``
)}

function _140(md){return(
md`Or, to load [\`d3-array\`](https://github.com/d3/d3-array) and [\`d3-color\`](https://github.com/d3/d3-color) and merge them into a single object:`
)}

function _141(md){return(
md`\`\`\`JavaScript
d3 = require("d3-array", "d3-color")
\`\`\``
)}

function _142(md){return(
md`Or, to load [\`d3-array\`](https://github.com/d3/d3-array) 1.1x:`
)}

function _143(md){return(
md`\`\`\`JavaScript
d3 = require("d3-array@1.1")
\`\`\``
)}

function _144(md){return(
md`See [\`d3-require\`](https://github.com/d3/d3-require) for more information.`
)}

function _145(md){return(
md`### require.resolve(_name_)`
)}

function _146(md){return(
md`Returns a promise to the resolved URL to require the module with the specified _name_. For example:`
)}

function _147(md){return(
md`\`\`\`JavaScript
require.resolve("d3-array") // "https://cdn.jsdelivr.net/npm/d3-array@2.0.3/dist/d3-array.min.js"
\`\`\``
)}

function _148(md){return(
md`### require.alias(_aliases_)`
)}

function _149(md){return(
md`Returns a [require function](#requireSection) with the specified _aliases_. For each key in the specified _aliases_ object, any require of that key is substituted with the corresponding value. For example:`
)}

function _150(md){return(
md`\`\`\`JavaScript
React = require("react@16/umd/react.production.min.js")
\`\`\``
)}

function _151(md){return(
md`\`\`\`JavaScript
ReactDOM = require("react-dom@16/umd/react-dom.production.min.js")
\`\`\``
)}

function _152(md){return(
md`\`\`\`JavaScript
Semiotic = require.alias({"react": React, "react-dom": ReactDOM})("semiotic@1")
\`\`\``
)}

function _153(md){return(
md`Equivalently:`
)}

function _154(md){return(
md`\`\`\`JavaScript
r = require.alias({
  "react": "react@16/umd/react.production.min.js",
  "react-dom": "react-dom@16/umd/react-dom.production.min.js",
  "semiotic": "semiotic@1"
})
\`\`\``
)}

function _155(md){return(
md`Then to require the libraries:`
)}

function _156(md){return(
md`\`\`\`JavaScript
React = r("react")
\`\`\``
)}

function _157(md){return(
md`\`\`\`JavaScript
ReactDOM = r("react-dom")
\`\`\``
)}

function _158(md){return(
md`\`\`\`JavaScript
Semiotic = r("semiotic")
\`\`\``
)}

function _sampleDataSection(md){return(
md`## Sample Datasets
 The standard library includes multiple sample datasets so that all notebooks have data available to work with. These include financial data, statistics, weather information, and scientific data. See [Sample Datasets](https://observablehq.com/@observablehq/sample-datasets?collection=@observablehq/getting-data-in-and-out) for the full list.`
)}

function _secretsSection(md){return(
md`## Secrets
Secrets are name-value pairs that you can use in your private notebooks to access private data. By specifying secrets in your Settings, you can enable your notebooks to use API keys or other sensitive data without making the API keys or sensitive data public.

See [Introduction to Secrets](https://observablehq.com/@observablehq/secrets) for examples and more explanation.
`
)}

function _svgSection(md){return(
md `## SVG \`\`\` \`string\` \`\`\` (Create an SVG element)`
)}

function _162(md){return(
md `Returns the SVG element represented by the specified SVG [_string literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals). This function is intended to be used as a [tagged template literal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals_and_escape_sequences). Leading and trailing whitespace is automatically trimmed. For example, to create an SVG element whose content is a circle:`
)}

function _163(svg){return(
svg`<svg width=16 height=16>
  <circle cx=8 cy=8 r=4></circle>
</svg>`
)}

function _164(md){return(
md`If the resulting SVG fragment is not a single SVG element, it is wrapped in a \`<g>\`/\`</g>\` element. For example, consider this expression:`
)}

function _165(svg){return(
svg`
<circle cx=8 cy=4 r=4></circle>
<circle cx=8 cy=8 r=4></circle>
`
)}

function _166(md){return(
md`The previous expression is equivalent to the next expression:`
)}

function _167(svg){return(
svg`<g>
  <circle cx=8 cy=4 r=4></circle>
  <circle cx=8 cy=8 r=4></circle>
</g>`
)}

function _168(md){return(
md`If an embedded expression is a DOM element, it is embedded in generated SVG. If an embedded expression is an array, the elements of the array are embedded in the generated SVG.`
)}

function _169(md){return(
md`The following expression creates an SVG image with text:`
)}

function _170(svg,width){return(
svg`<svg width=${width} height=27>
  <text y=22>Hello, I am an SVG image!</text>
</svg>`
)}

function _texSection(md){return(
md ` ## tex \`\`\` \`string\` \`\`\`  (Write LaTeX code)`
)}

function _texNote(note,htl){return(
note(htl.html`<b>Note</b>: The <code>tex</code> function is supported, but consider using the <b>Mathematical formula</b> available from the <a href="https://observablehq.com/@observablehq/adding-cells?collection=@observablehq/notebook-fundamentals">Add Cell menu</a>, which allows you to type TeX code without the <code>tex</code> keyword and without needing to enclose the text in backticks.`)
)}

function _173(md){return(
md`Returns the HTML element represented by the specified LaTeX [_string literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals). Implemented by [KaTeX](https://github.com/Khan/KaTeX).`
)}

function _174(tex){return(
tex`E = mc^2`
)}

function _175(tex){return(
tex`
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
`
)}

function _176(md){return(
md`### tex.block \\\`string\\\``
)}

function _177(md){return(
md`Equivalent to [\`tex\`](#texSection), but uses KaTeX’s display mode to produce a bigger block element rather than a smaller inline element.`
)}

function _178(tex){return(
tex.block`E = mc^2`
)}

function _179(tex){return(
tex.block`
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
`
)}

function _180(md){return(
md`### tex.options(_options_)`
)}

function _181(md){return(
md`Returns a function equivalent to [\`tex\`](#texSection), but with the specified _options_.`
)}

function _182(tex){return(
tex.options({displayMode: true})`E = mc^2`
)}

function _visibilitySection(md){return(
md ` ## visibility
Visibility is a special kind of promise that resolves when a cell becomes visible. If, for example, you want animation to run only after a cell has scrolled into view, you can do that using \`visibility()\`.

The visibility function is provided by the runtime rather than the standard library because it resolves to a different function for each cell.
An example of using \`visibility\` as part of a \`fadeIn\` function follows, along with an example of the effect:
`
)}

function _fadeIn(){return(
function fadeIn(element, visibility) {
  element.style.color = "transparent";
  element.style.willChange = "color";
  element.style.transition = "color 2.5s linear";
  visibility().then(() => (element.style.color = "inherit"));
  return element;
}
)}

function _185(md){return(
md`The following paragraph (from [A Christmas Carol](https://www.gutenberg.org/files/46/46-h/46-h.htm#link1)) fades in when the page is first scrolled:`
)}

function _186(fadeIn,md,visibility){return(
fadeIn(md`The idea being an alarming one, he scrambled out of bed, and groped his way to the window. He was obliged to rub the frost off with the sleeve of his dressing-gown before he could see anything; and could see very little then. All he could make out was, that it was still very foggy and extremely cold, and that there was no noise of people running to and fro, and making a great stir, as there unquestionably would have been if night had beaten off bright day, and taken possession of the world...`, visibility)
)}

function _187(md){return(
md`See [Awaiting Visibility](https://observablehq.com/@observablehq/visibility) for more examples and explanation.`
)}

function _widthSection(md){return(
md ` ## width`
)}

function _189(md){return(
md`A reactive variable that returns the current page width.`
)}

function _190(width){return(
width
)}

function _191(md){return(
md`To make a rounded rectangle in SVG that resizes to fit the page:`
)}

function _192(width,md){return(
md`\`\`\`
html\`<svg width=${width} height=200>
  <rect width=${width} height=200 rx=10 ry=10></rect>
</svg>\`
\`\`\``
)}

function _additionalLibrariesSection(md){return(
md ` ## Recommended Libraries
Observable also includes and recommends the following additional libraries (some are third-party).
`
)}

function _194(recLibsTable){return(
recLibsTable
)}

function _195(md){return(
md`See [Recommended Libraries](https://observablehq.com/@observablehq/recommended-libraries?collection=@observablehq/libraries) for details about each individual library.`
)}

function _deprecatedSection(md){return(
md`## Deprecated / No Longer Recommended
The following methods are deprecated and are no longer recommended. Consider using the suggested substitutions.
`
)}

function _197(md){return(
md`### DOM methods that have been deprecated
| Name | Suggested substitution |
|-|-|
| DOM.**canvas**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> | 
| DOM.**download**() | Deprecated; use the cell menu or <a href = "https://developer.mozilla.org/en-US/docs/Web/API/Blob">**Blob**</a> |
| DOM.**element**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> |
| DOM.**input**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> or <a href="https://observablehq.com/@observablehq/inputs?collection=@observablehq/inputs">**Inputs**</a> |
| DOM.**range**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> or <a href="https://observablehq.com/@observablehq/input-range?collection=@observablehq/inputs">**Inputs.range**</a> |
| DOM.**select**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> or <a href="https://observablehq.com/@observablehq/input-select?collection=@observablehq/inputs">**Inputs.select**</a> |
| DOM.**svg**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> |
| DOM.**text**() | Deprecated; use <a href="https://observablehq.com/@observablehq/htl">**htl.html**</a> |`
)}

function _198(md){return(
md`### Files methods that have been deprecated
| Name | Suggested substitution |
|-|-|
| Files.**buffer**() | Deprecated; use **FileAttachment** or **FileReader** |
| Files.**text**() | Deprecated; use **FileAttachment** or **FileReader** |
| Files.**url**() | Deprecated; use **FileAttachment** or **FileReader** |
`
)}

function _199(md){return(
md`### Generators methods that have been deprecated
| Name | Suggested substitution |
|-|-|
| Generators.**disposable**() | Deprecated; use **invalidation** |
| Generators.**filter**() | Deprecated; use **for** and **yield** |
| Generators.**map**() | Deprecated; use **for** and **yield** |
| Generators.**range**() | Deprecated; use **for** and **yield** |
| Generators.**valueAt**() | Deprecated; use **for** |
| Generators.**worker**() | Deprecated; use **Worker** |`
)}

function _200(md){return(
md`## Appendix`
)}

function _currentUser(){return(
{
  login: "person",
  name: "Amaya Person",
  bio: "",
  url: "",
  avatar: "https://avatars.observableusercontent.com/avatar/9acd0c72595fd2c8faf4b3acbd0607c1522e453416b21347125a42d7b1ccbafc"
}
)}

function _note(htl){return(
(contents) => htl.html`
<div style=${{border: "1px solid rgba(0, 0, 0, 0.05)", padding: "0.8rem", fontFamily: "var(--sans-serif)", fontSize: "smaller", maxWidth: "640px", borderRadius: "4px", font: "13px/1.5em var(--sans-serif)", color: "#444", boxSizing: "border-box", background: "hsl(55deg 80% 98%)"}}>
  ${contents}
</div>
`
)}

function _205(htl){return(
htl.html`<style type="text/css">

td:first-child {
  width: 35%;
}

td {
  white-space: nowrap;
}

</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/2aff4aaf99f1d1b11dbcbf1365ce399e4714900c6fcd2c552bbf8b8393c06f4d7335fd2b785b907248b9b3ea42170f7b07e579375fbe29639af4b3a1a05c2a4d.png", import.meta.url), mimeType: "image/png", toString}],
    ["Laser_Report_2020.xlsx", {url: new URL("./files/036293060a3d1be9b3ad33fca12dbd546157c3a20cbc2dcee6400a04c4e26b407d247697c0b5a6b23c9c03d263698913e9f5055b1c3fa2cfe6fc1826ec8c7ad0.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}],
    ["Dog_Photos.zip", {url: new URL("./files/880426472f67ca25f8401c05e8c10466a3709a8870275b28a1fb5aebe9ec234a20cd651273434438b98d5aa0a6d18221ab155dccbe133c9453bde00537ab29a8.zip", import.meta.url), mimeType: "application/zip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("currentUserSection")).define("currentUserSection", ["md"], _currentUserSection);
  main.variable(observer()).define(["currentUser"], _5);
  main.variable(observer("databaseClientSection")).define("databaseClientSection", ["md"], _databaseClientSection);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("client")).define("client", ["DatabaseClient"], _client);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("names")).define("names", ["client"], _names);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("clientQuery")).define("clientQuery", ["md"], _clientQuery);
  main.variable(observer("clientQueryRow")).define("clientQueryRow", ["md"], _clientQueryRow);
  main.variable(observer()).define(["client"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("year")).define("year", _year);
  main.variable(observer()).define(["client","year"], _17);
  main.variable(observer("clientExplain")).define("clientExplain", ["md"], _clientExplain);
  main.variable(observer()).define(["client"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("table")).define("table", ["client"], _table);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["table"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["client"], _25);
  main.variable(observer("domSection")).define("domSection", ["md"], _domSection);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["DOM"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["DOM","width"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["DOM","svg","FileAttachment"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("fileAttachmentSection")).define("fileAttachmentSection", ["md"], _fileAttachmentSection);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("fileAttachmentUrlSection")).define("fileAttachmentUrlSection", ["md"], _fileAttachmentUrlSection);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("fileAttachmentXLSXSection")).define("fileAttachmentXLSXSection", ["md"], _fileAttachmentXLSXSection);
  main.variable(observer("workbook")).define("workbook", ["FileAttachment"], _workbook);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("fileAttachmentZipSection")).define("fileAttachmentZipSection", ["md"], _fileAttachmentZipSection);
  main.variable(observer("dogZip")).define("dogZip", ["FileAttachment"], _dogZip);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("generatorsSection")).define("generatorsSection", ["md"], _generatorsSection);
  main.variable(observer("generatorsInputSection")).define("generatorsInputSection", ["md"], _generatorsInputSection);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("generatorsObserveSection")).define("generatorsObserveSection", ["md"], _generatorsObserveSection);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer()).define(["md"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("generatorsQueueSection")).define("generatorsQueueSection", ["md"], _generatorsQueueSection);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("graphvizSection")).define("graphvizSection", ["md"], _graphvizSection);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer()).define(["dot"], _87);
  main.variable(observer()).define(["md"], _88);
  main.variable(observer("htmlSection")).define("htmlSection", ["md"], _htmlSection);
  main.variable(observer("htmlNote")).define("htmlNote", ["note","htl"], _htmlNote);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer()).define(["html"], _92);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer()).define(["md"], _94);
  main.variable(observer()).define(["html"], _95);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer()).define(["html"], _97);
  main.variable(observer()).define(["md"], _98);
  main.variable(observer()).define(["html","tex"], _99);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer()).define(["html"], _101);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer()).define(["html"], _103);
  main.variable(observer()).define(["html"], _104);
  main.variable(observer()).define(["html"], _105);
  main.variable(observer("inputsSection")).define("inputsSection", ["md"], _inputsSection);
  main.variable(observer("invalidationSection")).define("invalidationSection", ["md"], _invalidationSection);
  main.variable(observer()).define(["md"], _108);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer("mdSection")).define("mdSection", ["md"], _mdSection);
  main.variable(observer("mdNote")).define("mdNote", ["note","htl"], _mdNote);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer()).define(["md"], _113);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer()).define(["md","tex"], _116);
  main.variable(observer()).define(["md"], _117);
  main.variable(observer("elements")).define("elements", _elements);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer()).define(["md","elements"], _120);
  main.variable(observer("nowSection")).define("nowSection", ["md"], _nowSection);
  main.variable(observer()).define(["md"], _122);
  main.variable(observer()).define(["now"], _123);
  main.variable(observer()).define(["md"], _124);
  main.variable(observer()).define(["md","now"], _125);
  main.variable(observer("promisesSection")).define("promisesSection", ["md"], _promisesSection);
  main.variable(observer("promisesDelaySection")).define("promisesDelaySection", ["md"], _promisesDelaySection);
  main.variable(observer()).define(["md"], _128);
  main.variable(observer()).define(["md"], _129);
  main.variable(observer("promisesTickSection")).define("promisesTickSection", ["md"], _promisesTickSection);
  main.variable(observer()).define(["md"], _131);
  main.variable(observer()).define(["md"], _132);
  main.variable(observer()).define(["md"], _133);
  main.variable(observer()).define(["md"], _134);
  main.variable(observer()).define(["md"], _135);
  main.variable(observer("requireSection")).define("requireSection", ["md"], _requireSection);
  main.variable(observer()).define(["md"], _137);
  main.variable(observer()).define(["md"], _138);
  main.variable(observer()).define(["md"], _139);
  main.variable(observer()).define(["md"], _140);
  main.variable(observer()).define(["md"], _141);
  main.variable(observer()).define(["md"], _142);
  main.variable(observer()).define(["md"], _143);
  main.variable(observer()).define(["md"], _144);
  main.variable(observer()).define(["md"], _145);
  main.variable(observer()).define(["md"], _146);
  main.variable(observer()).define(["md"], _147);
  main.variable(observer()).define(["md"], _148);
  main.variable(observer()).define(["md"], _149);
  main.variable(observer()).define(["md"], _150);
  main.variable(observer()).define(["md"], _151);
  main.variable(observer()).define(["md"], _152);
  main.variable(observer()).define(["md"], _153);
  main.variable(observer()).define(["md"], _154);
  main.variable(observer()).define(["md"], _155);
  main.variable(observer()).define(["md"], _156);
  main.variable(observer()).define(["md"], _157);
  main.variable(observer()).define(["md"], _158);
  main.variable(observer("sampleDataSection")).define("sampleDataSection", ["md"], _sampleDataSection);
  main.variable(observer("secretsSection")).define("secretsSection", ["md"], _secretsSection);
  main.variable(observer("svgSection")).define("svgSection", ["md"], _svgSection);
  main.variable(observer()).define(["md"], _162);
  main.variable(observer()).define(["svg"], _163);
  main.variable(observer()).define(["md"], _164);
  main.variable(observer()).define(["svg"], _165);
  main.variable(observer()).define(["md"], _166);
  main.variable(observer()).define(["svg"], _167);
  main.variable(observer()).define(["md"], _168);
  main.variable(observer()).define(["md"], _169);
  main.variable(observer()).define(["svg","width"], _170);
  main.variable(observer("texSection")).define("texSection", ["md"], _texSection);
  main.variable(observer("texNote")).define("texNote", ["note","htl"], _texNote);
  main.variable(observer()).define(["md"], _173);
  main.variable(observer()).define(["tex"], _174);
  main.variable(observer()).define(["tex"], _175);
  main.variable(observer()).define(["md"], _176);
  main.variable(observer()).define(["md"], _177);
  main.variable(observer()).define(["tex"], _178);
  main.variable(observer()).define(["tex"], _179);
  main.variable(observer()).define(["md"], _180);
  main.variable(observer()).define(["md"], _181);
  main.variable(observer()).define(["tex"], _182);
  main.variable(observer("visibilitySection")).define("visibilitySection", ["md"], _visibilitySection);
  main.variable(observer("fadeIn")).define("fadeIn", _fadeIn);
  main.variable(observer()).define(["md"], _185);
  main.variable(observer()).define(["fadeIn","md","visibility"], _186);
  main.variable(observer()).define(["md"], _187);
  main.variable(observer("widthSection")).define("widthSection", ["md"], _widthSection);
  main.variable(observer()).define(["md"], _189);
  main.variable(observer()).define(["width"], _190);
  main.variable(observer()).define(["md"], _191);
  main.variable(observer()).define(["width","md"], _192);
  main.variable(observer("additionalLibrariesSection")).define("additionalLibrariesSection", ["md"], _additionalLibrariesSection);
  main.variable(observer()).define(["recLibsTable"], _194);
  main.variable(observer()).define(["md"], _195);
  main.variable(observer("deprecatedSection")).define("deprecatedSection", ["md"], _deprecatedSection);
  main.variable(observer()).define(["md"], _197);
  main.variable(observer()).define(["md"], _198);
  main.variable(observer()).define(["md"], _199);
  main.variable(observer()).define(["md"], _200);
  main.variable(observer("currentUser")).define("currentUser", _currentUser);
  const child1 = runtime.module(define1);
  main.import("MockDatabaseClient", "DatabaseClient", child1);
  const child2 = runtime.module(define2);
  main.import("recLibsTable", child2);
  main.variable(observer("note")).define("note", ["htl"], _note);
  main.variable(observer()).define(["htl"], _205);
  return main;
}
