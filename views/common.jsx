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

class Loader extends React.Component{
	constructor(props){
		super(props);
		this.state = { show:true };
		this.changeLink = this.changeLink.bind(this);
	}

	changeLink(){
		var links = document.querySelectorAll('link'),
		{ cssLink } = this,
		link,
		head = document.querySelector('head');

		Array.prototype.forEach.call(links,(link)=> {
			if(link.rel == 'stylesheet' && link.href.indexOf('common') == -1){
				head.removeChild(link);
			}
		});
		link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = cssLink;

		head.appendChild(link);
	}

	componentDidMount(){
		let { Status, setLoading, dispatch, currentTemplate } = this.props,
		{ title,cssLink, bundleSrc, loaderName } = this;

		if(!title || !cssLink || !bundleSrc || !loaderName){
			console.error("No title or link or bundleSrc, loaderName given",this);
			return 
		}

		document.title = title;

			if(!Status.getState()[`${loaderName}Loaded`]){
				console.log(loaderName,"not yet loaded, loading");
				var { protocol, host } = location,
				link = `${protocol}//${host}/${bundleSrc}`,
				xml = new XMLHttpRequest();
				xml.open('GET',link,true);
				if(this.onprogress){
					xml.onprogress = this.onprogress;
				}
				xml.onload = (event)=>{
					try{
						if(xml.status >= 200 && xml.status < 300){
							dispatch(setLoading({ template: ''}))
							eval(xml.response || xml.responseText);
							this.changeLink();
						}
						else{
							console.error("server returned bad status Code",xml.status);
							dispatch(setLoading({template:currentTemplate}))
						}
					}
					catch(e){
						console.error("Error while parsing macBbundle",e.name,e.message,e.stack);
						dispatch(setLoading({template:currentTemplate}));
					}
				}
				xml.onerror = (error)=>{
					dispatch(setLoading({template:currentTemplate}));
					console.error("Error while trying to load mac Template");
				}
				xml.send();
			}
			else{
				console.log(loaderName,'already loaded, sending message');
				setTimeout(()=>{
					this.changeLink();
					Status.setLoaded(loaderName);
					dispatch(setLoading({template:''}));
					console.log("Message sent",Status.getState());
				},1000)
			}
	}

	render(){
		return null;
	}
}

class MacLoading extends Loader{
	constructor(props){
		super(props);
		this.barRef = React.createRef();
		this.progressRef = React.createRef();
		this.title = 'Abel Kashoba - Mac Template';
		this.cssLink = 'css/mac/main.css';
		this.bundleSrc = 'dist/macBundle.js';
		this.loaderName = 'mac';

		this.onprogress = this.onprogress.bind(this);
	}

	onprogress(event){
		if(event.lengthComputable){
			this.progress.style.width = (event.loaded / event.total) * 100 + "%";
		}
	}

	componentDidMount(){
		this.bar = this.barRef.current;
		this.progress = this.progressRef.current;

		super.componentDidMount();
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

class WindowLoading extends Loader{
	constructor(props){
		super(props);
		this.title = 'Abel Kashoba - Window Template';
		this.cssLink = 'css/window/main.css';
		this.bundleSrc = 'dist/windowBundle.js';
		this.loaderName = 'window';
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

class CustomLoading extends Loader{
	constructor(props){
		super(props);
		this.title = 'Abel Kashoba - Custom Template';
		this.cssLink = 'css/custom/main.css';
		this.bundleSrc = 'dist/customBundle.js';
		this.loaderName = 'custom';
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

function Time(props){
	let [state,setState] = useState(new Date()),
	dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	minutes = state.getMinutes(),
	minutesString = (String(minutes).length > 1)? minutes: `0${minutes}`,
	dateString = `${dayName[state.getDay()]} ${state.getHours()}:${minutesString}`;

	useEffect(()=>{
		let seconds = 60 - state.getSeconds(),
		counter;

		setTimeout(()=>{
			setState(new Date());
			counter = setInterval(()=>{
				setState(new Date());
			},60000)
		},seconds);

		return ()=>{ clearInterval(counter) };
	},[true]) 
	return (
		<div id="time" className="il">
            <span>{dateString}</span>
        </div>
	)
}

exports.Loading = Loading;
exports.MovableItem = MovableItem;
exports.myTower = myTower;
exports.MacLoading = MacLoading;
exports.WindowLoading = WindowLoading;
exports.CustomLoading = CustomLoading;
exports.Time = Time;