var number = 0;

function Status(){
	var macLoaded = false,
	windowLoaded = false,
	customLoaded = false,
	subscription = {
		'custom':{},
		'mac':{},
		'window':{}
	},
	id = 0;

	this.getState = ()=>({ macLoaded, windowLoaded, customLoaded });
	this.setLoaded = (template)=>{
		switch(template){
			case 'mac':
				macLoaded = true;
				break;;
			case 'window':
				windowLoaded = true;
				break;
			case 'custom':
				customLoaded = true;
				break;
			default:
				console.error("Unknwon template",template);
				return;
		}

		this.runSubscription(template);
	}
	this.subscribe = (template, fn)=>{
		if(!subscription[template]){
			console.error("Template",template,"not in subscription");
			return;
		}
		let oldId = id;

		subscription[template][id++] = fn;
		return ()=> delete subscription[template][oldId];
	}
	this.runSubscription = (template)=>{
		let subscribers = subscription[template];

		if(Object.keys(subscribers).length){
			for(let id in subscribers){
				subscribers[id]();
			}
		}
	}
	this.getSubscriptions = ()=> subscription;
}

module.exports = new Status();