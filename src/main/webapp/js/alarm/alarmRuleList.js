var msgAlarmListMyTable;
$(document).ready(function() {
    msgAlarmListMyTable= $('#alarmRuleList').DataTable({
    "bAutoWidth" : true
    });
});
  
  //操作
function deleteAlarmRule(id) {
	
  if(!confirm("确定要删除吗？")) {
	  return ;
  }
  $.ajax({
		type : "post",
		url : CAR_PATH+"/alarm/rule/deleteAlarmRule.do_",
		dataType : "json",
		data : {id:id},
		async : false,
		success : function(data){
			alert(data.msg);
			if(data.success) {
				reload("/alarm/rule/getAlarmRuleList.do_");
			}
		}
	});
}

function toAdd() {
	$("form[id=addForm] span[id=title]").html("报警规则-新建");
	$('#add-wizard').modal('show');
    $("form[id=addForm] .chosen-select").chosen();
}

function getUpdateInfo(id) {
	$.ajax({
		type : "post",
		url : CAR_PATH + "/alarm/rule/getAlarmRule.do_",
		dataType : "json",
		data : {id:id},
		async : true,
		success : function(result) {
			if (result.code == 1) {
				$("form[id=updateForm] span[id=title]").html("报警规则-修改");
				$("form[id=updateForm] input[id=id]").val(result.data.id);
				$("form[id=updateForm] input[id=ruleName]").val(result.data.ruleName);
				$("form[id=updateForm] input[name=enable]").eq(result.data.enable).attr("checked","checked");
				var rData = result.latitudeSub;
				$("form[id=updateForm] select[id=latitudeSub]").empty();
				for(var i = 0;i<rData.length;i++){
					$("form[id=updateForm] select[id=latitudeSub]").append("<option value='"+rData[i]+"'>"+rData[i]+"</option>");
				}
				$("form[id=updateForm] select[id=latitudeSub]").trigger("chosen:updated");
				if(result.data.latitude != null) {
					$("form[id=updateForm] select[id=latitude] option[value="+result.data.latitude+"]").attr("selected","selected");	
				}
				if(result.data.latitudeSub != null) {
					$("form[id=updateForm] select[id=latitudeSub] option[value="+result.data.latitudeSub+"]").attr("selected","selected");
				}
				if(result.data.clusterId != null){
					$("form[id=updateForm] select[id=clusterId] option[value="+result.data.clusterId+"]").attr("selected","selected");
				}
				$("form[id=updateForm] input[id=threshold]").val(result.data.threshold);
				$("form[id=updateForm] input[id=frequency]").val(result.data.frequency);
				$("form[id=updateForm] input[id=frequencyCount]").val(result.data.frequencyCount);
				$("form[id=updateForm] input[id=extend]").val(result.data.extend);

				$("form[id=updateForm] select[id=alarmWay] option[value="+result.data.alarmWay+"]").attr("selected","selected");
				if(result.data.userNameId != null) {
					var userIds = result.data.userNameId.split(",");
					for(var i = 0; i< userIds.length; i++) {
						$("form[id=updateForm] select[id=userNameId] option[value="+userIds[i]+"]").attr("selected","selected");
					}
				}
				$('#update-wizard').modal('show');
			    $("form[id=updateForm] .chosen-select").chosen();
			} else {
				alert(result.code);
			}
		}
	});
}
	
function latitudeChange(latitudeValue,obj){
	var form = $(obj).parent().parent().parent().parent().parent().parent().parent();
	var idVal = form.attr("id");
	if(latitudeValue){
		if(latitudeValue =='health'){
			$('.change-display').hide();
		}else{
			$('.change-display').show();
		}
		$.ajax({
			type : "post",
			url : CAR_PATH + "/alarm/rule/getLatitudeSub.do_",
			dataType : "json",
			data : {"latitudeValue":latitudeValue},
			async : true,
			success : function(result) {
				if (result && result.success) {
					var rData = result.result;
					var id="form[id="+idVal+"] select[id=latitudeSub]";
					$(id).empty();
					for(var i = 0;i<rData.length;i++){
						$(id).append("<option value='"+rData[i]+"'>"+rData[i]+"</option>");
					}
					$(id).trigger("chosen:updated");
				}
			}
		});
	}
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
				reload("/alarm/rule/getAlarmRuleList.do_");
			} 
		}
	});
	
}



