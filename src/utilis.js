function moveObject(toAttach,toMove){

	if(!toAttach || !("textContent" in toAttach)){
		throw Error("The first argument should be a Dom node");
	}
	if(!toMove || !("textContent") in toMove){
		throw Error("The second argument should be a Dom node");
	}

	let body = document.body;

	toAttach.onmousedown = (event)=>{
		let x = event.clientX,
		y = event.clientY,
		gcs = getComputedStyle(toMove),
		mL = parseInt(gcs.marginLeft,10),
		mT = parseInt(gcs.marginTop,10);

		if(mL){
			toMove.style.left = mL + parseFloat(gcs.left) + "px";
			toMove.style.marginLeft = toMove.style.marginRight = '0px';
		}
		if(mT){
			toMove.style.top = mT + parseFloat(gcs.top,10) + "px";
			toMove.style.marginTop = toMove.style.marginBottom = '0px';
		}

		body.addEventListener('mouseup',upHandler);
		body.addEventListener('mousemove',moveHandler);

		function upHandler(event){
			body.removeEventListener('mouseup',upHandler);
			body.removeEventListener('mousemove',moveHandler);
		}
		function moveHandler(event){
			event.preventDefault();

			let nx = event.clientX,
			ny = event.clientY,
			dfX = nx -x,
			dfY = ny -y,
			newBx = parseFloat(gcs.left) + dfX,
			newBy = parseFloat(gcs.top) + dfY;

			x = nx;
			y = ny;

			toMove.style.left = newBx + "px";
			toMove.style.top = newBy + "px"; 
		}
	}
}

function Tower(){
	let topics = {},
	id = 0;

	this.subscribe = (topic,fn)=>{
		if(!(topic in topics)){
			topics[topic] = {[id]:fn};
		}
		
		topics[topic][id] = fn;

		return id++;
	}
	this.publish = (topic,payload)=>{
		let subscriber;
		if(topic in topics){
			for(let id in topics[topic]){
				subscriber = topics[topic][id];
				subscriber(payload);
			}
		}
		else{
			console.error('topics dont have a',topic,'topic');
			console.log(topics);
			throw Error("Unknown topic "+topic);
		}
	}
	this.unsubscribe = (topic,id)=>{
		if(topic in topics){
			if(id in topics[topic]){
				return delete topics[topic][id];
			}
			else{
				throw Error(`id ${id} not in topic ${topic}`)
			}
		}
		else{
			throw Error("Unknown topic");
		}
	}
}

function animate(){
	let width = parseInt(this.gcp.width,10),
	orWidth = width,
	dif = 40,
	node = this.node,
	self = this;

	requestAnimationFrame(move);

	function move(){
		if(width){
			width = Math.max(width - 40,0);
			node.style.width = width + "px";
			requestAnimationFrame(move);
		}
		else{
			self.setState({ show: false });
			node.style.width = orWidth + "px";
		}
	}
}

function buttonsHandler({ closeAction, minimizeAction,fullScreenAction, otherAction }){

	function handler(event){
		let target = event.target,
		className = target.className,
		store = this.store,
		{ id } = this.props,
		{ fullscreen } = this.state,
		gcp = this.gcp;

		if(className.indexOf('close') != -1){
			closeAction();
		}
		else if(className.indexOf('minimize') != -1){
			this.animate();
			minimizeAction();
		}
		else if(className.indexOf('fullscreen') != -1){
			if(!fullscreen){
				this.top = parseInt(gcp.top,10);
				this.width = parseInt(gcp.width,10);
				this.height = parseInt(gcp.height,10);
				this.left = parseInt(gcp.left,10);

				this.node.style.top = "0px";
				this.node.style.left = '0px';
				this.node.style.width = window.innerWidth + "px";
				this.node.style.height = window.innerHeight - this.headerHeight + "px";

				this.setState({fullscreen:true});
			}
			else{
				this.node.style.top = this.top + "px";
				this.node.style.left = this.left + "px";
				this.node.style.width = this.width + "px";
				this.node.style.height = this.height + "px";
				this.setState({fullscreen:false});
			}
		}

		if(otherAction){
			otherAction();
		}
	}

	return handler;
}

function setLeaderView(store,Tower){
	let state = store.getState(),
	opens = state.OpenFolders.length + state.OpenFrames.length + state.OpenFiles.length;

	this.node.style.zIndex = 10;
	Tower.publish('newLeaderView',this.node);
}

exports.moveObject = moveObject;
exports.Tower = Tower;
exports.animate = animate;
exports.buttonsHandler = buttonsHandler;
exports.setLeaderView = setLeaderView;