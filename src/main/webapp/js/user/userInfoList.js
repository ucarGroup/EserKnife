var msgAlarmListMyTable;
$(document).ready(function() {
    msgAlarmListMyTable= $('#userInfoList').DataTable({
    "bAutoWidth" : true
    });
});
  
  //操作
function deleteUserInfo(id) {
	
  if(!confirm("确定要删除吗？")) {
	  return ;
  }
  $.ajax({
		type : "post",
		url : CAR_PATH+"/user/manager/deleteUserInfo.do_",
		dataType : "json",
		data : {id:id},
		async : false,
		success : function(data){
			alert(data.msg);
			if(data.success) {
				reload("/user/manager/getUserList.do_");
			}
		}
	});
}

function toAdd() {
	$("form[id=addForm] span[id=title]").html("用户管理-新建");
	$('#add-wizard').modal('show');
    $("form[id=addForm] .chosen-select").chosen();
}

function getUpdateInfo(id) {
	$.ajax({
		type : "post",
		url : CAR_PATH + "/user/manager/getUserInfo.do_",
		dataType : "json",
		data : {id:id},
		async : true,
		success : function(result) {
			if (result.code == 1) {
				$("form[id=updateForm] span[id=title]").html("用户管理-修改");
				$("form[id=updateForm] input[id=id]").val(result.data.id);
				$("form[id=updateForm] input[id=userName]").val(result.data.userName);
				$("form[id=updateForm] input[id=userEmail]").val(result.data.userEmail);
				if(result.data.productLine != null) {
					var productLine = result.data.productLine.split(",");
					for(var i = 0; i< productLine.length; i++) {
						$("form[id=updateForm] select[id=productLine] option[value="+productLine[i]+"]").attr("selected","selected");	
					}
				}
				
				$("form[id=updateForm] select[id=role] option[value="+result.data.role+"]").attr("selected","selected");
				
				$('#update-wizard').modal('show');
			    $("form[id=updateForm] .chosen-select").chosen();
			} else {
				alert(result.code);
			}
		}
	});
}
	
	
function save(obj) {
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
				form.parent().modal('hide');
				reload("/user/manager/getUserList.do_");
			} 
		}
	});
	
}


function getUpdateState(id){
	$.ajax({
		type : "post",
		url :  CAR_PATH + "/user/manager/updateUserState.do_",
		dataType : "json",
		data : {id:id},
		async : false,
		error : function(xhr, status, err) {
			alert(err);
		},
		success : function(data) {
			alert(data.msg);
			if (data.success) {
				reload("/user/manager/getUserList.do_");
			} 
		}
	});
}



