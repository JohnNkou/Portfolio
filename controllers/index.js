const { spawn, fork } = require('child_process');

function TemplateRender(){
	return (req,res,next)=>{
		let query = req.query || {},
		template = query.template;

		if(template){
			res.render(`${template}Server`);
		}
		else{
			res.render(`customServer`);
		}
	}
}

function CommitHandler(){
	return (req,res,next)=>{
		let body = req.body || {},
		refs = body.refs;

		if(refs){
			if(refs.indexOf('heads/master') != -1){
				let message = '',
				proc = spawn('git',['pull','Master','master'],{ timeout:8000 }),
				proc2;
				proc.stdout.on('data',(chunk)=>{
					message += chunk.toString();
				})
				proc.stderr.on('data',(chunk)=>{
					message += chunk.toString();
				})
				proc.on('exit',(code,signal)=>{
					if(code == 0){
						console.log("Git pull success",message);
						next();

						proc2 = fork('./controllers/start.js',{ env:process.env, isolated:true });
						proc2.on('message',(payload)=>{
							if(payload.started){
								console.log("Server with pid",proc2.pid,"started successfully");
								process.exit(0);
							}
						})
					}
					else{
						console.log("Git exited with an error",code,signal);
						console.log(message);
					}
				})
			}
			else{
				console.log("No master commit",body);
			}
			res.status(200).end();
		}
		else{
			console.log("No ref given",body);
			res.status(400).end();
		}
	}
}

function CloseServer(app){
	return (req,res,next)=>{
		app.__customServer.close();
	}
}

exports.TemplateRender = TemplateRender;
exports.CommitHandler = CommitHandler;
exports.CloseServer = CloseServer;