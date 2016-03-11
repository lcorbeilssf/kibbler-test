var app =  angular.module('KibblerServices', []);

app.service('KibblerService', ['$http',  
function ($http) {
  var service = this;
  this.dogs = [];
  service.getDogs = function(){
      return this.dogs;
  };
   service.saveDogs = function(dogs) {
      this.dogs = dogs;
  };
  
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  
  function getContainerUrl() {
    return ENDPOINT_URL + 'containers/';
  }
  
  service.upload = function(data) {
    var fd = new FormData();
    fd.append('file', data);
    console.log(fd);
    return $http.post(getUrl()+"upload", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });

  };
  
  service.download = function(data) {
    console.log(data);
    var url = getContainerUrl()+"common/download/"+data.name;
    return url;
  };
  
  
}]);
  