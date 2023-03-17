const { App } = require('../views/custom.jsx'),
{ render } = require('react-dom'),
React = require('react'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
{ state,skills, projects } = require('../src/state.js'),
Reducer = require('../src/reducer.js'),
Status = require('../src/TemplateStatus.js');

state.skills = skills;
state.projects = projects;
state.loading = 'custom';
Status.setLoaded('custom');
console.log(Status.getState());

let oldConsole = console.error;

console.error = function(...p){
	oldConsole.apply(this,arguments);

	var xml = new XMLHttpRequest();
	xml.open('POST','/log',true);
	xml.setRequestHeader('content-type','application/json');
	xml.send(JSON.stringify(p));
}

var store = createStore(Reducer, state);

render(<Provider store={store}><App Status={Status} /></Provider>, document.getElementById('custom'));