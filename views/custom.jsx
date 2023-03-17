const React = require('react'),
{ useEffect, useState } = require('react'),
{ useDispatch, useSelector } = require('react-redux'),
{ Loading, MacLoading, WindowLoading } = require('./common.jsx'),
{ loadingSelector, skillsSelector, projectsSelector, contactSelector } = require('../src/selector.js'),
{ setLoading } = require('../src/actionCreator.js');

class Root extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<html>
				<head>
					<title>Abel kashoba - Custom Template</title>
					<link rel='stylesheet' href='css/custom/main.css' />
					<link rel='stylesheet' href='css/common.css' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
					<meta name='author' content='Abel Kashoba' />
					<meta name='description' content="Hi, I'm Abel Kashoba a web developer. This is my portfolio made with my custom template that showcase my skills and the project i've worked in" />
				</head>
				<body>
					<div id='custom'>
						<App />
					</div>
					<div id='window'></div>
					<div id='mac'></div>
					<script src='dist/react_redux_thingsBundle.js'></script>
					<script src='dist/customBundle.js'></script>
				</body>
			</html>
		)
	}
}

function App(props){
	let loading = useSelector(loadingSelector),
	dispatch = useDispatch(),
	currentLoading = null,
	hide = (loading == 'custom')? false:true;

	if(loading){
		if(loading == 'mac'){
			currentLoading = <MacLoading {...props} dispatch={dispatch} setLoading={setLoading} currentTemplate="custom" />
		}
		else if(loading == 'window'){
			currentLoading = <WindowLoading {...props} dispatch={dispatch} setLoading={setLoading} currentTemplate="custom" />
		}
	}

	useEffect(()=>{
		console.log("APP rendered");
		let Status = props.Status,
		unsub = Status.subscribe('custom',()=> dispatch(setLoading({template:'custom'})));

		return ()=> unsub();
	},[true])
	return (
		<>
			<Header hide={hide} />
			{/*<SideBar />*/}
			<Presentation hide={hide} />
			<Skills hide={hide} />
			<Projects hide={hide} />
			<Footer hide={hide} />
			{currentLoading}
		</>
	)
}

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let { hide } = this.props,
		className = (hide)? 'whoosh':'';

		return (
			<div id="header" className={className}>
				<TemplateChooser />
				<div className='tight vmid'></div>
				<ModeShift />
			</div>
		)
	}
}

function TemplateChooser(props){
	var [show,setState] = useState(false),
	dispatch = useDispatch(),
	wrapClass = `wrapper${(show)?'':' whoosh'}`;

	return (
		<div id="templateChooser" className="il vmid">
            <div className="current il">
                <a href="#" onClick={(event)=> { setState(!show); event.preventDefault(); event.stopPropagation(); }}><span>Custom Template</span></a>
            </div><div className='tight vmid'></div>
            <div className={wrapClass}>
                <div className="list">
                    <a href='?template=window' onClick={(event)=>{
                    	event.preventDefault(); event.stopPropagation(); 
                    	dispatch(setLoading({ template:'window' }));
                    }}><span>Window</span></a>
                </div>
                 <div className="list">
                    <a href='?template=mac' onClick={(event)=>{ event.preventDefault(); event.stopPropagation();
                    	dispatch(setLoading({ template:'mac' }));
                     }}><span>Mac</span></a>
                </div>
            </div>
        </div>
	)
}

function ModeShift(props){
	return (
		<div id="modeShift" className='il'>
            <img src="psd/Sun.png" />
        </div>
	)
}

function SideBar(props){
	return (
		<div id="sideBar">
	        <div className="side" id="home">
	            <div className="icon"><a href="#home"><img src="psd/homeIm.png" /></a></div>
	            <div className="title">Home</div>
	        </div>
	        <div id="ski" className="side">
	            <div className="icon"><a href="#ski"><img src="psd/skill.png" /></a></div>
	            <div className="title">Skill</div>
	        </div>
	        <div id="proj" className="side">
	            <div className="icon"><a href="#proj"><img src="psd/project.png" /></a></div>
	            <div className="title">Project</div>
	        </div>
	        <div className="side">
	            <div className="icon"><img src="psd/Asset_8.png" /></div>
	            <div className="title">Contact</div>
	        </div>
	    </div>
	)
}

function Presentation(props){
	let { hide } = props,
	className = (hide)? 'whoosh':'';

	return (
		<div id="presentation" className={className}>
	        <div className="il">
	            <p>Hi, I'm Abel Kashoba</p>
	            <p>A web developer. I like to build performant and reliable apps in the cloud. I do front-end and back end work and I'll be really excited to work with you</p>
	        </div>
	    </div>
	)
}

function Skills(props){
	let skills = useSelector(skillsSelector),
	className = 'skill il',
	className2 = "icon",
	className3 = "name",
	{ hide } = props,
	hideClass = (hide)? 'whoosh':'';

	return (
		<div id="skill" className={hideClass}>
	        <div className="title il">
	            <h1>Skills & certs</h1>
	        </div>
	        <div className="skillwrapper">
	        	{skills.map(({src, name})=>{
	        		return (
	        			<div key={name} className={className}>
	        				<div className={className2}>
	        					<img src={src} />
	        				</div>
	        				<div className={className3}>
	        					<span>{name}</span>
	        				</div>
	        			</div>
	        		)
	        	})}
	        </div>
	    </div>
	)
}

function Projects(props){
	let projects = useSelector(projectsSelector),
	className = 'project',
	className2 = 'name il',
	className3 = 'description il',
	{ hide } = props,
	hideClass = (hide)? 'whoosh':'';

	return (
		<div id="project" className={hideClass}>
	        <div className="title il">
	            <h1>Project</h1>
	        </div>
	        <div className="projectWrapper">
	        	{projects.map(({ name, description,link })=>{
	        		return (
	        			<div key={name} className={className}>
	        				<div className={className2}>
	        					<h2><a target='blank' href={link}>{name}</a></h2>
	        				</div>
	        				<div className={className3}>
	        					<p>{description}</p>
	        				</div>
	        			</div>
	        		)
	        	})}
	        </div>
	    </div>
	)
}

function Footer(props){
	let contact = useSelector(contactSelector),
	socials = contact.socials,
	socialClass = 'social il',
	{ hide } = props,
	hideClass = (hide)? 'whoosh':'';

	return (
		<footer className={hideClass}>
	        <div id="design" className="il">Built by Me</div>
	        <div id="socials" className="il">
	        	{socials.map(({ src,link  })=>{
	        		return (
	        			<div key={link} className={socialClass}>
			                <a target='blank' href={link}><img src={src} /></a>
			        	</div>
	        		)
	        	})}
	        </div>
	    </footer>
	)
}

exports.Root = Root;
exports.App = App;