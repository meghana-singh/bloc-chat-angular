//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function HomeCtrl (ChatRooms, Message) {
      this.chatContents = {};    
      this.roomName     = null;
        
      this.chatRooms = ChatRooms; 
      this.messages = Message.messages;
      
      this.getChatContents = function (roomId) {
          this.chatContents = Message.getByRoomId(roomId);
          console.log(this.chatContents);
      };
        
    }

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['ChatRooms', 'Message', HomeCtrl]);
})();
