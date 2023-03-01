const { App } = require('../views/custom.jsx'),
{ render } = require('react-dom'),
React = require('react'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
{ state,skills, projects } = require('../src/state.js'),
Reducer = require('../src/reducer.js');

state.skills = skills;
state.projects = projects;

var store = createStore(Reducer, state);

render(<Provider store={store}><App /></Provider>, document.body);