define(['jquery', 'handlebars', 'text!temp/page.html'], function($, handle, page) {
    var a = window.location.search;

    function ids(url) {
        return url.split('?')[1].split('=')[1];
    }
    $.ajax({
        url: '/api/page?id=' + ids(a),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            changes(page, data, '.wrap');
            $('.origin').on('click', function() {
                window.location.href = 'word.html?chapter_count=' + $(this).attr('chapter');
            });
            $('.new').on('click', function() {
                window.location.href = 'menu.html?chapter_id=' + $(this).attr('chapter_id') + '&chapter_count=' + $(this).attr('chapter');
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
    handle.registerHelper('word_count', function(items, options) {
        return Math.round(items / 10000);
    });
    handle.registerHelper('time', function(items, options) {
        return new Date(items).toLocaleString();
    });
});