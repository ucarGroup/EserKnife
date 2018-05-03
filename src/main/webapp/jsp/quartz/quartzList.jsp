<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/common/taglibs.jsp"%>
<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                                  调度管理
	      </li>
	      <li class="active">
	        trigger列表
	      </li>
	    </ul>
	</div>
	<div class="page-content">
		<div class="row">
			<div class="col-md-12">
				<div class="portlet box">
					<div class="portlet-body">
				        <table id="triggerList" class="table table-striped table-bordered table-hover">
				            <thead>
				              <tr>
				                <th>triggerName</th>
								<th>triggerGroup</th>
                                <th>cron</th>
                                <th>nextFireDate</th>
								<th>prevFireDate</th>
                                <th>startDate</th>
								<th>triggerState</th>
								<th>操作</th>
				              </tr>
				            </thead>
				         </table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
  var msgAlarmListMyTable;
  $(document).ready(function() {

    msgAlarmListMyTable= $('#triggerList').DataTable({
        "bAutoWidth" : true,
        "ajax" : {
            "url" : CAR_PATH + "/manage/quartz/jsonList.do_",
            "data": {}
        },
        "columns":[
            {"data":"triggerName"},
            {"data":"triggerGroup"},
            {"data":"cron" ,"bSortable":false},
            {"data":"nextFireDate"},
            {"data":"prevFireDate"},
            {"data":"startDate"},
            {"data":"triggerState"},
            {
              "data":"triggerState",
             // "bSortable":false,
              "fnCreatedCell":function (nTd, sData, oData, iRow, iCol){
            	var html = "";
            	
            	if(oData.triggerState == "PAUSED") {
            		html = "<a onclick=\"if(window.confirm('确认恢复吗?!')){return true;}else{return false;}\""
                           + "href=\"javascript:operate('/manage/quartz/resume.do?name="+oData.triggerName+"&group="+oData.triggerGroup+"')\">[恢复]"
                           +"</a>";
            	}
            	
            	if(oData.triggerState != "PAUSED") {
            		html += "<a onclick=\"if(window.confirm('确认暂停吗?!')){return true;}else{return false;}\""
                        + "href=\"javascript:operate('/manage/quartz/pause.do?name="+oData.triggerName+"&group="+oData.triggerGroup+"')\">[暂停]"
                        +"</a>";
            	}
            	
                       
                html += "<a onclick=\"if(window.confirm('确认删除吗?!')){return true;}else{return false;}\""
                    + "href=\"javascript:operate('/manage/quartz/remove.do?name="+oData.triggerName+"&group="+oData.triggerGroup+"')\">[删除]"
                    +"</a>";
     	
                $(nTd).html(html);
              }
            }
        ]
    });
    
  });
  
  //操作
  function operate(url) {
	  $.ajax({
			type : "post",
			url : CAR_PATH+url,
			dataType : "json",
			data : {},
			async : false,
			success : function(data){
				alert(data.msg);
				if(data.success) {
					var loadurl = CAR_PATH + "/manage/quartz/list.do_";
		            $("#main-content").load(loadurl);
				}
			}
		});
  }
 </script>
