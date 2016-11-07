(function(){
    function ModalUsernameInstanceCtrl ($uibModal, $uibModalInstance, $cookies) {   
            
           // this.createRoom = ChatRooms.createRoom;            
            this.username  = null;

/**
 * @function : ok
 * @desc     : This function checks if the user entered a username. If yes, it saves the username in browser's cookie.
 *           : If the user has'nt entered a username, it does not close the window until he enters a name.
 *           : $uibModalInstance.close() function is used for doing it.
 **/
            this.ok = function () {
                console.log(this.username);
                if (this.username === null || this.username === "") {
                    alert("enter username please");
                } else {
                    $uibModalInstance.close($cookies.put('blocChatCurrentUser', this.username));
                }
            };
    }
    
    angular
    .module('blocChat')
    .controller('ModalUsernameInstanceCtrl', ['$uibModal', '$uibModalInstance', '$cookies', ModalUsernameInstanceCtrl]);
})();
  
