//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is MainCtrl
(function(){
    function HomeCtrl (ChatRooms, Message) {
      this.chatContents = {};    
      this.chatRooms = ChatRooms; 
      this.getByRoomId = Message.getByRoomId; 
      this.messages = Message.messages;
          
      this.getChatContents = function (roomId) {
          this.chatContents = this.getByRoomId(roomId);
          
          console.log(this.chatContents);
          
          this.displayChatContents = this.chatContents[1].content;
          this.displayChatUser     = this.chatContents[1].username;
          this.displayChatSentAt   = this.chatContents[1].sentAT;
      };
        
      ////Display Chat Contents    
      //for (var i=1; i<this.chatContents.length; i++) {
      //  this.displayChatContents = this.chatContents[1].content;
      //}
      //      
      ////Display Chat User        
      //for (var i=1; i<this.chatContents.length; i++) {
      //  this.displayChatUser = this.chatContents[1].username;
      //}
      //  
      ////Display Chat SentAt    
      //for (var i=1; i<this.chatContents.length; i++) {
      //  this.displayChatSentAt = this.chatContents[1].sentAt;
      //}
        
    }

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['ChatRooms', 'Message', HomeCtrl]);
})();
