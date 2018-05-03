kopf.controller('AnalysisController', ['$scope', '$location', '$timeout',
  'AlertService', 'ElasticService',
  function($scope, $location, $timeout, AlertService, ElasticService) {

    $scope.indices = null;

    // by index
    $scope.field_index = null;
    $scope.field_index_metadata = null;
    $scope.field_type = '';
    $scope.field_field = '';
    $scope.field_text = '';
    $scope.field_tokens = [];

    // By analyzer
    $scope.analyzer_index = '';
    $scope.analyzer_index_metadata = null;
    $scope.analyzer_analyzer = '';
    $scope.analyzer_text = '';
    $scope.analyzer_tokens = [];
    $scope.analyzerName = undefined;

    $scope.$watch(
        function() {
          return ElasticService.cluster;
        },
        function(filter, previous) {
          $scope.indices = ElasticService.getOpenIndices();
        },
        true
    );

    $scope.$watch('field_field',function(current,previous){
      var val = '';
      $scope.analyzerName=val;
      if (isDefined(current)) {
        if(current){
          var indexVal=$scope.field_index_metadata.mappings[$scope.field_type].properties[current].index;
          var typeVal = $scope.field_index_metadata.mappings[$scope.field_type].properties[current].type;
          var analyzerVal =$scope.field_index_metadata.mappings[$scope.field_type].properties[current].analyzer;
          if(typeVal && typeVal == 'string'){
            if(indexVal){
              $scope.analyzerName=indexVal;
            }else if(analyzerVal){
              $scope.analyzerName=analyzerVal;
            }else{
              $scope.analyzerName='默认分词';
            }
          }else{
            $scope.analyzerName='只有string类型支持分词，该类型没有分词';
          }
        }
      }
    });

    $scope.$watch('field_index', function(current, previous) {
      if (isDefined(current)) {
        $scope.loadIndexTypes(current.name);
      }
    });

    $scope.loadIndexTypes = function(index) {
      $scope.field_type = '';
      $scope.field_field = '';
      if (notEmpty(index)) {
        ElasticService.getIndexMetadata(index,
            function(metadata) {
              $scope.field_index_metadata = metadata;
            },
            function(error) {
              $scope.field_index = '';
              AlertService.error('Error loading index types', error);
            }
        );
      }
    };


    $scope.$watch('analyzer_index', function(current, previous) {
      if (isDefined(current)) {
        $scope.loadIndexAnalyzers(current.name);
      }
    });

    $scope.loadIndexAnalyzers = function(index) {
      $scope.analyzer_analyzer = '';
      if (notEmpty(index)) {
        ElasticService.getIndexMetadata(index,
            function(metadata) {
              $scope.analyzer_index_metadata = metadata;
            },
            function(error) {
              $scope.analyzer_index = '';
              AlertService.error('Error loading index analyzers', error);
            }
        );
      }
    };

    $scope.analyzeByField = function() {
      if ($scope.field_field.length > 0 && $scope.field_text.length > 0) {
        $scope.field_tokens = null;
        ElasticService.analyzeByField($scope.field_index.name,
            $scope.field_field, $scope.field_text,
            function(response) {
              $scope.field_tokens = response;
            },
            function(error) {
              $scope.field_tokens = null;
              AlertService.error('Error analyzing text by field', error);
            }
        );
      }
    };

/*    $scope.analyzeByAnalyzer = function() {
      if (notEmpty($scope.analyzer_analyzer) &&
          notEmpty($scope.analyzer_text)) {
        $scope.analyzer_tokens = null;
        ElasticService.analyzeByAnalyzer($scope.analyzer_index.name,
            $scope.analyzer_analyzer, $scope.analyzer_text,
            function(response) {
              $scope.analyzer_tokens = response;
            },
            function(error) {
              $scope.analyzer_tokens = null;
              AlertService.error('Error analyzing text by analyzer', error);
            }
        );
      }
    };*/

    $scope.initializeController = function() {
      $scope.indices = ElasticService.getOpenIndices();
    };

  }
]);
