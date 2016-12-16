(function($){
    H.index = {
        $page: $("#page"),
        init:function(){
            shownewLoading();
            this.event();
            this.spellDom();
        },
        swiper: function(){
            var me = this,
                winWidth = $(window).width(),
                len = $('li').size(),
                allWidth = 0,
                i = 0;

            allWidth = winWidth * len;
            $("li").css("width", winWidth);
            var timer = setInterval(function(){
                var limitValue = winWidth *(++i) + 0;
                if(limitValue == allWidth){
                    me.$page.css({
                        'width' : allWidth + 'px',
                        '-webkit-transform' : 'translate3d(0px,0,0)',
                        '-webkit-transition-duration' : '.5s',
                        '-webkit-transition-timing-function' : 'ease'
                    });
                    i = 0;
                    // clearInterval(timer);
                    return;
                }
                me.$page.css({
                    'width' : allWidth + 'px',
                    '-webkit-transform' : 'translate3d(-' + limitValue + 'px, 0, 0)',
                    '-webkit-transition-duration' : '.8s',
                    '-webkit-transition-timing-function' : 'ease'
                });
            },2000);
        },
        spellDom: function(){
            var me = this,
                t = simpleTpl();
            for(var i = 1; i < len; i++){
                t._('<li><img src="images/'+ i +'.jpg" /></li>');
            }
           me.$page.append(t.toString());
           me.swiper();
        },
        event: function(){
            $("#next").tap(function(e){
                e.preventDefault();
                btn_animate($(this));
                W.location.href = "photo.html";
            });
        }
    }
})(Zepto);
$(function(){
    H.index.init();
});