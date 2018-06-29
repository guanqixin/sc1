define([
    'jquery',
    'lazyload',
    'bscroll',
    'swiper',
    'text!temp/banner.html',
    'handlebars',
    'text!temp/content.html',
    'text!temp/expret.html',
    'text!temp/dl-list.html'
], function($, lazyload, bscroll, swiper, banner, handle, content, expret, list) {
    var index = 0;
    $('.header div').on('click', 'span', function() {
        index = $(this).index();
        change(index);
    });
    // var a = null;
    // var  b = null;
    //左滑右滑
    // $('#main').on('touchstart', function (e) {
    //     a = e.changedTouches[0].pageX;
    // });
    // $('#main').on('touchend', function (event) {
    //     b = event.changedTouches[0].pageX;
    //     if (a - b > 80) {
    //         index = 1;
    //         change(index);
    //     } else if (b - a > 80) {
    //         index = 0;
    //         change(index);
    //     }
    // });
    $('.header p').eq(1).on('click', 'em', function() {
        window.location.href = './myself/login.html';
    });
    $.ajax({
        url: '/api/home',
        dataType: 'json',
        success: function(data) {
            console.log(data.items[1]);
            changes(banner, data.items[0].data, '.box4');
            var a = new swiper('.swiper-container', {
                autoplay: true,
                loop: true
            });
            //本周最火
            changes(content, data.items[1], '.week-hot');
            changes(content, data.items[1], '.shlf-cont');
            $('#tab').on('click', function() {
                $(this).toggleClass('active');
                if ($('#tab').hasClass('active')) {
                    changes(content, data.items[1], '.shlf-cont');
                } else {
                    changes(list, data.items[1].data.data, '.shlf-cont');
                }
                $('.img').lazyload({
                    effect: 'fadeIn',
                    container: $('.two')
                });
            });
            //重磅推荐
            changes(expret, slce(data.items[2].data.data, 0), '.cont');
            //女生最爱
            changes(list, slce(data.items[3].data.data, 0), '.girl-cont');
            //男生最爱
            changes(list, slce(data.items[4].data.data, 0), '.boy-cont');
            $('.btn-change').on('click', function() {
                var n = $(this).attr('one') * 1;
                var press = n === 2 ? expret : list;
                var inds = $(this).attr('data-id') * 1;
                changes(press, slce(data.items[n].data.data, inds, $(this)), '.' + $(this).parent().prev().attr('class'));
                $('.img').lazyload({
                    effect: 'fadeIn',
                    container: $('#one')
                });
            });
            $('.img').lazyload({
                effect: 'fadeIn',
                container: $('#one')
            });
            $('.img').lazyload({
                effect: 'fadeIn',
                container: $('.two')
            });
            //跳转详情页
            $('.week-hot1 dl').on('click', function() {
                var id = $(this).attr('id');
                window.location.href = './myself/pageinfo.html?id=' + id;
            });
        }
    });

    function changes(str, data, parent) {
        var compile = handle.compile(str);
        var html = compile(data);
        if (parent === '.more1') {
            $(parent).append(html);
        } else {
            $(parent).html(html);
        }
    }

    function slce(data, ind, parent) {
        if (ind >= data.length / 5 - 1) {
            $(parent).attr('data-id', 0);
        } else {
            $(parent).attr('data-id', ind + 1);
        }
        var index = ind;
        var limit = 5;
        var newarr = [];
        var startindex = index * limit;
        var endindex = startindex + 5;
        newarr = data.slice(startindex, endindex);
        return newarr;
    }
    var d = 1;
    //上拉加载
    load();

    function load() {
        $('#one').on('scroll', function() {
            var a = $(this).scrollTop();
            var maxh = $('.box3').height() - $('.main').height();
            if (a > maxh - 2200) {
                $(this).off('scroll');
                if (d > 3) {
                    $('.load').html('暂无更多数据');
                    return;
                };
                $.ajax({
                    url: '/api/load' + d,
                    dataType: 'json',
                    success: function(data) {
                        changes(list, data.items, '.more1');
                        $('.img').lazyload({
                            effect: 'fadeIn',
                            container: $('#one')
                        });
                        d = d + 1;
                        load();
                    }
                });
            };
        });
    }
    $('.search-book').on('click', function() {
        window.location.href = './myself/search.html';
    });
    //跳转详情页
});

function change(index) {
    $('.header div span').eq(index).addClass('active').siblings().removeClass('active');
    $('.content').css('transform', 'translate(-' + index * 100 + '%)');
}