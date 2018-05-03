<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />

<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                                  用户日志管理
	      </li>
	      <li class="active">
	                       用户日志列表
	      </li>
	    </ul>
	</div>
	<div class="page-content">
		<form id="searchForm" action="">
			<div >
				<input type="text" id="startDateTime" name="startDateTime" value="${userLog.startDateTime }"  style="width:15%;float:left;margin-left:10px"  class="form-control datetimepicker"  />
				<p style="float: left;margin: 10px 0px 0px 10px;">至</p>
				<input type="text" id="endDateTime" name="endDateTime" value="${userLog.endDateTime }" style="width:15%;float:left;margin-left:10px" class="form-control datetimepicker"  />
				<div class="input-group">
				   <input class="form-control" name="searchUserName" value="${userLog.searchUserName }"  style="width:15%;float:left;margin-left:10px" placeholder="用户名" type="text">
				   <select style="width:15%;float:left;margin-left:10px"  name="searchRemark" id="searchRemark">
						<option value="">操作描述(请选择)</option>
						<c:forEach items="${requestMap}" var="t">
							<option value="${t.value }">${t.value }</option>
						 </c:forEach>
					</select>
					<div class="input-group-btn">
						<button type="button" id="searchButton" class="btn btn-default no-border btn-sm btn-info">
							<i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
						</button>
					</div>
				</div>
			</div>
		</form>
		<div class="row">
			<div></div>
			<div id="userLogDetail" style="margin:250px 250px 250px 250px;" class="modal">
					<div class="widget-box widget-color-dark">
						<div class="widget-header">
							<h5 class="widget-title bigger lighter">数据详情</h5>
						</div>
						<div class="widget-body">
							<div class="widget-main">
								<ul class="list-unstyled spaced2">
									<li id="userName">
									</li>
									<li id="clusterName">
									</li>
									<li id="remark">
									</li>
									<li id="operateTime">
									</li>
									<li id="requirePath">
									</li>
									<li id="userRequire">
									</li>
								</ul>
							</div>
							<div id="close">
								<a href="#" class="btn btn-block btn-inverse">
									<i class="ace-icon fa fa-times bigger-110"></i>
									<span>Close</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			<div class="col-md-12">
					<h3 class="row header smaller lighter purple"></h3>
					<div class="portlet-body">
				        <table id="userLogList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
				                <th>id</th>
								<th>用户名</th>
								<th>集群名称</th>
								<th>操作描述</th>
								<th>操作时间</th>
								<th>操作</th>
				              </tr>
				            </thead>
				            <tbody id="tbody">
				            <c:forEach items="${userLogList}" var="t">
							<tr class="odd gradeX">
							    <td>${t.id}</td>
								<td>${t.userName}</td>
								<td>${t.clusterName}</td>
								<td>${t.remark}</td>
								<td><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${t.operateTime}"/></td>
								<td>
								  <a class='blue' href="javascript:getUserLogInfo(${t.id})"><i class='ace-icon fa fa-binoculars bigger-130'></i>
								  	详情
								  </a>
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
<input type="hidden" name="remarkHidden" id="remarkHidden" value="${userLog.searchRemark }" />
<script type="text/javascript">
Date.prototype.Format = function(fmt){ 
	var o = {   
	 "M+" : this.getMonth()+1,                 //月份   
	 "d+" : this.getDate(),                    //日   
	 "h+" : this.getHours(),                   //小时   
	 "m+" : this.getMinutes(),                 //分   
	 "s+" : this.getSeconds(),                 //秒   
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	 "S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt))   
	 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o)   
	 if(new RegExp("("+ k +")").test(fmt))   
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
};
$(".datetimepicker").datetimepicker({
	defaultDate : new Date(),
	format:"Y-MM-DD HH:mm:ss",  
});
var msgAlarmListMyTable;
$(document).ready(function() {
    msgAlarmListMyTable= $('#userLogList').DataTable({
    "bAutoWidth" : true
    });
});

function getUserLogInfo(id){
	  $.ajax({
			type : "post",
			url : CAR_PATH+"/userlog/getUserLogInfo.do_",
			dataType : "json",
			data : {id:id},
			async : false,
			success : function(data){
				$("#userName").html("用户名："+data.userName);
				$("#clusterName").html("集群名："+data.clusterName);
				$("#remark").html("操作描述："+data.remark);
				$("#operateTime").html("操作时间："+new Date(data.operateTime).Format("yyyy-MM-dd hh:mm:ss"));
				$("#requirePath").html("请求链接："+(typeof(data.requirePath)=="undefined"?"":data.requirePath));
				$("#userRequire").html("请求参数："+(typeof(data.userRequire)=="undefined"?"":data.userRequire));
				$('#userLogDetail').modal('show');
			}
		});
}
$("#close").click(function(){
	$('#userLogDetail').modal('hide');
});
$("#searchButton").click(function(){
	var data =$("#searchForm").serialize();
	var loadurl=CAR_PATH +"/userlog/getUserLogList.do_?"+data;
	$("#main-content").load(loadurl);
});
var remarkHidden = $("#remarkHidden").val();
if(remarkHidden){
	$("#searchRemark").val(remarkHidden);
}
</script>
