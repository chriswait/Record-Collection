// Nav
angular.module("recordApp")
.directive("nav", function () {
    return {
        templateUrl: "nav/nav.html",
    };
})
.controller("NavController", ['$scope', 'addDialog', '$mdSidenav', function($scope, addDialog, $mdSidenav) {
    $scope.show_menu = function() {
        $mdSidenav("left").open();
    };
    $scope.show_add_dialog = function() {
        addDialog.show_add_dialog();
    };
}]);
