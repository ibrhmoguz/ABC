// Global Exception Handling of Ajax Calls 
var httpInterceptor = function ($provide, $httpProvider) {
    $provide.factory('httpInterceptor', function ($q, commonService) {
        return {
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                commonOpsService.MessageBox(rejection.data, "Error");
                // TODO: Add Async client side logging 
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
};

// Angular module
var wlcApp = angular.module("wlcApp", []).config(httpInterceptor);

//wlcApp.config(['$routeProvider', function ($routeProvider) {
//    var viewBase = '/app/customersApp/views/';

//    $routeProvider
//        .when('/Liste', {
//            controller: 'CustomersController',
//            templateUrl: viewBase + 'customers/customers.html',
//            controllerAs: 'vm'
//        })
//        .when('/Rapord', {
//            controller: 'CustomerOrdersController',
//            templateUrl: viewBase + 'customers/customerOrders.html',
//            controllerAs: 'vm'
//        })
//        .otherwise({ redirectTo: '/customers' });

//}]);





///******* COMMON FUNCTIONS *************/
//$(document).bind("ajaxSend", function () {
//    ShowLoadingAnimation();
//}).bind("ajaxComplete", function () {
//    HideLoadingAnimation();
//}).bind("ajaxError", function (event, jqxhr, settings, thrownError) {
//    HideLoadingAnimation();
//});

//function ShowLoadingAnimation() {
//    $('#LoadingDiv').modal({ position: 'center' });
//}

//function HideLoadingAnimation() {
//    $("#LoadingDiv").modal('hide');
//}

//function HideAddItemModalDialog() {
//    $("#addItemModalDialogDiv").modal('hide');