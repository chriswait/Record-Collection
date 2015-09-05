// Panel
angular.module("recordApp")
.directive("panel", function() {
    return {
        templateUrl: "panel/panel.html",
    };
})
.service("panel", function($mdSidenav) {
    var selected_item;

    // Called from record or track controllers
    var open_item = function(scope_object) {
        // store the selected panel item
        if (scope_object.track) {
            selected_item = scope_object.track;
            selected_item.type = "track";
        } else if (scope_object.record) {
            selected_item = scope_object.record;
            selected_item.type = "record";
        }

        // open the panel
        $mdSidenav('right').open();
    };

    var close = function() {
        $mdSidenav('right').close();
    };

    return {
        selected_item: function () {
            return selected_item;
        },
        open_item: open_item,
        close: close,
    };
})

.controller("PanelController", function($scope, $http, panel) {
    // Watch for changes to the selected item
    $scope.$watch(function() {
        return panel.selected_item();
    }, function(value) {
        $scope.selected_item = value;
    });

    $scope.save = function() {
        var url = '/update_item';
        $http({
            url: url,
            method: "GET",
            params: $scope.selected_item,
        }).then(function(response) {
            console.log(response);
            $scope.selected_item = response.data;
            panel.close();
        });
    };

    $scope.delete = function() {
        var url = '/delete_record';
        $http({
            url: url,
            method: "GET",
            params: $scope.selected_item,
        }).then(function(response) {
            console.log(response);
            // TODO: Update our collection
            panel.close();
        });
    };

});
