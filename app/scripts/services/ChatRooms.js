(function() {
  function ChatRooms($firebaseArray, $uibModal, $document) {
      var ChatRooms = {};
      
      ChatRooms.all = null;
      
      var ref = firebase.database().ref().child("rooms");
      var rooms = $firebaseArray(ref);
      
      ChatRooms.all = rooms;
      
      ChatRooms.createRoom = function (roomName) {
          rooms.$add({ roomName: roomName }).then(function(ref) {
            var id = ref.key;
            console.log("added record with id " + id);
            rooms.$indexFor(id); // returns location in the array
          });
      };

      var animationsEnabled = true;

      ChatRooms.open = function (size, parentSelector) {
         // var parentElem = parentSelector ? 
          //angular.element($document[0].querySelector('.modal-initiate ' + parentSelector)) : undefined;
            var parentElem = angular.element($document[0].querySelector('.modal-initiate '));
            console.log("parentelem: "+parentElem);
          //var modalInstance = $uibModal.open({
          $uibModal.open({
              animation: animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'modalContent.html',
              controller: 'ModalInstanceCtrl',
              controllerAs: 'modal',
              size: size,
              appendTo: parentElem,
              resolve: {
                //createRoom: function () {
                //  return this.ChatRooms.createRoom;
                //}
              }
       });
      };       
          
      return ChatRooms;    
      
  }

  angular
    .module('blocChat')
    .factory('ChatRooms', ['$firebaseArray', '$uibModal', '$document', ChatRooms]);
})();


//      rooms.$add({ Room: "This is room" }).then(function(ref) {
//            var id = ref.key;
//            console.log("added record with id " + id);
//            rooms.$indexFor(id); // returns location in the array
//          });
//      
//      rooms.$add({NewRoom: "Just adding and not calling the then function"});
