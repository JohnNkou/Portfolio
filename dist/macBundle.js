(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([["mac"],{

/***/ "./entry/mac.js":
/*!**********************!*\
  !*** ./entry/mac.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ../views/mac.jsx */ "./views/mac.jsx"),
  App = _require.App,
  _require2 = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"),
  render = _require2.render,
  _require3 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js"),
  createStore = _require3.createStore,
  _require4 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
  Provider = _require4.Provider,
  Reducer = __webpack_require__(/*! ../src/reducer.js */ "./src/reducer.js"),
  _require5 = __webpack_require__(/*! ../src/state.js */ "./src/state.js"),
  state = _require5.state,
  macDock = _require5.macDock,
  macKindImage = _require5.macKindImage,
  windowKindImage = _require5.windowKindImage,
  leadApp = _require5.leadApp,
  aboutView = _require5.aboutView,
  skills = _require5.skills,
  projects = _require5.projects,
  React = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  Status = __webpack_require__(/*! ../src/TemplateStatus.js */ "./src/TemplateStatus.js");
var store;
state.DockItems = macDock;
state.KindImg = macKindImage;
state.leadApp = leadApp;
state.aboutView = aboutView;
state.skills = skills;
state.projects = projects;
state.loading = 'mac';
Status.setLoaded('mac');
console.log(Status.getState());
store = createStore(Reducer, state);
render( /*#__PURE__*/React.createElement(Provider, {
  store: store
}, /*#__PURE__*/React.createElement(App, {
  Status: Status
})), document.getElementById('mac'));

/***/ }),

/***/ "./src/TemplateStatus.js":
/*!*******************************!*\
  !*** ./src/TemplateStatus.js ***!
  \*******************************/
/***/ (function(module) {

var number = 0;
function Status() {
  var _this = this;
  var macLoaded = false,
    windowLoaded = false,
    customLoaded = false,
    subscription = {
      'custom': {},
      'mac': {},
      'window': {}
    },
    id = 0;
  this.getState = function () {
    return {
      macLoaded: macLoaded,
      windowLoaded: windowLoaded,
      customLoaded: customLoaded
    };
  };
  this.setLoaded = function (template) {
    switch (template) {
      case 'mac':
        macLoaded = true;
        break;
        ;
      case 'window':
        windowLoaded = true;
        break;
      case 'custom':
        customLoaded = true;
        break;
      default:
        console.error("Unknwon template", template);
        return;
    }
    _this.runSubscription(template);
  };
  this.subscribe = function (template, fn) {
    if (!subscription[template]) {
      console.error("Template", template, "not in subscription");
      return;
    }
    var oldId = id;
    subscription[template][id++] = fn;
    return function () {
      return delete subscription[template][oldId];
    };
  };
  this.runSubscription = function (template) {
    var subscribers = subscription[template];
    if (Object.keys(subscribers).length) {
      for (var _id in subscribers) {
        subscribers[_id]();
      }
    }
  };
  this.getSubscriptions = function () {
    return subscription;
  };
}
module.exports = new Status();

/***/ }),

/***/ "./src/actionCreator.js":
/*!******************************!*\
  !*** ./src/actionCreator.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var C = __webpack_require__(/*! ./constant.js */ "./src/constant.js");
function addEntry(payload) {
  return {
    type: C.ADD_ENTRY,
    payload: payload
  };
}
function removeEntry(payload) {
  return {
    type: C.REMOVE_ENTRY,
    payload: payload
  };
}
function openFolder(payload) {
  return {
    type: C.OPEN_FOLDER,
    payload: payload
  };
}
function closeFolder(payload) {
  return {
    type: C.CLOSE_FOLDER,
    payload: payload
  };
}
function minimizeFolder(payload) {
  return {
    type: C.MINIMIZE_FOLDER,
    payload: payload
  };
}
function deminimizeFolder(payload) {
  return {
    type: C.DEMINIMIZE_FOLDER,
    payload: payload
  };
}
function openFrame(payload) {
  return {
    type: C.OPEN_FRAME,
    payload: payload
  };
}
function closeFrame(payload) {
  return {
    type: C.CLOSE_FRAME,
    payload: payload
  };
}
function minimizeFrame(payload) {
  return {
    type: C.MINIMIZE_FRAME,
    payload: payload
  };
}
function deminimizeFrame(payload) {
  return {
    type: C.DEMINIMIZE_FRAME,
    payload: payload
  };
}
function closeFile(payload) {
  return {
    type: C.CLOSE_FILE,
    payload: payload
  };
}
function minimizeFile(payload) {
  return {
    type: C.MINIMIZE_FILE,
    payload: payload
  };
}
function openFile(payload) {
  return {
    type: C.OPEN_FILE,
    payload: payload
  };
}
function saveFile(payload) {
  return {
    type: C.SAVE_FILE,
    payload: payload
  };
}
function deminimizeFile(payload) {
  return {
    type: C.DEMINIMIZE_FILE,
    payload: payload
  };
}
function setLeadApp(payload) {
  return {
    type: C.SET_LEAD_APP,
    payload: payload
  };
}
function setAboutInView(payload) {
  return {
    type: C.SET_ABOUT_IN_VIEW,
    payload: payload
  };
}
function setLoading(payload) {
  return {
    type: C.SET_LOADING,
    payload: payload
  };
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

/***/ }),

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/***/ (function(module) {

module.exports = {
  ADD_ENTRY: "ADD ENTRY",
  REMOVE_ENTRY: "REMOVE ENTRY",
  OPEN_FOLDER: "OPEN FOLDER",
  CLOSE_FOLDER: 'CLOSE_FOLDER',
  MINIMIZE_FOLDER: 'MINIMIZE FOLDER',
  DEMINIMIZE_FOLDER: 'DEMINIMIZE FOLDER',
  OPEN_FRAME: 'OPEN FRAME',
  CLOSE_FRAME: 'CLOSE_FRAME',
  MINIMIZE_FRAME: 'MINIMIZE FRAME',
  DEMINIMIZE_FRAME: 'DEMINIMIZE FRAME',
  CLOSE_FILE: 'CLOSE FILE',
  MINIMIZE_FILE: 'MINIMIZE FILE',
  OPEN_FILE: 'OPEN FILE',
  DEMINIMIZE_FILE: 'DEMINIMIZE FILE',
  SAVE_FILE: 'SAVE FILE',
  SET_LEAD_APP: 'SET LEAD APP',
  SET_ABOUT_IN_VIEW: 'SET ABOUT IN VIEW',
  SET_LOADING: 'SET LOADING'
};

/***/ }),

/***/ "./src/reducer.js":
/*!************************!*\
  !*** ./src/reducer.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var C = __webpack_require__(/*! ./constant.js */ "./src/constant.js");
function Reducer(state, action) {
  return {
    Desktop: {
      entries: desktopRed(state.Desktop.entries, action)
    },
    OpenFolders: openFoldRed(state, action),
    OpenFrames: openFrameRed(state.OpenFrames, action),
    OpenFiles: openFileRed(state.OpenFiles, action),
    DockItems: dockRed(state, action),
    KindImg: state.KindImg,
    leadApp: leadAppRed(state.leadApp, action),
    aboutView: aboutRed(state.aboutView, action),
    loading: loadingRed(state.loading, action),
    skills: state.skills,
    projects: state.projects,
    contact: state.contact
  };
}
function desktopRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref = payload || {},
    id = _ref.id,
    name = _ref.name,
    kind = _ref.kind,
    text = _ref.text,
    newState,
    file,
    length = state.length;
  if (type == C.ADD_ENTRY) {
    if (!name || !kind) {
      console.error(action);
      throw Error("Text or src or kind are unavailable");
    }
    newState = [].concat(_toConsumableArray(state), [{
      name: name,
      kind: kind
    }]);
  } else if (type == C.REMOVE_ENTRY) {
    if (id === undefined) {
      console.error(action);
      throw Error("undefined id");
    }
    newState = _toConsumableArray(state);
    newState.splice(id, 1);
  } else if (type == C.SAVE_FILE) {
    for (var i = 0; i < length; i++) {
      if (state[i].name == name) {
        newState = _toConsumableArray(state);
        newState[i].text = text;
        return newState;
      }
    }
    console.error("File not in desktop entries");
    return state;
  } else {
    return state;
  }
  return newstate;
}
function openFoldRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref2 = payload || {},
    desktopId = _ref2.desktopId,
    id = _ref2.id,
    openFolders = state.OpenFolders,
    desktopEntries = state.Desktop && state.Desktop.entries || [],
    entry = desktopEntries[desktopId],
    newState;
  if (type == C.OPEN_FOLDER) {
    if (desktopId == undefined) {
      console.error(action);
      throw Error("No desktop id given");
    } else if (!entry) {
      console.error(desktopId, desktopEntries);
      throw Error("Desktop entries don't have the given id");
    } else {
      if (openFolders.every(function (x) {
        return x.name != entry.name;
      })) {
        openFolders = [].concat(_toConsumableArray(openFolders), [entry]);
        console.log("folder opened", action);
      }
    }
    return openFolders;
  } else if (type == C.CLOSE_FOLDER) {
    if (openFolders[id]) {
      openFolders = _toConsumableArray(openFolders);
      openFolders.splice(id, 1);
    } else {
      throw Error("Folder with id ".concat(id, " is not known"));
    }
    return openFolders;
  } else if (type == C.MINIMIZE_FOLDER) {
    if (openFolders[id]) {
      openFolders = _toConsumableArray(openFolders);
      openFolders[id].minimized = true;
    } else {
      throw Error("Folder with id ".concat(id, " is not known"));
    }
    return openFolders;
  } else if (type == C.DEMINIMIZE_FOLDER) {
    if (openFolders[id]) {
      openFolders = _toConsumableArray(openFolders);
      openFolders[id].minimized = false;
    } else {
      throw Error("Folder with id ".concat(id, " is not knwon"));
    }
    return openFolders;
  } else {
    return openFolders;
  }
}
function openFileRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref3 = payload || {},
    id = _ref3.id,
    name = _ref3.name,
    kind = _ref3.kind,
    text = _ref3.text,
    newState;
  if (type == C.OPEN_FILE) {
    if (name != undefined && text != undefined) {
      return [].concat(_toConsumableArray(state), [{
        name: name,
        text: text,
        kind: kind
      }]);
    } else {
      console.error(action);
      throw Error('name or text or dockImg absten');
    }
  } else if (type == C.CLOSE_FILE) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState.splice(id, 1);
      return newState;
    } else {
      throw Error("id ".concat(id, " not known"));
    }
  } else if (type == C.MINIMIZE_FILE) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState[id].minimized = true;
      return newState;
    } else {
      throw Error("id ".concat(id, " not known"));
    }
  } else if (type == C.DEMINIMIZE_FILE) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState[id].minimized = false;
      return newState;
    } else {
      throw Error("id ".concat(id, " not known"));
    }
  } else if (type == C.SAVE_FILE) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState[id].text = text;
      return newState;
    } else {
      throw Error("id ".concat(id, " not known"));
    }
  } else {
    return state;
  }
}
function openFrameRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref4 = payload || {},
    link = _ref4.link,
    id = _ref4.id,
    name = _ref4.name,
    kind = _ref4.kind,
    newState;
  if (type == C.OPEN_FRAME) {
    if (state.every(function (x) {
      return x.link != link;
    })) {
      newState = [].concat(_toConsumableArray(state), [{
        link: link,
        name: name,
        kind: kind
      }]);
      return newState;
    }
    return state;
  } else if (type == C.CLOSE_FRAME) {
    return state.filter(function (x) {
      return x.link != link;
    });
  } else if (type == C.MINIMIZE_FRAME) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState[id].minimized = true;
      return newState;
    }
    throw Error("id ".concat(id, " not known"));
  } else if (type == C.DEMINIMIZE_FRAME) {
    if (state[id]) {
      newState = _toConsumableArray(state);
      newState[id].minimized = false;
      return newState;
    }
    throw Error("id ".concat(id, " not known"));
  } else {
    return state;
  }
}
function dockRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref5 = payload || {},
    desktopId = _ref5.desktopId,
    kind = _ref5.kind,
    r,
    DockItems = state.DockItems,
    KindImages = state.KindImg,
    appSrc = kind && KindImages[kind].appSrc,
    newState;
  if (type == C.OPEN_FOLDER) {
    newState = _toConsumableArray(DockItems);
    if (DockItems.every(function (x) {
      return x.src != appSrc;
    })) {
      newState.push({
        src: appSrc
      });
    }
    return newState;
  } else if (type == C.OPEN_FRAME) {
    if (DockItems.every(function (x) {
      return x.src != appSrc;
    })) {
      newState = [].concat(_toConsumableArray(DockItems), [{
        src: appSrc,
        active: true
      }]);
      return newState;
    }
    return DockItems;
  } else if (type == C.CLOSE_FRAME) {
    if (state.OpenFrames.length < 2) {
      newState = DockItems.filter(function (x) {
        return x.src != appSrc;
      });
      return newState;
    }
    return DockItems;
  } else if (type == C.OPEN_FILE) {
    if (DockItems.every(function (x) {
      return x.src != appSrc;
    })) {
      newState = [].concat(_toConsumableArray(DockItems), [{
        src: appSrc,
        active: true
      }]);
      return newState;
    }
    return DockItems;
  } else if (type == C.CLOSE_FILE) {
    if (state.OpenFiles.length < 2) {
      newState = DockItems.filter(function (x) {
        return x.src != appSrc;
      });
      return newState;
    }
    return DockItems;
  } else {
    return DockItems;
  }
}
function leadAppRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref6 = payload || {},
    kind = _ref6.kind;
  if (type == C.SET_LEAD_APP) {
    if (kind) {
      if (kind == 'folder') {
        return {
          name: 'Finder',
          kind: kind
        };
      } else if (kind == 'html') {
        return {
          name: 'Safari',
          kind: kind
        };
      } else if (kind == 'text') {
        return {
          name: 'SublimeText',
          kind: kind
        };
      } else {
        console.error("Unknwon kind", kind);
        throw Error("Unknwon kind");
      }
    } else {
      console.error("No kind given", kind);
      throw Error("No kind given");
    }
  } else if (type == C.OPEN_FILE) {
    return {
      name: 'SublimeText',
      kind: 'text'
    };
  } else if (type == C.OPEN_FOLDER) {
    return {
      name: 'Finder',
      kind: 'folder'
    };
  } else if (type == C.OPEN_FRAME) {
    return {
      name: 'Safari',
      kind: 'html'
    };
  } else if (type == C.CLOSE_FILE || type == C.CLOSE_FRAME) {
    return {
      name: 'Finder',
      kind: 'folder'
    };
  } else return state;
}
function aboutRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref7 = payload || {},
    display = _ref7.display;
  if (type == C.SET_ABOUT_IN_VIEW) {
    if (display !== true && display !== false) {
      console.error("bad payload given", action);
      throw Error("Bad payload");
    } else {
      return display;
    }
  }
  return state;
}
function loadingRed(state, action) {
  var type = action.type,
    payload = action.payload,
    _ref8 = payload || {},
    template = _ref8.template;
  if (type == C.SET_LOADING) {
    if (template != undefined) {
      return template;
    } else {
      console.error("No template given", action);
      throw Error("No template given");
    }
  }
  return state;
}
module.exports = Reducer;

/***/ }),

/***/ "./src/selector.js":
/*!*************************!*\
  !*** ./src/selector.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

function desktopEntriesSelector(state) {
  return state.Desktop.entries;
}
function openFoldersSelector(state) {
  return state.OpenFolders;
}
function dockItemsSelector(state) {
  return state.DockItems;
}
function openFramesSelector(state) {
  return state.OpenFrames;
}
function openFilesSelector(state) {
  return state.OpenFiles;
}
function kindImageSelector(state) {
  return state.KindImg;
}
function leadAppSelector(state) {
  return state.leadApp;
}
function aboutInViewSelector(state) {
  return state.aboutView;
}
function loadingSelector(state) {
  return state.loading;
}
function skillsSelector(state) {
  return state.skills;
}
function projectsSelector(state) {
  return state.projects;
}
function contactSelector(state) {
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

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {

var macKindImage = {
    text: {
      src: 'psd/txt-type.png',
      appSrc: 'psd/sublime-text.png'
    },
    folder: {
      src: 'psd/folder.png',
      appSrc: 'psd/finder.png'
    },
    html: {
      src: 'psd/html-type.png',
      appSrc: 'psd/safari.png'
    },
    mail: {
      appSrc: 'psd/mail.png'
    },
    music: {
      appSrc: 'psd/vlc.png'
    }
  },
  windowKindImage = {
    text: {
      src: 'psd/txt-type.png',
      appSrc: 'psd/notepad.png'
    },
    folder: {
      src: 'psd/win-folder.png',
      appSrc: 'psd/win-folder.png'
    },
    html: {
      src: 'psd/html-type.png',
      appSrc: 'psd/microsoft-edge.png'
    },
    mail: {
      src: 'psd/mail.png'
    },
    music: {
      src: 'psd/vlc.png'
    }
  },
  skills = [{
    name: 'javascript',
    src: 'psd/javascript.png'
  }, {
    name: 'redux',
    src: 'psd/redux.png'
  }, {
    name: 'graphql',
    src: 'psd/graphql.png'
  }, {
    name: 'nodejs',
    src: 'psd/nodejs.png'
  }, {
    name: 'css',
    src: 'psd/css3.png'
  }, {
    name: 'html',
    src: 'psd/html.png'
  }, {
    name: 'mongodb',
    src: 'psd/mongodb.png'
  }, {
    name: 'rest',
    src: 'psd/rest-api.png'
  }, {
    name: 'git',
    src: 'psd/git.png'
  }, {
    name: 'lambda',
    src: 'psd/awslambda.png'
  }, {
    name: 'php',
    src: 'psd/php.png'
  }, {
    name: 'react',
    src: 'psd/react.png'
  }, {
    name: 'webpack',
    src: 'psd/webpack.png'
  }, {
    name: 'jest',
    src: 'psd/jest.png'
  }],
  projects = [{
    name: 'Akting',
    link: 'https://akting.abelkashoba.me',
    description: "Akting is a book keeping project that allow you to track your expense and your input to get a better view or picture of your spending pattern.",
    kind: 'html'
  }, {
    name: 'Mictam',
    link: "https://mictam.abelkashoba.me",
    description: "Mictam is an App that allow streaming of song Text. It's also a song book app",
    kind: 'html'
  }],
  state = {
    Desktop: {
      entries: [{
        kind: 'text',
        name: 'Skills',
        text: skills.map(function (skill) {
          return skill.name;
        }).join('\n')
      }, {
        name: 'Project',
        kind: 'folder',
        entries: projects.map(function (_ref) {
          var name = _ref.name,
            link = _ref.link,
            kind = _ref.kind;
          return {
            name: name,
            link: link,
            kind: kind
          };
        })
      }]
    },
    KindImg: {},
    OpenFolders: [],
    OpenFrames: [],
    OpenFiles: [],
    DockItems: [],
    skills: [],
    projects: [],
    contact: {
      mail: ['lebakashoba@hotmail.fr'],
      socials: [{
        src: 'psd/github.png',
        link: "https://github.com/JohnNkou"
      }, {
        src: 'psd/linkedin.png',
        link: "https://www.linkedin.com/in/leba-kashoba-124951153"
      }]
    },
    loading: ''
  },
  macDockItems = [{
    src: macKindImage.folder.appSrc
  }, {
    src: macKindImage.text.appSrc
  }],
  windowDockItems = [{
    src: windowKindImage.html.appSrc
  }, {
    src: windowKindImage.folder.appSrc
  }],
  leadApp = {
    name: 'Finder',
    kind: 'folder'
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

/***/ }),

/***/ "./src/utilis.js":
/*!***********************!*\
  !*** ./src/utilis.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function moveObject(toAttach, toMove) {
  if (!toAttach || !("textContent" in toAttach)) {
    throw Error("The first argument should be a Dom node");
  }
  if (!toMove || !"textContent" in toMove) {
    throw Error("The second argument should be a Dom node");
  }
  var body = document.body;
  toAttach.onmousedown = function (event) {
    var x = event.clientX,
      y = event.clientY,
      gcs = getComputedStyle(toMove),
      mL = parseInt(gcs.marginLeft, 10),
      mT = parseInt(gcs.marginTop, 10);
    if (mL) {
      toMove.style.left = mL + parseFloat(gcs.left) + "px";
      toMove.style.marginLeft = toMove.style.marginRight = '0px';
    }
    if (mT) {
      toMove.style.top = mT + parseFloat(gcs.top, 10) + "px";
      toMove.style.marginTop = toMove.style.marginBottom = '0px';
    }
    body.addEventListener('mouseup', upHandler);
    body.addEventListener('mousemove', moveHandler);
    function upHandler(event) {
      body.removeEventListener('mouseup', upHandler);
      body.removeEventListener('mousemove', moveHandler);
    }
    function moveHandler(event) {
      event.preventDefault();
      var nx = event.clientX,
        ny = event.clientY,
        dfX = nx - x,
        dfY = ny - y,
        newBx = parseFloat(gcs.left) + dfX,
        newBy = parseFloat(gcs.top) + dfY;
      x = nx;
      y = ny;
      toMove.style.left = newBx + "px";
      toMove.style.top = newBy + "px";
    }
  };
}
function Tower() {
  var topics = {},
    id = 0;
  this.subscribe = function (topic, fn) {
    if (!(topic in topics)) {
      topics[topic] = _defineProperty({}, id, fn);
    }
    topics[topic][id] = fn;
    return id++;
  };
  this.publish = function (topic, payload) {
    var subscriber;
    if (topic in topics) {
      for (var _id in topics[topic]) {
        subscriber = topics[topic][_id];
        subscriber(payload);
      }
    } else {
      console.error('topics dont have a', topic, 'topic');
      console.log(topics);
      throw Error("Unknown topic " + topic);
    }
  };
  this.unsubscribe = function (topic, id) {
    if (topic in topics) {
      if (id in topics[topic]) {
        return delete topics[topic][id];
      } else {
        throw Error("id ".concat(id, " not in topic ").concat(topic));
      }
    } else {
      throw Error("Unknown topic");
    }
  };
}
function animate() {
  var width = parseInt(this.gcp.width, 10),
    orWidth = width,
    dif = 40,
    node = this.node,
    self = this;
  requestAnimationFrame(move);
  function move() {
    if (width) {
      width = Math.max(width - 40, 0);
      node.style.width = width + "px";
      requestAnimationFrame(move);
    } else {
      self.setState({
        show: false
      });
      node.style.width = orWidth + "px";
    }
  }
}
function buttonsHandler(_ref) {
  var closeAction = _ref.closeAction,
    minimizeAction = _ref.minimizeAction,
    fullScreenAction = _ref.fullScreenAction,
    otherAction = _ref.otherAction;
  function handler(event) {
    var target = event.target,
      className = target.className,
      store = this.store,
      id = this.props.id,
      fullscreen = this.state.fullscreen,
      gcp = this.gcp;
    if (className.indexOf('close') != -1) {
      closeAction();
    } else if (className.indexOf('minimize') != -1) {
      this.animate();
      minimizeAction();
    } else if (className.indexOf('fullscreen') != -1) {
      if (!fullscreen) {
        this.top = parseInt(gcp.top, 10);
        this.width = parseInt(gcp.width, 10);
        this.height = parseInt(gcp.height, 10);
        this.left = parseInt(gcp.left, 10);
        this.node.style.top = "0px";
        this.node.style.left = '0px';
        this.node.style.width = window.innerWidth + "px";
        this.node.style.height = window.innerHeight - this.headerHeight + "px";
        this.setState({
          fullscreen: true
        });
      } else {
        this.node.style.top = this.top + "px";
        this.node.style.left = this.left + "px";
        this.node.style.width = this.width + "px";
        this.node.style.height = this.height + "px";
        this.setState({
          fullscreen: false
        });
      }
    }
    if (otherAction) {
      otherAction();
    }
  }
  return handler;
}
function setLeaderView(store, Tower) {
  var state = store.getState(),
    opens = state.OpenFolders.length + state.OpenFrames.length + state.OpenFiles.length;
  this.node.style.zIndex = 10;
  Tower.publish('newLeaderView', this.node);
}
exports.moveObject = moveObject;
exports.Tower = Tower;
exports.animate = animate;
exports.buttonsHandler = buttonsHandler;
exports.setLeaderView = setLeaderView;

/***/ }),

/***/ "./views/common.jsx":
/*!**************************!*\
  !*** ./views/common.jsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  _require = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"),
  unmountComponentAtNode = _require.unmountComponentAtNode,
  _require2 = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  useEffect = _require2.useEffect,
  useState = _require2.useState,
  _require3 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
  ReactReduxContext = _require3.ReactReduxContext,
  _require4 = __webpack_require__(/*! ../src/utilis.js */ "./src/utilis.js"),
  moveObject = _require4.moveObject,
  animate = _require4.animate,
  setLeaderView = _require4.setLeaderView,
  Tower = _require4.Tower;
var myTower = new Tower();
function Loading(props) {
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setState = _useState2[1],
    loadClass = show ? '' : 'whoosh';
  useEffect(function () {
    setState(false);
  }, [show]);
  return /*#__PURE__*/React.createElement("div", {
    id: "loading",
    className: loadClass
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/loading-circle.gif"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tight"
  }));
}
var MovableItem = /*#__PURE__*/function (_React$Component) {
  _inherits(MovableItem, _React$Component);
  var _super = _createSuper(MovableItem);
  function MovableItem(props, context) {
    var _this;
    _classCallCheck(this, MovableItem);
    _this = _super.call(this, props);
    _this.nodeRef = React.createRef();
    _this.headRef = React.createRef();
    _this.animate = animate.bind(_assertThisInitialized(_this));
    _this.state = {
      show: true,
      fullscreen: false
    };
    _this.setLeaderView = setLeaderView.bind(_assertThisInitialized(_this));
    _this.nodeClickHandler = _this.nodeClickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(MovableItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.node = this.nodeRef.current;
      this.head = this.headRef.current;
      this.gcp = getComputedStyle(this.node);
      this.subId = myTower.subscribe('newLeaderView', function (node) {
        if (_this2.node != node) {
          _this2.node.style.zIndex = 0;
        }
      });
      moveObject(this.head, this.node);
      this.setLeaderView(this.store, myTower);
    }
  }, {
    key: "nodeClickHandler",
    value: function nodeClickHandler(event) {
      this.setLeaderView(this.store, myTower);
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      myTower.unsubscribe('newLeaderView', this.subId);
      this.node.onclick = this.head.onclick = null;
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return MovableItem;
}(React.Component);
var Loader = /*#__PURE__*/function (_React$Component2) {
  _inherits(Loader, _React$Component2);
  var _super2 = _createSuper(Loader);
  function Loader(props) {
    var _this3;
    _classCallCheck(this, Loader);
    _this3 = _super2.call(this, props);
    _this3.state = {
      show: true
    };
    _this3.changeLink = _this3.changeLink.bind(_assertThisInitialized(_this3));
    return _this3;
  }
  _createClass(Loader, [{
    key: "changeLink",
    value: function changeLink() {
      var links = document.querySelectorAll('link'),
        cssLink = this.cssLink,
        link,
        head = document.querySelector('head');
      Array.prototype.forEach.call(links, function (link) {
        if (link.rel == 'stylesheet' && link.href.indexOf('common') == -1) {
          head.removeChild(link);
        }
      });
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssLink;
      head.appendChild(link);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;
      var _this$props = this.props,
        Status = _this$props.Status,
        setLoading = _this$props.setLoading,
        dispatch = _this$props.dispatch,
        currentTemplate = _this$props.currentTemplate,
        title = this.title,
        cssLink = this.cssLink,
        bundleSrc = this.bundleSrc,
        loaderName = this.loaderName;
      if (!title || !cssLink || !bundleSrc || !loaderName) {
        console.error("No title or link or bundleSrc, loaderName given", this);
        return;
      }
      document.title = title;
      if (!Status.getState()["".concat(loaderName, "Loaded")]) {
        console.log(loaderName, "not yet loaded, loading");
        var _location = location,
          protocol = _location.protocol,
          host = _location.host,
          link = "".concat(protocol, "//").concat(host, "/").concat(bundleSrc),
          xml = new XMLHttpRequest();
        xml.open('GET', link, true);
        if (this.onprogress) {
          xml.onprogress = this.onprogress;
        }
        xml.onload = function (event) {
          try {
            if (xml.status >= 200 && xml.status < 300) {
              dispatch(setLoading({
                template: ''
              }));
              eval(xml.response || xml.responseText);
              _this4.changeLink();
            } else {
              console.error("server returned bad status Code", xml.status);
              dispatch(setLoading({
                template: currentTemplate
              }));
            }
          } catch (e) {
            console.error("Error while parsing macBbundle", e.name, e.message, e.stack);
            dispatch(setLoading({
              template: currentTemplate
            }));
          }
        };
        xml.onerror = function (error) {
          dispatch(setLoading({
            template: currentTemplate
          }));
          console.error("Error while trying to load mac Template");
        };
        xml.send();
      } else {
        console.log(loaderName, 'already loaded, sending message');
        setTimeout(function () {
          _this4.changeLink();
          Status.setLoaded(loaderName);
          dispatch(setLoading({
            template: ''
          }));
          console.log("Message sent", Status.getState());
        }, 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Loader;
}(React.Component);
var MacLoading = /*#__PURE__*/function (_Loader) {
  _inherits(MacLoading, _Loader);
  var _super3 = _createSuper(MacLoading);
  function MacLoading(props) {
    var _this5;
    _classCallCheck(this, MacLoading);
    _this5 = _super3.call(this, props);
    _this5.barRef = React.createRef();
    _this5.progressRef = React.createRef();
    _this5.title = 'Abel Kashoba - Mac Template';
    _this5.cssLink = 'css/mac/main.css';
    _this5.bundleSrc = 'dist/macBundle.js';
    _this5.loaderName = 'mac';
    _this5.onprogress = _this5.onprogress.bind(_assertThisInitialized(_this5));
    return _this5;
  }
  _createClass(MacLoading, [{
    key: "onprogress",
    value: function onprogress(event) {
      if (event.lengthComputable) {
        this.progress.style.width = event.loaded / event.total * 100 + "%";
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.bar = this.barRef.current;
      this.progress = this.progressRef.current;
      _get(_getPrototypeOf(MacLoading.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "macLoading"
      }, /*#__PURE__*/React.createElement("div", {
        className: "first il vmid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "icon"
      }, /*#__PURE__*/React.createElement("img", {
        src: "psd/big-apple.png"
      })), /*#__PURE__*/React.createElement("div", {
        ref: this.barRef,
        className: "bar"
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.progressRef,
        className: "progress"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "tight vmid"
      }));
    }
  }]);
  return MacLoading;
}(Loader);
var WindowLoading = /*#__PURE__*/function (_Loader2) {
  _inherits(WindowLoading, _Loader2);
  var _super4 = _createSuper(WindowLoading);
  function WindowLoading(props) {
    var _this6;
    _classCallCheck(this, WindowLoading);
    _this6 = _super4.call(this, props);
    _this6.title = 'Abel Kashoba - Window Template';
    _this6.cssLink = 'css/window/main.css';
    _this6.bundleSrc = 'dist/windowBundle.js';
    _this6.loaderName = 'window';
    return _this6;
  }
  _createClass(WindowLoading, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "windowLoading"
      }, /*#__PURE__*/React.createElement("div", {
        className: "first il vmid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "icon"
      }, /*#__PURE__*/React.createElement("img", {
        src: "psd/big-window.png"
      })), /*#__PURE__*/React.createElement("div", {
        className: "animation"
      }, /*#__PURE__*/React.createElement("div", {
        className: "circle"
      }, /*#__PURE__*/React.createElement("img", {
        src: ""
      })), /*#__PURE__*/React.createElement("div", {
        className: "info"
      }, "Loading data"))), /*#__PURE__*/React.createElement("div", {
        className: "tight vmid"
      }));
    }
  }]);
  return WindowLoading;
}(Loader);
var CustomLoading = /*#__PURE__*/function (_Loader3) {
  _inherits(CustomLoading, _Loader3);
  var _super5 = _createSuper(CustomLoading);
  function CustomLoading(props) {
    var _this7;
    _classCallCheck(this, CustomLoading);
    _this7 = _super5.call(this, props);
    _this7.title = 'Abel Kashoba - Custom Template';
    _this7.cssLink = 'css/custom/main.css';
    _this7.bundleSrc = 'dist/customBundle.js';
    _this7.loaderName = 'custom';
    return _this7;
  }
  _createClass(CustomLoading, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "customLoading"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrapper il vmid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "il"
      }, /*#__PURE__*/React.createElement("img", {
        src: "psd/custom_loading.gif"
      })), /*#__PURE__*/React.createElement("div", {
        className: "status"
      }, /*#__PURE__*/React.createElement("span", null, "Loading"))), /*#__PURE__*/React.createElement("div", {
        className: "tight vmid"
      }));
    }
  }]);
  return CustomLoading;
}(Loader);
function Time(props) {
  var _useState3 = useState(new Date()),
    _useState4 = _slicedToArray(_useState3, 2),
    state = _useState4[0],
    setState = _useState4[1],
    dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    minutes = state.getMinutes(),
    minutesString = String(minutes).length > 1 ? minutes : "0".concat(minutes),
    dateString = "".concat(dayName[state.getDay()], " ").concat(state.getHours(), ":").concat(minutesString);
  useEffect(function () {
    var seconds = 60 - state.getSeconds(),
      counter;
    setTimeout(function () {
      setState(new Date());
      counter = setInterval(function () {
        setState(new Date());
      }, 60000);
    }, seconds);
    return function () {
      clearInterval(counter);
    };
  }, [true]);
  return /*#__PURE__*/React.createElement("div", {
    id: "time",
    className: "il"
  }, /*#__PURE__*/React.createElement("span", null, dateString));
}
exports.Loading = Loading;
exports.MovableItem = MovableItem;
exports.myTower = myTower;
exports.MacLoading = MacLoading;
exports.WindowLoading = WindowLoading;
exports.CustomLoading = CustomLoading;
exports.Time = Time;

/***/ }),

/***/ "./views/mac.jsx":
/*!***********************!*\
  !*** ./views/mac.jsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  useEffect = React.useEffect,
  useState = React.useState,
  _require = __webpack_require__(/*! ./common.jsx */ "./views/common.jsx"),
  Loading = _require.Loading,
  MovableItem = _require.MovableItem,
  myTower = _require.myTower,
  WindowLoading = _require.WindowLoading,
  CustomLoading = _require.CustomLoading,
  Time = _require.Time,
  _require2 = __webpack_require__(/*! ../src/utilis.js */ "./src/utilis.js"),
  moveObject = _require2.moveObject,
  Tower = _require2.Tower,
  animate = _require2.animate,
  buttonsHandler = _require2.buttonsHandler,
  setLeaderView = _require2.setLeaderView,
  _require3 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
  useSelector = _require3.useSelector,
  useDispatch = _require3.useDispatch,
  ReactReduxContext = _require3.ReactReduxContext,
  _require4 = __webpack_require__(/*! ../src/actionCreator.js */ "./src/actionCreator.js"),
  addEntry = _require4.addEntry,
  removeEntry = _require4.removeEntry,
  openFolder = _require4.openFolder,
  closeFolder = _require4.closeFolder,
  minimizeFolder = _require4.minimizeFolder,
  deminimizeFolder = _require4.deminimizeFolder,
  openFrame = _require4.openFrame,
  closeFrame = _require4.closeFrame,
  minimizeFrame = _require4.minimizeFrame,
  deminimizeFrame = _require4.deminimizeFrame,
  closeFile = _require4.closeFile,
  minimizeFile = _require4.minimizeFile,
  openFile = _require4.openFile,
  deminimizeFile = _require4.deminimizeFile,
  setLeadApp = _require4.setLeadApp,
  saveFile = _require4.saveFile,
  setAboutInView = _require4.setAboutInView,
  setLoading = _require4.setLoading,
  _require5 = __webpack_require__(/*! ../src/selector.js */ "./src/selector.js"),
  desktopEntriesSelector = _require5.desktopEntriesSelector,
  openFoldersSelector = _require5.openFoldersSelector,
  dockItemsSelector = _require5.dockItemsSelector,
  openFramesSelector = _require5.openFramesSelector,
  openFilesSelector = _require5.openFilesSelector,
  kindImageSelector = _require5.kindImageSelector,
  leadAppSelector = _require5.leadAppSelector,
  aboutInViewSelector = _require5.aboutInViewSelector,
  loadingSelector = _require5.loadingSelector;
function Root(props) {
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("title", null, "Abel Kashoba - Mac Template"), /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "css/mac/main.css"
  }), /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "css/common.css"
  }), /*#__PURE__*/React.createElement("meta", {
    name: "author",
    content: "Abel Kashoba"
  }), /*#__PURE__*/React.createElement("meta", {
    name: "description",
    content: "Abel Kashoba Mac Template is an MacOs like presentation of my Porfolio"
  })), /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("div", {
    id: "mac"
  }, /*#__PURE__*/React.createElement(App, null)), /*#__PURE__*/React.createElement("div", {
    id: "window"
  }), /*#__PURE__*/React.createElement("div", {
    id: "custom"
  }), /*#__PURE__*/React.createElement("script", {
    src: "dist/macBundle.js"
  }), /*#__PURE__*/React.createElement("script", {
    src: "dist/react_redux_thingsBundle.js"
  })));
}
function App(_ref) {
  var Status = _ref.Status;
  var mounted = false,
    loading = useSelector(loadingSelector),
    LoadingComponent = null,
    dispatch = useDispatch(),
    hide = loading != 'mac' ? true : false;
  if (loading == 'window') {
    LoadingComponent = /*#__PURE__*/React.createElement(WindowLoading, {
      Status: Status,
      dispatch: dispatch,
      setLoading: setLoading,
      currentTemplate: "mac"
    });
  } else if (loading == 'custom') {
    LoadingComponent = /*#__PURE__*/React.createElement(CustomLoading, {
      Status: Status,
      dispatch: dispatch,
      setLoading: setLoading,
      currentTemplate: "mac"
    });
  }
  useEffect(function () {
    var unSub = Status.subscribe('mac', function () {
        return dispatch(setLoading({
          template: 'mac'
        }));
      }),
      container = document.getElementById('mac');
    container.onclick = function (event) {
      myTower.publish('clear');
    };
    return function () {
      container.onclick = null;
      unSub();
    };
  }, [true]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Loading, null), /*#__PURE__*/React.createElement(Header, {
    hide: hide
  }), /*#__PURE__*/React.createElement(Desktop, {
    hide: hide
  }), /*#__PURE__*/React.createElement(DockItems, {
    hide: hide
  }), LoadingComponent);
}
function Header(props) {
  var hide = props.hide,
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "header",
    className: hideClass
  }, /*#__PURE__*/React.createElement(Apple, null), /*#__PURE__*/React.createElement(AppName, null), /*#__PURE__*/React.createElement(MenuAction, null), /*#__PURE__*/React.createElement(Time, null));
}
var Apple = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Apple, _React$PureComponent);
  var _super = _createSuper(Apple);
  function Apple(props, context) {
    var _this;
    _classCallCheck(this, Apple);
    _this = _super.call(this, props);
    _this.store = context.store;
    _this.state = {
      show: false,
      aboutInView: _this.store.getState().aboutView
    };
    _this.appleTogglerRef = React.createRef();
    _this.aboutTogglerRef = React.createRef();
    return _this;
  }
  _createClass(Apple, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      myTower.unsubscribe('clear', this.subId);
      this.unsubscribe();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var store = this.store;
      this.subId = myTower.subscribe('clear', function () {
        if (_this2.state.show) {
          _this2.setState({
            show: false
          });
        }
      });
      this.unsubscribe = store.subscribe(function () {
        var state = store.getState(),
          aboutInView = _this2.state.aboutInView;
        if (state.aboutView != aboutInView) {
          _this2.setState({
            aboutInView: state.aboutView
          });
        }
      });
      this.appleToggler = this.appleTogglerRef.current;
      this.aboutToggler = this.aboutTogglerRef.current;
      this.appleToggler.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this2.setState({
          show: !_this2.state.show
        });
      };
      this.aboutToggler.onclick = function (event) {
        var aboutInView = _this2.state.aboutInView;
        if (!aboutInView) {
          _this2.store.dispatch(setAboutInView({
            display: true
          }));
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$state = this.state,
        show = _this$state.show,
        aboutView = _this$state.aboutView,
        menuClass = "menu".concat(show ? '' : ' whoosh'),
        iconClass = "icon".concat(show ? ' active' : ''),
        appleBlackClass = show ? 'whoosh' : '',
        appleBlueClass = show ? '' : 'whoosh';
      return /*#__PURE__*/React.createElement("div", {
        id: "apple",
        className: "il"
      }, /*#__PURE__*/React.createElement("div", {
        className: iconClass
      }, /*#__PURE__*/React.createElement("a", {
        ref: this.appleTogglerRef,
        href: "#"
      }, /*#__PURE__*/React.createElement("img", {
        className: appleBlackClass,
        src: "psd/apple.png"
      }), /*#__PURE__*/React.createElement("img", {
        className: appleBlueClass,
        src: "psd/apple-white.png"
      }))), /*#__PURE__*/React.createElement("div", {
        className: menuClass
      }, /*#__PURE__*/React.createElement("div", {
        className: "menuText"
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.aboutTogglerRef
      }, "About Me")), /*#__PURE__*/React.createElement("div", {
        className: "menuText"
      }, /*#__PURE__*/React.createElement("span", null, "Change template"), /*#__PURE__*/React.createElement("img", {
        src: "psd/next.png"
      }), /*#__PURE__*/React.createElement("div", {
        className: "menu"
      }, /*#__PURE__*/React.createElement("div", {
        className: "menuText"
      }, /*#__PURE__*/React.createElement("a", {
        href: "?template=window",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          _this3.store.dispatch(setLoading({
            template: 'window'
          }));
        }
      }, "Windows")), /*#__PURE__*/React.createElement("div", {
        className: "menuText"
      }, /*#__PURE__*/React.createElement("a", {
        href: "?template=custom",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          _this3.store.dispatch(setLoading({
            template: 'custom'
          }));
        }
      }, "Custom"))))));
    }
  }]);
  return Apple;
}(React.PureComponent);
Apple.contextType = ReactReduxContext;
function AppName(props) {
  var MenuAction,
    appDetails = useSelector(leadAppSelector),
    _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setState = _useState2[1];
  if (appDetails.kind == 'folder') {
    MenuAction = /*#__PURE__*/React.createElement(FolderAction, {
      show: show
    });
  } else if (appDetails.kind == 'text') {
    MenuAction = /*#__PURE__*/React.createElement(FileAction, {
      show: show
    });
  } else if (appDetails.kind == 'html') {
    MenuAction = /*#__PURE__*/React.createElement(FrameAction, {
      show: show
    });
  } else {
    MenuAction = null;
  }
  useEffect(function () {
    var subId = myTower.subscribe('clear', function () {
      setState(false);
    });
    return function () {
      return myTower.unsubscribe('clear', subId);
    };
  }, [false]);
  return /*#__PURE__*/React.createElement("div", {
    id: "app",
    className: "il"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("span", _defineProperty({
    className: "vmid",
    onClick: function onClick(event) {
      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.preventDefault();
      setState(!show);
    }
  }, "className", "appName"), appDetails.name), /*#__PURE__*/React.createElement("div", {
    className: "tight vmid"
  })), MenuAction);
}
function FolderAction(_ref2) {
  var show = _ref2.show;
  var folders = useSelector(openFoldersSelector),
    showClose = folders.length && true,
    closeClass = showClose ? 'menuText' : 'menuText whoosh',
    dispatch = useDispatch(),
    nodeClass = "menu".concat(show ? '' : ' whoosh');
  return /*#__PURE__*/React.createElement("div", {
    className: nodeClass
  }, /*#__PURE__*/React.createElement("div", {
    className: closeClass
  }, /*#__PURE__*/React.createElement("span", {
    onClick: function onClick(event) {
      folders.forEach(function (x, id) {
        dispatch(closeFolder({
          id: id
        }));
      });
    }
  }, "Close")));
}
function FileAction(_ref3) {
  var show = _ref3.show;
  var files = useSelector(openFilesSelector),
    dispatch = useDispatch(),
    nodeClass = "menu".concat(show ? '' : ' whoosh');
  return /*#__PURE__*/React.createElement("div", {
    className: nodeClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "menuText"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      files.forEach(function (_ref4, id) {
        var kind = _ref4.kind;
        dispatch(closeFile({
          id: id,
          kind: kind
        }));
      });
    }
  }, "Close")));
}
function FrameAction(_ref5) {
  var show = _ref5.show;
  var frames = useSelector(openFramesSelector),
    dispatch = useDispatch(),
    nodeClass = "menu".concat(show ? '' : ' whoosh');
  return /*#__PURE__*/React.createElement("div", {
    className: nodeClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "menuText"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      frames.forEach(function (_ref6, id) {
        var link = _ref6.link,
          kind = _ref6.kind;
        dispatch(closeFrame({
          id: id,
          link: link,
          kind: kind
        }));
      });
    }
  }, "Close")));
}
function FileMenuAction() {
  var _useState3 = useState({
      active: false,
      payload: {}
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    state = _useState4[0],
    setState = _useState4[1],
    active = state.active,
    payload = state.payload,
    dispatch = useDispatch(),
    nameClass = "name".concat(active ? ' active' : ''),
    menuClass = "menu".concat(active ? '' : ' whoosh');
  useEffect(function () {
    var subId = myTower.subscribe('CURRENT FILE', function (payload) {
      setState({
        payload: payload,
        active: active
      });
    });
    myTower.publish('FileMenuMounted');
    return function () {
      return myTower.unsubscribe('CURRENT FILE', subId);
    };
  }, [true]);
  return /*#__PURE__*/React.createElement("div", {
    id: "menuAction",
    className: "il"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setState({
        active: !active,
        payload: payload
      });
    },
    className: nameClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "vmid"
  }, "File"), /*#__PURE__*/React.createElement("div", {
    className: "tight vmid"
  })), /*#__PURE__*/React.createElement("div", {
    className: menuClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "menuText",
    onClick: function onClick() {
      return dispatch(saveFile(payload));
    }
  }, /*#__PURE__*/React.createElement("span", null, "Save"))));
}
function MenuAction(props) {
  var appDetails = useSelector(leadAppSelector),
    ToolsAction;
  if (appDetails.kind == 'text') {
    ToolsAction = /*#__PURE__*/React.createElement(FileMenuAction, null);
  } else {
    ToolsAction = null;
  }
  return ToolsAction;
}
function Desktop(props) {
  var folders = useSelector(openFoldersSelector),
    frames = useSelector(openFramesSelector),
    files = useSelector(openFilesSelector),
    kindImages = useSelector(kindImageSelector),
    hide = props.hide,
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "desktop",
    className: hideClass
  }, /*#__PURE__*/React.createElement(List, {
    kindImages: kindImages
  }), folders.map(function (x, i) {
    return /*#__PURE__*/React.createElement(Folder, _extends({
      id: i
    }, x, {
      key: x.name,
      kindImages: kindImages
    }));
  }), frames.map(function (x, i) {
    return /*#__PURE__*/React.createElement(Safari, _extends({
      id: i
    }, x, {
      key: x.link
    }));
  }), files.map(function (x, i) {
    return /*#__PURE__*/React.createElement(SublimeText, _extends({
      id: i
    }, x, {
      key: x.name
    }));
  }), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(ContextMenu, null));
}
function List(_ref7) {
  var kindImages = _ref7.kindImages;
  var entries = useSelector(desktopEntriesSelector);
  return /*#__PURE__*/React.createElement("div", {
    className: "desktopItems"
  }, entries.map(function (o, i) {
    return /*#__PURE__*/React.createElement(DesktopItem, _extends({
      id: i
    }, o, {
      key: i,
      kindImages: kindImages
    }));
  }));
}
var DesktopItem = /*#__PURE__*/function (_React$Component) {
  _inherits(DesktopItem, _React$Component);
  var _super2 = _createSuper(DesktopItem);
  function DesktopItem(props, context) {
    var _this4;
    _classCallCheck(this, DesktopItem);
    _this4 = _super2.call(this, props);
    _this4.wrapRef = React.createRef();
    _this4.iconRef = React.createRef();
    _this4.state = {
      active: false
    };
    _this4.store = context.store;
    return _this4;
  }
  _createClass(DesktopItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this5 = this;
      this.wrap = this.wrapRef.current;
      this.icon = this.iconRef.current;
      this.subId = myTower.subscribe('clear', function () {
        var active = _this5.state.active;
        if (active) {
          _this5.setState({
            unactive: true
          });
        }
      });
      moveObject(this.icon, this.wrap);
      this.icon.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        myTower.publish('clear');
        var unactive = _this5.state.unactive;
        if (unactive === undefined) {
          _this5.setState({
            active: true
          });
        } else {
          _this5.setState({
            unactive: false
          });
        }
      };
      this.icon.ondblclick = function (event) {
        var _this5$props = _this5.props,
          src = _this5$props.src,
          name = _this5$props.name,
          id = _this5$props.id,
          kind = _this5$props.kind,
          text = _this5$props.text;
        if (kind == 'folder') _this5.store.dispatch(openFolder({
          desktopId: id,
          kind: kind
        }));else if (kind == 'text') {
          _this5.store.dispatch(openFile({
            name: name,
            text: text,
            kind: kind
          }));
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      myTower.unsubscribe('clear', this.subId);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
        state = this.state,
        kind = props.kind,
        name = props.name,
        kindImages = props.kindImages,
        active = state.active,
        unactive = state.unactive,
        wrapClass = "wrapper".concat(active ? ' active' : '').concat(unactive ? ' unactive' : '');
      return /*#__PURE__*/React.createElement("div", {
        className: "item il"
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.wrapRef,
        className: wrapClass
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.iconRef,
        className: "icon"
      }, /*#__PURE__*/React.createElement("img", {
        src: kindImages[kind].src
      })), /*#__PURE__*/React.createElement("div", {
        className: "text"
      }, /*#__PURE__*/React.createElement("span", null, name))));
    }
  }]);
  return DesktopItem;
}(React.Component);
DesktopItem.contextType = ReactReduxContext;
var Folder = /*#__PURE__*/function (_MovableItem) {
  _inherits(Folder, _MovableItem);
  var _super3 = _createSuper(Folder);
  function Folder(props, context) {
    var _this6;
    _classCallCheck(this, Folder);
    _this6 = _super3.call(this, props);
    _this6.store = context.store;
    return _this6;
  }
  _createClass(Folder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this7 = this;
      _get(_getPrototypeOf(Folder.prototype), "componentDidMount", this).call(this);
      var store = this.store,
        self = this,
        _this$props = this.props,
        id = _this$props.id,
        kind = _this$props.kind;
      this.header = document.getElementById('header');
      this.headerHeight = parseInt(getComputedStyle(this.header).height);
      this.unsubscribe = store.subscribe(function () {
        var state = _this7.store.getState(),
          id = _this7.props.id,
          openFolder = state.OpenFolders,
          thisFolder = openFolder[id];
        if (thisFolder && !thisFolder.minimized && !_this7.state.show) {
          _this7.node.style.width = _this7.gcp.width;
          _this7.setState({
            show: true
          });
        }
      });
      this.head.onclick = buttonsHandler({
        closeAction: function closeAction() {
          store.dispatch(closeFolder({
            id: id
          }));
        },
        minimizeAction: function minimizeAction() {
          store.dispatch(minimizeFolder({
            id: id
          }));
        },
        otherAction: function otherAction() {
          return _this7.setLeaderView(store, myTower);
        }
      }).bind(this);
      this.node.onclick = function (event) {
        var state = store.getState();
        _get(_getPrototypeOf(Folder.prototype), "nodeClickHandler", _this7).call(_this7, event);
        myTower.publish('clearContent');
        if (state.leadApp.kind != kind) {
          store.dispatch(setLeadApp({
            kind: kind
          }));
        }
      };
      this.setLeaderView(store, myTower);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(Folder.prototype), "componentWillUnmount", this).call(this);
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
        state = this.state,
        show = state.show,
        fullscreen = state.fullscreen,
        entries = props.entries,
        kindImages = props.kindImages,
        name = props.name,
        nodeClass = "folder il box".concat(show ? '' : ' whoosh', " ").concat(fullscreen ? 'full' : '');
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: nodeClass
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.headRef,
        className: "head"
      }, /*#__PURE__*/React.createElement(Buttons, null), /*#__PURE__*/React.createElement("div", {
        className: "currentFolder"
      }, /*#__PURE__*/React.createElement("div", {
        className: "icon il"
      }, /*#__PURE__*/React.createElement("img", {
        src: kindImages.folder.src
      })), /*#__PURE__*/React.createElement("div", {
        className: "name il"
      }, name))), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, entries.map(function (s, i) {
        return /*#__PURE__*/React.createElement(ContentItem, _extends({}, s, {
          key: i,
          kindImages: kindImages
        }));
      })), /*#__PURE__*/React.createElement("div", {
        className: "bottom"
      }));
    }
  }]);
  return Folder;
}(MovableItem);
Folder.contextType = ReactReduxContext;
var ContentItem = /*#__PURE__*/function (_React$Component2) {
  _inherits(ContentItem, _React$Component2);
  var _super4 = _createSuper(ContentItem);
  function ContentItem(props, context) {
    var _this8;
    _classCallCheck(this, ContentItem);
    _this8 = _super4.call(this, props);
    _this8.state = {
      active: false
    };
    _this8.nodeRef = React.createRef();
    _this8.store = context.store;
    return _this8;
  }
  _createClass(ContentItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this9 = this;
      var store = this.store;
      this.node = this.nodeRef.current;
      this.subId = myTower.subscribe('clearContent', function (node) {
        if (node != _this9.node) {
          var active = _this9.state.active;
          if (active) {
            _this9.setState({
              active: false
            });
          }
        }
      });
      this.node.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var active = _this9.state.active;
        myTower.publish('clearContent', _this9.node);
        if (!active) {
          _this9.setState({
            active: true
          });
        }
      };
      this.node.ondblclick = function (event) {
        var _this9$props = _this9.props,
          link = _this9$props.link,
          name = _this9$props.name,
          kind = _this9$props.kind;
        if (link) {
          store.dispatch(openFrame({
            link: link,
            name: name,
            kind: kind
          }));
        }
        event.preventDefault();
        event.stopPropagation();
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        kind = _this$props2.kind,
        name = _this$props2.name,
        kindImages = _this$props2.kindImages,
        active = this.state.active,
        listClass = "list".concat(active ? ' active' : '');
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: listClass
      }, /*#__PURE__*/React.createElement("div", {
        className: "icon il"
      }, /*#__PURE__*/React.createElement("img", {
        src: kindImages[kind].src
      })), /*#__PURE__*/React.createElement("div", {
        className: "name il"
      }, name));
    }
  }]);
  return ContentItem;
}(React.Component);
ContentItem.contextType = ReactReduxContext;
var Safari = /*#__PURE__*/function (_MovableItem2) {
  _inherits(Safari, _MovableItem2);
  var _super5 = _createSuper(Safari);
  function Safari(props, context) {
    var _this10;
    _classCallCheck(this, Safari);
    _this10 = _super5.call(this, props);
    _this10.inputRef = React.createRef();
    _this10.frameRef = React.createRef();
    _this10.store = context.store;
    return _this10;
  }
  _createClass(Safari, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this11 = this;
      _get(_getPrototypeOf(Safari.prototype), "componentDidMount", this).call(this);
      var store = this.store,
        self = this,
        _this$props3 = this.props,
        id = _this$props3.id,
        src = _this$props3.src,
        link = _this$props3.link,
        kind = _this$props3.kind;
      this.input = this.inputRef.current;
      this.frame = this.frameRef.current;
      this.header = document.getElementById('header');
      this.headerHeight = parseInt(getComputedStyle(this.header).height, 10);
      this.gcp = getComputedStyle(this.node);
      this.unsubscribe = store.subscribe(function () {
        var state = store.getState(),
          show = _this11.state.show,
          OpenFrames = state.OpenFrames,
          frame = OpenFrames[id];
        if (OpenFrames.length) {
          if (frame) {
            if (!frame.minimized && !show) {
              _this11.setState({
                show: true
              });
            }
          } else {
            console.error(OpenFrames, id);
          }
        }
      });
      this.head.onclick = buttonsHandler({
        closeAction: function closeAction() {
          _this11.unsubscribe();
          store.dispatch(closeFrame({
            link: link,
            kind: kind
          }));
        },
        minimizeAction: function minimizeAction() {
          store.dispatch(minimizeFrame({
            id: id
          }));
        },
        otherAction: function otherAction() {
          return _this11.setLeaderView(store, myTower);
        }
      }).bind(this);
      this.node.onclick = function (event) {
        var state = store.getState();
        _get(_getPrototypeOf(Safari.prototype), "nodeClickHandler", _this11).call(_this11, event);
        if (state.leadApp.kind != 'html') {
          store.dispatch(setLeadApp({
            kind: 'html'
          }));
        }
      };
      this.input.onchange = function (event) {
        _this11.frame.src = _this11.input.value;
      };
      this.setLeaderView(store, myTower);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(Safari.prototype), "componentWillUnmount", this).call(this);
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var link = this.props.link,
        _this$state2 = this.state,
        show = _this$state2.show,
        fullscreen = _this$state2.fullscreen,
        nodeClass = "safari il box".concat(show ? '' : ' whoosh', " ").concat(fullscreen ? 'full' : '');
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: nodeClass
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.headRef,
        className: "head"
      }, /*#__PURE__*/React.createElement(Buttons, null), /*#__PURE__*/React.createElement("div", {
        className: "url"
      }, /*#__PURE__*/React.createElement("input", {
        ref: this.inputRef,
        type: "text",
        placeholder: link
      }))), /*#__PURE__*/React.createElement("div", {
        className: "frame"
      }, /*#__PURE__*/React.createElement("iframe", {
        ref: this.frameRef,
        src: link
      })), /*#__PURE__*/React.createElement("div", {
        className: "bottom"
      }));
    }
  }]);
  return Safari;
}(MovableItem);
Safari.contextType = ReactReduxContext;
var SublimeText = /*#__PURE__*/function (_MovableItem3) {
  _inherits(SublimeText, _MovableItem3);
  var _super6 = _createSuper(SublimeText);
  function SublimeText(props, context) {
    var _this12;
    _classCallCheck(this, SublimeText);
    _this12 = _super6.call(this, props);
    _this12.store = context.store;
    _this12.textareaRef = React.createRef();
    return _this12;
  }
  _createClass(SublimeText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this13 = this;
      _get(_getPrototypeOf(SublimeText.prototype), "componentDidMount", this).call(this);
      var store = this.store,
        _this$props4 = this.props,
        id = _this$props4.id,
        name = _this$props4.name,
        text = _this$props4.text,
        kind = _this$props4.kind;
      this.textarea = this.textareaRef.current;
      this.header = document.getElementById('header');
      this.headerHeight = parseInt(getComputedStyle(this.header).height, 10);
      this.subId2 = myTower.subscribe('FileMenuMounted', function () {
        myTower.unsubscribe('FileMenuMounted', _this13.subId2);
        myTower.publish('CURRENT FILE', {
          id: id,
          name: name,
          text: text,
          kind: kind
        });
      });
      this.unsubscribe = store.subscribe(function () {
        var state = store.getState(),
          show = _this13.state.show,
          OpenFiles = state.OpenFiles,
          file = OpenFiles[id];
        if (file) {
          if (!file.minimized && !show) {
            _this13.setState({
              show: true
            });
          }
        }
      });
      this.head.onclick = buttonsHandler({
        closeAction: function closeAction() {
          _this13.unsubscribe();
          store.dispatch(closeFile({
            id: id
          }));
        },
        minimizeAction: function minimizeAction() {
          store.dispatch(minimizeFile({
            id: id
          }));
        },
        otherAction: function otherAction() {
          return _this13.setLeaderView(store, myTower);
        }
      }).bind(this);
      this.node.onclick = function (event) {
        var state = store.getState(),
          _this13$props = _this13.props,
          kind = _this13$props.kind,
          id = _this13$props.id,
          name = _this13$props.name,
          text = _this13$props.text;
        _get(_getPrototypeOf(SublimeText.prototype), "nodeClickHandler", _this13).call(_this13, event);
        if (state.leadApp.kind != kind) {
          store.dispatch(setLeadApp({
            kind: kind
          }));
        }
        myTower.publish('CURRENT FILE', {
          id: id,
          name: name,
          text: text,
          kind: kind
        });
      };
      this.textarea.value = text;
      this.textarea.onchange = function (event) {
        var _this13$props2 = _this13.props,
          kind = _this13$props2.kind,
          id = _this13$props2.id,
          name = _this13$props2.name,
          text = _this13$props2.text;
        myTower.publish('CURRENT FILE', {
          id: id,
          name: name,
          text: _this13.textarea.value,
          kind: kind
        });
      };
      this.setLeaderView(store, myTower);
      console.log('publish');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(SublimeText.prototype), "componentWillUnmount", this).call(this);
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        name = _this$props5.name,
        text = _this$props5.text,
        _this$state3 = this.state,
        show = _this$state3.show,
        fullscreen = _this$state3.fullscreen,
        nodeClass = "sublimeText il box".concat(show ? '' : ' whoosh', " ").concat(fullscreen ? 'full' : '');
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: nodeClass
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.headRef,
        className: "head"
      }, /*#__PURE__*/React.createElement(Buttons, null), /*#__PURE__*/React.createElement("div", {
        className: "fileName"
      }, /*#__PURE__*/React.createElement("span", null, name))), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("textarea", {
        ref: this.textareaRef
      })), /*#__PURE__*/React.createElement("div", {
        className: "bottom"
      }));
    }
  }]);
  return SublimeText;
}(MovableItem);
SublimeText.contextType = ReactReduxContext;
function Buttons() {
  return /*#__PURE__*/React.createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon il"
  }, /*#__PURE__*/React.createElement("img", {
    className: "close",
    src: "psd/mac-close.png"
  })), /*#__PURE__*/React.createElement("div", {
    className: "icon il"
  }, /*#__PURE__*/React.createElement("img", {
    className: "minimize",
    src: "psd/mac-minimize.png"
  })), /*#__PURE__*/React.createElement("div", {
    className: "icon il"
  }, /*#__PURE__*/React.createElement("img", {
    className: "fullscreen",
    src: "psd/mac-full-screen.png"
  })));
}
function ContextMenu(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "contextMenu menu whoosh"
  }, [{
    text: 'New Folder'
  }, {
    text: 'New Tact'
  }, {
    text: 'New Grace'
  }].map(function (_ref8, i) {
    var text = _ref8.text;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "menuText"
    }, /*#__PURE__*/React.createElement("span", null, text));
  }));
}
function DockItems(_ref9) {
  var hide = _ref9.hide;
  var docks = useSelector(dockItemsSelector),
    kindImages = useSelector(kindImageSelector),
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "docker",
    className: hideClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "il dockWrap"
  }, docks.map(function (o, i) {
    return /*#__PURE__*/React.createElement(Dock, _extends({}, o, {
      key: i,
      kindImages: kindImages
    }));
  })));
}
var Dock = /*#__PURE__*/function (_React$Component3) {
  _inherits(Dock, _React$Component3);
  var _super7 = _createSuper(Dock);
  function Dock(props, context) {
    var _this14;
    _classCallCheck(this, Dock);
    _this14 = _super7.call(this, props);
    _this14.state = {
      showIndicator: false
    };
    _this14.store = context.store;
    _this14.minimized = false;
    _this14.nodeRef = React.createRef();
    _this14.ids = [];
    return _this14;
  }
  _createClass(Dock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this15 = this;
      this.node = this.nodeRef.current;
      this.unsubscribe = this.store.subscribe(function () {
        var state = _this15.store.getState(),
          showIndicator = _this15.state.showIndicator,
          _this15$props = _this15.props,
          src = _this15$props.src,
          kindImages = _this15$props.kindImages,
          data;
        if (src == kindImages.folder.appSrc) {
          if (state.OpenFolders.length) {
            data = state.OpenFolders[0];
            _this15.ids = [0];
            if (!showIndicator) {
              _this15.setState({
                showIndicator: true
              });
            }
            if (!_this15.minimized && data.minimized) {
              _this15.minimized = true;
            }
          } else {
            if (showIndicator) {
              _this15.setState({
                showIndicator: false
              });
            }
            _this15.ids = [];
          }
        } else if (src == kindImages.html.appSrc) {
          if (state.OpenFrames.length) {
            if (_this15.ids.length != state.OpenFrames.length) {
              _this15.ids = state.OpenFrames.map(function (x, i) {
                return i;
              });
            }
            if (!showIndicator) {
              _this15.setState({
                showIndicator: true
              });
            } else if (state.OpenFrames.some(function (frame) {
              return frame.minimized;
            })) {
              if (!_this15.minimized) {
                _this15.minimized = true;
              }
            } else if (_this15.minimized) {
              _this15.minimized = false;
            }
          } else {
            if (showIndicator) {
              _this15.setState({
                showIndicator: false
              });
            }
            _this15.ids = [];
          }
        } else if (src == kindImages.text.appSrc) {
          if (state.OpenFiles.length) {
            if (_this15.ids.length != state.OpenFiles.length) {
              _this15.ids = state.OpenFiles.map(function (x, i) {
                return i;
              });
            }
            if (!showIndicator) {
              _this15.setState({
                showIndicator: true
              });
            } else if (state.OpenFiles.some(function (file) {
              return file.minimized;
            })) {
              if (!_this15.minimized) {
                _this15.minimized = true;
              }
            } else if (_this15.minimized) {
              _this15.minimized = false;
            }
          } else {
            if (showIndicator) {
              _this15.setState({
                showIndicator: false
              });
            }
            _this15.ids = [];
          }
        }
      });
      this.node.onclick = function (event) {
        var store = _this15.store,
          _this15$props2 = _this15.props,
          src = _this15$props2.src,
          kindImages = _this15$props2.kindImages,
          deminimizeAction;
        if (src == kindImages.folder.appSrc) {
          deminimizeAction = deminimizeFolder;
        } else if (src == kindImages.html.appSrc) {
          deminimizeAction = deminimizeFrame;
        } else if (src == kindImages.text.appSrc) {
          deminimizeAction = deminimizeFile;
        }
        if (_this15.minimized) {
          if (_this15.ids.length) {
            if (src == kindImages.folder.appSrc) {
              store.dispatch(deminimizeAction({
                id: _this15.ids[0]
              }));
            } else if (src == kindImages.html.appSrc) {
              store.getState().OpenFrames.forEach(function (frame, i) {
                if (frame.minimized) {
                  store.dispatch(deminimizeAction({
                    id: i
                  }));
                }
              });
            } else if (src == kindImages.text.appSrc) {
              store.dispatch(deminimizeAction({
                id: _this15.ids[0]
              }));
            }
            _this15.minimized = false;
          } else {
            throw Error("Item minimized but without an id");
          }
        } else {
          if (src == kindImages.folder.appSrc) {
            if (!_this15.ids.length) {
              var desktopEntries = store.getState().Desktop.entries,
                id = 0,
                length = desktopEntries.length;
              while (id < length) {
                if (desktopEntries[id].kind == 'folder') {
                  store.dispatch(openFolder({
                    desktopId: id
                  }));
                  break;
                }
                id++;
              }
            }
          }
        }
        event.preventDefault();
        event.stopPropagation();
      };
      if (this.props.active && !this.state.showIndicator) {
        this.setState({
          showIndicator: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
        state = this.state,
        src = props.src,
        active = props.active,
        hide = props.hide,
        showIndicator = state.showIndicator,
        indicatorClass = "indicator".concat(showIndicator || active ? '' : ' whine'),
        dockClass = "dock il".concat(showIndicator || active ? ' animate' : '', " ").concat(hide ? 'hide' : '');
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: dockClass
      }, /*#__PURE__*/React.createElement("div", {
        className: "icon"
      }, /*#__PURE__*/React.createElement("img", {
        src: src
      })), /*#__PURE__*/React.createElement("div", {
        className: indicatorClass
      }, /*#__PURE__*/React.createElement("span", null, ".")));
    }
  }]);
  return Dock;
}(React.Component);
Dock.contextType = ReactReduxContext;
var About = /*#__PURE__*/function (_MovableItem4) {
  _inherits(About, _MovableItem4);
  var _super8 = _createSuper(About);
  function About(props, context) {
    var _this16;
    _classCallCheck(this, About);
    _this16 = _super8.call(this, props);
    _this16.store = context.store;
    _this16.state = {
      display: _this16.store.getState().aboutView,
      presentation: true,
      skills: false,
      contact: false
    };
    _this16.changeView = _this16.changeView.bind(_assertThisInitialized(_this16));
    _this16.presRef = React.createRef();
    _this16.skillRef = React.createRef();
    _this16.contRef = React.createRef();
    _this16.closeRef = React.createRef();
    _this16.socialsRef = React.createRef();
    _this16.skills = _this16.store.getState().skills;
    _this16.contact = _this16.store.getState().contact;
    return _this16;
  }
  _createClass(About, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this17 = this;
      var store = this.store;
      this.pres = this.presRef.current;
      this.skill = this.skillRef.current;
      this.cont = this.contRef.current;
      this.close = this.closeRef.current;
      this.socials = this.socialsRef.current;
      this.unsubscribe = store.subscribe(function () {
        var state = store.getState(),
          display = _this17.state.display;
        if (display != state.aboutView) {
          _this17.setState({
            display: state.aboutView
          });
        }
      });
      _get(_getPrototypeOf(About.prototype), "componentDidMount", this).call(this);
      this.node.onclick = function (event) {
        return _get(_getPrototypeOf(About.prototype), "nodeClickHandler", _this17).call(_this17, event);
      };
      this.pres.onclick = function (event) {
        if (!_this17.state.presentation) {
          _this17.setState({
            presentation: true,
            skills: false,
            contact: false
          });
        }
      };
      this.skill.onclick = function (event) {
        if (!_this17.state.skills) {
          _this17.setState({
            skills: true,
            presentation: false,
            contact: false
          });
        }
      };
      this.cont.onclick = function (event) {
        if (!_this17.state.contact) {
          _this17.setState({
            contact: true,
            presentation: false,
            skills: false
          });
        }
      };
      this.close.onclick = function (event) {
        _this17.store.dispatch(setAboutInView({
          display: false
        }));
      };
      this.socials.onclick = function (event) {
        event.stopPropagation();
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(About.prototype), "componentWillUnmount", this).call(this);
      this.unsubscribe();
    }
  }, {
    key: "changeView",
    value: function changeView() {
      this.setState({
        display: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
        display = _this$state4.display,
        presentation = _this$state4.presentation,
        skills = _this$state4.skills,
        contact = _this$state4.contact,
        nodeClass = "about il box".concat(display ? '' : ' whoosh'),
        presClass = "tab il".concat(presentation ? ' active' : ''),
        pres2Class = "pres".concat(presentation ? '' : ' whoosh'),
        skillClass = "tab il".concat(skills ? ' active' : ''),
        skill2Class = "skills".concat(skills ? '' : ' whoosh'),
        contClass = "tab il".concat(contact ? ' active' : ''),
        cont2Class = "contact".concat(contact ? '' : ' whoosh'),
        skillsClass = 'skill il',
        iconClass = 'icon',
        nameClass = 'name',
        socialClass = 'social il';
      return /*#__PURE__*/React.createElement("div", {
        ref: this.nodeRef,
        className: nodeClass
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.headRef,
        className: "head"
      }, /*#__PURE__*/React.createElement("div", {
        className: "buttons"
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.closeRef,
        className: "icon il close"
      }, /*#__PURE__*/React.createElement("img", {
        onClick: this.changeView,
        src: "psd/mac-close.png"
      })), /*#__PURE__*/React.createElement("div", {
        className: "icon il minimize"
      }, /*#__PURE__*/React.createElement("img", {
        src: "psd/mac-minimize.png"
      })), /*#__PURE__*/React.createElement("div", {
        className: "icon il fullscreen"
      }, /*#__PURE__*/React.createElement("img", {
        src: "psd/mac-full-screen.png"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "tabs"
      }, /*#__PURE__*/React.createElement("div", {
        className: presClass
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.presRef
      }, "Presentation")), /*#__PURE__*/React.createElement("div", {
        className: skillClass
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.skillRef
      }, "Skills")), /*#__PURE__*/React.createElement("div", {
        className: contClass
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.contRef
      }, "Contact")))), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        className: pres2Class
      }, /*#__PURE__*/React.createElement("h1", null, "Hi, I'm Abel Kashoba"), /*#__PURE__*/React.createElement("p", null, "A software developer who like to build reliable app the scale well and are high preformant")), /*#__PURE__*/React.createElement("div", {
        className: skill2Class
      }, this.skills.map(function (_ref10) {
        var name = _ref10.name,
          src = _ref10.src;
        return /*#__PURE__*/React.createElement("div", {
          key: name,
          className: skillsClass
        }, /*#__PURE__*/React.createElement("div", {
          className: iconClass
        }, /*#__PURE__*/React.createElement("img", {
          src: src
        })), /*#__PURE__*/React.createElement("div", {
          className: nameClass
        }, name));
      })), /*#__PURE__*/React.createElement("div", {
        className: cont2Class
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrapper vmid il"
      }, /*#__PURE__*/React.createElement("div", {
        className: "mail"
      }, /*#__PURE__*/React.createElement("h2", null, "Mail"), /*#__PURE__*/React.createElement("span", null, this.contact.mail)), /*#__PURE__*/React.createElement("div", {
        ref: this.socialsRef,
        className: "socials"
      }, /*#__PURE__*/React.createElement("h2", null, "Socials"), this.contact.socials.map(function (_ref11) {
        var src = _ref11.src,
          link = _ref11.link;
        return /*#__PURE__*/React.createElement("div", {
          key: link,
          className: socialClass
        }, /*#__PURE__*/React.createElement("a", {
          target: "blank",
          href: link
        }, /*#__PURE__*/React.createElement("img", {
          src: src
        })));
      }))), /*#__PURE__*/React.createElement("div", {
        className: "tight vmid"
      }))));
    }
  }]);
  return About;
}(MovableItem);
About.contextType = ReactReduxContext;
exports.Root = Root;
exports.App = App;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./entry/mac.js"));
/******/ }
]);
//# sourceMappingURL=macBundle.js.map