// Global Exception Handling of Ajax Calls 
var httpInterceptor = function ($provide, $httpProvider) {
    $provide.factory('httpInterceptor', function ($q, commonService) {
        return {
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                commonService.MessageBox(rejection.data, "Error");
                // TODO: Add Async client side logging 
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
};

// Angular module
var wlcApp = angular.module("wlcApp", []).config(httpInterceptor);





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