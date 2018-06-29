var datalist = require('./data/data.json');
var home = require('./data/home.json');
var load1 = require('./data/recommend1.json');
var load2 = require('./data/recommend2.json');
var load3 = require('./data/recommend3.json');
var search = require('./search/searchKey.json');
var searchresult = require('./search/search.json');
var page = require('./new/352876.json');
var menu = require('./new/chapter-list.json');
var word1 = require('./new/data1.json');
var word2 = require('./new/data2.json');
var word3 = require('./new/data3.json');
var word4 = require('./new/data4.json');
var data = {
    '/api/send': datalist,
    '/api/home': home,
    '/api/load1': load1,
    '/api/load2': load2,
    '/api/load3': load3,
    '/api/search': search,
    '/api/page?id=352876': page,
    '/api/menu': menu,
    '/api/word?chapter=1': word1,
    '/api/word?chapter=2': word2,
    '/api/word?chapter=3': word3,
    '/api/word?chapter=4': word4
};
module.exports = function(url) {
    if (/\/api\/search1/.test(url)) {
        var obj = {};
        var arr = [];
        var a = decodeURIComponent(url.split('?')[1].split('=')[1]);
        var reg = RegExp(a);
        searchresult.items.forEach(function(v, i) {
            if (reg.test(v.title)) {
                arr.push(v);
            }
        });
        if (!arr.length) {
            obj.code = 1;
            obj.msg = '暂无数据';
        } else {
            obj.code = 0;
            obj.msg = arr;
        }
        return obj;
    }
    return data[url];
};