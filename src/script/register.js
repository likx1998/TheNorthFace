define([], function() {
    return {
        init: function() {
            let $name = $('.input1') //姓名
            let $pass = $('.input2') //密码
            let $form = $('.form')
            $('.btn').on('click', function() { //传输 
                console.log($name.val());
                console.log($pass.val());
                $.ajax({
                    url: 'http://10.31.163.49//super/TheNorthFace/php/register.php',
                    type: 'POST',
                    data: {
                        name: $name.val(),
                        pass: $pass.val()
                    }
                }).done(function(data1) {
                    if (!data1) {
                        alert('用户名密码错误')
                        $pass.val('');
                    } else {
                        alert('登录成功！')
                        location.href = 'http://10.31.163.49/super/TheNorthFace/src/index1.html'
                        $.cookie('username', $name.val(), {
                            expires: 7,
                            path: '/'
                        })
                    }
                })
            })
        }
    }

});