(function() {
  function Message($firebaseArray) {
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);
    var chatContents = null;
    
    return {
      getByRoomId: function (roomIdKey) {
        // Filter the messages by their room ID.
          firebase.database().ref().child('messages').orderByChild('roomID').equalTo(roomIdKey).once('value').then(function (snapshot){
             chatContents = snapshot.val();
             console.log(chatContents);
          });
          return chatContents;
      },
        messages: messages
    };
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();