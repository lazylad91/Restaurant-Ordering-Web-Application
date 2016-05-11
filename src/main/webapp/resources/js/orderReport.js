var orderReportApp = angular.module('orderReportPageApp',[]);

orderReportApp.controller('orderReportController', function($scope,$http) {
	$scope.csrfToken = {};
	
	$scope.initToken = function(name, token){
		console.log("In init");
		$scope.orders = {};
		$scope.csrfToken.name = name;
		$scope.csrfToken.token = token;
		$scope.fromDate = "2016-01-01";
		$scope.toDate = "2016-12-12";
		$scope.fromTime = "00:00";
		$scope.toTime = "00:00";
		//$scope.getAllItems();
	}

	$scope.getData = function(){

		var fromTime = new Date($scope.fromDate+" "+$scope.fromTime+":00");
		var toTime = new Date($scope.toDate+" "+$scope.toTime+":00");
		 if(fromTime>toTime/*&&toTime>new Date()*/){
		 	alert("Error");
		 } else {
			 var start = $scope.fromDate+" "+$scope.fromTime+":00";
			 var end = $scope.toDate+" "+$scope.toTime+":00";		
			 var xsrf = {
					_csrf : $scope.csrfToken.token,
					fromDate: start,
					toDate: end,
					sortBy: $scope.sortBy
				};
				$http({
					url:'./getOrderReport',
					method:'GET',
					 params: xsrf,
					responseType: "json",
					headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
					withCredentials : true
				}).success(function(data){
					console.log("getOrderReport"+data.length);
					$scope.orders = data;
					console.log("After");
				}).error(function(data){
					console.log("getOrderReport Error");
				});
		 }		

	}
});