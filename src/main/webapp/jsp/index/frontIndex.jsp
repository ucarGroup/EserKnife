<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />
<script type="text/javascript">
    var CAR_PATH = '${basePath}';
</script>
<html lang="en" ng-app="kopf" ng-controller="GlobalController">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="Access-Control-Allow-Origin" content="*">

    <meta charset="utf-8">
    <title ng-bind="title"></title>
    <link rel="icon" type="image/x-icon" href="${basePath}/resources/kopf/imgs/favicon.png">
    <link href="${basePath}/resources/kopf/css/font-awesome/css/font-awesome.css" rel="stylesheet">


    <link href="${basePath}/build/css/thirdparty.css" rel="stylesheet">
    <script src="${basePath}/build/js/thirdparty.js" type="text/javascript" charset="utf-8"></script>

    <%-- <link href="${basePath}/resources/thirdparty/jquery.datatable/css/jquery.dataTables.css" rel="stylesheet">
    <link href="${basePath}/resources/thirdparty/jquery.datatable/css/jquery.dataTables_themeroller.css" rel="stylesheet">
    <link href="${basePath}/resources/thirdparty/datatimepicker/bootstrap-datetimepicker.css" rel="stylesheet">--%>

    <%-- <script src="${basePath}/resources/thirdparty/jquery/jquery-1.11.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/jquery.datatable/js/jquery.dataTables.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/bootstrap/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>

    <script src="${basePath}/resources/thirdparty/angularjs/angular.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/angularjs/angular-animate.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/angularjs/angular-route.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/angular-tree-dnd/ng-tree-dnd.js" type="text/javascript" charset="utf-8"></script>

    <script src="${basePath}/resources/thirdparty/csv/csv.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/csv/jquery.csv.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/jsontree/jsontree.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/typeahead/typeahead.js" type="text/javascript" charset="utf-8"></script>--%>


    <link href="${basePath}/build/css/kopf.css" rel="stylesheet">
    <script src="${basePath}/build/js/kopf.js" type="text/javascript" charset="utf-8"></script>
    <%--<link href="${basePath}/resources/kopf/css/lib.css" rel="stylesheet">
    <link href="${basePath}/resources/kopf/css/kopf.css" rel="stylesheet">
    <link href="${basePath}/resources/kopf/css/stat.css" rel="stylesheet">
    <link href="${basePath}/resources/kopf/css/dark_style.css" rel="stylesheet">--%>

    <%--<script src="${basePath}/resources/kopf/js/kopf.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/util.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/elastic/elastic.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/elastic/editable_index_settings.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/directives/jsontree.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/directives/pagination.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/directives/sortby.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/directives/static_include.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/directives/directives.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/filters/filter.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/services/app_state.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/services/elastic_service.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/services/external_settings.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/services/services.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/cluster_overview.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/confirm_dialog.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/alerts.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/global.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/navbar.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/query.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/slowlog.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/slowlogquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/stats.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/new_stats.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/rest_client.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/update_index_mapping.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/create_type.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/index_import.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/index_manager.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/index_setting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/index_export.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/create_index_new2.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/index_templates.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/alias_manager.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/analysis.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/reindex.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/clientlogquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/kopf/js/controllers/nodes.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/datatimepicker/bootstrap-datetimepicker.js"></script>
    <script src="${basePath}/resources/thirdparty/echart/echarts.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/thirdparty/echart/theme/dark.js" type="text/javascript" charset="utf-8"></script>--%>

    <script src="${basePath}/resources/thirdparty/sense/es_5_0.js" type="text/javascript" ></script>
    <script src="${basePath}/resources/thirdparty/sense/sense.js" type="text/javascript"></script>

    <link rel="stylesheet" href="${basePath}/resources/thirdparty/jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="${basePath}/resources/thirdparty/jqwidgets/styles/jqx.ui-sunny.css" type="text/css" />
    <link rel="stylesheet" href="${basePath}/resources/thirdparty/jqwidgets/styles/jqx.metrodark.css" type="text/css" />
    <script src="${basePath}/resources/thirdparty/jqwidgets/jqx-all.js" type="text/javascript" ></script>
    <script src="${basePath}/resources/thirdparty/jqwidgets/globalization/globalization.js" type="text/javascript" ></script>
    <script src="${basePath}/resources/thirdparty/jqwidgets/globalization/globalize.js" type="text/javascript" ></script>

    <script>
        var nodeIpsInPage = ${nodeInfos};
        var clusterName = '${clusterName}';
        var username = '${username}';
        var isAdmin = '${isAdmin}';
        var isProd = '${isProd}';
        var clusterDescribe = '${clusterDescribe}';
        var versionFirst='${versionFirst}';
    </script>

</head>

<body>
<div id="page-wrap">
    <div id="xxx"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/partials/main_alerts.html'" ng-controller="AlertsController" class="alerts-container"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/partials/nav_bar.html'"></div>
    <div class="container-fluid">
        <div class="tab-content custom-tab-content">
            <ng-view onload="initializeController()"></ng-view>
        </div>
    </div>
    <div ng-include src="'${basePath}/resources/kopf/html/modals/modal_info.html'"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/modals/modal_info2.html'"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/modals/confirm_dialog.html'"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/modals/confirm_dialog2.html'"></div>
    <div ng-include src="'${basePath}/resources/kopf/html/partials/debug.html'"></div>
</div>
</body>
</html>