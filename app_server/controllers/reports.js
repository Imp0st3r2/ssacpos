/*GET reports options page*/
module.exports.index = function(req,res){
	res.render('options', {
		options : {
			'View Daily Report' : '/reports/daily/',
			'View Weekly Report' : '/reports/weekly/',
			'View Monthly Report' : '/reports/monthly/',
			'View Quarterly Report' : '/reports/quarterly/',
			'View Yearly Report' : '/reports/yearly/',
			'View Custom Report' : '/reports/custom/',
			'Back' : '/dashboard/'
		}
	});
}