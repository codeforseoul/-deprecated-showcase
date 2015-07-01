angular.module('showcaseApp')
  .run(['$rootScope', 'parseSDK', function($rootScope, parseSDK) {
    $rootScope.currentUser = parseSDK.isLoggedIn();
  }])
