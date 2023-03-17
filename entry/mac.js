const { App } = require('../views/mac.jsx'),
{ render } = require('react-dom'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
Reducer = require('../src/reducer.js'),
{ state, macDock, macKindImage, windowKindImage, leadApp, aboutView, skills, projects } = require('../src/state.js'),
React = require('react'),
Status = require('../src/TemplateStatus.js');

var store;

state.DockItems = macDock;
state.KindImg = macKindImage;
state.leadApp = leadApp;
state.aboutView = aboutView;
state.skills = skills;
state.projects = projects;
state.loading = 'mac';
Status.setLoaded('mac');
console.log(Status.getState());

store = createStore(Reducer,state);

render(<Provider store={store}><App Status={Status} /></Provider>, document.getElementById('mac'));