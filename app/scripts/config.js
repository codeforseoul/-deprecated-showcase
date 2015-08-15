angular.module('showcaseApp')
  .run(['$rootScope', 'parseSDK', function($rootScope, parseSDK) {
    $rootScope.currentUser = parseSDK.isLoggedIn();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'signin' || toState.name === 'signup') {
        toParams.fromState = fromState;
        toParams.fromParams = fromParams;
      }
    });
  }])
