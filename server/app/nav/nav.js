// Nav
angular.module("recordApp")
.directive("nav", function () {
    return {
        templateUrl: "nav/nav.html",
    };
})
.controller("NavController", ['$scope', 'panel', function($scope, panel) {
    $scope.add = function() {
        panel.add_item();
    };
}]);
