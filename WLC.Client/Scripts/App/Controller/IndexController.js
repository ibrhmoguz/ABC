wlcApp.controller('IndexController', function ($scope, $rootScope, $http, $compile, commonOpsService) {

    $scope.CheckAuthentication = function () {
        $http.get('Account/IsAuthenticated')
             .then(function successCallback(msg) {
                 if (msg == "Fail") {
                     FailAuthentication();
                     $rootScope.IsAuthenticated = false;
                 }
                 else {
                     $rootScope.IsAuthenticated = true;
                     // alert("CheckAuthentication:" + $rootScope.IsAuthenticated);
                 }
             }, function errorCallback(msg) {
                 FailAuthentication();
                 $rootScope.IsAuthenticated = false;
             });
    };

    $scope.FailAuthentication = function () {
        $window.location.href = 'Account/Login';
    };

    $scope.PageLoad = function (url) {

        $scope.CheckAuthentication();
        if (!$rootScope.IsAuthenticated)
        {
            alert("not authenticate");
            return;
        }

        $http.get(url)
             .then(function successCallback(msg) {
                 var templateElement = angular.element(msg.data);
                 var scope = $scope.$new(true);
                 var clonedElement = $compile(templateElement)(scope, function (clonedElement, scope) {
                     // Inject async loaded html into container div.
                     $('#mainContentDiv').html(clonedElement);
                 });
             })
    };

    $rootScope.IsAuthenticated = false;
    $scope.CheckAuthentication();
});