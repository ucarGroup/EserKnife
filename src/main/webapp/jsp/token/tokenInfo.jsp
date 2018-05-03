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
					<label class="col-sm-3 control-label no-padding-right" for="name">名称：</label>

					<div class="col-sm-9">
						<input type="text" id="name" name="name" placeholder="词库名称" class="col-xs-10 col-sm-8" />
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" for="content">词库：</label>

					<div class="col-sm-9">
					   <textarea rows="3" cols="50" name="content" id="content"></textarea>
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


