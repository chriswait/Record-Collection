var app = angular.module("recordApp", ['templates']);

// Ensure django and angular templating doesn"t clash
app.config(function($interpolateProvider) {
    //$interpolateProvider.startSymbol("{[{");
    //$interpolateProvider.endSymbol("}]}");
});

app.controller("MainController", function($scope) {
});
