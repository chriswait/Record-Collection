var app = angular.module("recordApp", ['templates','ngMaterial','ngMdIcons']);
app.controller("MainController", ["CollectionService", function(CollectionService) {
    CollectionService.load_collection();
}]);
