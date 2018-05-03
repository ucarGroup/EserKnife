window.onload = function() {
    $( "#index_manager_li" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });

    $( "#other_li" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#monitor_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#index_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#other_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#alias_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
};
