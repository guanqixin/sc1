var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mock = require('./mock/data.js');
gulp.task('default', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            host: 'localhost',
            open: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    if (pathname === '/api/send') {
                        var arr = [];
                        req.on('data', function(chunk) {
                            arr.push(chunk);
                        });
                        req.on('end', function() {
                            var a = require('querystring').parse(Buffer.concat(arr).toString());
                            mock(pathname).data.forEach(function(v, i) {
                                if (a.name === v.name && a.pwd === v.pwd) {
                                    return res.end(JSON.stringify({ 'code': 1 }));
                                };
                            });
                            res.end(JSON.stringify({ 'code': 0, 'mesg': '请输入正确的用户名或密码' }));
                        });
                    } else {
                        res.end(JSON.stringify(mock(req.url)));
                    }
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});