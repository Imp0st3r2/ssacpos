(function () {
	angular
		.module('ssacpos')
		.service('product', product);

	product.$inject = ['$window','$http'];
	function product ($window,$http) {
		var currentProduct = {};
		var getProductList = function(){
			return $http.get('/api/products');
		};
		var getProductById = function(productid){
			return $http.get('/api/products/'+productid);
		};
		var createProduct = function(product){
			return $http.post('/api/products',product);
		};
		var editProduct = function(cproduct){
			return $http.put('/api/products/'+cproduct._id,cproduct);
		};
		var deleteProduct = function(productid){
			return $http.delete('/api/products/'+productid);
		};
		var setProduct = function(cproduct){
			currentProduct = cproduct;
		};
		var getProduct = function(){
			return currentProduct;
		};
		var getCategoriesByBrand = function(brand){
			return $http.get('/api/products/categories/'+brand);
		};
		return {
			getProductList : getProductList,
			getProductById : getProductById,
			createProduct : createProduct,
			editProduct : editProduct,
			deleteProduct : deleteProduct,
			setProduct : setProduct,
			getProduct : getProduct,
			getCategoriesByBrand : getCategoriesByBrand
		};
	}
}) ();