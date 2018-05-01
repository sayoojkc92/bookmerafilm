'use strict';

(function () {

  class BookingComponent {
    constructor($http, $scope) {
      this.message = 'Hello';
      var seats = [];
      this.$http = $http;
      this.$scope= $scope;
      var selectedSeats = {};
      $(document).ready(function () {
        $('.seat').click(function () {
          $(this).toggleClass('seatselected');

          var seatno = $(this).attr('id');
          if (selectedSeats[seatno]) {
            delete selectedSeats[seatno];
          } else {
            selectedSeats[seatno] = 1;
          }
          seats.push(seatno);
          $scope.SeatNumbers = seats;
          var subTotal = Object.keys(selectedSeats).length*150;
          $('#totalSeats').text(Object.keys(selectedSeats).length)
          $('#seatNumbers').html(Object.keys(selectedSeats).join('-'));
          $('#amount').html('Rs: ' + subTotal);
          if (Object.keys(selectedSeats).length > 0) {
            $('#handlingFee').show();
          } else {
            $('#handlingFee').hide();
          }
          $('#totalAmount').html('Rs: ' + (subTotal != 0 ? parseInt(subTotal + 20) : 0));
        });
      });
    }

    SaveBooking() {
      if (this.$scope.SeatNumbers.length == 0) {
        return
      }
      console.log(this.$scope)
      sessionStorage.setItem('seats',this.$scope.SeatNumbers.join(','));
      sessionStorage.setItem('amount', $('#totalAmount').text());
      this.$http.post('/api/bookingendpoints', {
        MovieName: 'Raid',
        SeatNo: this.$scope.SeatNumbers
      });
      window.location.href = '/payment';
    }

  }

angular.module('yeomanappprojectApp')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent,
    controllerAs: 'bookingCtrl'
  });

})();
