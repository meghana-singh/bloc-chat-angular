 
(function(){
    function ModalInstanceCtrl (ChatRooms, $uibModal, $uibModalInstance) {   
            
            this.createRoom = ChatRooms.createRoom;            
            this.roomName  = null;
            
            this.ok = function () {
                console.log(this.roomName);
                console.log("Modal chatRooms object: " + this.createRoom);
                $uibModalInstance.close(this.createRoom(this.roomName));
            };
            
            this.cancel = function () {
                $uibModalInstance.dismiss({$value: 'cancel'});
            };
     }

    angular
    .module('blocChat')
    .controller('ModalInstanceCtrl', ['ChatRooms', '$uibModal', '$uibModalInstance', ModalInstanceCtrl]);
})();
  
