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
					<link rel='stylesheet' href='css/custom/main.css' />
					<link rel='stylesheet' href='css/common.css' />
					<meta name='viewport' content='width=device-width; initial-scale=1.0' />
				</head>
				<body>
					<App />
					<script src='dist/customBundle.js'></script>
				</body>
			</html>
		)
	}
}

function App(props){
	let loading = useSelector(loadingSelector),
	currentLoading = null;

	if(loading){
		if(loading == 'mac'){
			currentLoading = <MacLoading />
		}
		else if(loading == 'window'){
			currentLoading = <WindowLoading />
		}
	}

	useEffect(()=>{
		console.log("APP rendered");
	})
	return (
		<>
			<Header />
			{/*<SideBar />*/}
			<Presentation />
			<Skills />
			<Projects />
			<Footer />
			{currentLoading}
		</>
	)
}

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div id="header">
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

function Presentation(){
	return (
		<div id="presentation">
	        <div className="il">
	            <p>Hi, I'm Abel Kashoba</p>
	            <p>A web developer. I like to build performant and reliable apps in the cloud. I do front-end and back end work and I'll be really excited to work with you</p>
	        </div>
	    </div>
	)
}

function Skills(){
	let skills = useSelector(skillsSelector),
	className = 'skill il',
	className2 = "icon",
	className3 = "name";

	return (
		<div id="skill">
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
	className3 = 'description il';

	return (
		<div id="project">
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
	socialClass = 'social il';

	return (
		<footer>
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