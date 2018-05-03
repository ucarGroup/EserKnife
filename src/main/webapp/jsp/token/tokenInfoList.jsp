<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />

<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	          自定义分词管理
	      </li>
	      <li class="active">
              自定义分词
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
				       <form id="addForm" action="${basePath}/customtoken/addTokenInfo" class="form-horizontal" role="form">
				           <%@ include file="tokenInfo.jsp"%>
				       </form>
				    </div>
				    
				    <div id="update-wizard" class="modal">
				        <form id="updateForm" action="${basePath}/customtoken/updateTokenInfo" class="form-horizontal" role="form">
				           <%@ include file="tokenInfo.jsp"%>
				        </form>
				    </div>
				    
					<h3 class="row header smaller lighter purple"></h3>
					<div class="portlet-body">
				        <table id="TokenInfoList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
								<th>词库名</th>
								<th>更新时间</th>
								<th>操作</th>
				              </tr>
				            </thead>
				            <tbody>
				            <c:forEach items="${tokenInfoList}" var="t">
							<tr class="odd gradeX">
								<td>${t.name}</td>
								<td><fmt:formatDate value="${t.updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
								<td>
								  <a class='blue' href="javascript:getUpdateInfo(${t.id})"><i class='ace-icon fa fa-pencil bigger-130'></i></a>
								  &nbsp;&nbsp;
								  <a class='green' href="javascript:deleteTokenInfo(${t.id})"><i class='ace-icon fa fa-trash-o bigger-130'></i></a>
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

<script type="text/javascript" src="${basePath}/js/token/tokenInfo.js"> </script>

