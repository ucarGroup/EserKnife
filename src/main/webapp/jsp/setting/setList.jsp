<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/common/taglibs.jsp"%>
<div class="page-container">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
	    <ul class="breadcrumb">
	      <li>
	        <i class="ace-icon fa fa-home home-icon"></i>
	                      ESLOG列表
	      </li>
	    </ul>
	</div>
	<div class="page-content">
		<div class="row">
			<div class="form-group">
				<label class="control-label no-padding-right" for="cornName">corn表达式：</label>
				<div class="input-group" style="width:25%">
					<input class="form-control input-mask-date" id="corn" value="${data.cronExpression}" type="text">
					<span class="input-group-btn">
						<button class="btn btn-sm btn-info" id="cornButton" type="button">
							<i class="ace-icon fa fa-gavel bigger-110"></i>
							Go!
						</button>
					</span>
				</div>
			</div>
			<div class="form-group" >
					<label class="control-label no-padding-right" for="intervalName">时间间隔：</label>
					<div class="input-group" style="width:25%">
						<input class="form-control input-mask-date" id="interval" value="${data.interval}" min="0" type="number">
							<span class="input-group-btn">
							<button class="btn btn-sm btn-info" id="intervalButton" type="button">
								<i class="ace-icon fa fa-gavel bigger-110"></i>
								Go!
							</button>
						</span>
					</div>
			</div>
			<h3 class="row header smaller lighter purple"></h3>
				<select style="width: 200px; display: block;margin-bottom:10px;"  name="selectVal" id="selectVal">
					<option value="">请选择</option>
					<c:forEach items="${data.progress}" var="t">
						<option value="${t.key }" data="${t.value }">${t.key }</option>
					 </c:forEach>
				</select>
		</div>
		<div class="row">
			<table id="triggerList" style="width:25%" class="table table-striped table-bordered table-hover">
	            <thead>
	              <tr>
	                <th>ip</th>
					<th>扫描进度</th>
	              </tr>
	            </thead>
	            <tbody id="tbody">
	            </tbody>
	         </table>
		</div>
		<div class="form-group">
				<label class="control-label no-padding-right" for="cornName">启动开始时间修改：</label>
				<div class="input-group" style="width:25%">
					<input type="text" id="datetimepicker" class="form-control"  />
					<span class="input-group-btn">
						<button class="btn btn-sm btn-info" id="startDateButton" type="button">
							<i class="ace-icon fa fa-gavel bigger-110"></i>
							Go!
						</button>
					</span>
				</div>
			</div>
		<input type="hidden" name="clusNameHidden" id="clusNameHidden" value="${clusName }"/>
	</div>
</div>
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
	var clusNameHidden = $("#clusNameHidden").val();
	if(clusNameHidden){
		$("#selectVal").val(clusNameHidden);
		setTd();
	}
	$("#datetimepicker").datetimepicker({
		defaultDate : new Date(),
		format:"Y-MM-DD HH:mm:ss",  
	});
	$("#cornButton").click(function(){
		var corn = $("#corn").val();
		if(corn){
			  $.ajax({
					type : "post",
					url : CAR_PATH+"/set/eslogset/change.do_",
					dataType : "json",
					data : {corn:corn,flag:1},
					async : false,
					success : function(data){
						alert(data.msg);
					}
				});
		}
	});
	$("#intervalButton").click(function(){
		var interval = $("#interval").val();
		if(interval){
			  $.ajax({
					type : "post",
					url : CAR_PATH+"/set/eslogset/change.do_",
					dataType : "json",
					data : {interval:interval,flag:2},
					async : false,
					success : function(data){
						alert(data.msg);
					}
				});
		}
	});
	$("#selectVal").change(function(){
		setTd();
	});
	
	function setTd(){
		var map = $("#selectVal").find("option:selected").attr("data");
		if(map){
			var one = map.replace("{","");
			var two = one.replace("}","")+"";
			var newMap= two.split(',');
			$("#tbody").html("");
			for ( var i = 0; i < newMap.length; i++) {
				var m = newMap[i];
				var newM = m.split("=");
				$("#tbody").append("<tr><td>"+newM[0]+"</td><td>"+new Date(parseInt(newM[1])).Format("yyyy-MM-dd hh:mm:ss")+"</td></tr>");
			}
		}else{
			$("#tbody").html("");
		}
	}
	$("#startDateButton").click(function(){
		var clusName = $("#selectVal").find("option:selected").text();
		var dateStr = $("#datetimepicker").val();
		var dd =  $("#selectVal").find("option:selected").attr("data").replace("{","").replace("}","");
		var newMap= dd.split(',');
		var hostAndPorts="";
		for ( var i = 0; i < newMap.length; i++) {
			var m = newMap[i];
			var newM = m.split("=");
			if(hostAndPorts.length >0){
				hostAndPorts+=",";
			}
			hostAndPorts+=newM[0];
		}
		if(clusName != "请选择" && dateStr){
			  $.ajax({
					type : "post",
					url : CAR_PATH+"/set/eslogset/change.do_",
					dataType : "json",
					data : {clusName:clusName,dateStr:dateStr,hostAndPorts:hostAndPorts,flag:3},
					async : false,
					success : function(data){
						alert(data.msg);
						if(data.success){
							var loadurl = CAR_PATH + "/set/eslogset/getMap.do?clusName="+clusName;
				            $("#main-content").load(loadurl);
						}
					}
				});
		}
	});
  
 </script>
