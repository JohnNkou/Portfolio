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

exports.TemplateRender = TemplateRender;