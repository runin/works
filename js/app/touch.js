(function($){
    H.touch = {
        $page: $(".page"),
        $mask_page: $("#mask-page"),
        $bottom_page: $("#bottom-page"),
        index: 0,//当前放大图的下标
        allWidth: 0,//全部图片的width
        len: 0,//全部图片个数
        init: function(){
            var me = this;
            me.spellDom(me.$bottom_page);
            me.event();
        },
        swiperInit: function(){
            var me = this,
                winWidth = $(window).width();
                me.len = me.$mask_page.find("li").size();

            me.allWidth = winWidth * me.len;
            me.$mask_page.find("li").css("width", winWidth);
            me.$mask_page.parent().removeClass("none");

            me.animate(me.$mask_page, me.allWidth, winWidth * me.index, '.8s');
        },
        change: function(direction){
            var me = this,
                winWidth = $(window).width(),
                limitValue = 0;

            if((me.index === (me.len-1) && (direction === "left")) || (me.index === 0 && (direction === "right"))){
                return;
            }
            if(direction === "left"){
                limitValue = parseInt(winWidth *(++me.index));
            }else if(direction === "right"){
                limitValue = parseInt(winWidth *(--me.index));
            }

            me.animate(me.$mask_page, me.allWidth, limitValue, '.8s');
        },
        animate: function(className, width, xValue, duration){
            className.css({
                'width' : width + 'px',
                '-webkit-transform' : 'translate3d(-' + xValue + 'px, 0, 0)',
                '-webkit-transition-duration' : duration,
                '-webkit-transition-timing-function' : 'ease'
            });
        },
        event: function(){
            var me = this;
            me.$bottom_page.delegate("li", 'click', function(e){
                e.preventDefault();

                me.index = $(this).index();
                me.spellDom(me.$mask_page);
                me.swiperInit();
            });
            me.$mask_page.click(function(e){
                e.preventDefault();
                $(this).find("li").remove();
                $(this).parent().addClass("none");
            }).delegate("li", 'swipeLeft', function(e){
                e.preventDefault();
                me.change("left");
            }).delegate("li", 'swipeRight', function(e){
                e.preventDefault();
                me.change("right");
            });
        },
        spellDom: function(className){
            var me = this,
                t = simpleTpl();
            for(var i = 1; i < len; i++){
                t._('<li><img src="images/'+ i +'.jpg" /></li>');
            }
            className.append(t.toString());
        }
    };
})(Zepto);
$(function(){
    H.touch.init();
});
