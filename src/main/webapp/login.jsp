<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="basePath" value="${pageContext.request.contextPath }" />
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>登陆页</title>
  <meta name="keywords" content="es管理平台,escloud" />
  <meta name="description" content="es管理平台" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script type="text/javascript">
	var CAR_PATH = '${basePath}';
  </script>
  <link rel="stylesheet" href="${basePath}/pageFrame/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="${basePath}/pageFrame/css/font-awesome.min.css" />
  <link rel="stylesheet" href="${basePath}/pageFrame/css/ace.min.css" />
  <link rel="stylesheet" href="${basePath}/pageFrame/css/ace-rtl.min.css" />
</head>

<body class="login-layout" style="background-color: #222">
<div class="main-container">
  <div class="main-content">
    <div class="col-sm-10 col-sm-offset-1">
      <div class="login-container">
        <div class="center">
          <h2 style="margin-top:150px">
            <i class="icon-leaf green"></i>
              <span class="black" style="font-size:32px;font-weight: bold;color: beige;">eser</span>
          </h2>
        </div>

        <div class="space-6"></div>

        <div class="position-relative">
          <div id="login-box" class="visible widget-box no-border" style="padding-top: 25px;background-color: #333;">
            <div class="widget-body">
              <div class="widget-main">
                <form>
                  <fieldset>
                    <label class="block clearfix">
                      <span class="block input-icon input-icon-right">
                          <input type="text" id="username" class="form-control" placeholder="用户名" />
                          <i class="icon-user"></i>
                      </span>
                    </label>

                    <label class="block clearfix">
                      <span class="block input-icon input-icon-right">
                          <input type="password" id="password" class="form-control" placeholder="密码" />
                          <i class="icon-lock"></i>
                      </span>
                    </label>
                    
                    <div class="space"></div>

                    <div class="clearfix" style="text-align: center;">
                      <button type="button" id="login" class="width-35 btn btn-sm btn-primary">
                        <i class="icon-key"></i>
                                                                          登录
                      </button>
                        <button type="button" id="regist" class="width-35 btn btn-sm btn-primary">
                            <i class="icon-key"></i>
                            注册
                        </button>
                    </div>

                    <div class="space-4"></div>
                  </fieldset>
                </form>
                </div>
              </div>
            </div><!-- /position-relative -->
          </div>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div>
  </div><!-- /.main-container -->
</div>
<!-- basic scripts -->
<script src='${basePath}/pageFrame/js/jquery-2.1.4.min.js'></script>
<script src='${basePath}/pageFrame/js/jquery.mobile.custom.min.js'></script>

<script type="text/javascript">
  $(document).ready(function(){

      document.onkeydown = function(e){
          var ev = document.all ? window.event : e;
          if(ev.keyCode==13) {
              $("#login").click();
          }
      }
      $("#regist").click(function(){
          window.location.href = CAR_PATH+'/user/doRegist';
      });

      $("#login").click(function(){
          var username = $("#username").val();
          if(username == ''){
          	alert("用户名不能为空");
          	return false;
          }
          var password = $("#password").val();
          if(password == ''){
              alert("密码不能为空");
              return false;
          }
          $.ajax({
              type:'post',      
              url:CAR_PATH+'/user/doLogin',
              data:{
              	  username: username,
                  password: password,
              },
              cache:false,  
              dataType:'json',  
              success:function(data){  
              	if(data.result){
              		if(data.isAdmin) {//跳转至后台
                		window.location.href = CAR_PATH+"/index/nav";
              		}else if(data.state && data.state == 1){
              			alert(data.msg);
              		}else{//跳转至前台
              			window.location.href = CAR_PATH+"/frontRouter";
              		}
              	}else{
              		alert(data.msg);
              	}
              }
          });
      });
  });
</script>
</body>
</html>