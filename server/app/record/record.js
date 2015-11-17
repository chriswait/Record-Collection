// Record
angular.module("recordApp")
.directive("record", function($timeout, $window, $mdUtil) {
    var unexpanded_height = 0;
    return {
        replace: true,
        templateUrl: "record/record.html",
        link: function(scope, element) {
            var expanding_element;
            var expanded_height;
            scope.is_expanded = true;

            var get_current_height = function() {
                if (typeof expanding_element == "undefined") return undefined;
                var height = expanding_element[0].getBoundingClientRect().height;
                return height;
            };

            var resize_expanding_section = function() {
                if (scope.is_expanded) {
                    expanding_element[0].style.maxHeight = expanded_height;
                } else {
                    expanding_element[0].style.maxHeight = unexpanded_height + "px";
                }
            };

            scope.toggle = function() {
                scope.is_expanded = !scope.is_expanded;
                resize_expanding_section();
            };

            $timeout(function() {
                expanding_element = angular.element(element[0].getElementsByClassName("expand")[0]);
                expanded_height = get_current_height();
                scope.toggle();
            });

            scope.$watch(function(){
                   return $window.innerWidth;
                }, function(value) {
                    if (typeof expanding_element !== "undefined" && scope.is_expanded) {
                        expanding_element[0].style.maxHeight = "initial";
                        expanded_height = get_current_height();
                        expanding_element[0].style.maxHeight = expanded_height;
                    }
               });
        },
    };
})
.controller("RecordController", ['$scope','panel', function($scope, panel) {

    $scope.record.artist_names = $scope.record.artists.map(function(item) {
        return item.name;
    }).join(', ');

    $scope.panel = function(event) {
        event.stopPropagation();
        panel.open_item($scope);
    };
}]);
