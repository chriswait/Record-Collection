// Add Dialog
angular.module("recordApp")
.directive("addDialog", function() {
})
.service("addDialog", function($mdDialog) {
    var AddDialogController =  function($scope, $mdDialog, $http, $q) {
        $scope.search_object = {
            query: "",
            selected_item: {},
        };

        $scope.add_selected_item = function() {
            var item = $scope.search_object.selected_item;
            var discogs_id = item.discogs_id;
            var data = {
                discogs_id: discogs_id,
            };
            $http({
                url: "/add_record",
                method: "GET",
                params: data
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
                method: "GET",
                params: data
            }).then(function(response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        };

    };

    var show_add_dialog = function(event) {
        $mdDialog.show({
            controller: AddDialogController,
            templateUrl: 'add_dialog/add_dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        }).then(function(result) {
            console.log(result);
            // TODO: Add the result to the connection on the client
        });
    };

    return {
        show_add_dialog: show_add_dialog,
    };
});
