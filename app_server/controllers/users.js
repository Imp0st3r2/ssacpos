/*GET users options page*/
module.exports.index = function(req,res){
	res.render('options', {
		options : {
			'Create New User' : '/users/create/',
			'List Users' : '/users/read/',
			'Back' : '/dashboard/'
		}
	});
}