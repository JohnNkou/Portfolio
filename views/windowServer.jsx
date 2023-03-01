const React = require('react'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
{ Root } = require('../views/window.jsx'),
{ state, windowDock, windowKindImage } = require('../src/state.js'),
Reducer = require('../src/reducer.js');

var store;

state.DockItems = windowDock;
state.KindImg = windowKindImage;

store = createStore(Reducer,state);

module.exports = function(props){
	return <Provider store={store}>
		<Root />
	</Provider>
}