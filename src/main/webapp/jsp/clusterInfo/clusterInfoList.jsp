<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />

<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                                  集群管理
	      </li>
	      <li class="active">
	                       集群列表
	      </li>
	    </ul>
	</div>
	
	
	<div class="page-content">
		<div class="row">
			<div class="col-md-12">
				<div class="portlet box">
				    <div class="pull-left col-sm-12">
					  <button class="btn btn-info" onclick="toAdd()">新建</button>
					</div>
				    <div id="add-wizard" class="modal">
				       <form id="addForm" action="${basePath}/clusterInfo/addClusterInfo" class="form-horizontal" role="form">
				           <%@ include file="clusterInfo.jsp"%>
				       </form>
				    </div>
				    
				    <div id="update-wizard" class="modal">
				        <form id="updateForm" action="${basePath}/clusterInfo/updateClusterInfo" class="form-horizontal" role="form">
				           <%@ include file="clusterInfo.jsp"%>
				        </form>
				    </div>
				    
					<h3 class="row header smaller lighter purple"></h3>
					<div class="portlet-body">
				        <table id="clusterInfoList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
								<th>集群名称</th>
								<th>集群描述</th>
								<th>产品线</th>
                                <th>hosts</th>
                                <th>http端口</th>
								<th>tcp端口</th>
								<th>操作时间</th>
								<th>操作</th>
				              </tr>
				            </thead>
				            <tbody>
				            <c:forEach items="${aaData}" var="t">
							<tr class="odd gradeX">
								<td>${t.clusterName}</td>
								<td>${t.clusterDescribe}</td>
								<td>${t.productLine}</td>
								<td>${t.hosts}</td>
								<td>${t.httpPort}</td>
								<td>${t.tcpPort}</td>
								<td>${t.operateTime}</td>
								<td>
								  <a class='blue' href="javascript:getUpdateInfo(${t.id})"><i class='ace-icon fa fa-pencil bigger-130'></i></a>
								  &nbsp;&nbsp;
								  <a class='green' href="javascript:deleteClusterInfo(${t.id})"><i class='ace-icon fa fa-trash-o bigger-130'></i></a>
								</td>
							</tr>
						  </c:forEach>
						</tbody>
				       </table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="${basePath}/js/clusterInfo/clusterInfoList.js"> </script>
