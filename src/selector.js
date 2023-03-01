function desktopEntriesSelector(state){
	return state.Desktop.entries;
}

function openFoldersSelector(state){
	return state.OpenFolders;
}

function dockItemsSelector(state){
	return state.DockItems;
}

function openFramesSelector(state){
	return state.OpenFrames;
}

function openFilesSelector(state){
	return state.OpenFiles;
}
function kindImageSelector(state){
	return state.KindImg
}
function leadAppSelector(state){
	return state.leadApp;
}
function aboutInViewSelector(state){
	return state.aboutView
}
function loadingSelector(state){
	return state.loading;
}
function skillsSelector(state){
	return state.skills;
}
function projectsSelector(state){
	return state.projects;
}
function contactSelector(state){
	return state.contact;
}

exports.desktopEntriesSelector = desktopEntriesSelector;
exports.openFoldersSelector = openFoldersSelector;
exports.dockItemsSelector = dockItemsSelector;
exports.openFramesSelector = openFramesSelector;
exports.openFilesSelector = openFilesSelector;
exports.kindImageSelector = kindImageSelector;
exports.leadAppSelector = leadAppSelector;
exports.aboutInViewSelector = aboutInViewSelector;
exports.contactSelector = contactSelector;
exports.loadingSelector = loadingSelector;
exports.skillsSelector = skillsSelector;
exports.projectsSelector = projectsSelector;