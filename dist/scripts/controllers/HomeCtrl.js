//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function HomeCtrl ($scope, ChatRooms, Message, Auth) {
      
      this.chatRooms    = ChatRooms;
      this.roomName     = null;
      this.msgContents  = null;    
      this.roomId       = null;
      this.getByRoomId  = Message.getByRoomId;
      this.send         = Message.send;
      this.roomClicked  = [];
          
/**
 * @function : getPromiseAndAct
 * @desc     : Get the promise, once you get the promise "then" store the value returned by
 *           : the promise in controller's chatContents. Use $apply to make sure when it gets updated,
 *           : angular knows and update the chatContents.
 * @param    : {object} this
 *  
 **/    
     this.getPromiseAndAct = function(that) {
         that.chatContents = this.getByRoomId(this.roomId);
         console.log(that.chatContents);
         //$scope.$apply();
        //this.getByRoomId(this.roomId).then(function(promiseValue) {
        //  that.chatContents = promiseValue.val();
        //  console.log(that.chatContents);
        //  $scope.$apply();
        //});    
      };
          
/**
 * @function : getChatContents
 * @desc     : This function updates the roomName with the active room. 
 *           : It calls the service message.getRoomId() to get the 
 *           : data(messages related to the active room) from firebase.
 *           : roomClicked[] array holds the roomId which is currently active.
 * @param    : {number, object} roomIdKey, room
 *  
 **/        
      this.getChatContents = function (roomId, room) {
          this.roomName = room.roomName;
          this.roomId   = roomId;
          //Store the reference for the controller's "this"
          var that = this;
          this.getPromiseAndAct(that);  
          this.roomClicked = [];
          this.roomClicked.push(roomId);
      };

/**
 * @function : sendChatContents
 * @desc     : This function updates chat contents in firebase. It calls the service send() to add the messages.
 *           : It also updates the active room chat contents in the browser.
 *  
 **/          
      this.sendChatContents = function () {
          var that = this;
          this.send(this.roomId, this.msgContents);
          this.msgContents = null;
          this.getPromiseAndAct(that);
     };
        
 
          
}

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'ChatRooms', 'Message', 'Auth', HomeCtrl]);
})();
