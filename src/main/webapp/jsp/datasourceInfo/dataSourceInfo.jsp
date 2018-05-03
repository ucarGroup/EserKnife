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
                    <label class="col-sm-3 control-label no-padding-right" for="dataSourceName">数据源名称</label>
                    <div class="col-sm-9">
                        <input type="text" id="dataSourceName" name="dataSourceName" placeholder="数据源名称" class="col-xs-10 col-sm-8" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label no-padding-right" for="dataSourceUrl">数据源url</label>

                    <div class="col-sm-9">
                        <input type="text" id="dataSourceUrl" name="dataSourceUrl" placeholder="数据源url" class="col-xs-10 col-sm-8" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label no-padding-right" for="dataSourceUserName">数据源用户名</label>

                    <div class="col-sm-9">
                        <input type="text" id="dataSourceUserName" name="dataSourceUserName" placeholder="数据源用户名" class="col-xs-10 col-sm-8" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label no-padding-right" for="dataSourceUserPwd">数据源密码</label>

                    <div class="col-sm-9">
                        <input type="text" id="dataSourceUserPwd" name="dataSourceUserPwd" placeholder="数据源密码" class="col-xs-10 col-sm-8" />
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


