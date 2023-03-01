const { App } = require('../views/mac.jsx'),
{ render } = require('react-dom'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
Reducer = require('../src/reducer.js'),
{ state, macDock, macKindImage, windowKindImage, leadApp, aboutView, skills, projects } = require('../src/state.js'),
React = require('react');

var store;

state.DockItems = macDock;
state.KindImg = macKindImage;
state.leadApp = leadApp;
state.aboutView = aboutView;
state.skills = skills;
state.projects = projects;

store = createStore(Reducer,state);

render(<Provider store={store}><App /></Provider>, document.body);