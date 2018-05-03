<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />
<%@ include file="../index/include.jsp"%>

<html>
<head>
    <title>集群列表入口</title>
    <style type="text/css">
        .course-listing {
            background-color: #333;
            #box-shadow: 0 1px #ddedf1;
            border: 1px solid #ddedf1;
            padding: 0;
            border-radius: 3px;
            cursor: pointer;
            margin-bottom: 50px;
            height: 50px
        }

        .course-listing:hover {
            box-shadow: 0 0 0 1px #91cbd7;
            border: 1px solid #91cbd7;
            -webkit-transition: all linear .1s;
            transition: all linear .1s
        }

        .course-listing:hover .course-listing-title {
            background-color: #222;
            color: #21abc7;
            -webkit-transition: all linear .1s;
            transition: all linear .1s
        }

        .course-listing .course-box-image-container {
            overflow: hidden;
            max-height: 228px;
            height: auto;
        }

        .course-listing .course-box-image-container .course-box-image {
            display: block;
            margin: auto;
            border-top-left-radius: 9px;
            border-top-right-radius: 9px;
            border-bottom: 1px solid #ededed;
            width: 100%;
            height: 229px;
        }

        .course-listing .course-listing-title {
            color: #eee;
            line-height: 20px;
            padding: 16px 16px 4px 16px;
            font-weight: bold;
            font-size: 14px;
            max-height: 70px;
            overflow: hidden;
        }

        .course-listing .course-listing-subtitle {
            color: #666;
            padding: 5px 16px;
            font-weight: 200;
            font-size: 14px;
            max-height: 80px;
            overflow: hidden;
        }

        .course-listing .course-listing-extra-info {
            bottom: 50px;
            left: 16px;
            padding: 16px;
            position: absolute;
        }

        h2.homepage-section-title {
            color: #fff;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            padding-bottom: 35px;
            padding-top: 35px;
        }
    </style>
</head>
<body style="background-color: #222">
<div class="metro-layout vertical" >
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <h2 class="homepage-section-title">集群列表入口</h2>
               <%-- <c:forEach items="${resultMap}" var="tt" varStatus="status">
                    <div class="col-md-12" style="float:left">
                    <div>${tt.key}</div>
                    <hr style="border-color: black" />
                    <c:forEach items="${tt.value}" var="t" varStatus="status">
                        <div class="col-xs-12 col-sm-6 col-md-3">
                            <div class="course-listing">
                                <div class="row">
                                    <a target="_blank" href="${basePath}/front?clusterId=${t.id}">
                                        <div class="col-lg-12">
                                            <div class="course-box-image-container">
                                                <img class="course-box-image" src="${basePath}/images/cluster_pic_0${status.index%3}.jpg"
                                                     role="presentation"
                                                     alt=""></div>
                                            <div class="course-listing-title">${t.clusterName}
                                                <c:if test="${not empty t.clusterDescribe}">/${t.clusterDescribe}</c:if>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </c:forEach>
                    </div>
                </c:forEach>--%>
                <c:forEach items="${clusterInfos}" var="t" varStatus="status">
                <div class="col-xs-12 col-sm-6 col-md-3">
                    <div class="course-listing">
                        <div class="row">
                            <a target="_blank" href="${basePath}/front?clusterId=${t.id}">
                                <div class="col-lg-12">
                                        <%--<div class="course-box-image-container">
                                            <img class="course-box-image" src="${basePath}/images/cluster_pic_0${status.index%3}.jpg"
                                                 role="presentation"
                                                 alt=""></div>--%>
                                    <div class="course-listing-title">
                                    <c:if test="${not empty t.clusterDescribe}">${t.clusterDescribe}&nbsp;/&nbsp;</c:if>${t.clusterName}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                </c:forEach>
            </div>
        </div>
    </div>
</div>
</body>
</html>
