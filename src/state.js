const macKindImage = {
	text:{ src:'psd/txt-type.png', appSrc: 'psd/sublime-text.png' },
	folder:{ src:'psd/folder.png', appSrc:'psd/finder.png' },
	html:{  src:'psd/html-type.png', appSrc: 'psd/safari.png'},
	mail:{ appSrc:'psd/mail.png' },
	music: { appSrc:'psd/vlc.png' }
},
windowKindImage = {
	text:{ src:'psd/txt-type.png', appSrc: 'psd/notepad.png' },
	folder:{ src:'psd/win-folder.png', appSrc: 'psd/win-folder.png' },
	html:{  src:'psd/html-type.png', appSrc:'psd/microsoft-edge.png'},
	mail:{ src:'psd/mail.png' },
	music: { src:'psd/vlc.png' }
},
skills = [
	{ name:'javascript', src:'psd/javascript.png' },
	{ name:'redux', src:'psd/redux.png' },
	{ name:'graphql', src:'psd/graphql.png' },
	{ name:'nodejs', src:'psd/nodejs.png' },
	{ name:'css', src:'psd/css3.png' },
	{ name:'html', src:'psd/html.png' },
	{ name:'mongodb', src:'psd/mongodb.png' },
	{ name:'rest', src:'psd/rest-api.png' },
	{ name:'git', src:'psd/git.png' },
	{ name:'lambda', src:'psd/awslambda.png' }
],
projects = [
	{ name:'Akting', link:'https://accounting.abelkashoba.me', description:"Akting is a book keeping project that allow you to track your expense and your input to get a better view or picture of your spending pattern.", kind:'html' },
	{ name:'Mictam', link:"https://mictam.abelkashoba.me", description:"Mictam is an App that allow streaming of song Text. It's also a song book app", kind:'html' }
],
state = {
	Desktop:{
		entries:[
			{ 
				kind:'text',
				name:'Skills',
				text:skills.map((skill)=> skill.name).join('\n')
			}, 
			{
				name:'Project',
				kind:'folder',
				entries:projects.map(({name,link, kind})=> ({name,link,kind}))
			}
		]
	},
	KindImg:{

	},
	OpenFolders:[],
	OpenFrames: [],
	OpenFiles: [],
	DockItems: [],
	skills:[],
	projects:[],
	contact:{
		mail:['lebakashoba@hotmail.fr'],
		socials:[
			{ src:'psd/github.png', link:"https://github.com/JohnNkou" },
			{ src:'psd/linkedin.png', link:"https://www.linkedin.com/in/leba-kashoba-124951153" }
		]
	},
	loading:''
},
macDockItems = [
	{ 
		src: macKindImage.folder.appSrc
	}, 
	{ 
		src: macKindImage.text.appSrc
	}
],
windowDockItems = [
	{
		src: windowKindImage.html.appSrc
	},
	{
		src:windowKindImage.folder.appSrc
	}
],
leadApp = {
	name:'Finder',
	kind:'folder'
},
aboutView = false;

exports.state = state;
exports.macDock = macDockItems;
exports.windowDock = windowDockItems;
exports.windowKindImage = windowKindImage;
exports.macKindImage = macKindImage;
exports.leadApp = leadApp;
exports.aboutView = aboutView;
exports.skills = skills;
exports.projects = projects;
