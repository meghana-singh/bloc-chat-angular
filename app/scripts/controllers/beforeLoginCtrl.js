//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function beforeLoginCtrl ($scope, ChatRooms, Message, Auth, currentAuth, $state) {  
        this.createUserMsg = null;
        this.createUserErr = null;
        this.email         = null;
        this.password      = null;
        this.displayName   = null;
        this.firebaseUser  = currentAuth;
        this.succSignedIn  = false;
        
    this.goCreateUser = function () {
        var that = this;
        // Create a new user
        Message.createUser(this.email, this.password).then(function(user){
           //that.createUserMsg = "User created with uid: " + firebaseUser.uid;
           //that.firebaseUser = firebaseUser;    
           that.createUserMsg = "Successfully created account for " + that.displayName;
            that.succSignedIn = true;
           
            user.updateProfile({
              displayName: that.displayName
            }).then(function() {
              // Update successful.
            }, function(error) {
              // An error happened.     
          });
          $state.go("home");
        }).catch(function(error) {
           that.createUserMsg = that.displayName + ", " + error.message;
        });
    };

    this.signIn = function () {
        var that = this;
        
        Message.signIn(this.email, this.password).then(function(user){
         that.createUserMsg = "Signed in as " + user.displayName;
         that.succSignedIn  = true;
         $state.go("home");    
        }).catch(function(error){
            that.createUserMsg = that.displayName + ", " + error.message;
        });
    }
    
    this.signOut = function () {
        Message.signOut();
        this.createUserMsg = "Signed Out";
        this.firebaseUser = null;
    }
    
     this.deleteUser = function () {
         console.log("yet to implement");
     };
        
        
   }
    
 angular
    .module('blocChat')
    .controller('beforeLoginCtrl', ['$scope', 'ChatRooms', 'Message', 'Auth', 'currentAuth', '$state', beforeLoginCtrl]);
})();
