 
(function(){
    function ModalInstanceCtrl (ChatRooms, $uibModal, $uibModalInstance) {   
            
            this.createRoom = ChatRooms.createRoom;            
            this.roomName  = null;

/**
 * @function : ok
 * @desc     : This function calls the service function createRoom() which creates rooms in firebase.
 *           : This function is called when the ok button is clicked in the UIB modal.
 *           : $uibModalInstance.close() function is used for doing it.
 **/
            this.ok = function () {
                console.log(this.roomName);
                console.log("Modal chatRooms object: " + this.createRoom);
                $uibModalInstance.close(this.createRoom(this.roomName));
            };
/**
 * @function : cancel
 * @desc     : This function cancels the roomcreation. No room is created.
 *           : $uibModalInstance.dismiss() function is used for doing it.
 *           : This function is called when the cancel button is clicked in the UIB modal.
 **/
            this.cancel = function () {
                $uibModalInstance.dismiss({$value: 'cancel'});
            };
     }

    angular
    .module('blocChat')
    .controller('ModalInstanceCtrl', ['ChatRooms', '$uibModal', '$uibModalInstance', ModalInstanceCtrl]);
})();
  
