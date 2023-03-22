(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([["custom"],{

/***/ "./entry/custom.js":
/*!*************************!*\
  !*** ./entry/custom.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ../views/custom.jsx */ "./views/custom.jsx"),
  App = _require.App,
  _require2 = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"),
  render = _require2.render,
  React = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  _require3 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js"),
  createStore = _require3.createStore,
  _require4 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
  Provider = _require4.Provider,
  _require5 = __webpack_require__(/*! ../src/state.js */ "./src/state.js"),
  state = _require5.state,
  skills = _require5.skills,
  projects = _require5.projects,
  Reducer = __webpack_require__(/*! ../src/reducer.js */ "./src/reducer.js"),
  Status = __webpack_require__(/*! ../src/TemplateStatus.js */ "./src/TemplateStatus.js");
state.skills = skills;
state.projects = projects;
state.loading = 'custom';
Status.setLoaded('custom');
console.log(Status.getState());
var oldConsole = console.error;
console.error = function () {
  for (var _len = arguments.length, p = new Array(_len), _key = 0; _key < _len; _key++) {
    p[_key] = arguments[_key];
  }
  oldConsole.apply(this, arguments);
  var xml = new XMLHttpRequest();
  xml.open('POST', '/log', true);
  xml.setRequestHeader('content-type', 'application/json');
  xml.send(JSON.stringify(p));
};
var store = createStore(Reducer, state);
render( /*#__PURE__*/React.createElement(Provider, {
  store: store
}, /*#__PURE__*/React.createElement(App, {
  Status: Status
})), document.getElementById('custom'));

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
  }],
  projects = [{
    name: 'Akting',
    link: 'https://accounting.abelkashoba.me',
    description: "Akting is a book keeping project that allow you to track your expense and your input to get a better view or picture of your spending pattern.",
    kind: 'html'
  }, {
    name: 'Mictam',
    link: "https://mictam.abelkashoba.me",
    description: "Mictam is apn App that allow streaming of song Text. It's also a songBook app",
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

/***/ "./views/custom.jsx":
/*!**************************!*\
  !*** ./views/custom.jsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  _require = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
  useEffect = _require.useEffect,
  useState = _require.useState,
  _require2 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
  useDispatch = _require2.useDispatch,
  useSelector = _require2.useSelector,
  _require3 = __webpack_require__(/*! ./common.jsx */ "./views/common.jsx"),
  Loading = _require3.Loading,
  MacLoading = _require3.MacLoading,
  WindowLoading = _require3.WindowLoading,
  _require4 = __webpack_require__(/*! ../src/selector.js */ "./src/selector.js"),
  loadingSelector = _require4.loadingSelector,
  skillsSelector = _require4.skillsSelector,
  projectsSelector = _require4.projectsSelector,
  contactSelector = _require4.contactSelector,
  _require5 = __webpack_require__(/*! ../src/actionCreator.js */ "./src/actionCreator.js"),
  setLoading = _require5.setLoading;
var Root = /*#__PURE__*/function (_React$Component) {
  _inherits(Root, _React$Component);
  var _super = _createSuper(Root);
  function Root(props) {
    _classCallCheck(this, Root);
    return _super.call(this, props);
  }
  _createClass(Root, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("title", null, "Abel kashoba - Custom Template"), /*#__PURE__*/React.createElement("link", {
        rel: "stylesheet",
        href: "css/custom/main.css"
      }), /*#__PURE__*/React.createElement("link", {
        rel: "stylesheet",
        href: "css/common.css"
      }), /*#__PURE__*/React.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /*#__PURE__*/React.createElement("meta", {
        name: "author",
        content: "Abel Kashoba"
      }), /*#__PURE__*/React.createElement("meta", {
        name: "description",
        content: "Hi, I'm Abel Kashoba a web developer. This is my portfolio made with my custom template that showcase my skills and the project i've worked in"
      })), /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("div", {
        id: "custom"
      }, /*#__PURE__*/React.createElement(App, null)), /*#__PURE__*/React.createElement("div", {
        id: "window"
      }), /*#__PURE__*/React.createElement("div", {
        id: "mac"
      }), /*#__PURE__*/React.createElement("script", {
        src: "dist/react_redux_thingsBundle.js"
      }), /*#__PURE__*/React.createElement("script", {
        src: "dist/customBundle.js"
      })));
    }
  }]);
  return Root;
}(React.Component);
function App(props) {
  var loading = useSelector(loadingSelector),
    dispatch = useDispatch(),
    currentLoading = null,
    hide = loading == 'custom' ? false : true;
  if (loading) {
    if (loading == 'mac') {
      currentLoading = /*#__PURE__*/React.createElement(MacLoading, _extends({}, props, {
        dispatch: dispatch,
        setLoading: setLoading,
        currentTemplate: "custom"
      }));
    } else if (loading == 'window') {
      currentLoading = /*#__PURE__*/React.createElement(WindowLoading, _extends({}, props, {
        dispatch: dispatch,
        setLoading: setLoading,
        currentTemplate: "custom"
      }));
    }
  }
  useEffect(function () {
    console.log("APP rendered");
    var Status = props.Status,
      unsub = Status.subscribe('custom', function () {
        return dispatch(setLoading({
          template: 'custom'
        }));
      });
    return function () {
      return unsub();
    };
  }, [true]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    hide: hide
  }), /*#__PURE__*/React.createElement(Presentation, {
    hide: hide
  }), /*#__PURE__*/React.createElement(Skills, {
    hide: hide
  }), /*#__PURE__*/React.createElement(Projects, {
    hide: hide
  }), /*#__PURE__*/React.createElement(Footer, {
    hide: hide
  }), currentLoading);
}
var Header = /*#__PURE__*/function (_React$Component2) {
  _inherits(Header, _React$Component2);
  var _super2 = _createSuper(Header);
  function Header(props) {
    _classCallCheck(this, Header);
    return _super2.call(this, props);
  }
  _createClass(Header, [{
    key: "render",
    value: function render() {
      var hide = this.props.hide,
        className = hide ? 'whoosh' : '';
      return /*#__PURE__*/React.createElement("div", {
        id: "header",
        className: className
      }, /*#__PURE__*/React.createElement(TemplateChooser, null), /*#__PURE__*/React.createElement("div", {
        className: "tight vmid"
      }), /*#__PURE__*/React.createElement(ModeShift, null));
    }
  }]);
  return Header;
}(React.Component);
function TemplateChooser(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setState = _useState2[1],
    dispatch = useDispatch(),
    wrapClass = "wrapper".concat(show ? '' : ' whoosh');
  return /*#__PURE__*/React.createElement("div", {
    id: "templateChooser",
    className: "il vmid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "current il"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: function onClick(event) {
      setState(!show);
      event.preventDefault();
      event.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("span", null, "Custom Template"))), /*#__PURE__*/React.createElement("div", {
    className: "tight vmid"
  }), /*#__PURE__*/React.createElement("div", {
    className: wrapClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "list"
  }, /*#__PURE__*/React.createElement("a", {
    href: "?template=window",
    onClick: function onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(setLoading({
        template: 'window'
      }));
    }
  }, /*#__PURE__*/React.createElement("span", null, "Window"))), /*#__PURE__*/React.createElement("div", {
    className: "list"
  }, /*#__PURE__*/React.createElement("a", {
    href: "?template=mac",
    onClick: function onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(setLoading({
        template: 'mac'
      }));
    }
  }, /*#__PURE__*/React.createElement("span", null, "Mac")))));
}
function ModeShift(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "modeShift",
    className: "il"
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/Sun.png"
  }));
}
function SideBar(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "sideBar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side",
    id: "home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/homeIm.png"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Home")), /*#__PURE__*/React.createElement("div", {
    id: "ski",
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#ski"
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/skill.png"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Skill")), /*#__PURE__*/React.createElement("div", {
    id: "proj",
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#proj"
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/project.png"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Project")), /*#__PURE__*/React.createElement("div", {
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "psd/Asset_8.png"
  })), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "Contact")));
}
function Presentation(props) {
  var hide = props.hide,
    className = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "presentation",
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: "il"
  }, /*#__PURE__*/React.createElement("p", null, "Hi, I'm Abel Kashoba"), /*#__PURE__*/React.createElement("p", null, "A web developer. I like to build performant and reliable apps in the cloud. I do front-end and back end work and I'll be really excited to work with you")));
}
function Skills(props) {
  var skills = useSelector(skillsSelector),
    className = 'skill il',
    className2 = "icon",
    className3 = "name",
    hide = props.hide,
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "skill",
    className: hideClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "title il"
  }, /*#__PURE__*/React.createElement("h1", null, "Skills & certs")), /*#__PURE__*/React.createElement("div", {
    className: "skillwrapper"
  }, skills.map(function (_ref) {
    var src = _ref.src,
      name = _ref.name;
    return /*#__PURE__*/React.createElement("div", {
      key: name,
      className: className
    }, /*#__PURE__*/React.createElement("div", {
      className: className2
    }, /*#__PURE__*/React.createElement("img", {
      src: src
    })), /*#__PURE__*/React.createElement("div", {
      className: className3
    }, /*#__PURE__*/React.createElement("span", null, name)));
  })));
}
function Projects(props) {
  var projects = useSelector(projectsSelector),
    className = 'project',
    className2 = 'name il',
    className3 = 'description il',
    hide = props.hide,
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("div", {
    id: "project",
    className: hideClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "title il"
  }, /*#__PURE__*/React.createElement("h1", null, "Project")), /*#__PURE__*/React.createElement("div", {
    className: "projectWrapper"
  }, projects.map(function (_ref2) {
    var name = _ref2.name,
      description = _ref2.description,
      link = _ref2.link;
    return /*#__PURE__*/React.createElement("div", {
      key: name,
      className: className
    }, /*#__PURE__*/React.createElement("div", {
      className: className2
    }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("a", {
      target: "blank",
      href: link
    }, name))), /*#__PURE__*/React.createElement("div", {
      className: className3
    }, /*#__PURE__*/React.createElement("p", null, description)));
  })));
}
function Footer(props) {
  var contact = useSelector(contactSelector),
    socials = contact.socials,
    socialClass = 'social il',
    hide = props.hide,
    hideClass = hide ? 'whoosh' : '';
  return /*#__PURE__*/React.createElement("footer", {
    className: hideClass
  }, /*#__PURE__*/React.createElement("div", {
    id: "design",
    className: "il"
  }, "Built by Me"), /*#__PURE__*/React.createElement("div", {
    id: "socials",
    className: "il"
  }, socials.map(function (_ref3) {
    var src = _ref3.src,
      link = _ref3.link;
    return /*#__PURE__*/React.createElement("div", {
      key: link,
      className: socialClass
    }, /*#__PURE__*/React.createElement("a", {
      target: "blank",
      href: link
    }, /*#__PURE__*/React.createElement("img", {
      src: src
    })));
  })));
}
exports.Root = Root;
exports.App = App;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./entry/custom.js"));
/******/ }
]);
//# sourceMappingURL=customBundle.js.map