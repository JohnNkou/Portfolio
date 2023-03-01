const React = require('react'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
{ state, skills, projects } = require('../src/state.js'),
Reducer = require('../src/reducer.js'),
{ Root } = require('../views/custom.jsx');

state.skills = skills;
state.projects = projects;

var store = createStore(Reducer, state);

module.exports = function(){
	return <Provider store={store}><Root /></Provider>
}