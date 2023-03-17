const React = require('react'),
{ render } = require('react-dom'),
{ createStore } = require('redux'),
{ Provider } = require('react-redux'),
Reducer = require('../src/reducer.js'),
{ App } = require('../views/window.jsx'),
{ state, windowDock, windowKindImage } = require('../src/state.js'),
Status = require('../src/TemplateStatus.js');

var store;
state.DockItems = windowDock;
state.KindImg = windowKindImage;
state.loading = 'window';
Status.setLoaded('window');
console.log(Status.getState());

store = createStore(Reducer, state);

render(<Provider store={store}>
	<App Status={Status} />
	</Provider>, document.getElementById('window'));