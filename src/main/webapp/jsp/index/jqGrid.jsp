<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>

<div class="main-content-inner">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">Home</a>
            </li>

            <li>
                <a href="#">Tables</a>
            </li>
            <li class="active">jqGrid plugin</li>
        </ul><!-- /.breadcrumb -->

        <div class="nav-search" id="nav-search">
            <form class="form-search">
								<span class="input-icon">
									<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
									<i class="ace-icon fa fa-search nav-search-icon"></i>
								</span>
            </form>
        </div><!-- /.nav-search -->
    </div>


    <div class="page-content">
        <div class="ace-settings-container" id="ace-settings-container">
            <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                <i class="ace-icon fa fa-cog bigger-130"></i>
            </div>

        </div><!-- /.ace-settings-container -->

        <div class="page-header">
            <h1>
                jqGrid
                <small>
                    <i class="ace-icon fa fa-angle-double-right"></i>
                    Dynamic tables and grids using jqGrid plugin
                </small>
            </h1>
        </div><!-- /.page-header -->

        <div class="row">
            <div class="col-xs-12">
                <!-- PAGE CONTENT BEGINS -->
                <div class="alert alert-info">
                    <button class="close" data-dismiss="alert">
                        <i class="ace-icon fa fa-times"></i>
                    </button>

                    <i class="ace-icon fa fa-hand-o-right"></i>
                    Please note that demo server is not configured to save the changes, therefore you may see an error message.
                </div>

                <table id="grid-table"></table>

                <div id="grid-pager"></div>

                <!-- PAGE CONTENT ENDS -->
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.page-content -->
</div>