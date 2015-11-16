// Record
angular.module("recordApp")
.directive("expand", function() {
    return {
        templateUrl: "expand/expand.html",
        replace: true,
        scope: {
            content: "=",
            expanded: "=",
        },
    };
});
