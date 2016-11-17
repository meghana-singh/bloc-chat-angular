(function() {
  function Auth($firebaseAuth) { 
     return $firebaseAuth();
  }

 angular
    .module('blocChat')
    .factory('Auth', ['$firebaseAuth', Auth]);
})();
