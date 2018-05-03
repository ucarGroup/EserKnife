<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />
<script type="text/javascript">
    var CAR_PATH = '${basePath}';
    var clusterNameFromBack = '${clusterName}';
    var username = '${username}';
    var isAdmin = '${isAdmin}';
</script>
<html lang="en">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>EserKnife[${clusterName}]</title>
    <meta name="description" content="Live charts and statistics for ElasticSearch cluster, v2.4.0">

    <!-- css reset -->
    <link rel="stylesheet" href="${basePath}/resources/bigdesk/css/reset.css">

    <!-- css grid -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 1140px Grid styles for IE -->
    <!--[if lte IE 9]><link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/css/CssGrid_2/ie.css" /><![endif]-->

    <!-- The 1140px Grid - http://cssgrid.net/ -->
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/css/CssGrid_2/1140.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/css/CssGrid_2/styles.css" />

    <!-- bigdesk styles -->
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/css/bigdesk.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/js/charts/common.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/js/charts/not-available/not-available-chart.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/js/charts/time-series/time-series-chart.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/js/charts/time-area/time-area-chart.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="${basePath}/resources/bigdesk/js/charts/pack/pack.css" />

    <!--  css3-mediaqueries-js -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/css3-mediaqueries/css3-mediaqueries.js"></script>
    <!-- end of css grid deps -->

    <!-- jQuery & plugins -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/jquery/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/tinysort/jquery.tinysort.min.js"></script>

    <!-- Mustache -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/mustache/mustache.js"></script>

    <!-- backbone & uderscore -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/underscore/underscore-min.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/backbone/backbone-min.js"></script>

    <!-- D3 -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/lib/D3-v2.8.1/d3.v2.min.js"></script>

    <!-- bigdesk -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/util/bigdesk_extension.js"></script>
    <!-- models & collections -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/Hello.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/IndicesStatus.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/ClusterState.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/ClusterHealth.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/NodesState.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/NodesStats.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/models/cluster/NodeInfo.js"></script>
    <!-- templates -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/views/templates.js"></script>
    <!-- views -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/views/ClusterHealthView.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/views/ClusterNodesListView.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/views/SelectedClusterNodeView.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/views/ClusterStateView.js"></script>
    <!-- charts -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/charts/not-available/not-available-chart.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/charts/time-series/time-series-chart.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/charts/time-area/time-area-chart.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/charts/bigdesk_charts.js"></script>
    <!-- application -->
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/store/BigdeskStore.js"></script>
    <script type="text/javascript" src="${basePath}/resources/bigdesk/js/bigdeskApp.js"></script>
    <link rel="icon" href="${basePath}/resources/kopf/imgs/favicon.png" type="image/x-icon">
</head>

<body onload="checkServer();">
<div class="container">
    <form>
        <div class="row connectionPanel">
            <div class="sixcol">
            <span class="connectionPanelSectionWithoutDecoration" style="display: none">
                ES node REST endpoint
                <input id="restEndPoint" type="text" size="40" value="http://localhost:8080" />
            </span>
            </div>
            <div class="sixcol last">
            <span class="connectionPanelSection">
            Refresh every
            <select id="refreshInterval">
                <option value="1000" label="1 sec">1 sec</option>
                <option value="2000" label="2 sec" selected="selected">2 sec</option>
                <option value="3000" label="3 sec">3 sec</option>
                <option value="5000" label="5 sec">5 sec</option>
                <option value="10000" label="10 sec">10 sec</option>
                <option value="30000" label="30 sec">30 sec</option>
            </select>
            </span>
            <span class="connectionPanelSection">
                Keep
                <select id="storeSize">
                    <option value="10000" label="10 sec">10 sec</option>
                    <option value="30000" label="30 sec">30 sec</option>
                    <option value="60000" label="1 min">1 min</option>
                    <option value="180000" label="3 min">3 min</option>
                    <option value="300000" label="5 min" selected="selected">5 min</option>
                    <option value="600000" label="10 min">10 min</option>
                    <option value="900000" label="15 min">15 min</option>
                    <option value="1800000" label="30 min">30 min</option>
                    <option value="3600000" label="1 hr">1 hr</option>
                </select>
                history
            </span>
            <span class="connectionPanelSectionWithoutDecoration">
                <input id="connectButton" type="button" value="Connect"/>
            </span>
                <span id="ajaxIndicator">&nbsp;&nbsp;&nbsp;</span>
            </div>
        </div>
    </form>
    <div id="selectedViewDetail"></div>
</div>
<script>
    function checkServer(){
        if(location.hostname != ""){
            $("#restEndPoint").val(location.protocol+"//"+location.hostname+":8080");
            $("#connectButton").click();
        }
    }
</script>
</body>
</html>