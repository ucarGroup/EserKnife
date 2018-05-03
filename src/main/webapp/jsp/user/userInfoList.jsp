<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />

<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                                  用户管理
	      </li>
	      <li class="active">
	                       用户列表
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
				       <form id="addForm" action="${basePath}/user/manager/addUserInfo" class="form-horizontal" role="form">
				           <%@ include file="userInfo.jsp"%>
				       </form>
				    </div>
				    
				    <div id="update-wizard" class="modal">
				        <form id="updateForm" action="${basePath}/user/manager/updateUserInfo" class="form-horizontal" role="form">
				           <%@ include file="userInfo.jsp"%>
				        </form>
				    </div>
				    
					<h3 class="row header smaller lighter purple"></h3>
					<div class="portlet-body">
				        <table id="userInfoList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
				                <th>id</th>
								<th>用户名</th>
								<th>所属产品线</th>
                                <th>角色</th>
                                <th>状态</th>
								<th>操作时间</th>
								<th>操作</th>
				              </tr>
				            </thead>
				            <tbody>
				            <c:forEach items="${userList}" var="t">
							<tr class="odd gradeX">
							    <td>${t.id}</td>
								<td>${t.userName}</td>
								<td>${t.productLine}</td>
								<td>
								   <c:if test="${t.role == 1}">管理员</c:if>
								   <c:if test="${t.role == 2}">普通用户</c:if>
								</td>
								<td>
								   <c:if test="${t.state == 1}">待审核</c:if>
								   <c:if test="${t.state == 2}">审核通过</c:if>
								</td>
								<td>${t.operateTime}</td>
								<td>
								  <a class='blue' title="修改" href="javascript:getUpdateInfo(${t.id})"><i class='ace-icon fa fa-pencil bigger-130'></i></a>
								  &nbsp;&nbsp;
								  <a class='green' title="删除" href="javascript:deleteUserInfo(${t.id})"><i class='ace-icon fa fa-trash-o bigger-130'></i></a>
								  &nbsp;&nbsp;
								  <c:if test="${t.state == 1}">
								  	<a class='orange' title="审批" href="javascript:getUpdateState(${t.id})"><i class='ace-icon fa fa-wrench bigger-130'></i></a>
								  </c:if>
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

<script type="text/javascript" src="${basePath}/js/user/userInfoList.js"> </script>
