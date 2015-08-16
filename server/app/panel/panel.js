// Panel
angular.module("recordApp")
.directive("panel", function() {
    return {
        templateUrl: "panel/panel.html",
    };
})
.service("panel", function($mdSidenav) {
    var selected_item = {};
    
    // Called from record or track controllers
    var open_panel = function(scope_object) {
        // store the selected panel item
        if (scope_object.track) selected_item = scope_object.track;
        else if (scope_object.record) selected_item = scope_object.record;

        // open the panel
        $mdSidenav('right').open();
    };

    return {
        selected_item: function () {
            return selected_item;
        },
        open_panel: open_panel,
    };
})
.controller("PanelController", function($scope, panel) {
    $scope.selected_item = {};

    // Watch for changes to the selected item
    $scope.$watch(function() {
        return panel.selected_item();
    }, function(value) {
        $scope.selected_item = value;
    });
});
