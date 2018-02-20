/*GET 'home' page */
module.exports.index = function(req,res){
	res.render('index', { title: 'Express'});
}

module.exports.dashboard = function(req,res){
	res.render('options', {
		header0 : "Administrator Dashboard",
		info : {
			'Manage Products' : 'Select this button to view, create, edit, or delete products',
			'Manage Invoices' : 'Select this button to view, create, edit, or delete invoices.',
			'Manage Users' : 'Select this button to view, create, edit, or delete users.',
			'Manage Reports' : 'Select this button to view Accounting and Transaction reports.'
		},
		options : {
			'Manage Products' : '/products/',
			'Manage Invoices' : '/invoices/',
			'Manage Users' : '/users/',
			'Manage Reports' : '/reports/',
			'Logout' : '/'
		}
	});
}