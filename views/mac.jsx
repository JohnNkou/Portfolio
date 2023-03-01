const React = require('react'),
{ useEffect, useState } = React,
{ Loading, MovableItem, myTower, WindowLoading, CustomLoading } = require('./common.jsx'),
{ moveObject, Tower, animate, buttonsHandler, setLeaderView } = require('../src/utilis.js'),
{ useSelector, useDispatch, ReactReduxContext } = require('react-redux'),
{ addEntry, removeEntry, openFolder, closeFolder, minimizeFolder, deminimizeFolder, openFrame, closeFrame, minimizeFrame, deminimizeFrame, closeFile, minimizeFile, openFile, deminimizeFile, setLeadApp, saveFile, setAboutInView, setLoading } = require('../src/actionCreator.js'),
{ desktopEntriesSelector, openFoldersSelector, dockItemsSelector, openFramesSelector, openFilesSelector, kindImageSelector, leadAppSelector, aboutInViewSelector, loadingSelector  } = require('../src/selector.js');

function Root(props){
	return (
		<html>
			<head>
				<link rel='stylesheet' href='css/mac/main.css' />
				<link rel='stylesheet' href='css/common.css' />
			</head>
			<body>
				<App />
				<script src='dist/macBundle.js'></script>
			</body>
		</html>
	)
}

function App(props){
	let mounted = false,
	loading = useSelector(loadingSelector),
	LoadingComponent = null;

	if(loading == 'window'){
		LoadingComponent = <WindowLoading />
	}
	else if(loading == 'custom'){
		LoadingComponent = <CustomLoading />
	}

	useEffect(()=>{
		let body = document.body;
		body.onclick = function(event){
			myTower.publish('clear');
		}

		return ()=>{
			body.onclick = null;
		}
	},[mounted])
	return (
		<>
			<Loading />
			<Header />
			<Desktop />
			<DockItems />
			{LoadingComponent}
		</>
	)
}

function Header(props){
	return (
		<div id='header'>
			<Apple />
			<AppName />
			<MenuAction />
			<Time />
		</div>
	)
}

function Apple(props){
	let [show,setState] = useState(false),
	menuClass = `menu${(show)? '': ' whoosh'}`,
	iconClass = `icon${(show)?' active':''}`,
	aboutInView = useSelector(aboutInViewSelector),
	dispatch = useDispatch(),
	appleBlackClass = (show)? 'whoosh':'',
	appleBlueClass = (show)? '':'whoosh';

	return (
		<div id="apple" className="il">
            <div className={iconClass}><a href="#" onClick={(event)=> { event.preventDefault(); setState(!show)}}><img className={appleBlackClass} src="psd/apple.png" /><img className={appleBlueClass} src="psd/apple-white.png" /></a></div>
            <div className={menuClass}>
                <div className="menuText">
                    <span onClick={()=>{
                    	if(!aboutInView){
                    		dispatch(setAboutInView({display:true}))
                    	}
                    }}>About Me</span>
                </div>
                <div className="menuText">
                    <span>Change template</span><img src='psd/next.png' />
                    <div className='menu'>
                        <div className='menuText'>
                            <a href="?template=window" onClick={(event)=>{ event.preventDefault(); event.stopPropagation(); dispatch(setLoading({ template:'window' })) }}>Windows</a>
                        </div>
                        <div className='menuText'>
                            <a href="?template=custom" onClick={(event)=> { event.preventDefault(); event.stopPropagation(); dispatch(setLoading({ template:'custom' })) }}>Custom</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

function AppName(props){
	let MenuAction,
	appDetails = useSelector(leadAppSelector),
	[show, setState] = useState(false);

	if(appDetails.kind == 'folder'){
		MenuAction = <FolderAction show={show} />;
	}
	else if(appDetails.kind == 'text'){
		MenuAction = <FileAction show={show} />;
	}
	else{
		MenuAction = null
	}

	return (
		<div id='app' className='il'>
            <div className='wrap'><span className='vmid' onClick={()=> setState(!show)} className='appName'>{appDetails.name}</span><div className='tight vmid'></div></div>
            {MenuAction}
        </div>
	)
}

function FolderAction({show}){
	let folders = useSelector(openFoldersSelector),
	showClose = folders.length && true,
	closeClass = (showClose)? 'menuText':'menuText whoosh',
	dispatch = useDispatch(),
	nodeClass = `menu${(show)? '':' whoosh'}`

	return (
		<div className={nodeClass}>
            <div className={closeClass}>
                <span onClick={(event)=>{
                	folders.forEach((x,id)=>{
                		dispatch(closeFolder({id}))
                	})
                }} >Close</span>
            </div>
        </div>
	)
}

function FileAction({show}){
	let files = useSelector(openFilesSelector),
	dispatch = useDispatch(),
	nodeClass = `menu${(show)? '':' whoosh'}`

	return (
		<div className={nodeClass}>
			<div className='menuText'>
				<span onClick={()=>{
					files.forEach((file,id)=>{
						dispatch(closeFile({id}));
					})
				}}>Close</span>
			</div>
		</div>
	)
}

function FileMenuAction(){
	let [state,setState] = useState({active:false, payload:{}}),
	active = state.active,
	payload = state.payload,
	dispatch = useDispatch(),
	nameClass = `name${(active)? ' active':''}`,
	menuClass = `menu${(active)? '': ' whoosh'}`;

	useEffect(()=>{
		let subId = myTower.subscribe('CURRENT FILE',(payload)=>{
			setState({payload, active});
		});
		myTower.publish('FileMenuMounted');

		return ()=> myTower.unsubscribe('CURRENT FILE',subId);
	},[true])

	return (
		<div id='menuAction' className='il'>
			<div onClick={()=> setState({ active:!active, payload })} className={nameClass}>
				<span className='vmid'>File</span><div className='tight vmid'></div>
			</div>
			<div className={menuClass}>
				<div className='menuText' onClick={()=> dispatch(saveFile(payload))}>
					<span>Save</span>
				</div>
			</div>
		</div>
	)
}

function MenuAction(props){
	let appDetails = useSelector(leadAppSelector),
	ToolsAction;

	if(appDetails.kind == 'text'){
		ToolsAction = <FileMenuAction />;
	}
	else{
		ToolsAction = null;
	}

	return ToolsAction;
}

function Time(props){
	return (
		<div id="time" className="il">
            <span>Fri 10:35Am</span>
        </div>
	)
}

function Desktop(props){
	let folders = useSelector(openFoldersSelector),
	frames = useSelector(openFramesSelector),
	files = useSelector(openFilesSelector),
	kindImages = useSelector(kindImageSelector);

	return (
		<div id='desktop'>
			<List kindImages={kindImages} />
			{folders.map((x,i)=>{
				return <Folder id={i} {...x} key={x.name} kindImages={kindImages} />
			})}
			{frames.map((x,i)=>{
				return <Safari id={i} {...x} key={x.link} />
			})}
			{files.map((x,i)=>{
				return <SublimeText id={i} {...x} key={x.name} />
			})}
			<About />
			<ContextMenu />
		</div>
	)
}

function List({kindImages}){
	let entries = useSelector(desktopEntriesSelector);

	return (
		<div className='desktopItems'>
			{entries.map((o,i)=>{
				return (
					<DesktopItem id={i} {...o} key={i} kindImages={kindImages} />
				)
			})}
		</div>
	)
}

class DesktopItem extends React.Component{
	constructor(props, context){
		super(props);

		this.wrapRef = React.createRef();
		this.iconRef = React.createRef();
		this.state = { active:false };
		this.store = context.store; console.log('context is',context);
	}

	componentDidMount(){
		this.wrap = this.wrapRef.current;
		this.icon = this.iconRef.current;
		this.subId = myTower.subscribe('clear',()=>{
			let { active } = this.state;

			if(active){
				this.setState({ unactive:true });
			}
		})

		moveObject(this.icon, this.wrap);

		this.icon.onclick = (event)=>{
			event.preventDefault();
			event.stopPropagation();

			myTower.publish('clear');

			let { unactive } = this.state;

			if(unactive === undefined){
				this.setState({ active:true});
			}
			else{
				this.setState({ unactive:false })
			}
		}
		this.icon.ondblclick = (event)=>{
			let { src, name, id, kind, text } = this.props;

			if(kind == 'folder')
				this.store.dispatch(openFolder({ desktopId: id }))
			else if(kind == 'text'){
				this.store.dispatch(openFile({ name, text, kind }))
			}
		}
	}

	componentWillUnmount(){
		myTower.unsubscribe('clear',this.subId);
	}

	render(){
		let { props, state } = this, 
		{ kind, name, kindImages } = props,
		{ active, unactive } = state,
		wrapClass = `wrapper${(active)?' active':''}${(unactive)?' unactive':''}`;

		return (
			<div className='item il'>
				<div ref={this.wrapRef} className={wrapClass}>
					<div ref={this.iconRef} className='icon'><img src={kindImages[kind].src} /></div>
					<div className='text'><span>{name}</span></div>
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
		super.componentDidMount();

		let store = this.store,
		self = this,
		{ id, kind } = this.props;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height);
		this.unsubscribe = store.subscribe(()=>{
			let state = this.store.getState(),
			id = this.props.id,
			openFolder = state.OpenFolders,
			thisFolder = openFolder[id];

			if(thisFolder && !thisFolder.minimized && !this.state.show){
				this.node.style.width = this.gcp.width;
				this.setState({ show: true });
			}
		})

		this.head.onclick = buttonsHandler({
			closeAction:()=>{
				store.dispatch(closeFolder({id}));
			},
			minimizeAction:()=>{
				store.dispatch(minimizeFolder({id}));
			},
			otherAction:()=> this.setLeaderView(store,myTower)
		}).bind(this);

		this.node.onclick = (event)=>{
			let state = store.getState();

			super.nodeClickHandler(event);
			myTower.publish('clearContent');

			if(state.leadApp.kind != kind){
				store.dispatch(setLeadApp({ kind }))
			}
		}
		this.setLeaderView(store,myTower);
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { props, state } = this,
		{ show, fullscreen } = state,
		{entries, kindImages, name} = props,
		nodeClass = `folder il box${(show)?'':' whoosh'} ${(fullscreen)?'full':''}`

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <Buttons />
	                <div className="currentFolder">
	                    <div className="icon il"><img src={kindImages.folder.src}/></div>
	                    <div className="name il">{name}</div>
	                </div>
	            </div>
	            <div className="content">
	            	{entries.map((s,i)=>{
	            		return <ContentItem {...s} key={i} kindImages={kindImages} />
	            	})}
	                
	            </div>
	            <div className="bottom"></div>
	        </div>
		)
	}
}
Folder.contextType = ReactReduxContext;

class ContentItem extends React.Component{
	constructor(props,context){
		super(props);
		this.state = { active: false };
		this.nodeRef = React.createRef();
		this.store = context.store;
	}

	componentDidMount(){
		let store = this.store;
		this.node = this.nodeRef.current;
		this.subId = myTower.subscribe('clearContent',(node)=>{
			if(node != this.node){
				let { active } = this.state;

				if(active){
					this.setState({ active:false });
				}
			}
		})

		this.node.onclick = (event)=>{
			event.preventDefault();
			event.stopPropagation();
			let { active } = this.state;

			myTower.publish('clearContent',this.node)

			if(!active){
				this.setState({ active:true });
			}
		}
		this.node.ondblclick = (event)=>{
			let { link, name } = this.props;

			if(link){
				store.dispatch(openFrame({ link, name }));
			}

			event.preventDefault();
			event.stopPropagation();
		}
	}

	render(){
		let { kind,name, kindImages } = this.props, 
		{ active } = this.state,
		listClass = `list${(active)? ' active':''}`;

		return (
			<div ref={this.nodeRef} className={listClass}>
		        <div className='icon il'>
		            <img src={kindImages[kind].src} />
		        </div>
		        <div className='name il'>{name}</div>
		    </div>
		)
	}
}
ContentItem.contextType = ReactReduxContext;

class Safari extends MovableItem{
	constructor(props,context){
		super(props);

		this.inputRef = React.createRef();
		this.frameRef = React.createRef();
		this.store = context.store;
	}

	componentDidMount(){
		super.componentDidMount();

		let store = this.store,
		self = this,
		{ id,src, link } = this.props
		this.input = this.inputRef.current;
		this.frame = this.frameRef.current;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height, 10);
		this.gcp = getComputedStyle(this.node);
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			{ show } = this.state,
			OpenFrames = state.OpenFrames,
			frame = OpenFrames[id];

			if(OpenFrames.length){
				if(frame){
					if(!frame.minimized && !show){
						this.setState({ show:true });
					}
				}
				else{
					console.error(OpenFrames,id);
				}
			}
		})

		this.head.onclick = buttonsHandler({
			closeAction:()=>{
				this.unsubscribe();
				store.dispatch(closeFrame({link}));
			},
			minimizeAction:()=>{
				store.dispatch(minimizeFrame({id}));
			},
			otherAction: ()=> this.setLeaderView(store,myTower)
		}).bind(this);

		this.node.onclick = (event)=> {
			let state = store.getState();

			super.nodeClickHandler(event);

			if(state.leadApp.kind != 'html'){
				store.dispatch(setLeadApp({ kind:'html' }));
			}
		};

		this.input.onchange = (event)=>{
			this.frame.src = this.input.value;
		}
		this.setLeaderView(store,myTower);
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { link } = this.props,
		{ show, fullscreen } = this.state,
		nodeClass = `safari il box${(show)? '':' whoosh'} ${(fullscreen)? 'full':''}`;

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <Buttons />
	                <div className="url">
	                    <input ref={this.inputRef} type='text' placeholder={link} />
	                </div>
	            </div>
	            <div className='frame'>
	            	<iframe ref={this.frameRef} src={link} />
	            </div>
	            <div className="bottom"></div>
	        </div>
		)
	}
}
Safari.contextType = ReactReduxContext;

class SublimeText extends MovableItem{
	constructor(props,context){
		super(props);
		this.store = context.store;
		this.textareaRef = React.createRef();
	}

	componentDidMount(){
		super.componentDidMount();

		let store = this.store,
		{ id, name, text, kind } = this.props;
		this.textarea = this.textareaRef.current;
		this.header = document.getElementById('header');
		this.headerHeight = parseInt(getComputedStyle(this.header).height, 10);
		this.subId2 = myTower.subscribe('FileMenuMounted',()=>{
			myTower.unsubscribe('FileMenuMounted',this.subId2);
			myTower.publish('CURRENT FILE', { id,name,text,kind });
		})
		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			{ show } = this.state,
			OpenFiles = state.OpenFiles,
			file = OpenFiles[id];

			if(file){
				if(!file.minimized && !show){
					this.setState({ show:true })
				}
			}
			else{
				console.error(OpenFiles,id);
			}
		});

		this.head.onclick = buttonsHandler({
			closeAction:()=>{
				this.unsubscribe();
				store.dispatch(closeFile({ id }))
			}, 
			minimizeAction:()=>{
				store.dispatch(minimizeFile({id}));
			},
			otherAction: ()=> this.setLeaderView(store,myTower)
		}).bind(this);

		this.node.onclick = (event)=> {
			let state = store.getState(),
			{ kind, id, name, text } = this.props;

			super.nodeClickHandler(event);

			if(state.leadApp.kind != kind){
				store.dispatch(setLeadApp({kind}));
			}

			myTower.publish('CURRENT FILE',{ id, name, text, kind });
		}
		this.textarea.value = text;
		this.textarea.onchange = (event)=>{
			let { kind, id, name, text } = this.props;

			myTower.publish('CURRENT FILE', { id, name, text: this.textarea.value, kind });
		}
		this.setLeaderView(store,myTower); console.log('publish');
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	render(){
		let { name, text } = this.props,
		{ show, fullscreen } = this.state,
		nodeClass = `sublimeText il box${(show)? '':' whoosh'} ${(fullscreen)? 'full':''}`

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <Buttons />
	                <div className='fileName'>
	                    <span>{name}</span>
	                </div>
	            </div>
	            <div className="content">
	                <textarea ref={this.textareaRef}></textarea>
	            </div>
	            <div className="bottom"></div>
	        </div>
		)
	}
}
SublimeText.contextType = ReactReduxContext;

function Buttons(){
	return (
		<div className="buttons">
		    <div className='icon il'>
		        <img className='close' src='psd/mac-close.png' />
		    </div>
		    <div className='icon il'>
		        <img className='minimize' src='psd/mac-minimize.png' />
		    </div>
		    <div className='icon il'>
		        <img className='fullscreen' src='psd/mac-full-screen.png' />
		    </div>
	     </div>
	)
}

function ContextMenu(props){
	return (
		<div className='contextMenu menu whoosh'>
			{[{ text:'New Folder' }, { text:'New Tact' }, { text:'New Grace' }].map(({text},i)=>{
				return (
					<div key={i} className='menuText'>
						<span>{text}</span>
					</div>
				)
			})}
		</div>
	)
}

function DockItems(props){
	let docks = useSelector(dockItemsSelector),
	kindImages = useSelector(kindImageSelector);
	return (
		<div id='docker'>
			<div className='il dockWrap'>
				{docks.map((o,i)=>{
					return <Dock {...o} key={i} kindImages={kindImages} />
				})}
			</div>
		</div>
	)
}

class Dock extends React.Component{
	constructor(props,context){
		super(props);

		this.state = { showIndicator:false };
		this.store = context.store;
		this.minimized = false;
		this.nodeRef = React.createRef();
		this.ids = [];
	}

	componentDidMount(){
		this.node = this.nodeRef.current;
		this.unsubscribe = this.store.subscribe(()=>{
			let state = this.store.getState(),
			{ showIndicator } = this.state,
			{ src, kindImages } = this.props,
			data;

			if(src == kindImages.folder.appSrc){
				if(state.OpenFolders.length){
					data = state.OpenFolders[0];
					this.ids = [0];

					if(!showIndicator){
						this.setState({showIndicator:true});
					}
					if(!this.minimized && data.minimized){
						this.minimized = true;
					}
				}
				else{
					if(showIndicator){
						this.setState({ showIndicator:false });
					}
					this.ids = [];
				} 
			}
			else if(src == kindImages.html.appSrc){
				if(state.OpenFrames.length){
					if(this.ids.length != state.OpenFrames.length){
						this.ids = state.OpenFrames.map((x,i)=> i);
					}
					if(!showIndicator){
						this.setState({ showIndicator:true })
					}
					else if(state.OpenFrames.some((frame)=> frame.minimized)){
						if(!this.minimized){
							this.minimized = true;
						}
					}
					else if(this.minimized){
						this.minimized = false;
					}

				}
				else{
					if(showIndicator){
						this.setState({ showIndicator:false });
					}
					this.ids = [];
				} 
			}
			else if(src == kindImages.text.appSrc){
				if(state.OpenFiles.length){

					if(this.ids.length != state.OpenFiles.length){
						this.ids = state.OpenFiles.map((x,i)=> i);
					}

					if(!showIndicator){
						this.setState({ showIndicator:true });
					}
					else if(state.OpenFiles.some((file)=> file.minimized)){
						if(!this.minimized){
							this.minimized = true;
						}
					}
					else if(this.minimized){
						this.minimized = false;
					}
				}
				else{
					if(showIndicator){
						this.setState({ showIndicator: false });
					}
					this.ids = [];
				}
			}
		})

		this.node.onclick = (event)=>{
			let store = this.store,
			{ src, kindImages } = this.props,
			deminimizeAction;

			if(src == kindImages.folder.appSrc){
				deminimizeAction = deminimizeFolder;
			}
			else if(src == kindImages.html.appSrc){
				deminimizeAction = deminimizeFrame;
			}
			else if(src == kindImages.text.appSrc){
				deminimizeAction = deminimizeFile;
			}

			if(this.minimized){
				if(this.ids.length){
					if(src == kindImages.folder.appSrc){
						store.dispatch(deminimizeAction({id:this.ids[0]}));
					}
					else if(src == kindImages.html.appSrc){
						store.getState().OpenFrames.forEach((frame,i)=>{
							if(frame.minimized){
								store.dispatch(deminimizeAction({ id:i }));
							}
						})
					}
					else if(src == kindImages.text.appSrc){
						store.dispatch(deminimizeAction({ id:this.ids[0] }));
					}
					this.minimized = false;
				}
				else{
					throw Error("Item minimized but without an id");
				}
			}
			else{
				if(src == kindImages.folder.appSrc){
					if(!this.ids.length){
						let desktopEntries = store.getState().Desktop.entries,
						id=0, length = desktopEntries.length;

						while(id < length){
							if(desktopEntries[id].kind == 'folder'){
								store.dispatch(openFolder({ desktopId:id }))
								break;
							}
							id++;
						}
					}
				}
			}

			event.preventDefault();
			event.stopPropagation();
		}

		if(this.props.active && !this.state.showIndicator){
			this.setState({ showIndicator:true });
		}
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
		let { props, state } = this,
		{ src, active } = props,
		{ showIndicator } = state,
		indicatorClass = `indicator${(showIndicator || active)? '':' whine'}`,
		dockClass = `dock il${(showIndicator || active)?' animate':''}`;

		return (
			<div ref={this.nodeRef} className={dockClass}>
				<div className='icon'>
					<img src={src} />
				</div>
				<div className={indicatorClass}>
					<span>.</span>
				</div>
			</div>
		)
	}
}
Dock.contextType = ReactReduxContext;


class About extends MovableItem{
	constructor(props, context){
		super(props);
		this.store = context.store;
		this.state = { display: this.store.getState().aboutView, presentation:true, skills:false, contact:false};
		this.changeView = this.changeView.bind(this);
		this.presRef = React.createRef();
		this.skillRef = React.createRef();
		this.contRef = React.createRef();
		this.closeRef = React.createRef();
		this.skills = this.store.getState().skills;
		this.contact = this.store.getState().contact;
	}

	componentDidMount(){
		let store = this.store;
		this.pres = this.presRef.current;
		this.skill = this.skillRef.current;
		this.cont = this.contRef.current;
		this.close = this.closeRef.current;

		this.unsubscribe = store.subscribe(()=>{
			let state = store.getState(),
			{ display } = this.state;

			if(display != state.aboutView){
				this.setState({ display: state.aboutView });
			}
		})

		super.componentDidMount();

		this.node.onclick = (event)=> super.nodeClickHandler(event);
		this.pres.onclick = (event)=>{
			if(!this.state.presentation){
				this.setState({ presentation:true, skills:false, contact:false })
			}
		}
		this.skill.onclick = (event)=>{
			if(!this.state.skills){
				this.setState({ skills:true, presentation:false, contact:false })
			}
		}
		this.cont.onclick = (event)=>{
			if(!this.state.contact){
				this.setState({ contact:true, presentation:false, skills:false })
			}
		}
		this.close.onclick = (event)=>{
			this.store.dispatch(setAboutInView({ display:false }))
		}
	}
	componentWillUnmount(){
		super.componentWillUnmount();
		this.unsubscribe();
	}

	changeView(){
		this.setState({ display:false });
	}

	render(){
		let { display,presentation, skills, contact } = this.state,
		nodeClass = `about il box${(display)? '':' whoosh'}`,
		presClass = `tab il${(presentation)? ' active':''}`,
		pres2Class = `pres${(presentation)?'':' whoosh'}`,
		skillClass = `tab il${(skills)? ' active':''}`,
		skill2Class = `skills${(skills)? '':' whoosh'}`,
		contClass = `tab il${(contact)? ' active':''}`,
		cont2Class = `contact${(contact)? '':' whoosh'}`,
		skillsClass = 'skill il',
		iconClass = 'icon',
		nameClass = 'name',
		socialClass = 'social il';

		return (
			<div ref={this.nodeRef} className={nodeClass}>
	            <div ref={this.headRef} className="head">
	                <div className="buttons">
	                    <div ref={this.closeRef} className='icon il close'>
	                        <img onClick={this.changeView} src='psd/mac-close.png' />
	                    </div>
	                    <div className='icon il minimize'>
	                        <img src='psd/mac-minimize.png' />
	                    </div>
	                    <div className='icon il fullscreen'>
	                        <img src='psd/mac-full-screen.png' />
	                    </div>
	                </div>
	                <div className="tabs">
	                    <div className={presClass}>
	                        <span ref={this.presRef}>Presentation</span>
	                    </div><div className={skillClass}>
	                        <span ref={this.skillRef}>Skills</span>
	                    </div><div className={contClass}>
	                        <span ref={this.contRef}>Contact</span>
	                    </div>
	                </div>
	            </div>
	            <div className="content">
	                <div className={pres2Class}>
	                    <h1>Hi, I'm Abel Kashoba</h1>
	                    <p>A software developer who like to build
	                    reliable app the scale well and are high preformant</p>
	                </div>
	                <div className={skill2Class}>
	                	{this.skills.map(({ name, src })=>{
	                		return (
	                			<div key={name} className={skillsClass}>
			                        <div className={iconClass}>
			                            <img src={src} />
			                        </div>
			                        <div className={nameClass}>
			                            {name}
			                        </div>
			                    </div>
	                		)
	                	})}
	                </div>
	                <div className={cont2Class}>
	                    <div className='wrapper vmid il'>
	                        <div className='mail'>
	                            <h2>Mail</h2>
	                            <span>{this.contact.mail}</span>
	                        </div>
	                        <div className='socials'>
	                            <h2>Socials</h2>
	                            {this.contact.socials.map(({ src, link })=>{
	                            	return (
	                            		<div key={link} className={socialClass}>
			                                <a href={link}><img src={src} /></a>
			                            </div>
	                            	)
	                            })}
	                        </div>
	                    </div><div className='tight vmid'></div>
	                </div>
	            </div>
	        </div>
		)
	}
}
About.contextType = ReactReduxContext;

exports.Root = Root;
exports.App = App;