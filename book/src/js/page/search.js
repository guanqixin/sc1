define(['jquery',
    'lazyload',
    'text!temp/searchinit.html',
    'text!temp/his.html',
    'handlebars',
    'text!temp/searchinfo.html'
], function($, lazyload, init, hist, handle, list) {
    var storage = window.localStorage;
    var m = JSON.parse(storage.getItem('hist')) || [];
    $.ajax({
        url: '/api/search',
        dataType: 'json',
        success: function(data) {
            changes(init, data.ads, '.init');
            changes(hist, m, '.his');
        }
    });
    $('.s').on('click', function() {
        $('.init').css('display', 'none');
        var a = $('.sea').val();
        if (a === '') {
            $('.init').css('display', 'block');
            $('.search-content').css('display', 'none');
        } else {
            $('.search-content').css('display', 'block');
            m.push(a);
            storage.setItem('hist', JSON.stringify(m));
            changes(hist, m, '.his');
            $.ajax({
                url: '/api/search1?name=' + a,
                dataType: 'json',
                success: function(res) {
                    if (res.code === 1) {
                        $('.search-content').html(res.msg);
                        $('.search-content').css({
                            'textAlign': 'center',
                            'width': '100%',
                            'paddingTop': '20px'
                        });
                    } else {
                        changes(list, res.msg, '.search-content');
                    }
                    $('.img').lazyload({
                        effect: 'fadeIn',
                        container: $('.search-content')
                    });
                }
            });
        }
    });

    function changes(str, data, parent) {
        var compile = handle.compile(str);
        var html = compile(data);
        $(parent).html(html);
    }
});