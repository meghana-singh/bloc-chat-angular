//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function beforeLoginCtrl ($scope, ChatRooms, Message, Auth, currentAuth) {  
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
        }).catch(function(error) {
           that.createUserErr = error;
           that.createUserMsg = "Oops! Unable to create account, so try again " + that.displayName;
        });
    };

    this.signIn = function () {
        var that = this;
        
        Message.signIn(this.email, this.password).then(function(user){
         that.createUserMsg = "Signed in as: " + user.displayName;
         that.succSignedIn  = true;
        }).catch(function(error){
           that.createUserMsg = "Oops! Try again!"; 
        });
    }
    
    this.signOut = function () {
        var that = this;
        Message.signOut();
        that.createUserMsg = "Signed Out";
        
    }
    
     this.deleteUser = function () {
         console.log("yet to implement");
     };
        
    firebase.auth().onAuthStateChanged(function(user) {
        //this.firebaseUser = user || currentAuth;
      if (user) {
        // User is signed in.
          console.log("User is signed in" + user.email)  ;
          console.log("User is signed in" + user.uid)  ;     
          console.log("User is signed in" + user.displayName)  ;     
      } else {
        // No user is signed in.
          console.log("No User is signed in")  ;
      }
    });
        
   }
    
 angular
    .module('blocChat')
    .controller('beforeLoginCtrl', ['$scope', 'ChatRooms', 'Message', 'Auth', 'currentAuth', beforeLoginCtrl]);
})();
