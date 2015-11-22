var app = angular.module("recordApp", ['templates','ngMaterial','ngMdIcons']);
app.controller("MainController", ["CollectionService", function(CollectionService) {
    CollectionService.load_collection();
}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('orange');
})
.config(function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
