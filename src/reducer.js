const C = require('./constant.js');

function Reducer(state,action){
	return {
		Desktop: {
			entries:desktopRed(state.Desktop.entries,action)
		},
		OpenFolders: openFoldRed(state,action),
		OpenFrames: openFrameRed(state.OpenFrames,action),
		OpenFiles: openFileRed(state.OpenFiles,action),
		DockItems: dockRed(state,action),
		KindImg: state.KindImg,
		leadApp: leadAppRed(state.leadApp,action),
		aboutView: aboutRed(state.aboutView, action),
		loading:  loadingRed(state.loading, action),
		skills: state.skills,
		projects: state.projects,
		contact: state.contact
	}
}

function desktopRed(state,action){
	let { type, payload } = action,
	{ id, name, kind, text } = payload || {},
	newState, 
	file,
	length = state.length;

	if(type == C.ADD_ENTRY){
		if(!name || !kind){
			console.error(action);
			throw Error("Text or src or kind are unavailable");
		}
		newState = [...state, { name,kind }];
	}
	else if(type == C.REMOVE_ENTRY){
		if(id === undefined){
			console.error(action);
			throw Error("undefined id");
		}
		newState = [...state];
		newState.splice(id,1);
	}
	else if(type == C.SAVE_FILE){
		for(let i=0; i < length; i++){
			if(state[i].name == name){
				newState = [...state];
				newState[i].text = text;
				return newState;
			}
		}
		console.error("File not in desktop entries");
		return state;
	}
	else{
		return state;
	}
	return newstate;
}

function openFoldRed(state,action){
	let { type, payload } = action,
	{ desktopId, id } = payload || {},
	openFolders = state.OpenFolders,
	desktopEntries = state.Desktop && state.Desktop.entries || [],
	entry = desktopEntries[desktopId],
	newState;

	if(type == C.OPEN_FOLDER){
		if(desktopId == undefined){
			console.error(action);
			throw Error("No desktop id given");
		}
		else if(!entry){
			console.error(desktopId, desktopEntries);
			throw Error("Desktop entries don't have the given id");
		}
		else{
			if(openFolders.every((x)=> x.name != entry.name)){
				openFolders = [...openFolders, entry];
				console.log("folder opened",action);
			}
		}
		return openFolders;
	}
	else if(type == C.CLOSE_FOLDER){
		if(openFolders[id]){
			openFolders = [...openFolders];
			openFolders.splice(id,1);
		}
		else{
			throw Error(`Folder with id ${id} is not known`);
		}
		return openFolders;
	}
	else if(type == C.MINIMIZE_FOLDER){
		if(openFolders[id]){
			openFolders = [...openFolders];
			openFolders[id].minimized = true;
		}
		else{
			throw Error(`Folder with id ${id} is not known`);
		}
		return openFolders;
	}
	else if(type == C.DEMINIMIZE_FOLDER){
		if(openFolders[id]){
			openFolders = [...openFolders];
			openFolders[id].minimized = false;
		}
		else{
			throw Error(`Folder with id ${id} is not knwon`);
		}
		return openFolders;
	}
	else{
		return openFolders;
	}
}

function openFileRed(state,action){
	let { type, payload } = action,
	{ id, name, kind, text } = payload || {},
	newState;

	if(type == C.OPEN_FILE){
		if(name != undefined && text != undefined){
			return [...state, { name, text, kind }];
		}
		else{
			console.error(action);
			throw Error('name or text or dockImg absten');
		}
	}
	else if(type == C.CLOSE_FILE){
		if(state[id]){
			newState = [...state];
			newState.splice(id,1);
			return newState;
		}
		else{
			throw Error(`id ${id} not known`);
		}
	}
	else if(type == C.MINIMIZE_FILE){
		if(state[id]){
			newState = [...state];
			newState[id].minimized = true;
			return newState;
		}
		else{
			throw Error(`id ${id} not known`);
		}
	}
	else if(type == C.DEMINIMIZE_FILE){
		if(state[id]){
			newState = [...state];
			newState[id].minimized = false;
			return newState;
		}
		else{
			throw Error(`id ${id} not known`);
		}
	}
	else if(type == C.SAVE_FILE){
		if(state[id]){
			newState = [...state];
			newState[id].text = text;
			return newState;
		}
		else {
			throw Error(`id ${id} not known`);
		}
	}
	else{
		return state;
	}
}

function openFrameRed(state,action){
	let { type, payload } = action,
	{ link , id, name, kind } = payload || {},
	newState;

	if(type == C.OPEN_FRAME){
		if(state.every((x)=> x.link != link)){
			newState = [...state, { link, name, kind }];
			return newState;
		}
		return state;
	}
	else if(type == C.CLOSE_FRAME){
		return state.filter((x)=> x.link != link);
	}
	else if(type == C.MINIMIZE_FRAME){
		if(state[id]){
			newState = [...state];
			newState[id].minimized = true;
			return newState;
		}
		throw Error(`id ${id} not known`);
	}
	else if(type == C.DEMINIMIZE_FRAME){
		if(state[id]){
			newState = [...state];
			newState[id].minimized = false;
			return newState;
		}
		throw Error(`id ${id} not known`);
	}
	else{
		return state;
	}
}

function dockRed(state,action){
	let { type, payload } = action,
	{ desktopId, kind } = payload || {},
	r,
	DockItems = state.DockItems,
	KindImages = state.KindImg,
	appSrc = kind && KindImages[kind].appSrc,
	newState;

	if(type == C.OPEN_FOLDER){
		newState = [...DockItems];
		if(DockItems.every((x)=> x.src != appSrc)){
			newState.push({ src:appSrc });
		}
		
		return newState;
	}
	else if(type == C.OPEN_FRAME){
		if(DockItems.every((x)=> x.src != appSrc)){
			newState = [...DockItems, { src: appSrc, active:true }];
			return newState;
		}
		return DockItems;
	}
	else if(type == C.CLOSE_FRAME){
		if(state.OpenFrames.length < 2){
			newState = DockItems.filter((x)=> x.src != appSrc);
			return newState;
		}
		return DockItems;
	}
	else if(type == C.OPEN_FILE){
		if(DockItems.every((x)=> x.src != appSrc)){
			newState = [...DockItems, { src:appSrc, active:true }];
			return newState;
		}
		return DockItems;
	}
	else if(type == C.CLOSE_FILE){
		if(state.OpenFiles.length < 2){
			newState = DockItems.filter((x)=> x.src != appSrc);
			return newState;
		}
		return DockItems;
	}
	else{
		return DockItems;
	}
}

function leadAppRed(state,action){
	let { type, payload } = action,
	{ kind } = payload || {};

	if(type == C.SET_LEAD_APP){
		if(kind){
			if(kind == 'folder'){
				return {
					name:'Finder',
					kind
				}
			}
			else if(kind == 'html'){
				return {
					name:'Safari',
					kind
				}
			}
			else if(kind == 'text'){
				return {
					name:'SublimeText',
					kind
				}
			}
			else{
				console.error("Unknwon kind",kind);
				throw Error("Unknwon kind");
			}
		}
		else{
			console.error("No kind given",kind);
			throw Error("No kind given")
		}
	}
	else if(type == C.OPEN_FILE){
		return {
			name:'SublimeText',
			kind:'text'
		}
	}
	else if(type == C.OPEN_FOLDER){
		return {
			name:'Finder',
			kind:'folder'
		}
	}
	else if(type == C.OPEN_FRAME){
		return {
			name:'Safari',
			kind:'html'
		}
	}
	else if(type == C.CLOSE_FILE || type == C.CLOSE_FRAME){
		return {
			name:'Finder',
			kind:'folder'
		}
	}
	else
		return state;
}

function aboutRed(state,action){
	let { type, payload } = action,
	{ display } = payload || {};

	if(type == C.SET_ABOUT_IN_VIEW){
		if(display !== true && display !== false){
			console.error("bad payload given",action);
			throw Error("Bad payload");
		}
		else{
			return display;
		}
	}
	return state;
}

function loadingRed(state,action){
	let { type, payload } = action,
	{ template } = payload || {};

	if(type == C.SET_LOADING){
		if(template){
			return template;
		}
		else{
			console.error("No template given",action);
			throw Error("No template given");
		}
	}
	return state;
}

module.exports = Reducer;