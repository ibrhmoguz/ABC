wlcApp.controller('IndexController', function ($scope, $rootScope, $http, $compile, $window, commonService) {

    $scope.CheckAuthentication = function () {
        $http.get('Account/IsAuthenticated')
             .then(function successCallback(msg) {
                 if (msg == "Fail") {
                     FailAuthentication();
                     $rootScope.IsAuthenticated = false;
                 }
                 else {
                     $rootScope.IsAuthenticated = true;
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

    $scope.NavigatePage = function () {
        if ($window.location.href.indexOf("#") > -1) {
            var url = window.location.href;
            var method = url.substring(url.indexOf("#") + 1);
            $scope.PageLoad(method);
        }
    }

    $rootScope.IsAuthenticated = false;
    $scope.CheckAuthentication();
    $scope.NavigatePage();
});