const app = require('./main.js'),
PORT = process.env.PORT || 80;

var server = app.listen(PORT);
app.__customServer = server;

if(process.send){
	process.send({started:true});
}
