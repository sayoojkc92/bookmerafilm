'use strict';

(function(){

class MoviesComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }
  SaveMovie() {
    this.$http.post('/api/movieendpoints',{
      MovieName: this.MovieName,
      Genre: this.Genre,
      Year: this.Year
    
    });
    //alert("Data Saved");
  }
}

angular.module('yeomanappprojectApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
