const React = require('react'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
{ Root } = require('../views/mac.jsx'),
{ state, macDock, macKindImage, leadApp, aboutView, skills, projects } = require('../src/state.js'),
Reducer = require('../src/reducer.js');

var store;

state.DockItems = macDock;
state.KindImg = macKindImage;
state.leadApp = leadApp;
state.aboutView = aboutView;
state.skills = skills;
state.projects = projects;

store = createStore(Reducer,state);

module.exports = function(props){
	return <Provider store={store}>
		<Root />
	</Provider>
}