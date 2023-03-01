const React = require('react'),
{ render } = require('react-dom'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
Reducer = require('../src/reducer.js'),
{ App } = require('../views/window.jsx'),
{ state, windowDock, windowKindImage } = require('../src/state.js');

var store;
state.DockItems = windowDock;
state.KindImg = windowKindImage;

store = createStore(Reducer, state);

render(<Provider store={store}>
	<App />
	</Provider>, document.body);