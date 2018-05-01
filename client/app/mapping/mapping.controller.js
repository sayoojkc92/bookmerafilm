'use strict';

(function(){

class MappingComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('yeomanappprojectApp')
  .component('mapping', {
    templateUrl: 'app/mapping/mapping.html',
    controller: MappingComponent,
    controllerAs: 'mappingCtrl'
  });

})();
