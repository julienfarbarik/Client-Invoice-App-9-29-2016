var app = angular.module("reqForm", [ ]);
var HOST_PORT = 3000;

	app.controller("formController", function($scope)
	{
		$scope.clientID;
		$scope.startDate;
		$scope.endDate;
    $scope.rate = 300; //Current rate in dollars/hour

    $scope.jrespItems;

    $scope.sendGet = function()
    {
      $.getJSON("http://localhost:" + HOST_PORT + "/form/request?cid="+$scope.clientID
        +"&sdate="+$scope.startDate+"&edate="+$scope.endDate, function(jresp)
      {
        //jresp is json of entire response, includes multiple items
        $scope.jrespItems = jresp;

         //formats date of each item in response, from ISO to mm/dd/yyyy
        for (item in jresp)
        {
          var itemDate = new Date(jresp[item].date);
          jresp[item].date = "";
          var monthZero = "";
          var dayZero = "";

          if (itemDate.getMonth() < 9)
          {
            monthZero = "0";
          }
          if (itemDate.getDate() < 10)
          {
            dayZero = "0";
          }

          jresp[item].date += monthZero + (itemDate.getMonth()+1) + "/" + dayZero + itemDate.getDate() + "/" + itemDate.getFullYear();
        }

        //rebuilds table according to new jrespItems
        //Note: will not refresh correctly without $apply(), as sendGet() creates new $scope.jrespItems, which is
        //  not caught by $watchCollection
        $scope.$apply();

      });
    };
	});
