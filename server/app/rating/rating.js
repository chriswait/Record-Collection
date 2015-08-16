// Rating
angular.module("recordApp")
.directive('rating', function() {
    return {
        restrict: 'E',
        templateUrl: 'rating/rating.html',
        scope: {
            ratingValue: '=?',
            readonly: '=?'
        },
        link: function(scope, element, attributes) {
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < 5; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }
            scope.toggle = function(index) {
                if (scope.readonly === undefined || scope.readonly === false){
                    scope.ratingValue = index + 1;
                }
            };
            scope.$watch('ratingValue', function(oldValue, newValue) {
                updateStars();
            });
        }
    };
});
