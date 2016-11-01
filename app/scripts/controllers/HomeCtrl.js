//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is MainCtrl
(function(){
    function HomeCtrl (ChatRooms) {
      this.chatRooms = ChatRooms;   
    }

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['ChatRooms', HomeCtrl]);
})();
