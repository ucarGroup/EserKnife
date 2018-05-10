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
					<label class="col-sm-3 control-label no-padding-right" for="clusterName">集群名称</label>

					<div class="col-sm-9">
						<input type="text" id="clusterName" name="clusterName" placeholder="集群名称" class="col-xs-10 col-sm-8" />
						<input type="hidden" id="oldClusterName" name="oldClusterName" placeholder="原始集群名称" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="clusterName">集群描述</label>

					<div class="col-sm-9">
						<input type="text" id="clusterDescribe" name="clusterDescribe" placeholder="集群描述(中文集群名称)" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="productLine">产品线</label>

					<div class="col-sm-9">
						<select id="productLine" name="productLine" class="chosen-select" style="width: 280px" data-placeholder="Click to Choose...">
							<option value=""></option>
					        <c:forEach items="${productLineList}" var="bean" >
								<option value="${bean.name}">${bean.name} </option>
							</c:forEach>
						</select>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="hosts" >集群IP</label>

					<div class="col-sm-9">
						<input type="text" id="hosts" name="hosts" placeholder="举例: xxx,yyy" class="col-xs-10 col-sm-8"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="httpPort"> httpPort</label>

					<div class="col-sm-9">
						<input type="text" id="httpPort" name="httpPort" placeholder="httpPort" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="tcpPort"> tcpPort</label>

					<div class="col-sm-9">
						<input type="text" id="tcpPort" name="tcpPort" placeholder="tcpPort" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="tcpPort"> 查询角色名称</label>

					<div class="col-sm-9">
						<input type="text" id="monitorRoleName" name="monitorRoleName" placeholder="查询角色名称" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="monitorRolePwd"> 查询角色密码</label>

					<div class="col-sm-9">
						<input type="text" id="monitorRolePwd" name="monitorRolePwd" placeholder="查询角色密码" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="adminRoleName"> 管理员角色名称</label>

					<div class="col-sm-9">
						<input type="text" id="adminRoleName" name="adminRoleName" placeholder="管理员角色名称" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="adminRolePwd"> 管理员角色密码</label>

					<div class="col-sm-9">
						<input type="text" id="adminRolePwd" name="adminRolePwd" placeholder="管理员角色密码" class="col-xs-10 col-sm-8" />
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


