<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.ucar.eser.core.bean.User" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
    <TITLE>首页</TITLE>
    <META NAME="Generator" CONTENT="7WX/AOP Framework">
    <META http-equiv="content-type" content="text/html; charset=utf-8">
    <style>
        html,body{
            margin:0px;
            height:100%;
        }
    </style>
    <link rel="stylesheet" type="text/css" href="${nginx_carstatic_MA}/controls/jQuery/easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="${nginx_carstatic_MA}/controls/jQuery/easyui/themes/gray/easyui.css">
    <%
        User user = (User) request.getSession().getAttribute("user");
    %>
</HEAD>
<body>

<div id="tt">
    <div title="首页  <input type='hidden' value='EXCLUDE_MODULE-000'/>" data-options="closable:false" style="padding:20px;">
        <div class="blank_bg_ucar"></div>
    </div>
</div>
<br/>

<div id="win"></div>
<input type="hidden" id="userId" value="<%=user.getUserId()%>"/>
</body>
<script type="text/javascript" src="${nginx_carstatic_MA}/controls/jQuery/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${nginx_carstatic_MA}/controls/jQuery/jquery.json-2.3.min.js"></script>
<script type="text/javascript" src="${baseContextPath}/carstatic/admin/js/homePage/blank.js"></script>
</html>