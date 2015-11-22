// Record
angular.module("recordApp")
.directive("expand", function($timeout, $window) {
    var unexpanded_height = 0;
    return {
        restrict: "A",
        scope: {
            expand: '=',
        },
        link: function(scope, element) {
            var expanded_height;

            var store_current_expanded_height = function() {
                var height = element[0].getBoundingClientRect().height;
                expanded_height = height;
            };

            var resize_expanding_section = function() {
                if (scope.expand) {
                    element[0].style.opacity = 1;
                    element[0].style.maxHeight = expanded_height;
                } else {
                    element[0].style.opacity = 0;
                    element[0].style.maxHeight = unexpanded_height + "px";
                }
            };

            scope.$watch(
                function() {
                   return $window.innerWidth;
                }, function(value) {
                    if (typeof element !== "undefined" && scope.expand) {
                        element[0].style.maxHeight = "initial";
                        store_current_expanded_height();
                        element[0].style.maxHeight = expanded_height;
                    }
                }
            );

            scope.$watch(
                function() {
                   return scope.expand;
                }, function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        resize_expanding_section();
                    }
                }
            );

            // On first load, collapse after measuring height
            $timeout(function() {
                store_current_expanded_height();
                scope.expand = false;
                console.log("expand DONE");
            }, 0);
        },
    };
});
