<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
    <script type="text/javascript">
        try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
    </script>

    <ul class="breadcrumb">
        <li>
            <i class="icon-home home-icon"></i>
            <a href="#">首页</a>
        </li>
    </ul><!-- .breadcrumb -->

</div>
<div class="page-content">
    <div class="page-header">
    </div><!-- /.page-header -->
    <div class="row">
        <div class="col-md-8">
            <h4>版本统计：</h4>
            <div style="padding-left: 100px;">
                <div id="pie" class="graph"></div>
            </div>
        </div>
        <div class="col-md-4">
            <div>
                <h4>最新通告：</h4>
            </div>
            <div>
                <!-- 代码开始 -->
                <div class="list_lh">
                    <table class="table table-striped table-bordered table-hover table-notice" style="text-align: center;border:none">
                        <tbody>
                        <c:forEach items="${noticeList}" var="notice">
                            <tr>
                                <td width="200">
                                    <p style="color:red;overflow: hidden">
                                        <i class="icon-bullhorn"></i>
                                        &nbsp;&nbsp;${notice.content}
                                    </p>
                                </td>
                                <td width="120">${notice.modifyTimeStr}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <!-- 代码结束 -->
            </div>
            <div style="margin-top: 30px">
                <h4>联系我们：</h4>
            </div>
            <div id="contact" class="page-body">
            </div>
            <div style="margin-top: 30px">
                <h4>相关文档: </h4>
            </div>
            <div id="document" class="page-body">
                <li><a href="http://wiki.10101111.com/pages/viewpage.action?pageId=17105053" target="_blank">服务框架</a></li>
                <li><a href="http://wiki.10101111.com/pages/viewpage.action?pageId=27295775" target="_blank">服务治理</a></li>
                <li><a href="http://wiki.10101111.com/pages/viewpage.action?pageId=17105053" target="_blank">常见问题</a></li>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div>
                <h4>全局信息</h4>
            </div>
            <table class="table table-striped table-hover">
                <tbody>
                <tr>
                    <td>应用数</td>
                    <td>${projectCount}</td>
                    <td>总机器数</td>
                    <td>
                        ${machineCount}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div><!-- /.page-content -->
<script>

    $(document).ready(function() {
        $.fn.myScroll = function (options) {
            //默认配置
            var defaults = {
                speed: 40,  //滚动速度,值越大速度越慢
                rowHeight: 80 //每行的高度
            };

            var opts = $.extend({}, defaults, options), intId = [];

            function marquee(obj, step) {

                obj.find("table").animate({
                    marginTop: '-=1'
                }, 0, function () {
                    var s = Math.abs(parseInt($(this).css("margin-top")));
                    if (s >= step) {
                        $(this).find("tr").slice(0, 1).appendTo($(this));
                        $(this).css("margin-top", 0);
                    }
                });
            }

            this.each(function (i) {
                var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
                intId[i] = setInterval(function () {
                    if (_this.find("table").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);

                _this.hover(function () {
                    clearInterval(intId[i]);
                }, function () {
                    intId[i] = setInterval(function () {
                        if (_this.find("table").height() <= _this.height()) {
                            clearInterval(intId[i]);
                        } else {
                            marquee(_this, sh);
                        }
                    }, speed);
                });

            });

        }

        $("div.list_lh").myScroll({
            speed: 40, //数值越大，速度越慢
            rowHeight: 80 //li的高度
        });

        $(function () {

            var data = [
                {label: "1.0", data: 10},
                {label: "1.0.1", data: 30},
                {label: "1.1", data: 90},
                {label: "1.2", data: 70},
                {label: "1.2.1", data: 80},
                {label: "1.2.2", data: 110}
            ];

            $.plot($("#pie"), data, {
                pie: {
                    show: true,
                    tilt: 0.8,
                    highlight: {
                        opacity: 0.25
                    },
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2
                },
                series: {
                    pie: {
                        show: true,
                        radius: 1, //半径
                        label: {
                            show: true,
                            radius: 2 / 3,
                            formatter: function (label, series) {
                                return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                            },
                            threshold: 0.03  //这个值小于0.03，也就是3%时，label就会隐藏
                        }
                    }
                },
                legend: {
                    show: false //不显示图例
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }
            });
            $("#pie").bind("plothover", pieHover);
            $("#pie").bind("plotclick", pieClick);
        });

        var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
        var previousPoint = null;

        function pieHover(event, pos, item) {
            var machineCount;

            if (item) {
                if (item.series['data']) {
                    machineCount = item.series['data'][0][1];
                }
                if (previousPoint != item.seriesIndex) {
                    previousPoint = item.seriesIndex;
                    var tip = item.series['label'] + " : " + item.series['percent'].toFixed(2) + '% , 机器数 : ' + machineCount;
                    $tooltip.show().children(0).text(tip);
                }
                $tooltip.css({top: pos.pageY + 10, left: pos.pageX + 10});
            } else {
                $tooltip.hide();
                previousPoint = null;
            }
        }

        function pieClick(event, pos, obj) {
            if (!obj)
                return;
            percent = parseFloat(obj.series.percent).toFixed(2);
//            alert(''+obj.series.label+': '+percent+'%');
            alert('功能即将上线');
        }
    })
</script>