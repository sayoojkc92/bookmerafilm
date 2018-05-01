'use strict';

(function() {

class TheatreComponent {
  constructor($http,socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.Theatres = [];
    this.Movies = [];
    this.Cities = [];
    this.FilteredTheatres = [];
    this.Timings = [];
    this.selectedCity = '';
    this.selectedTheatres = [];
    this.movieTheatreList = [];
  }
  $onInit() {
    document.getElementById('defaultOpen').click();
    $('#multiselect').multiselect();
    $('#mdp-demo').multiDatesPicker({
      minDate: 0,
      maxDate: 5
    });
    console.log(document.getElementById('defaultOpen'));
    this.$http.get('/api/theatreendpoints').then(response => {
      this.Theatres = response.data;
      this.Cities = Object.keys(response.data.reduce(function(map, currentValue) {
        map[currentValue.City] = 1;
        return map;
      }, {}));
      console.log(this.Cities);
      this.socket.syncUpdates('theatreendpoint', this.Theatres);
    });

    this.$http.get('/api/findmovieendpoints').then(response => {
      this.Movies = response.data;
      //this.socket.syncUpdates('findmovieendpoint', this.Theatres);
    });
  }
  TabClicks($event, cityName) {

      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName('tabcontent');
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = 'none';
      }
      tablinks = document.getElementsByClassName('tablinks');
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
      }
      document.getElementById(cityName).style.display = 'block';
      $event.currentTarget.className += ' active';
  
  // Get the element with id='defaultOpen' and click on it
  //document.getElementById('defaultOpen').click();
  }
SaveTheatre() {
  this.$http.post('/api/theatreendpoints', {
    TheatreName: this.TheatreName,
    Location: this.Location,
    City: this.City
  });
}
RemoveTheatre(Theatres) {
  this.$http.delete('/api/theatreendpoints/' + Theatres._id);
}

CitySelected(selectedCity) {
  this.selectedTheatres = [];
  this.FilteredTheatres = this.Theatres.filter(function(item) {
    if(item.City === selectedCity) {
      return item;
    }

  }); 
  this.selectedCity = selectedCity;
  console.log(this.FilteredTheatres);
  //$('#mdp-demo').show()
}
AddTime() {
  var val = ($('#hour').val() + ':' + $('#mins').val() + ' ' + $('#ampm').val()); 
  console.log(val, this.Timings.indexOf(val));
  if (this.Timings.indexOf(val) === -1) {
    this.Timings.push(val);
  }

}
RemoveTime(t) {
  this.Timings = this.Timings.filter(function(item) {
    return t !== item;
  });

}
DelMovieSelected(DelMovieSelected) {
  this.movieTheatreList = $.unique(this.Movies.find(function(item) {
    return item._id === DelMovieSelected
  }).Theatres);
}
DeleteMovieMap(selectTheatre, DelMovieSelected) {
  console.log('Delete ', selectTheatre, DelMovieSelected);
  var movie = this.Movies.find(function(item) {
    return item._id === DelMovieSelected
  });
  movie.Theatres = movie.Theatres.filter(function(item) {
      return item !== selectTheatre
  });

  this.$http.put('/api/findmovieendpoints/'+movie._id, {
    Theatres: movie.Theatres
  });
}


SaveMovieMap(selectedMovie) {
  var context = this;
  $('#multiselect_to option').each(function() {
    context.selectedTheatres.push($(this).val());
  });
  //test ---- 
  var movie = this.Movies.find(function(t) {
    return selectedMovie === t._id;
  });
  console.log(movie);
  var dates = $('#mdp-demo').multiDatesPicker('getDates');
  console.log(dates);

  // movie.Theatres.find(function(element) {
    
  //   return element._id == 
  // });

  // var theatreData = {
  //   Timings: movie.Theatres.find
  // }
  this.$http.put('/api/findmovieendpoints/'+selectedMovie, {
    Active: true,
    Cities: movie.Cities.concat([this.selectedCity]),
    Theatres: movie.Theatres.concat(this.selectedTheatres),
    Timings: movie.Timings.concat(this.Timings),
    Dates: dates
  });
}
}


angular.module('yeomanappprojectApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
});
})();
