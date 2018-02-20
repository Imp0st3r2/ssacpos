/*GET options page for invoices*/
module.exports.index = function(req,res){
	res.render('options', {
		options : {
			'Create New Invoice' : '/products/create/',
			'View Older Invoices' : '/products/read/',
			'Back' : '/dashboard/'
		}
	});
}