// Nav
angular.module("recordApp")
.directive("nav", function () {
    return {
        templateUrl: "nav/nav.html",
    };
})
.controller("NavController", ['$scope', 'addDialog', function($scope, addDialog) {
    $scope.show_add_dialog = function() {
        addDialog.show_add_dialog();
    };
}]);
