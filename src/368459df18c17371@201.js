// https://observablehq.com/@jheer/dom-utilities@201
function _1(md){return(
md`# DOM Utilities

Utilities for labeled, well-aligned interactive widgets.`
)}

function _form(){return(
function(value, ...nodes) {
  const form = document.createElement('form');
  form.addEventListener('submit', event => event.preventDefault());
  nodes.forEach(node => form.appendChild(node));
  return Object.defineProperty(form, 'value', value);
}
)}

function _label(){return(
function(title) {
  const label = document.createElement('label');
  label.style.display = 'inline-block';
  label.style.width = '150px';
  label.innerText = title;
  return label;
}
)}

function _checkbox(form,label){return(
function(title, checked) {
  const cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');
  cb.checked = !!checked;
  
  return form(
    { 
      get() { return cb.checked; },
      set(v) { cb.checked = v; }
    },
    label(title), cb
  );
}
)}

function _menu(form,label){return(
function(title, items) {
  const select = document.createElement('select');
  items.forEach(item => {
    const opt = document.createElement('option');
    if (!Array.isArray(item)) item = [item, item + ''];
    opt.value = item[0];
    opt.innerText = item[1];
    if (item[2]) opt.setAttribute('selected', true);
    select.appendChild(opt);
  });

  return form(
    {
      get() { return select.value; },
      set(v) { select.value = v; }
    },
    label(title), select
  );
}
)}

function _slider(form,label){return(
function(title, value, min, max, step) {
  const slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.setAttribute('min', min);
  slider.setAttribute('max', max);
  slider.setAttribute('step', step);
  slider.value = value;

  const valueLabel = document.createElement('label');
  valueLabel.style['margin-left'] = '0.5em';
  
  const update = () => valueLabel.innerText = slider.value;
  slider.addEventListener('input', update);
  update();
  
  return form(
    {
      get() { return +slider.value; },
      set(v) { slider.value = +v; update(); }
    },
    label(title), slider, valueLabel
  );
}
)}

function _multi(form){return(
function(...inputs) {
  return form(
    {
      get()  { return inputs.map(node => node.value); },
      set(v) { inputs.map((node, i) => node.value = v[i]); }
    },
    ...inputs
  );
}
)}

function _rotate3D(multi,slider){return(
function() {
  return multi(
    slider('Yaw',   0, -180, 180, 1),
    slider('Pitch', 0,  -90,  90, 1),
    slider('Roll',  0, -180, 180, 1)
  );
}
)}

function _translate2D(slider,form){return(
function() {
  const inputs = [
    slider('X', -450, -1500, 1500, 1),
    slider('Y', -250, -1000, 1000, 1)
  ];

  return form(
    {
      get()  { return inputs.map(node => -node.value); },
      set(v) { inputs.map((node, i) => node.value = -(v[i] || 0)); }
    },
    ...inputs
  );
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("form")).define("form", _form);
  main.variable(observer("label")).define("label", _label);
  main.variable(observer("checkbox")).define("checkbox", ["form","label"], _checkbox);
  main.variable(observer("menu")).define("menu", ["form","label"], _menu);
  main.variable(observer("slider")).define("slider", ["form","label"], _slider);
  main.variable(observer("multi")).define("multi", ["form"], _multi);
  main.variable(observer("rotate3D")).define("rotate3D", ["multi","slider"], _rotate3D);
  main.variable(observer("translate2D")).define("translate2D", ["slider","form"], _translate2D);
  return main;
}
