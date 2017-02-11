var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.moveColumns']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', '$q', 'uiGridConstants', function ($scope, $http, $interval, $q, uiGridConstants) {
  var fakeI18n = function( title ){
    var deferred = $q.defer();
    $interval( function() {
      deferred.resolve( 'col: ' + title );
    }, 1000, 1);
    return deferred.promise;
  };
  
  $scope.radioInitial = false;
  $scope.isUserSelectDisable = true;
  $scope.selectedUser = [];
  
  $scope.selecteUserFromGrid = function(rowEntity, row) {
    //alert('From radio selection ' + rowEntity.empNumber);
    $scope.selectedUser = rowEntity;
    $scope.isUserSelectDisable = false;
    row.radioInitial=true;
    
  };

  

  $scope.gridOptions = {
    
    enableGridMenu: true,
    multiSelect: false,
    enableSelectAll : false,
    enableFullRowSelection : true,
   showSelectionCheckbox: false,
    displaySelectionCheckbox: false,
    enableRowHeaderSelection:false,
    afterSelectionChange: function(rowItem, event) {
           console.log("sfsdf")
           console.log(rowItem);
        },
   // gridMenuTitleFilter: fakeI18n,
    columnDefs: [{name : ' ',
      cellTemplate: '<div class="ngSelectionCell"><input ng-init="row.radioInitial=false" type="radio" name="rdInitial" ng-model="row.radioInitial" ng-change="selecteUserFromGrid(row.entity,row)" ></div>',
      width: 40,
      sortable: false,
      resizable: false,
      enableColumnMoving : false,
      enableColumnMenu: false,
      enableHiding: false
    },
    
      { name: 'name',enableColumnMenu: false, width: 150
        
      },
      { name: 'gender',enableColumnMenu: false , width: 150},
      { name: 'company',enableColumnMenu: false , width: 150}
    ]
  
  };
  
  $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        row.radioInitial = row.isSelected;
        console.log("sdfs"+row.radioInitial);
        console.log($scope);
       // $scope.$digest();
        
      });
 
      
    };
  

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
