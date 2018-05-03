<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-dialog">
	<div class="modal-content">
		<div id="modal-wizard-container">
			<div class="modal-header">

				<div class="modal-header no-padding">
					<div class="table-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<span class="white">&times;</span>
						</button>
						<span id="title"></span>
					</div>
				</div>
			</div>

			<div class="modal-body">
				<input type="hidden" id="id" name="id" />

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="ruleName">规则名称：</label>

					<div class="col-sm-9">
						<input type="text" id="ruleName" name="ruleName" placeholder="规则名称" class="col-xs-10 col-sm-10" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right">是否启用：</label>

					<div class="col-sm-9">
						<label ><input name="enable"  type="radio" value="0" />否 </label>
						<label style="padding-left: 25px;"><input name="enable"  type="radio" value="1" />是 </label>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="clusterId">所属集群：</label>

					<div class="col-sm-9">
						<select  id="clusterId" name="clusterId" class="chosen-select col-sm-5"  data-placeholder="Click to Choose...">
							<option value=""></option>
							<c:forEach items="${clusterInfoList}" var="bean" >
								<option value="${bean.id}">${bean.clusterName} </option>
							</c:forEach>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="latitude">监控指标：</label>

					<div class="col-sm-9">
						<select  id="latitude" name="latitude" class="chosen-select col-sm-5" onchange="latitudeChange(this.value,this);" data-placeholder="Click to Choose...">
							<option value=""></option>
							<c:forEach items="${latitudeList}" var="bean" >
								<option value="${bean.name}">${bean.name} </option>
							</c:forEach>
						</select>

						<select  id="latitudeSub" name="latitudeSub" class="chosen-select col-sm-5"  data-placeholder="Click to Choose...">

						</select>
					</div>
				</div>

				<div class="form-group change-display">
					<label class="col-sm-3 control-label no-padding-right" for="threshold">阀值：</label>

					<div class="col-sm-9">
						<input type="text" id="threshold" name="threshold" placeholder="阀值" class="col-xs-10 col-sm-10" />
					</div>
				</div>
				
				<div class="form-group change-display">
					<label class="col-sm-3 control-label no-padding-right" >条件(n分钟n次)：</label>

					<div class="col-sm-9">
						<input type="text" id="frequency" name="frequency" placeholder="(分钟)" class="col-xs-10 col-sm-5"/>
						<%--<div style="position: absolute;margin-left: 41%;margin-top: 7px;"></div>--%>
						<input type="text" style="margin-left: 1px;" id="frequencyCount" name="frequencyCount" placeholder="(次数)" class="col-xs-10 col-sm-5"/>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="alarmWay">报警方式：</label>
					<div class="col-sm-9">
					   <select class="col-sm-5" name="alarmWay" id="alarmWay">
							<option value="1">邮件</option>
							<option value="2">短信</option>
							<option value="3">邮件+短信</option>
					   </select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="userNameId">发送人员：</label>
					<div class="col-sm-9">
						<select name="userNameId" id="userNameId"  multiple="multiple" class="chosen-select col-sm-10" data-placeholder="Click to Choose..." >
							<option value=""></option>
							<c:forEach items="${userList}" var="bean" >
								<option value="${bean.id}">${bean.userName} </option>
							</c:forEach>
						</select>
					</div>
				</div>
				
			</div>
		</div>

		<div class="modal-footer wizard-actions">
			<button class="btn btn-success" type="button" onclick="save(this)" name="asdasd">
				<i class="ace-icon fa fa-save"></i>
				save
			</button>

			<button class="btn btn-danger" type="button" data-dismiss="modal">
				Cancel
				<i class="ace-icon fa fa-times"></i>
			</button>
		</div>
	</div>

</div>


