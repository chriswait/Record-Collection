var app = angular.module("recordApp", ['templates','ngMaterial','ngMdIcons']);
app.controller("MainController", ["CollectionService", function(CollectionService, $mdThemingProvider) {
    CollectionService.load_collection();
}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('orange')
    ;
/*
    .warnPalette('')
    .backgroundPalette('')
*/
});
