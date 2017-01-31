/******* ANGULAR JS MAIN SCRIPTS *************/

// Global Exception Handling of Ajax Calls 
var httpInterceptor = function ($provide, $httpProvider) {
    $provide.factory('httpInterceptor', function ($q) {
        return {
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                //MessageBox(rejection.data, "Error");
                // TODO: Add Async client side logging 
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
};

// Angular module
var wlcApp = angular.module("wlcApp", []).config(httpInterceptor);

// Common Service
wlcApp.service('CommonOpsService', function ($scope, $http, $window, $compile) {
    return {
        // Show message box.
        MessageBox: function (msj, title) {
            if (title == "Info") {
                SetMessageBoxValues("Info", msj, "box box-solid box-primary", "icon fa fa-info", "btn btn-primary");
            }
            else if (title == "Error") {
                SetMessageBoxValues("Error", msj, "box box-solid box-danger", "icon fa fa-ban", "btn btn-danger");
            }
            else if (title == "Warning") {
                SetMessageBoxValues("Warning", msj, "box box-solid box-warning", "icon fa fa-warning", "btn btn-warning");
            }
            else if (title == "Success") {
                SetMessageBoxValues("Success", msj, "box box-solid box-success", "icon fa fa-check", "btn btn-success");
            }

            $("#MessageBoxDiv").modal({
                position: 'center'
            });
        },

        // Set message box properties.
        SetMessageBoxValues: function (headerText, msj, solidClass, iconClass, buttonClass) {
            $('#MessageBoxHeaderContent').text(headerText);
            $('#MessageBoxBodyContent').text(msj);
            $('#MessageBoxSolid').addClass(solidClass);
            $('#MessageBoxIcon').addClass(iconClass);
            $('#MessageBoxCloseButton').addClass(buttonClass);
        },

        // Check current user is authenticated or not.
        IsAuthenticated: function () {
            $http.get('Account/IsAuthenticated')
                 .then(function successCallback(msg) {
                     if (msg == "Fail") {
                         FailAuthentication();
                         $scope.Authenticated = false;
                     }
                     else {
                         $scope.Authenticated = true;
                     }
                 }, function errorCallback(msg) {
                     FailAuthentication();
                     $scope.Authenticated = false;
                 });

            $scope.FailAuthentication = function () {
                $window.location.href = 'Account/Login';
            };
        },

        // Async Load Html Page from given url and inject it into container.
        PageLoad: function (url) {
            $scope.IsAuthenticated();
            if (!$scope.Authenticated)
                return;
            $http.get(url)
                 .then(function successCallback(msg) {
                     var templateElement = angular.element(msg.data);
                     var scope = $scope.$new(true);
                     var clonedElement = $compile(templateElement)(scope, function (clonedElement, scope) {
                         // Inject async loaded html into container div.
                         angular.element(document.querySelector('#mainContentDiv')).append(clonedElement);
                     });
                 })
        },

        // Async Load Html Page into Modal Dialog from given url.
        ModalLoad: function (url, baslik) {
            $scope.IsAuthenticated();
            if (!$scope.Authenticated)
                return;

            $http.get(url)
                 .then(function successCallback(msg) {
                     $scope.addItemModalDialogBodyDiv = msg;
                     $scope.addItemModalDialogHeader = baslik;
                     $("#addItemModalDialogDiv").modal({
                         position: 'center'
                     });
                 })
        },

        // Async Load DropDownList items.
        DropDownLoad: function (dropDownListId, url, selected) {
            $scope.IsAuthenticated();
            if (!$scope.Authenticated)
                return;

            $http.get(url)
                 .then(function successCallback(msg) {
                     $("#" + dropDownListId).html(msg.Data);
                 })
        }
    };
});

// MainController
wlcApp.controller('MainController', function ($scope,$rootScope) {

    $scope.Authenticated = true;
    $rootScope.master = {
        title: 'Main',
        description: 'Main Description'
    };

    $scope.PageLoad = function (url) {
        //CommonOpsService.PageLoad(url);
    };
}]);

wlcApp.controller('ListController', function ($rootScope) {
    //$("#masterTitle").html("<i class='fa fa-search'></i> Okul Listesi");
    //$("#masterDescription").text("Sistemde tanımlı okulları listeler.");

    $rootScope.master.title = 'List';
    $rootScope.master.description = 'List description'

    CommonOpsService.MessageBox("sadfasdfasdf", "Success");
}]);


}