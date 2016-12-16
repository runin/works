var __ns = function( fullNs ) {
    var nsArray = fullNs.split( '.' );
    var evalStr = '';
    var ns = '';
    for ( var i = 0, l = nsArray.length; i < l; i++ ) {
        i !== 0 && ( ns += '.' );
        ns += nsArray[i];
        evalStr += '( typeof ' + ns + ' === "undefined" && (' + ns + ' = {}) );';
    }
    evalStr !== '' && eval( evalStr );
};
var W = W || window;
__ns('H');


var btn_animate = function(str){
    str.addClass('flipInY');
    setTimeout(function(){
        str.removeClass('flipInY');
    },150);
};

/**
 * 字符串拼接
 * @param tpl
 * @returns {{store: *, _: _, toString: toString}}
 */
var simpleTpl = function( tpl ) {
    tpl = $.isArray( tpl ) ? tpl.join( '' ) : (tpl || '');

    return {
        store: tpl,
        _: function() {
            var me = this;
            $.each( arguments, function( index, value ) {
                me.store += value;
            } );
            return this;
        },
        toString: function() {
            return this.store;
        }
    };
};

/**
 * showTips
 * @param word 提示信息
 * @param pos 位置
 * @param timer 停留时间
 */
var showTipsFlag = true;
var showTips = function(tips, timer) {
    if (tips == undefined) return;
    if (showTipsFlag) {
        showTipsFlag = false;
        $('body').append('<div class="showTips" style="position:fixed;max-width:80%;z-index:999999999999;color:#FFF;padding:15px 18px;font-size:17px;border-radius:3px;background:rgba(0,0,0,.7);text-align:center;opacity:0">' + tips + '</div>');
        var winW = $(window).width(), winH = $(window).height(), tipsW = $('.showTips').width(), tipsH = $('.showTips').height(), timer = timer || 1200;
        $('.showTips').css({'left':(winW - tipsW)/2, 'top':(winH - tipsH)/2}).animate({'opacity': '1'}, 300, function() {
            setTimeout(function() {
                $('.showTips').animate({'opacity':'0'}, 100, function() {
                    $('.showTips').remove();
                    showTipsFlag = true;
                });
            }, timer);
        });
    };
};

var shownewLoading = function($container, tips) {
    var t = simpleTpl(),
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $loading = $container ? $container.find('#qy_loading') : $('body').children('#qy_loading'),
        tips = tips || '24张图加载中...';

    if ($loading.length > 0) {
        $loading.remove();
    };
    t._('<section id="qy_loading" class="qy-loading">')
        ._('<section class="qy-loading-logo">')
        ._('<section class="qy-logo-1"></section>')
        ._('<section class="qy-logo-2"></section>')
        ._('</section>')
        ._('<section class="qy-loading-tips">' + tips+ '</section>')
        ._('</section>')
    $container.append(t.toString());
};

var hidenewLoading = function($container) {
    if ($container) {
        $container.find('#qy_loading').remove();
    } else {
        $('body').children('#qy_loading').remove();
    };
};

var imgs = [], len = 25;
for(var i  = 0; i < len; i++){
    imgs.push("images/"+ i +".jpg");
}
var loadImg = function (imgs) {
    var loadprogress = 4.16;
    for (var i = 0; i < imgs.length; i++) {//图片预加载
        var img = new Image();
        img.style = "display:none";
        img.src = imgs[i];
        img.onload = function () {
            console.log("Image loading complete");
            $("body").css("opacity", 1);
            hidenewLoading();
        }
    }
};
loadImg(imgs);