
var tokenListMyTable;
$(document).ready(function() {
    tokenListMyTable= $('#TokenInfoList').DataTable({
        "bAutoWidth" : true
    });
});

//操作
function deleteTokenInfo(id) {

    if(!confirm("确定要删除吗？")) {
        return ;
    }
    $.ajax({
        type : "post",
        url : CAR_PATH+"/customtoken/deleteTokenInfo.do",
        dataType : "json",
        data : {id:id},
        async : false,
        success : function(data){
            alert(data.msg);
            if(data.success) {
                reload("/customtoken/getTokenInfoList.do");
            }
        }
    });
}

function toAdd() {
    $("form[id=addForm] span[id=title]").html("自定义词库-新建");
    $('#add-wizard').modal('show');
    $("form[id=addForm] .chosen-select").chosen();
}

function getUpdateInfo(id) {
    $.ajax({
        type : "post",
        url : CAR_PATH + "/customtoken/getTokenInfo.do",
        dataType : "json",
        data : {id:id},
        async : true,
        success : function(result) {
            if (result.code == 1) {
                $("form[id=updateForm] span[id=title]").html("自定义词库-修改");
                $("form[id=updateForm] input[id=id]").val(result.data.id);
                if(result.data.id) {
                    $("form[id=updateForm] input[id=name]").prop('disabled', true);
                }
                $("form[id=updateForm] input[id=name]").val(result.data.name);
                $("form[id=updateForm] [id=content]").val(result.data.content);

                $('#update-wizard').modal('show');
                $("form[id=updateForm] .chosen-select").chosen();
            } else {
                alert(result.code);
            }
        }
    });
}


function save(obj) {
    $("form[id=updateForm] input[id=name]").prop('disabled', false);debugger;

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
                reload("/customtoken/getTokenInfoList.do");
            }
        }
    });

}


