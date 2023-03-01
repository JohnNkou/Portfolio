const React = require('react'),
{ unmountComponentAtNode } = require('react-dom'),
{ useEffect, useState } = require('react'),
{ ReactReduxContext } = require('react-redux'),
{ moveObject, animate, setLeaderView, Tower } = require('../src/utilis.js');

let myTower = new Tower();

function Loading(props){
	var [show, setState] = useState(true),
	loadClass = (show)? '':'whoosh';

	useEffect(()=>{
		setState(false);
	},[show]);

	return (
		<div id='loading' className={loadClass}>
        <img src='psd/loading-circle.gif' /><div className='tight'></div>
    </div>
	)
}

class MovableItem extends React.Component{
	constructor(props,context){
		super(props);

		this.nodeRef = React.createRef();
		this.headRef = React.createRef();
		this.animate = animate.bind(this);
		this.state = { show: true, fullscreen:false };
		this.setLeaderView = setLeaderView.bind(this);
		this.nodeClickHandler = this.nodeClickHandler.bind(this);
	}

	componentDidMount(){
		this.node = this.nodeRef.current;
		this.head = this.headRef.current;
		this.gcp = getComputedStyle(this.node);
		this.subId = myTower.subscribe('newLeaderView',(node)=>{
			if(this.node != node){
				this.node.style.zIndex = 0;
			}
		})

		moveObject(this.head,this.node);
		this.setLeaderView(this.store,myTower);
	}

	nodeClickHandler(event){
		this.setLeaderView(this.store,myTower);
		event.preventDefault();
		event.stopPropagation();
	}

	 componentWillUnmount(){
	 	myTower.unsubscribe('newLeaderView',this.subId);
	 	this.node.onclick = this.head.onclick = null;
	 }

	 render(){
	 	return null;
	 }
}

class MacLoading extends React.Component{
	constructor(props){
		super(props);
		this.barRef = React.createRef();
		this.progressRef = React.createRef();
	}

	componentDidMount(){
		this.bar = this.barRef.current;
		this.progress = this.progressRef.current;

		var xml = new XMLHttpRequest(),
		links = document.querySelectorAll('link'),
		toChange = Array.prototype.filter.call(links,(link)=> link.href.indexOf('common') == -1)[0];
		toChange.href = 'css/mac/main.css';

		if(toChange){
			xml.open('GET','dist/macBundle.js',true);
			xml.onprogress = (event)=>{
				if(event.lengthComputable){
					this.progress.style.width = (event.loaded / event.total) * 100 + "%";
				}
			}
			xml.onload = (event)=>{
				if(xml.status >= 200 && xml.status < 300){
					unmountComponentAtNode(document.body);
					eval(xml.response || xml.responseText);
				}
				else{
					throw Error(xml.response || xml.responseText);
				}
			}
			xml.send();
		}
		else{
			throw Error("Links not found");
		}
	}

	render(){
		return (
			<div id='macLoading'>
                <div className='first il vmid'>
                        <div className='icon'>
                                <img src='psd/big-apple.png' />
                        </div>
                        <div ref={this.barRef} className='bar'>
                                        <span ref={this.progressRef} className='progress'></span>
                        </div>
                </div><div className='tight vmid'></div>
        	</div>
		)
	}
}

class WindowLoading extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var xml = new XMLHttpRequest(),
		links = document.querySelectorAll('link'),
		toChange = Array.prototype.filter.call(links,(link)=> link.href.indexOf('common') == -1)[0];
		toChange.href = 'css/window/main.css';

		if(toChange){
			xml.open('GET','dist/windowBundle.js',true);
			xml.onload = (event)=>{
				if(xml.status >= 200 && xml.status < 300){
					unmountComponentAtNode(document.body);
					eval(xml.response || xml.responseText);
				}
				else{
					throw Error(xml.response || xml.responseText);
				}
			}
			xml.send();
		}
		else{
			throw Error("Links not found");
		}
	}

	render(){
		return (
			<div id='windowLoading'>
                <div className='first il vmid'>
                        <div className='icon'>
                                <img src='psd/big-window.png' />
                        </div>
                        <div className='animation'>
                                <div className='circle'>
                                        <img src='' />
                                </div>
                                <div className='info'>
                                        Loading data
                                </div>
                        </div>
                </div><div className='tight vmid'></div>
        	</div>
		)
	}
}

class CustomLoading extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var xml = new XMLHttpRequest(),
		links = document.querySelectorAll('link'),
		toChange = Array.prototype.filter.call(links,(link)=> link.href.indexOf('common') == -1)[0];
		toChange.href = 'css/custom/main.css';

		if(toChange){
			xml.open('GET','dist/customBundle.js',true);
			xml.onload = (event)=>{
				if(xml.status >= 200 && xml.status < 300){
					unmountComponentAtNode(document.body);
					eval(xml.response || xml.responseText);
				}
				else{
					throw Error(xml.response || xml.responseText);
				}
			}
			xml.send();
		}
		else{
			throw Error("Links not found");
		}
	}

	render(){
		return (
			<div id='customLoading'>
		        <div className='wrapper il vmid'>
		            <div className='il'>
		                <img src="psd/custom_loading.gif" />
		            </div>
		            <div className='status'>
		                <span>Loading</span>
		            </div>
		        </div><div className='tight vmid'></div>
		    </div>
		)
	}
}

exports.Loading = Loading;
exports.MovableItem = MovableItem;
exports.myTower = myTower;
exports.MacLoading = MacLoading;
exports.WindowLoading = WindowLoading;
exports.CustomLoading = CustomLoading;