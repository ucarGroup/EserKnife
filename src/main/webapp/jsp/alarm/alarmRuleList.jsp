<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />

<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                                  报警管理
	      </li>
	      <li class="active">
	                       报警规则
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
				       <form id="addForm" action="${basePath}/alarm/rule/addAlarmRule" class="form-horizontal" role="form">
				           <%@ include file="alarmRule.jsp"%>
				       </form>
				    </div>
				    
				    <div id="update-wizard" class="modal">
				        <form id="updateForm" action="${basePath}/alarm/rule/updateAlarmRule" class="form-horizontal" role="form">
				           <%@ include file="alarmRule.jsp"%>
				        </form>
				    </div>
				    
					<h3 class="row header smaller lighter purple"></h3>
					<div class="portlet-body">
				        <table id="alarmRuleList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
								<th>规则名称</th>
								<th>是否启用</th>
                                <th>所属集群</th>
                                <th>监控一级指标</th>
                                <th>监控二级指标</th>
								<th>阀值</th>
								<th>阀值累计时间段</th>
                                <th>报警方式</th>
								  <td>操作人</td>
								<th>操作时间</th>
								<th>操作</th>
				              </tr>
				            </thead>
				            <tbody>
				            <c:forEach items="${alarmRuleList}" var="t">
							<tr class="odd gradeX">
								<td>${t.ruleName}</td>
								<td>
									<c:if test="${t.enable == 1}">是</c:if>
									<c:if test="${t.enable == 0}">否</c:if>
								</td>
								<td>${t.clusterName}</td>
								<td>${t.latitude}</td>
								<td>${t.latitudeSub}</td>
								<td>${t.threshold}</td>
								<td>${t.frequency}</td>
								<td>
								   <c:if test="${t.alarmWay == 1}">邮件</c:if>
								   <c:if test="${t.alarmWay == 2}">短信</c:if>
								   <c:if test="${t.alarmWay == 3}">邮件+短信</c:if>
								</td>

								<td>${t.operateUser}</td>
								<td><fmt:formatDate value="${t.operateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
								<td>
								  <a class='blue' href="javascript:getUpdateInfo(${t.id})"><i class='ace-icon fa fa-pencil bigger-130'></i></a>
								  &nbsp;&nbsp;
								  <a class='green' href="javascript:deleteAlarmRule(${t.id})"><i class='ace-icon fa fa-trash-o bigger-130'></i></a>
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

<script type="text/javascript" src="${basePath}/js/alarm/alarmRuleList.js"> </script>
