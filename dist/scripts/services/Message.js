(function() {
  function Message($firebaseArray, $firebaseAuth, $cookies, Auth) {
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);
          
    var Message = {};
    var msgFirebaseObj = {};  
      
    Message.createUser = function(email, password) {
      // Create a new user
      return Auth.$createUserWithEmailAndPassword(email, password);
    };

    Message.signIn = function(email, password) {
      // Create a new user
      return Auth.$signInWithEmailAndPassword(email, password);
    };
      
    Message.signOut = function() {
      Auth.$signOut();  
    };
      
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //  $state.go("home");
          console.log("User is signed in" + user.email)  ;
          console.log("User is signed in" + user.uid)  ;     
          console.log("User is signed in" + user.displayName)  ;     
      } else {
        // No user is signed in.
          console.log("No User is signed in")  ;
      }
    });
    

 /**
 * @function : getByRoomId
 * @desc     : This function retrieves data from firebase. 
 *           : It retrieves all messages(objects) which match a specific room Id. 
 *           : This function is called when we want to display the contents of a 
 *           : chat room.
 * @param    : {number} roomIdKey
 * @return   : {Object} promise
 **/
     
    Message.getByRoomId = function (roomIdKey) {
         return firebase.database().ref().child('messages').orderByChild('roomID').equalTo(roomIdKey).once('value');        
    };
 
/**
 * @function : send
 * @desc     : This function adds chat messages to firebase database. 
 *           : It creates messages object and adds the object to the messages.
 * @param    : {number} roomIdKey
 **/      
    Message.send = function (roomIdKey, msgContents) {
        msgFirebaseObj = {
            content: msgContents,
            roomID:  roomIdKey,
            sentAt: Date(),
            //username: $cookies.get('blocChatCurrentUser')
            username: firebase.auth().currentUser.displayName
        };
        messages.$add(msgFirebaseObj).then(function(ref){
            var id = ref.key;
            console.log("added record with id " + id);
            messages.$indexFor(id); // returns location in the array
        });
    };  
      
    return Message;
  }
    
  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', '$firebaseAuth', '$cookies', 'Auth', Message]);
})();