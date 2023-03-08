const React = require('react'),
{ useEffect, useState } = React,
{ Loading, MovableItem, myTower, MacLoading, CustomLoading, Time } = require('./common.jsx'),
{ ReactReduxContext, useSelector, useDispatch } = require('react-redux'),
{ dockItemsSelector, desktopEntriesSelector, openFoldersSelector, kindImageSelector, openFramesSelector, openFilesSelector, loadingSelector } = require('../src/selector.js'),
{ moveObject, buttonsHandler } = require('../src/utilis.js'),
{ openFolder, closeFolder, minimizeFolder, openFrame, closeFrame, minimizeFrame, deminimizeFolder, deminimizeFrame, openFile, closeFile, minimizeFile, deminimizeFile, saveFile, setLoading } = require('../src/actionCreator.js');


function Root(props){
	return (
		<html>
			<head>
				<title>Abel Kashoba - Window Template</title>
			    <link rel="stylesheet" type="text/css" href="css/common.css"/>
			    <link rel="stylesheet" type="text/css" href="css/window/main.css"/>
			</head>
			<body>
				<App />
				<script src="dist/windowBundle.js"></script>
			</body>
		</html>
	)
}

function App(){
	let loading = useSelector(loadingSelector),
	LoadingComponent = null;

	if(loading == 'mac'){
		LoadingComponent = <MacLoading />
	}
	else if(loading == 'custom'){
		LoadingComponent = <CustomLoading />
	}

	useEffect(()=>{
		let body = document.body;
		body.onclick = function(event){
			myTower.publish('clear');
		}
	},[false])

	return (
		<>
			<Loading />
			<Header />
			<Desktop />
			{LoadingComponent}
		</>
	)
}

function Header(){
	return (
		<div id='header'>
			<WindowDash />
			<FastLink />
			<Time />
		</div>
	)
}

function WindowDash(){
	let [show,setState] = useState(false),
	whiteMicrosoft = `white${(show)? " whoosh":""}`,
	blueMicrosoft = `blue${(show)? "":" whoosh"}`;

	useEffect(()=>{
		myTower.subscribe('clear',()=>{
			setState(false);
		})
	},[false])

	return (
		<div id="window" className="il">
            <div className="icon" onClick={(event)=> { event.preventDefault(); event.nativeEvent.stopImmediatePropagation(); setState(!show)}}><img className={whiteMicrosoft} src="psd/microsoft.png" /><img className={blueMicrosoft} src="psd/microsoft-blue.png" /></div>
            <MenuAction show={show} />
        </div>
	)
}

function MenuAction({show}){
	let nodeClass = (show)? '':'whoosh';
	return (
		<div id="menuAction" className={nodeClass}>
			<User />
            <MenuActionSettings />
        </div>
	)
}

function User(){
	return (
		<div id="user">
            <div className="icon il"><img src="psd/user.png" /></div>
            <div className="name il">Abel Kashoba</div>
        </div>
	)
}

function PopularItems(){
	return (
		<div id="popular">
            <div className="title">
                <span>Popular Items</span>
            </div>
            {[{ src:'psd/win-folder.png', name:'Project' }, { src:'psd/txt-type.png', name:'Skills' }].map((x)=> <Popular {...x} key={x.name} />)}
         </div>
	)
}

function Popular({ src,name }){
	return (
		<div className="popular">
            <div className="icon il">
                <img src="psd/win-folder.png" />
            </div>
            <div className="name il">Project</div>
        </div>
	)
}

function MenuActionSettings(){
	let [showSub, setState] = useState(false),
	subClass = `sub${(showSub)? '':' whoosh'}`,
	dispatch = useDispatch();


	return (
		<div id="settings">
            <div className="setting">
                <div className="icon il vmid">
                    <img src="psd/settings.png" />
                </div>
                <div className="name il vmid">
                    <span>Change Template</span>
                </div><div className='tight vmid'></div>
                <div className='arrow il'>
                        <div onClick={(event)=>{ event.preventDefault(); event.nativeEvent.stopImmediatePropagation(); setState(!showSub); }} className='icon il vmid'>
                                <img src='psd/arrow-right.png' />
                        </div><div className='tight vmid'></div>
                        
                </div>
                <div className={subClass}>
                        <div className='set'>
                                <a href="?template=custom" className='il vmid' onClick={(event)=> { event.preventDefault(); event.stopPropagation(); dispatch(setLoading({ template:'custom' })); }}>Custom</a><div className='tight vmid'></div>
                        </div>
                        <div className='set'>
                                <a href="?template=mac" className='il vmid' onClick={(event)=>{ event.preventDefault(); event.stopPropagation(); dispatch(setLoading({ template:'mac' }));  }}>Mac</a><div className='tight vmid'></div>
                        </div>
                </div>
            </div>
        </div>
	)
}

function FastLink(){
	let dockItems = useSelector(dockItemsSelector),
	kindImages = useSelector(kindImageSelector);

	return (
		<div id='fastLink' className='il'>
			{dockItems.map((x)=> <Link {...x} key={x.src} kindImages={kindImages} />)}
		</div>
	)
}

class Link extends React.Component{
	constructor(props,context){
		super(props);
		this.state = { showIndicator:false };
		this.minimized = false;
		this.store = context.store;
		this.nodeRef = React.createRef();
		this.handleShowing = this.handleShowing.bind(this);
	}

	componentDidMount(){
		let store = this.store,
		{ src, kindImages, active } = this.props,
		kind;
		this.node = this.nodeRef.current;
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			OpenFolders = state.OpenFolders,
			OpenFiles = state.OpenFiles,
			OpenFrames = state.OpenFrames,
			{ showIndicator } = this.state;

			if(src == kindImages.folder.appSrc){
				this.handleShowing(OpenFolders);
			}
			else if(src == kindImages.html.appSrc){
				this.handleShowing(OpenFrames);
			}
			else if(src == kindImages.text.appSrc){
				this.handleShowing(OpenFiles);
			}
			else{
				throw Error("Unknow src for appSrc");
			}
		});

		switch(src){
			case kindImages.folder.appSrc:
				kind = 'folder';
				break;
			case kindImages.html.appSrc:
				kind = 'html';
				break;
			case kindImages.text.appSrc:
				kind = 'text';
				break;
			default:
				break;
		}

		this.node.onclick = (event)=>{
			let { src, kindImages } = this.props,
			{ showIndicator } = this.state,
			state = store.getState(),
			entry, length, entries;

			if(this.minimized){
				if(kind == 'folder'){
					state.OpenFolders.forEach((folder,i)=>{
						if(folder.minimized){
							store.dispatch(deminimizeFolder({id:i}))
						}
					})
					this.minimized = false;
				}
				else if(kind == 'html'){
					state.OpenFrames.forEach((frame,i)=>{
						if(frame.minimized){
							store.dispatch(deminimizeFrame({id:i}));
						}
					})
					this.minimized = false;
				}
				else if(kind == 'text'){
					state.OpenFiles.forEach((frame,i)=>{
						if(frame.minimized){
							store.dispatch(deminimizeFile({id:i}));
						}
					})
				}
				else{
					throw Error("uNhandler Things");
				}
			}
			
			if(!showIndicator){
				entries = state.Desktop.entries;
				length = entries.length;

				for(let i=0; i < length; i++){
					entry = entries[i];
					if(entry.kind == 'folder' && kind == 'folder'){
						return store.dispatch(openFolder({ desktopId:i, kind }));
					}
					else if(entry.kind == 'html' && kind == 'html'){
						return store.dispatch(openFrame({ name:entry.name, link: entry.link, kind }))
					}
					else if(entry.kind == 'text' && kind == 'text'){
						return store.dispatch(openFile({ name:entry.name, kind, text: entry.text }));
					}
				}
				if(kind == 'html'){
					return store.dispatch(openFrame({ name:'Unknow', link:'', kind }))
				}
			}



			event.preventDefault();
		}

		if(active && !this.showIndicator){
			this.setState({ showIndicator:true });
		}
	}

	handleShowing(data){
		let { showIndicator } = this.state;
		if(data.length){
			if(!showIndicator){
				this.setState({ showIndicator:true });
			}
			else if(data.some((folder)=> folder.minimized)){
				if(!this.minimized){
					this.minimized = true;
				}
			}
			else{
				if(this.minimized){
					this.minimized = false;
				}
			}
		}
		else{
			if(showIndicator){
				this.setState({ showIndicator:false })
			}
		}
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
		let { src } = this.props,
		{ showIndicator } = this.state,
		nodeClass = `link il${(showIndicator)? ' active':''}`;

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	                <div className="icon"><img src={src} /></div>
	        </div>
		)
	}
}
Link.contextType = ReactReduxContext;

function Desktop(){
	let desktopEntries = useSelector(desktopEntriesSelector),
	folders = useSelector(openFoldersSelector),
	frames = useSelector(openFramesSelector),
	files = useSelector(openFilesSelector),
	kindImages = useSelector(kindImageSelector),
	rap = true;

	useEffect(()=>{
		let node = document.getElementById('desktop');
		node.onclick = (event)=>{
			myTower.publish('clearDesktopItem');
		}
	},[rap])

	return (
		<div id="desktop">
			{desktopEntries.map((x,i)=> <DesktopItem id={i} {...x} key={x.name} kindImages={kindImages} />)}
			{folders.map((x,i)=> <Folder id={i} {...x} key={x.name} kindImages={kindImages} />)}
			{frames.map((x,i)=> <Edge id={i} {...x} key={x.name} />)}
			{files.map((x,i)=> <Notepad id={i} {...x} key={x.name} />)}
	    </div>
	)
}

class DesktopItem extends React.Component{
	constructor(props,context){
		super(props);
		this.store = context.store;
		this.iconRef = React.createRef();
		this.wrapRef = React.createRef();
		this.state = { active:false };
	}

	componentDidMount(){
		let store = this.store,
		{ kind, name, text } = this.props;
		this.icon = this.iconRef.current;
		this.wrapper = this.wrapRef.current;
		this.subId = myTower.subscribe('clearDesktopItem',(node)=>{
			if(node != this.wrapper && this.state.active){
				this.setState({ active:false });
			}
		})

		moveObject(this.icon,this.wrapper);

		this.icon.ondblclick = (event)=>{
			if(kind == 'folder'){
				store.dispatch(openFolder({ desktopId: this.props.id, kind }));
			}
			else if(kind == 'text'){
				store.dispatch(openFile({ name, kind ,text: this.props.text }));
			}
			if(this.state.active){
				this.setState({ active:false });
			}
			event.preventDefault();
		}
		this.icon.onclick = (event)=>{
			let { active } = this.state;

			if(!active){
				this.setState({ active:true });
				myTower.publish('clearDesktopItem',this.wrapper);
			}
			event.preventDefault();
			event.stopPropagation();
		}
	}

	componentWillUnmount(){
		myTower.unsubscribe('clearDesktopItem',this.subId);
	}

	render(){
		let { name, id, kind, kindImages } = this.props,
		{ active } = this.state,
		wrapClass = `wrapper${(active)? ' active':''}`;

		return (
			<div className="item il">
	            <div ref={this.wrapRef} className={wrapClass}>
	                <div ref={this.iconRef} className="icon">
	                    <img src={kindImages[kind].src} />
	                </div>
	                <div className="name">
	                    <span>{name}</span>
	                </div>
	            </div>
	        </div>
		)
	}
}
DesktopItem.contextType = ReactReduxContext;

class Folder extends MovableItem{
	constructor(props,context){
		super(props);
		this.store = context.store;
	}

	componentDidMount(){
		let store = this.store,
		{ id } = this.props;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height,10);
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			{ show } = this.state,
			folder = state.OpenFolders[id];

			if(folder){
				if(folder.minimized && show){
					this.setState({ show:false })
				}
				else if(!folder.minimized && !show){
					this.setState({ show:true });
				}
			}
			else{
				throw Error(`folder with id ${id} is not an OpenFolder`)
			}
		});
		super.componentDidMount();

		this.head.onclick = buttonsHandler({
			closeAction: ()=>{
				this.unsubscribe();
				store.dispatch(closeFolder({id}));
			},
			minimizeAction: ()=>{
				store.dispatch(minimizeFolder({id}));
			}
		}).bind(this);

		this.node.onclick = (event)=>{
			super.nodeClickHandler(event);
			myTower.publish('clearContentFolder');
		}
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { entries, name, kindImages } = this.props,
		{ show, fullscreen } = this.state,
		nodeClass = `folder il box${(show)? '':' whoosh'} ${(fullscreen)? 'full':''}`;

		return (
			<div ref={this.nodeRef} className={nodeClass}>
		        <div ref={this.headRef} className="head">
		            <div className="title il">
		                <div className="icon il">
		                    <img src={kindImages.folder.src} />
		                </div>
		                <div className="name il">
		                    <span>{name}</span>
		                </div>
		            </div>
		            <Buttons />
		        </div>
		        <div className="content">
					{entries.map((x)=> <ContentItem key={x.name} {...x} kindImages={kindImages} />)}
		        </div>
		    </div>
		)
	}
}
Folder.contextType = ReactReduxContext;

class ContentItem extends React.Component{
	constructor(props,context){
		super(props);
		this.nodeRef = React.createRef();
		this.store = context.store;
		this.state = { active:false };
	}

	componentDidMount(){
		let  { kind, name, link, text } = this.props,
		store = this.store;
		this.node = this.nodeRef.current;
		this.subId = myTower.subscribe('clearContentFolder',(node)=>{
			if(this.node != node && this.state.active){
				this.setState({ active:false })
			}
		})

		this.node.ondblclick = (event)=>{
			if(kind == 'html'){
				store.dispatch(openFrame({ link, name, kind }));
			}
			else{
				throw Error("Unknwon kind",kind);
			}

			if(this.state.active){
				this.setState({ active:false })
			}
		}
		this.node.onclick = (event)=>{
			if(!this.state.active){
				this.setState({ active:true });
				myTower.publish('clearContentFolder',this.node);
			}

			event.preventDefault();
			event.stopPropagation();
		}
	}

	render(){
		let { name, kind, kindImages } = this.props,
		{ active } = this.state,
		nodeClass = `cont${(active)? ' active':''}`;
		return (
			<div ref={this.nodeRef} className={nodeClass}>
		        <div className="icon il">
		            <img src={kindImages[kind].src} />
		        </div>
		        <div className="name il">
		           	<span>{name}</span>
		        </div>
		    </div>
		)
	}
}
ContentItem.contextType = ReactReduxContext;


class Edge extends MovableItem{
	constructor(props,context){
		super(props);
		this.store = context.store;
		this.inputRef = React.createRef();
		this.frameRef = React.createRef();
	}

	componentDidMount(){
		let store = this.store,
		{ id, link, kind } = this.props;
		this.input = this.inputRef.current,
		this.frame = this.frameRef.current;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height,10);
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			{ show } = this.state,
			OpenFrames = state.OpenFrames,
			data = OpenFrames[id];

			if(data.minimized && show){
				this.setState({ show:false })
			}
			else if(!data.minimized && !show){
				this.setState({ show:true })
			}
		})
		super.componentDidMount();

		this.head.onclick = buttonsHandler({
			closeAction:()=>{
				this.unsubscribe();
				store.dispatch(closeFrame({link, kind}));
			},
			minimizeAction:()=>{
				store.dispatch(minimizeFrame({id}));
			}
		}).bind(this);

		this.node.onclick = (event)=>{
			super.nodeClickHandler(event);
		}

		this.node.onclick = (event)=>{
			super.nodeClickHandler(event);
		}
		this.input.onchange = (event)=>{
			this.frame.src = this.input.value; 
		}
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { name, link } = this.props,
		{ show, fullscreen } = this.state,
		nodeClass = `edge il box${(show)? '':' whoosh'} ${(fullscreen)? 'full':''} ${(fullscreen)? 'full':''}`;

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <div className="tab il">
	                    <div className="name il">
	                        <span>{name}</span>
	                    </div>
	                    <div className='tight'></div>
	                </div>
	                <div className="buttons">
	                    <div className="action slut il">
	                        <img className='minimize' src="psd/minimize-white.png" />
	                    </div>
	                    <div className="action slut il">
	                        <img className='fullscreen' src="psd/maximize-white.png" />
	                    </div>
	                     <div className="action slut closeBut il">
	                        <img className='close' src="psd/close-white.png" />
	                    </div>
	                </div>
	            </div>
	            <div className='navigation'>
	                <input ref={this.inputRef} type='text' />
	            </div>
	            <div className="frame">
	                <iframe ref={this.frameRef} src={link}></iframe>
	            </div>
	        </div>
		)
	}
}
Edge.contextType = ReactReduxContext;

class Notepad extends MovableItem{
	constructor(props, context){
		super(props);
		this.store = context.store;
		this.textareaRef = React.createRef();
	}

	componentDidMount(){
		let store = this.store,
		{ id, text, kind, name } = this.props;
		this.textarea = this.textareaRef.current;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height,10);
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			OpenFiles = state.OpenFiles,
			data = OpenFiles[id],
			{ show } = this.state;

			if(data.minimized && show){
				this.setState({ show:false })
			}
			else if(!data.minimized && !show){
				this.setState({ show:true })
			}
		})
		
		super.componentDidMount();

		this.head.onclick = buttonsHandler({
			closeAction:()=>{ 
				this.unsubscribe();
				store.dispatch(closeFile({id, kind})) 
			},
			minimizeAction:()=> {
				store.dispatch(minimizeFile({id}));
			}
		}).bind(this);

		this.node.onclick = (event)=>{
			let target = event.target,
			className = target.className,
			text = this.textarea.value;

			super.nodeClickHandler(event);

			if(className.indexOf('save') != -1){
				store.dispatch(saveFile({id, name, text}))
			}
			else if(className.indexOf('close') != -1){
				this.unsubscribe();
				store.dispatch(closeFile({id, kind}));
			}
		}
		this.textarea.value = text;
	}
	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { name, text } = this.props,
		{ show, fullscreen } = this.state,
		nodeClass = `notepad il box${(show)?'':' whoosh'} ${(fullscreen)? 'full':''} ${(fullscreen)? 'full':''}`;

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <div className="title il">
	                    <div className="icon il">
	                        <img src="psd/notepad.png" />
	                    </div>
	                    <div className="name il">
	                        <span>{name}</span><span> - Notepad</span>
	                    </div>
	                </div>
	                <OptionsTools />
	                <div className="buttons">
	                    <div className="action slut il">
	                        <img className='minimize' src="psd/minimize.png" />
	                    </div>
	                    <div className="action slut il">
	                        <img className='fullscreen' src="psd/maximize.png" />
	                    </div>
	                     <div className="action slut closeBut il">
	                        <img className='close' src="psd/close.png" />
	                    </div>
	                </div>
	            </div>
	            <div className="content">
	                <textarea ref={this.textareaRef}></textarea>
	            </div>
	        </div>
		)
	}
}
Notepad.contextType = ReactReduxContext;

class OptionsTools extends React.Component{
	constructor(props){
		super(props);
		this.state = { showContext:false };
		this.saveRef = React.createRef();
	}

	componentDidMount(){
		this.save = this.saveRef.current;
		this.unset = ()=>{
			if(this.state.showContext){
				this.setState({ showContext:false });
			}
		}
		this.subId = myTower.subscribe('newLeaderView', this.unset);
		this.subId2 = myTower.subscribe('clearDesktopItem', this.unset);
		this.save.onclick = (event)=>{
			let { showContext } = this.state;

			this.setState({ showContext: !showContext })

			event.preventDefault();
			event.stopPropagation();
		}
	}

	componentWillUnmount(){
		myTower.unsubscribe('newLeaderView',this.subId);
		myTower.unsubscribe('clearDesktopItem',this.subId2);
	}

	render(){
		let { showContext } = this.state,
		contextClass = `contextmenu il${(showContext)? '':' whoosh'}`;

		return (
			<div className='options'>
			    <div className='opt il'>
			        <span ref={this.saveRef}>File</span>
			        <div className={contextClass}>
			            <div className="list save">
			                <span className='save'>save</span>
			            </div>
			            <div className="list close">
			                <span className='close'>close</span>
			            </div>
			        </div>
			    </div>
			</div>
		)
	}
}

function ContextMenu(){
	return (
		<div className="contextmenu il whoosh">
	        <div className="list">
	            <span>Open</span>
	        </div>
	        <div className="list">
	            <span>Rename</span>
	        </div>
	        <div className="list">
	            <span>Contact me</span>
	        </div>
	    </div>
	)
}

function Buttons(){
	return (
		<div className="buttons">
            <div className="action slut il">
                <img className='minimize' src="psd/minimize.png" />
            </div>
            <div className="action slut il">
                <img className='fullscreen' src="psd/maximize.png" />
            </div>
            <div className="action slut closeBut il">
               	<img className='close' src="psd/close.png" />
            </div>
        </div>
	)
}

exports.Root = Root;
exports.App = App;