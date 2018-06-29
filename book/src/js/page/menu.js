define(['jquery', 'handlebars', 'text!temp/menutemp.html'], function($, handle, list) {
    var urls = window.location.search;
    $.ajax({
        url: '/api/menu',
        dataType: 'json',
        success: function(data) {
            var ids = url(urls);
            var zon = data.item.chapter_count;
            data.item.toc.forEach(function(v, i) {
                if (v.chapter_id == ids.chapter_id) {
                    v.ids = 'true';
                }
                v.chapter_count = zon;
            });
            changes(list, data.item.toc, '.con');
            $('.list').on('click', 'li', function() {
                window.location.href = 'word.html?chapter_id=' + $(this).attr('data-id') + '&chapter_count=' + $(this).attr('chapter')
            });
        }
    });

    function changes(str, data, parent) {
        var compile = handle.compile(str);
        var html = compile(data);
        $(parent).html(html);
    }

    function url(urls) {
        var obj = {};
        urls.split('?')[1].split('&').forEach(function(v) {
            obj[v.split('=')[0]] = v.split('=')[1];
        });
        return obj;
    }
});