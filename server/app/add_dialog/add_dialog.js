// Add Dialog
angular.module("recordApp")
.controller("AddDialogController", function($scope, $mdDialog, $http, $q) {
    $scope.search_object = {
        query: "",
        selected_item: null,
    };

    $scope.add_selected_item = function() {
        var item = $scope.search_object.selected_item;
        var discogs_id = item.id;
        var data = {
            discogs_id: discogs_id,
        };
        $http({
            url: "/add_record",
            method: "POST",
            data: data
        }).then(function(response) {
            $mdDialog.hide(response.data);
        });
    };

    $scope.search = function() {
        var defer = $q.defer();
        var query = $scope.search_object.query;
        var data = {
            query: query,
        };
        $http({
            url: "/search",
            method: "POST",
            data: data
        }).then(function(response) {
            defer.resolve(response.data.results);
        });
        return defer.promise;
    };

    $scope.focus_add_button = function() {
        angular.element(document.getElementById("add_button")).focus();
    };

})
.service("addDialog", ['$mdDialog', 'CollectionService', function($mdDialog, CollectionService) {

    var show_add_dialog = function(event) {
        $mdDialog.show({
            templateUrl: 'add_dialog/add_dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        }).then(function(result) {
            CollectionService.add_item_to_collection(result);
        });
    };

    return {
        show_add_dialog: show_add_dialog,
    };
}]);
