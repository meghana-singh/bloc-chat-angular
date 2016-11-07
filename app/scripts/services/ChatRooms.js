(function() {
  function ChatRooms($firebaseArray, $uibModal, $document) {
      var ChatRooms = {};
      
      ChatRooms.all = null;
      
      var ref = firebase.database().ref().child("rooms");
      var rooms = $firebaseArray(ref);
      
      ChatRooms.all = rooms;
 
 /**
 * @function : createRoom
 * @desc     : This function creates rooms (object with a specific room name) in firebase. 
 *           : The room name is passed as parameter by the user.
 *           : 
 * @param    : {number} roomName
 **/
      ChatRooms.createRoom = function (roomName) {
          rooms.$add({ roomName: roomName }).then(function(ref) {
            var id = ref.key;
            console.log("added record with id " + id);
            rooms.$indexFor(id); // returns location in the array
          });
      };

    
      var animationsEnabled = true;
/**
 * @function : open
 * @desc     : This function opens the Angular's UI bootstrap model. 
 *           : $uibModal.open is used with its controller - ModalInstanceCtrl
 *           : and its respective template - modalContent.html
 *           : 
 * @param    : {number} size, parentSelector - I'm not using these, they are here just for future use.
 **/
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


