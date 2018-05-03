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
					<label class="col-sm-3 control-label no-padding-right" for="userName">用户名：</label>

					<div class="col-sm-9">
						<input type="text" id="userName" name="userName" placeholder="用户名" class="col-xs-10 col-sm-8" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="userEmail">邮箱：</label>
					<div class="col-sm-9">
						<input type="text" id="userEmail" name="userEmail" placeholder="邮箱" class="col-xs-10 col-sm-8" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="productLine">所属产品线：</label>

					<div class="col-sm-9">
						<select multiple="multiple" id="productLine" name="productLine" class="chosen-select" style="width: 280px" data-placeholder="Click to Choose...">
							<option value=""></option>
					        <c:forEach items="${productLineList}" var="bean" >
								<option value="${bean.name}">${bean.name} </option>
							</c:forEach>
						</select>
					</div>
				</div>
				
				<%--<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="esAccount" >es账户：</label>

					<div class="col-sm-9">
						<input type="text" id="esAccount" name="esAccount" placeholder="es账户" class="col-xs-10 col-sm-8"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="esPwd">es账户密码：</label>

					<div class="col-sm-9">
						<input type="text" id="esPwd" name="esPwd" placeholder="es账户密码" class="col-xs-10 col-sm-8" />
					</div>
				</div>--%>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="role">角色：</label>

					<div class="col-sm-9">
					   <select class="col-sm-5" name="role" id="role">
							<option value="2">普通用户</option>
							<option value="1">管理员</option>
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


