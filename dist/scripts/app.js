//To advoid polluting of global namespace use IIFE (Immediately Invoking Function Expression)
//Have the Angular Modules, Apps, Controllers etc. inside the IIFE.

(function() {
    //To display different templates in the view (ui-view), UI Router is used.
    //Routing is organized around URLs. An application can be in different states which will determine what to display.
    //Configure the different states using Angular providers.
    //$locationProvide: Configures the applications path
    //$stateProvider: Configures the states name, URL route, controller and template.

    //Controllers are instantiated on an as-needed basis, when their corresponding scopes are created, i.e. when the user manually navigates to a //state via a URL, $stateProvider will load the correct template into the view, then bind the controller to the template's scope.

    function config($stateProvider, $locationProvider) {

         $locationProvider
             .html5Mode({
                 enabled: true, //!# display is disabled in the URL
                 requireBase: false
             });

         $stateProvider
             .state('home', {
                 url: '/home',
                 controller: 'HomeCtrl as home',
                 templateUrl: '/templates/home.html',
                 resolve: {
                      // controller will not be loaded until $requireSignIn resolves
                      // Auth refers to our $firebaseAuth wrapper in the factory below
                      "currentAuth": ['Auth', function(Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                          console.log("will be returning requireSignIn");
                        return Auth.$requireSignIn();
                      }]
                 }
             })
          .state("beforeLogin", {
              // the rest is the same for ui-router and ngRoute...
              url:'/beforeLogin',
              controller: 'beforeLoginCtrl as beforeLogin',
              templateUrl: 'templates/beforeLogin.html',
              resolve: {
                // controller will not be loaded until $waitForSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ['Auth', function(Auth) {
                  // $waitForSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                    console.log("will be returning waitForSignIn");
                  return Auth.$waitForSignIn(); 
                }]
              }
            });
        
    }

    function authCheck($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        //console.log(error);    
        if (error === "AUTH_REQUIRED") {
          console.log("authCheck returned error: " + error);    
          $state.go("beforeLogin");
        } else {
            console.log("authCheck did not return error " + error); 
        //    $state.go("beforeLogin");
        }
      });
    }

/**
 * @function : BlocChatCookies
 * @desc     : This function used uibModal to initiate the user to create a username for BlocChats.
 *           : Its called from the run() method of blocChat app module. run() is executed when the 
 *           : instance of the blocChat app is created. So before the user can start using blocChats
 *           : he is asked to create a username.
 **/
    function BlocChatCookies($cookies, $document, $uibModal) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        if (!currentUser || currentUser === '') {
          // Do something to allow users to set their username
           var parentElem = angular.element($document[0].querySelector('.modal-username-initiate'));
            console.log("parentelem: "+parentElem);
          
          $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'modalUsernameContent.html',
              controller: 'ModalUsernameInstanceCtrl',
              controllerAs: 'modalUser',
             // size: '',
              appendTo: parentElem
             // resolve: {
             //   //createRoom: function () {
             //   //  return this.ChatRooms.createRoom;
             //   //}
             // }
           }); 
        }
    }
    
    // By adding firebase to our app, $firebaseObject, $firebaseArray, and $firebaseAuth services are available to be injected into 
    // any controller, service, or factory. Calls to these functions are going to be asynchronus calls and hence will take time before 
    // data is available in our controller.
    //UI Router module, UI Bootstrapp, angular cookies wrapper & firebase to our application.
    angular
        .module('blocChat', ['ui.router', 'firebase', 'ui.bootstrap', 'ngSanitize', 'ngCookies']) 
        .config(config)
        //.run(['$cookies', '$document', '$uibModal', BlocChatCookies]);
        .run(['$rootScope', '$state', authCheck]);

})();
