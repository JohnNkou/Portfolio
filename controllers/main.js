const express = require('express'),
compression = require('compression'),
app = express(),
{ TemplateRender } = require('./index.js'),
root = process.env.ROOT;

if(!root){
	throw Error("No root given in env");
}

app.set('views',`${root}/views`)
app.set('view engine','jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(compression());
app.use(express.static(root,{ index:false}));
app.use(express.json());
app.get('/health',(req,res)=>{
	res.status(200).end();
})
app.post('/log',(req,res)=>{
	let headers = req.headers,
	userAgent = headers['user-agent'],
	body = req.body || {};

	if(Object.keys(body).length){
		console.log('userAgent:',userAgent);
		console.log(body);
	}
	res.end();
})
app.get('/',TemplateRender());

module.exports = app;