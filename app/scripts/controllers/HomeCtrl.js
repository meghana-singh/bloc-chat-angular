//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function HomeCtrl ($scope, ChatRooms, Message) {
      
      this.chatRooms    = ChatRooms;
      this.roomName     = null;
      this.getByRoomId  = Message.getByRoomId;
    
/**
 * @function : getChatContents
 * @desc     : This function updates the roomName with the active room. 
 *           : It calls the service message.getRoomId() to get the 
 *           : data(messages related to the active room) from firebase.
 * @param    : {number, object} roomIdKey, room
 *  
 **/        
      this.getChatContents = function (roomId, room) {
          this.roomName = room.roomName;
          //Store the reference for the controller's "this"
          var that = this;
          
          //Get the promise, once you get the promise "then" store the value returned by
          //the promise in controller's chatContents. Use $apply to make sure when it gets updated,
          //angular knows and update the chatContents.
          this.getByRoomId(roomId).then(function(promiseValue) {
              that.chatContents = promiseValue.val();
              console.log(that.chatContents);
              $scope.$apply();
          });
      };
          
}

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'ChatRooms', 'Message', HomeCtrl]);
})();
