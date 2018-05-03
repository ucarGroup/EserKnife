<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/common/taglibs.jsp"%>
<div id="navbar" class="navbar navbar-default    navbar-fixed-top      ace-save-state">

    <div class="navbar-header pull-left">
        <a href="techplat" class="navbar-brand">
            <small>
                <i class="fa fa-cloud"></i>
                EserKnife
            </small>
        </a>
    </div>

    <div class="navbar-buttons navbar-header pull-right" role="navigation">
        <div style="float: right;height: 30px;width: 70px;padding-top: 12px;">
            <a href="#" id="logout" style="color: #FFF;display: block;">
                <i class="ace-icon fa fa-power-off"></i>
                Logout
            </a>
        </div>
        <div style="float: right;height: 30px;width: 100px;padding-top: 12px;padding-right: 10px">
            <a href="${basePath}/frontRouter" id="toFront" target='_blank' style="color: #FFF;display: block;">
                <i class="ace-icon fa fa-sign-in"></i>
                跳转至前台
            </a>
        </div>
    </div>
</div>
