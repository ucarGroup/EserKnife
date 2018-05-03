var kopf = angular.module('kopf', ['ngRoute', 'ntt.TreeDnD', 'ngAnimate',
    'ui.bootstrap']);

kopf.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/cluster', {
        templateUrl: '/eserknife/resources/kopf/html/partials/cluster_overview.html',
        controller: 'ClusterOverviewController'
    }).when('/nodes', {
        templateUrl: '/eserknife/resources/kopf/html/partials/nodes/nodes.html',
        controller: 'NodesController'
    }).when('/rest', {
        templateUrl: '/eserknife/resources/kopf/html/partials/rest_client.html',
        controller: 'RestController'
    }).when('/query', {
        templateUrl: '/eserknife/resources/kopf/html/partials/query.html',
        controller: 'QueryController'
    }).when('/stats', {
        templateUrl: '/eserknife/resources/kopf/html/partials/stats.html',
        controller: 'StatsController'
    }).when('/newStats', {
        templateUrl: '/eserknife/resources/kopf/html/partials/new_stat.html',
        controller: 'NewStatsController'
    }).when('/slowlog', {
        templateUrl: '/eserknife/resources/kopf/html/partials/slowlog.html',
        controller: 'SlowLogController'
    }).when('/slowlogquery', {
        templateUrl: '/eserknife/resources/kopf/html/partials/slowlogquery.html',
        controller: 'SlowLogQueryController'
    }).when('/updateMapping', {
        templateUrl: '/eserknife/resources/kopf/html/partials/update_index_mapping.html',
        controller: 'UpdateMappingController'
    }).when('/createIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/create_index.html',
        controller: 'CreateIndexController'
    }).when('/createType', {
        templateUrl: '/eserknife/resources/kopf/html/partials/create_type.html',
        controller: 'CreateTypeController'
    }).when('/importIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_import.html',
        controller: 'ImportIndexController'
    }).when('/settingIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_setting.html',
        controller: 'SettingIndexController'
    }).when('/indexManager', {
    templateUrl: '/eserknife/resources/kopf/html/partials/index_manager.html',
    controller: 'ManagerIndexController'
    }).when('/indexManagerNew', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_manager_new.html',
        controller: 'IndexManageController'
    }).when('/exportIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_export.html',
        controller: 'ExportIndexController'
    }).when('/indexTemplate', {
    templateUrl: '/eserknife/resources/kopf/html/partials/index_templates.html',
        controller: 'IndexTemplatesController'
    }).when('/reindex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/reindex.html',
        controller: 'ReIndexController'
    }).when('/analysis', {
        templateUrl: '/eserknife/resources/kopf/html/partials/analysis.html',
        controller: 'AnalysisController'
    }).when('/clientlogquery', {
        templateUrl: '/eserknife/resources/kopf/html/partials/clientlogquery.html',
        controller: 'ClientLogController'
    }).when('/aliasManager', {
        templateUrl: '/eserknife/resources/kopf/html/partials/alias_manager.html',
        controller: 'AliasController'
    }).otherwise({redirectTo: '/cluster'});
});

