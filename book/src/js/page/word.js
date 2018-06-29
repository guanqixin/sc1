define(['jquery', 'base64'], function($) {
    var storage = window.localStorage;
    var search = window.location.search;
    var obj = url(search);
    $('.zon').html(obj.chapter_count);
    var chapter_id = obj.chapter_id || storage.getItem('chapid') || 1;
    $('.s').html(chapter_id);
    ajax();
    var arr = ['rgba(131, 167, 109, 0.5)', '#fff', '#d68f81', '#a7d4a0'];

    function ajax() {
        $.ajax({
            url: '/api/word?chapter=' + chapter_id,
            dataType: 'json',
            success: function(data) {
                jsonp(data.jsonp, function(res) {
                    var a = $.base64('decode', res, true);
                    var b = JSON.parse(a);
                    $('.title').html(b.t);
                    var str = '';
                    b.p.forEach(function(v) {
                        str += '<p>' + v + '</p>';
                    });
                    $('.con').html(str);
                    var fontSize = storage.getItem('fontSize') || 46;
                    $('.page p').css('fontSize', fontSize * 1);
                    var ind = storage.getItem('data-id') * 1 || 0;
                    $('.page').css('background', arr[ind]);
                    if (storage.getItem('night')) {
                        $('.page').css({
                            'background': '#000',
                            'color': '#eee'
                        });
                    } else {
                        $('.page').css('background', arr[ind]);
                    }
                });
            }
        });
    }

    function jsonp(url, success) {
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script);
        };
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    }

    function url(url) {
        var obj = {};
        url.split('?')[1].split('&').forEach(function(v) {
            obj[v.split('=')[0]] = v.split('=')[1];
        });
        return obj;
    }
    $('.next').on('click', function() {
        chapter_id = chapter_id * 1 + 1;
        chapter_id = chapter_id > obj.chapter_count ? obj.chapter_count : chapter_id;
        $('.s').html(chapter_id);
        storage.setItem('chapid', chapter_id);
        ajax();
    });
    $('.prev').on('click', function() {
        chapter_id = chapter_id - 1;
        chapter_id = chapter_id < 1 ? 1 : chapter_id;
        $('.s').html(chapter_id);
        storage.setItem('chapid', chapter_id);
        ajax();
    });
    $('.page').on('click', function() {
        $('.she').css('display', 'block');
    });
    $('section').on('click', function() {
        $('.she').css('display', 'none');
    });
    $('.bottom p').eq(0).on('click', function() {
        window.location.href = 'menu.html?chapter_id=' + chapter_id + '&chapter_count=' + obj.chapter_count;
    });
    $('.bottom p').eq(1).on('click', function() {
        $('.config-box').toggleClass('active');
    });
    $('.config-box').on('click', 'button', function() {
        fontSize = parseInt($('.page p').css('fontSize'));
        if ($(this).html() === '大') {
            $('.page p').css('fontSize', ++fontSize);
        } else {
            $('.page p').css('fontSize', --fontSize);
        }
        storage.setItem('fontSize', fontSize);
    });
    $('.box-color span').each(function(i, v) {
        v.style.background = arr[i];
    });
    $('.box-color').on('click', 'span', function() {
        $('.page').css('background', arr[$(this).index()]);
        storage.setItem('data-id', $(this).index());
    });
    $('.bottom p').eq(2).on('click', function() {
        $(this).toggleClass('nigth');
        if ($(this).hasClass('nigth')) {
            $(this).html('日间');
            $('.page').css({
                'background': '#000',
                'color': '#eee'
            });
        } else {
            $(this).html('夜间');
            var ind = storage.getItem('data-id') * 1 || 0;
            $('.page').css({
                'background': arr[ind],
                'color': '#000'
            });
        }
        storage.setItem('night', $(this).attr('class'));
    });
});