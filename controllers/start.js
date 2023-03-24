const app = require('./main.js');

var server = app.listen(80);
app.__customServer = server;

if(process.send){
	process.send({started:true});
}