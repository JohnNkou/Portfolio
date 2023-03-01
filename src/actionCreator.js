const C = require('./constant.js');

function addEntry(payload){
	return {
		type: C.ADD_ENTRY,
		payload
	}
}

function removeEntry(payload){
	return {
		type: C.REMOVE_ENTRY,
		payload
	}
}

function openFolder(payload){
	return {
		type: C.OPEN_FOLDER,
		payload
	}
}

function closeFolder(payload){
	return {
		type: C.CLOSE_FOLDER,
		payload
	}
}

function minimizeFolder(payload){
	return {
		type: C.MINIMIZE_FOLDER,
		payload
	}
}

function deminimizeFolder(payload){
	return {
		type: C.DEMINIMIZE_FOLDER,
		payload
	}
}

function openFrame(payload){
	return {
		type: C.OPEN_FRAME,
		payload
	}
}

function closeFrame(payload){
	return {
		type: C.CLOSE_FRAME,
		payload
	}
}

function minimizeFrame(payload){
	return {
		type: C.MINIMIZE_FRAME,
		payload
	}
}

function deminimizeFrame(payload){
	return {
		type: C.DEMINIMIZE_FRAME,
		payload
	}
}

function closeFile(payload){
	return {
		type: C.CLOSE_FILE,
		payload
	}
}

function minimizeFile(payload){
	return {
		type: C.MINIMIZE_FILE,
		payload
	}
}

function openFile(payload){
	return {
		type: C.OPEN_FILE,
		payload
	}
}

function saveFile(payload){
	return {
		type: C.SAVE_FILE,
		payload
	}
}

function deminimizeFile(payload){
	return {
		type: C.DEMINIMIZE_FILE,
		payload
	}
}

function setLeadApp(payload){
	return {
		type: C.SET_LEAD_APP,
		payload
	}
}

function setAboutInView(payload){
	return {
		type: C.SET_ABOUT_IN_VIEW,
		payload
	}
}

function setLoading(payload){
	return {
		type: C.SET_LOADING,
		payload
	}
}

exports.addEntry = addEntry;
exports.removeEntry = removeEntry;
exports.openFolder = openFolder;
exports.closeFolder = closeFolder;
exports.minimizeFolder = minimizeFolder;
exports.deminimizeFolder = deminimizeFolder;
exports.openFrame = openFrame;
exports.closeFrame = closeFrame;
exports.minimizeFrame = minimizeFrame;
exports.deminimizeFrame = deminimizeFrame;
exports.closeFile = closeFile;
exports.minimizeFile = minimizeFile;
exports.openFile = openFile;
exports.deminimizeFile = deminimizeFile;
exports.saveFile = saveFile;
exports.setLeadApp = setLeadApp;
exports.setAboutInView = setAboutInView;
exports.setLoading = setLoading;