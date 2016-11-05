(function() {
  function Message($firebaseArray) {
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);
          
    var Message = {};
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
        
    return Message;
  }
    
  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();