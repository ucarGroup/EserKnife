jQuery(function($) {


    ClusterUlity = {

        'TEMPLATE':
        '<div class="row"> \
            <div class="statwrapper"> \
                <span class="cluster-title"><i class="ucar-icon"></i>{{bizName}}</span> \
            </div> \
        </div>\
        <div class="row"> \
            <div class="statwrapper">\
                <div class="stat-block bordered">\
                    <span>\
                        <span class="stat-number">2</span>\
                        <span class="stat-desp">nodes</span>\
                    </span>\
                </div>\
                <div class="stat-block bordered marginlx">\
                    <span>\
                        <span class="stat-number">2</span>\
                        <span class="stat-desp">indices</span>\
                    </span>\
                </div>\
                <div class="stat-block bordered marginlx">\
                    <span>\
                        <span class="stat-number">2</span>\
                        <span class="stat-desp">shards</span>\
                    </span>\
                </div>\
                <div class="stat-block bordered marginlx">\
                    <span>\
                        <span class="stat-number">2</span>\
                        <span class="stat-desp">docs</span>\
                    </span>\
                </div>\
                <div class="stat-block bordered marginlx">\
                    <span>\
                        <span class="stat-number">2</span>\
                        <span class="stat-desp">GB</span>\
                    </span>\
                </div>\
            </div>\
        </div>\
        ',


        'go': function () {
            this.render();
            this.afterRender();
        },

        'init': function () {
            console.log("init.prototype...");
        },

        'render': function () {
            var view = Mustache.render(this.TEMPLATE, {bizName:"专车业务集群"});
            $(".main-content-inner").append(view);
        },

        'afterRender': function () {
            var ww = Math.floor($(".statwrapper").width()/4/4);   //每个block 15%,一行共5个,间距总宽度25%

            $.each($(".marginlx"),function(i,item){
                $(item).css("margin-left",ww+"px");
            });
        }
    }

    ClusterUlity.go();
});