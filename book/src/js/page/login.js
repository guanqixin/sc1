define(['jquery'], function($) {
    $('.login').on('click', function() {
        var name = $('input').eq(0).val();
        var pwd = $('input').eq(1).val();
        if (name !== '' && pwd !== '') {
            $.ajax({
                url: '/api/send',
                type: 'post',
                data: {
                    name: name,
                    pwd: pwd
                },
                success: function(data) {
                    var data = JSON.parse(data);
                    if (data.code === 1) {
                        history.go(-1);
                    } else {
                        alert(data.mesg);
                    }
                }
            });
        } else {
            alert('请输入账号或密码');
        }
    });
});