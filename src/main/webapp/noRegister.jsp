<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8" session="false"%>
<%@ include file="/jsp/index/include.jsp"%>
<%@ include file="/jsp/common/taglibs.jsp"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />
<html>
<head>
<title>未注册帐号权限申请</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<style type="text/css">
.tg_wrong {
	width: 600px;
	border: 4px solid #fcb047;
	background: #fff3e2;
	margin: 280px 33%;
	padding: 20px;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
}
</style>
<body style="background-color: black">
<!-- 	<div class="tg_wrong">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			   <tr>
		      <td height="35" colspan="2"><strong>抱歉，您尚未申请此帐号的访问权限，请联系管理员（孔增、王唯）进行申请！</strong></td>
		    </tr>
		</table>
	</div> -->
	<div class="" >
		<div class="row">
			<div class="col-md-12">
				<div class="portlet box">
					<div id="add-wizard" class="modal" style="display:block;">
						<form id="addForm" action="${basePath}/user/manager/applyUserInfo" class="form-horizontal" role="form">
							<div class="modal-dialog">
								<div class="modal-content">
									<div id="modal-wizard-container">
										<div class="modal-header">
											<div class="modal-header no-padding">
												<div class="table-header">
													<span id="title">注册</span>
												</div>
											</div>
										</div>
										<div class="modal-body">
											<input type="hidden" id="id" name="id" />
											<div class="form-group">
												<label class="col-sm-3 control-label no-padding-right"
													for="userName">用户名：</label>
												<div class="col-sm-9">
													<input type="text" id="userName" name="userName"
													value="${userName }" placeholder="用户名" class="col-xs-10 col-sm-8" />
												</div>
											</div>
											<div class="form-group">
												<label class="col-sm-3 control-label no-padding-right"
													   for="userEmail">邮箱：</label>
												<div class="col-sm-9">
													<input type="text" id="userEmail" name="userEmail"
														   value="${userEmail }" placeholder="邮箱" class="col-xs-10 col-sm-8" />
												</div>
											</div>
											<div class="form-group">
												<label class="col-sm-3 control-label no-padding-right"
													   for="userPwd">密码：</label>
												<div class="col-sm-9">
													<input type="password" id="userPwd" name="userPwd"
														   value="${userPwd }" placeholder="密码" class="col-xs-10 col-sm-8" />
												</div>
											</div>
											<div class="form-group">
												<label class="col-sm-3 control-label no-padding-right"
													for="productLine">所属产品线：</label>
												<div class="col-sm-9">
													<select multiple="multiple" id="productLine" name="productLine" class="chosen-select" style="width: 280px" data-placeholder="Click to Choose...(必填)">
														<option value=""></option>
														<c:forEach items="${productLineList}" var="bean">
															<option value="${bean.name}">${bean.name}</option>
														</c:forEach>
													</select>
												</div>
											</div>
										</div>
									</div>
									<input type="hidden" name="state" value="1"/>
									<div class="modal-footer wizard-actions">
										<button class="btn btn-success" type="button"
											onclick="save(this)" name="asdasd">
											<i class="ace-icon fa fa-save"></i> save
										</button>
										<button class="btn btn-danger" type="button"
											data-dismiss="modal" onclick="cancel()">
											Cancel <i class="ace-icon fa fa-times"></i>
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<script type="text/javascript">
$(document).ready(function() {
	$("form[id=addForm] .chosen-select").chosen();
});
function save(obj) {
	var productLine = $("#productLine").val();
	if(!productLine){
		alert("产品线不能为空");
		return false;
	}
	var form = $(obj).parent().parent().parent().parent();
	var action = form.attr("action");
	$.ajax({
		type : "post",
		url : action,
		dataType : "json",
		data : form.serialize(),
		async : false,
		error : function(xhr, status, err) {
			alert(err);
		},
		success : function(data) {
			alert(data.msg);
			if (data.success) {
				window.location.href="/eserknife/login.jsp";
			} 
		}
	});
}
function cancel(){
	window.location.href="/eserknife/login.jsp";
}
</script>

