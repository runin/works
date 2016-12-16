(function($){
    H.photo = {
        $page: $(".page"),
        $mask_page: $("#mask-page"),
        $bottom_page: $("#bottom-page"),
        timer: null,
        init: function(){
            var me = this;
            me.spellDom(me.$bottom_page);
            me.event();
        },
        swiper: function(index){
            var me = this,
                winWidth = $(window).width(),
                len = me.$mask_page.find("li").size(),
                allWidth = 0,
                i = index;

            allWidth = winWidth * len;
            me.$mask_page.find("li").css("width", winWidth);
            me.$mask_page.parent().removeClass("none");

            me.animate(me.$mask_page, allWidth, winWidth * i, '.8s');

            me.timer = setInterval(function(){
                var limitValue = parseInt(winWidth *(++i));
                if(limitValue == allWidth){
                    me.animate(me.$mask_page, allWidth, "0px", '.5s');
                    i = 0;
                    // clearInterval(me.timer);
                    return;
                }
                me.animate(me.$mask_page, allWidth, limitValue, '.8s');
            },2000);
        },
        animate: function(className, width, xValue, duration){
            className.css({
                'width' : width + 'px',
                '-webkit-transform' : 'translate3d(-' + xValue + 'px, 0, 0)',
                '-webkit-transition-duration' : duration,
                '-webkit-transition-timing-function' : 'ease'
            });
        },
        spellDom: function(className){
            var me = this,
                t = simpleTpl();
            for(var i = 1; i < len; i++){
                t._('<li><img src="images/'+ i +'.jpg" /></li>');
            }
            className.append(t.toString());

        },
        event: function(){
            var me = this, index = 0;
            me.$bottom_page.delegate("li", 'click', function(e){
                e.preventDefault();

                index = $(this).index();
                me.spellDom(me.$mask_page);
                me.swiper(index);
            });
            me.$mask_page.click(function(e){
                e.preventDefault();
                clearInterval(me.timer);
               $(this).find("li").remove();
               $(this).parent().addClass("none");
            });
            $("#next").tap(function(e){
                e.preventDefault();
                btn_animate($(this));
                W.location.href = "touch.html";
            });
        }
    }
})(Zepto);
$(function(){
    H.photo.init();
});