var msgDataSourceListMyTable;
$(document).ready(function() {
    msgDataSourceListMyTable= $('#dataSouceInfoList').DataTable({
        "bAutoWidth" : true
    });
});

//操作
function deleteInfo(id) {
    if(!confirm("确定要删除吗？")) {
        return ;
    }
    $.ajax({
        type : "post",
        url : CAR_PATH+"/dataSource/deleteInfo.do_",
        dataType : "json",
        data : {id:id},
        async : false,
        success : function(data){
            alert(data.msg);
            if(data.success) {
                reload("/dataSource/getList.do_");
            }
        }
    });
}

function toAdd() {
    $("form[id=addForm] span[id=title]").html("数据源管理-新建");
    $('#add-wizard').modal('show');
}

function getUpdateInfo(id) {
    $.ajax({
        type : "post",
        url : CAR_PATH + "/dataSource/getInfo.do_",
        dataType : "json",
        data : {id:id},
        async : true,
        success : function(result) {
            if (result.code == 1) {
                $("form[id=updateForm] span[id=title]").html("数据源管理-修改");
                $("form[id=updateForm] input[id=id]").val(result.data.id);
                $("form[id=updateForm] input[id=dataSourceName]").val(result.data.dataSourceName);
                $("form[id=updateForm] input[id=dataSourceUrl]").val(result.data.dataSourceUrl);
                $("form[id=updateForm] input[id=dataSourceUserName]").val(result.data.dataSourceUserName);
                $("form[id=updateForm] input[id=dataSourceUserPwd]").val(result.data.dataSourceUserPwd);
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
                reload("/dataSource/getList.do_");
            }
        }
    });

}



