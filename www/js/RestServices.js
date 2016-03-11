var app =  angular.module('RESTConnection', []);
//app.constant('ENDPOINT_URL', 'https://zib-bka-ssfmaster.c9users.io/api/');
app.constant('ENDPOINT_URL', "https://kibbler-lcorbeilssf.c9users.io/api/");
app.service('FileService', ['$http', 'ENDPOINT_URL', 
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'files/';
  
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
  