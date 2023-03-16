module.exports = {
	mode:process.env.NODE_ENV || 'development',
	entry:{
		custom:'./entry/custom.js',
		mac:'./entry/mac.js',
		window: './entry/window.js'
	},
	output:{
		filename:'[name]Bundle.js',
		path:__dirname+'/dist',
		environment:{
			arrowFunction:false,
			const:false,
			destructuring:false
		}
	},
	module:{
		rules:[
			{
				test:/\.jsx?$/, 
				exclude:/node_modules/,
				use:{
					loader:'babel-loader'
				}
			}
		]
	}
}
