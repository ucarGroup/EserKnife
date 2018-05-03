<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>es集中管理平台后台首页</title>
    <!-- basic styles -->
    <%@ include file="include.jsp"%>
</head>

<body class="no-skin">
<%@ include file="header.jsp"%>

<div class="main-container ace-save-state" id="main-container">
    <script type="text/javascript">
        try{ace.settings.loadState('main-container')}catch(e){}
    </script>

    <%@ include  file="sidebar.jsp"%>

    <div class="main-content" id="main-content">
        <div class="main-content-inner">
        </div>
    </div><!-- /.main-content -->
    <%@ include  file="foot.jsp"%>
</div><!-- /.main-container -->
<script type="text/javascript">
    jQuery(function($) {
    	
    	$("#logout").click(function () {
            $.ajax({
                type : "post",
                url : CAR_PATH + "/user/logout",
                dataType : "json",
                data : "",
                async : true,
                success : function(data) {
                    if(data.result){
                        window.location.href =  CAR_PATH +"/login.jsp?_r="+Math.random() ;
                        return;
                    }
                	alert(data.msg);
                }
            });
        });

        $(".daohang").click(function(){
            var search = $.UrlParams(window.location.search,"currUrl",$(this).attr("url"));
            window.history.pushState({},0,'http://'+window.location.host+'${basePath}/index/nav'+search);
        });

        var search = $.UrlParams(window.location.search,"currUrl",undefined);
        if(search){
            var daohang= $('.daohang[url="'+search+'"]');
            var liObject = daohang.parent();

            liObject.addClass("active");

            liObject.parents("li").addClass("active open");

            var loadurl = 'http://'+window.location.host+'${basePath}' + search;
            $("#main-content").load(loadurl);
        }
    })

    $.UrlParams = function ( search , name , value ) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = search.substr(1).match(reg);
        if( typeof value != 'undefined'){ //赋值
            if (r!=null){
                return search.replace(unescape(r[2]),value);
            }else {
                if(search.indexOf('?')==-1){
                    return (search+'?'+name+'='+value);

                }else{
                    return (search+'&'+name+'='+value);

                }
            }
        } else { //取值
            if (r!=null){
                return unescape(r[2]);
            }else{
                return '';
            }
        }
    };
    function reload(url) {
    	var loadurl = 'http://'+window.location.host+'${basePath}' + url;
        $("#main-content").load(loadurl);
    }
</script>
</body>
</html>