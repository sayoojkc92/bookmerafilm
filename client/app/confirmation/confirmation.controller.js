'use strict';

(function(){

class ConfirmationComponent {
  constructor() {
    this.Movie = JSON.parse(sessionStorage.getItem('bookingMovie'));
    this.Seats = sessionStorage.getItem('seats');
    this.TotalAmount = sessionStorage.getItem('amount');
  }
}

angular.module('yeomanappprojectApp')
  .component('confirmation', {
    templateUrl: 'app/confirmation/confirmation.html',
    controller: ConfirmationComponent,
    controllerAs: 'confirmationCtrl'
  });

})();
