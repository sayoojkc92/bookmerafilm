'use strict';

(function () {

  class findMovieComponent {
    constructor($http) {
      this.message = 'Hello';
      this.$http = $http;
      this.MovieData = [];
    }
addMovie()
   {
  
    this.$http.post('/api/findmovieendpoints',{
     Duration:this.MovieData.runtime,
     MovieName:this.MovieData.original_title,
     Genre:this.MovieData.genres,
     Poster:this.MovieData.poster_path,
     Year:this.MovieData.release_date,
     Active: false
  });
   alert('Data has been stored succesfully!!!!!');
}

SearchMovie() {
      this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=c7687fc647b393cd918581ee24c5e20f&query=' + this.MovieName + '&year=' + this.Year).then(response => {
        var MovieID = response.data.results[0].id;
        this.$http.get('https://api.themoviedb.org/3/movie/' + MovieID + '?api_key=c7687fc647b393cd918581ee24c5e20f').then(response => {
          this.MovieData = response.data;
          console.log(this.MovieData);
        });
      });
    }
  }

angular.module('yeomanappprojectApp')
    .component('findMovie', {
      templateUrl: 'app/findMovie/findMovie.html',
      controller: findMovieComponent,
      controllerAs: 'findMovieCtrl'
    });
  })();
