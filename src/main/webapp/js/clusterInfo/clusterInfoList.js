var msgAlarmListMyTable;
$(document).ready(function() {

    msgAlarmListMyTable= $('#clusterInfoList').DataTable({
    "bAutoWidth" : true
    });
});
  
  //操作
function deleteClusterInfo(id) {
	
  if(!confirm("确定要删除吗？")) {
	  return ;
  }
  $.ajax({
		type : "post",
		url : CAR_PATH+"/clusterInfo/deleteClusterInfo.do_",
		dataType : "json",
		data : {id:id},
		async : false,
		success : function(data){
			alert(data.msg);
			if(data.success) {
				reload("/clusterInfo/getList.do_");
			}
		}
	});
}

function toAdd() {
	$("form[id=addForm] span[id=title]").html("集群管理-新建");
	$('#add-wizard').modal('show');
}

function getUpdateInfo(id) {
	$.ajax({
		type : "post",
		url : CAR_PATH + "/clusterInfo/getClusterInfo.do_",
		dataType : "json",
		data : {id:id},
		async : true,
		success : function(result) {
			if (result.code == 1) {
				$("form[id=updateForm] span[id=title]").html("集群管理-修改");
				$("form[id=updateForm] input[id=id]").val(result.data.id);
				$("form[id=updateForm] input[id=clusterName]").val(result.data.clusterName);
				$("form[id=updateForm] input[id=clusterDescribe]").val(result.data.clusterDescribe);
                $("form[id=updateForm] input[id=oldClusterName]").val(result.data.oldClusterName);
				$("form[id=updateForm] input[id=hosts]").val(result.data.hosts);
				$("form[id=updateForm] input[id=httpPort]").val(result.data.httpPort);
				$("form[id=updateForm] input[id=tcpPort]").val(result.data.tcpPort);
				$("form[id=updateForm] input[id=monitorRoleName]").val(result.data.monitorRoleName);
				$("form[id=updateForm] input[id=monitorRolePwd]").val(result.data.monitorRolePwd);
				$("form[id=updateForm] input[id=adminRoleName]").val(result.data.adminRoleName);
				$("form[id=updateForm] input[id=adminRolePwd]").val(result.data.adminRolePwd);
				$("form[id=updateForm] select[id=productLine] option[value="+result.data.productLine+"]").attr("selected","selected");
				$('#update-wizard').modal('show');
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
				reload("/clusterInfo/getList.do_");
			} 
		}
	});
	
}



