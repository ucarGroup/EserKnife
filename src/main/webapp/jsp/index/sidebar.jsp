<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<div class="sidebar sidebar-fixed responsive ace-save-state" id="sidebar">
    <script type="text/javascript">
        try{ace.settings.loadState('sidebar')}catch(e){}
    </script>
    <ul class="nav nav-list">
        <li class="">
            <a href="${basePath}/index/nav">
                <i class="menu-icon fa fa-tachometer"></i>
                <span class="menu-text"> 主页 </span>
            </a>

            <b class="arrow"></b>
        </li>
        <c:if test="${sessionScope.custom_user.admin}">
	        <li class="">
	            <a href="#" class="dropdown-toggle">
	                <i class="menu-icon fa fa-cubes"></i>
	                <span class="menu-text"> 管理</span>
	                <b class="arrow fa fa-angle-down"></b>
	            </a>
	
	            <b class="arrow"></b>
	
	            <ul class="submenu">
	                <li class="">
	                    <a href="" url="/clusterInfo/getList.do_" class="daohang">
	                        <i class="menu-icon fa fa-caret-right"></i>
	                        集群管理
	                    </a>
	                    <b class="arrow"></b>
	                </li>
                    <li class="">
                        <a href="" url="/alarm/rule/getAlarmRuleList.do" class="daohang">
                            <i class="menu-icon fa fa-caret-right"></i>
                            报警管理
                        </a>
                        <b class="arrow"></b>
                    </li>
                    <li class="">
                        <a href="" url="/dataSource/getList.do" class="daohang">
                            <i class="menu-icon fa fa-caret-right"></i>
                            数据源管理
                        </a>
                        <b class="arrow"></b>
                    </li>

	            </ul>
	        </li>


            <li class="">
                <a href="#" class="dropdown-toggle">
                    <i class="menu-icon fa fa-user"></i>
                    <span class="menu-text">用户</span>
                    <b class="arrow fa fa-angle-down"></b>
                </a>

                <b class="arrow"></b>

                <ul class="submenu">
                    <li class="">
                        <a href="" url="/user/manager/getUserList.do_" class="daohang">
                            <i class="menu-icon fa fa-caret-right"></i>
                            用户管理
                        </a>

                        <b class="arrow"></b>
                    </li>
                </ul>
            </li>


            <li class="">
                <a href="#" class="dropdown-toggle">
                    <i class="menu-icon fa fa-navicon"></i>
                    <span class="menu-text">索引</span>
                    <b class="arrow fa fa-angle-down"></b>
                </a>

                <b class="arrow"></b>

                <ul class="submenu">
                    <li class="">
                        <a href="" url="/customtoken/getTokenInfoList.do" class="daohang">
                            <i class="menu-icon fa fa-caret-right"></i>
                            自定义词库
                        </a>
                        <b class="arrow"></b>
                    </li>
                </ul>
            </li>
        </c:if>

    </ul><!-- /.nav-list -->

    <div style="display: none" class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
</div>
