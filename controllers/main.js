const express = require('express'),
app = express(),
{ TemplateRender } = require('./index.js'),
root = process.env.ROOT;

if(!root){
	throw Error("No root given in env");
}

app.set('views',`${root}/views`)
app.set('view engine','jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static(root,{ index:false}));
app.get('/health',(req,res)=>{
	res.status(200).end();
})
app.get('/',TemplateRender());

module.exports = app;