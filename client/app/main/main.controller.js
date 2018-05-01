'use strict';
//import _ from 'lodash'
(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.Cities = ["Bangalore", "Kannur"];
      this.selectedMovie = {};
      this.$scope = $scope;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    // $onInit() {
    //   this.$http.get('/api/things')
    //     .then(response => {
    //       this.awesomeThings = response.data;
    //       this.socket.syncUpdates('thing', this.awesomeThings);
    //     });
    // }

    $onInit() {
      var context = this;
      function addEvent(booknow, data) {
        
        booknow.addEventListener('click', function() {
          console.log('Clicked ', data)
          context.selectedMovie = data;
          context.Cities = data.Cities;
          console.log(context.Cities); 
          context.$scope.$digest()
          $("#myModal").modal();  
          sessionStorage.setItem('bookingMovie', JSON.stringify(data));
        });
      }


      this.$http.get('/api/findmovieendpoints')
        .then(response => {
          //this.awesomeThings = response.data;
          //this.socket.syncUpdates('thing', this.awesomeThings);
          var movieList = response.data;
          for(var j=0; j < movieList.length; j++) {
            
           // (function(j) {

           
            var data = movieList[j];
            console.log(data.Cities)
          
            
            if(data.Active === false) {
                continue;
            }
        var card = document.createElement('div');
        card.classList.add('card');
        var image = document.createElement('img');
        image.setAttribute('src', 'http://image.tmdb.org/t/p/w500' + data.Poster);
        image.setAttribute('width', 150);
        image.classList.add('poster-image');
        //image.setAttribute('height', 200)
        var content = document.createElement('div');
        content.classList.add('content');
        var title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = data.MovieName;
        content.appendChild(title);


        var genreContainer = document.createElement('div');
        genreContainer.classList.add('genre-content');
        for (var i = 0; i< data.Genre.length; i++) {
            var Genre = document.createElement('div');
            Genre.classList.add('genre');
            Genre.innerHTML = data.Genre[i].name;
            genreContainer.appendChild(Genre);    
        }
        content.appendChild(genreContainer);
        var booknow = document.createElement('a');
        booknow.setAttribute('href', '/booking');
        booknow.innerHTML = 'book now';
        
        var booknowButton = document.createElement('button');
        booknowButton.classList.add('btn', 'btn-info', 'btn-lg');
        //booknowButton.setAttribute('data-toggle', 'modal');
        //booknowButton.setAttribute('data-target', '#myModal');
        booknowButton.innerHTML = 'Book now';

        addEvent(booknowButton, data);
        content.appendChild(booknowButton);

        //var genre = document.createElement('span')
        //genre.classList.add('Genre');
        //genre.innerHTML = data.genre[0]
        card.appendChild(image);
        card.appendChild(content);
        document.getElementById('container').appendChild(card);
     // })(j)
    }
  //here
  
  });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    CitySelected(selectedMovie) {

    }
  }

  angular.module('yeomanappprojectApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
