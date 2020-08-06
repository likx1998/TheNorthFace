define([], function() {
    return {
        init: function() {
            $username = $('.username input') //用户名
            $passwod = $('.passwod input') //密码
            $formitem = $('.formitem input') //输入验证码
            $em = $('.formitem em') //验证码
            $a = $('.formitem a') //点击切换
            $submit = $('.submit') //表单
            let formflag = false; //验证码标记
            let userflag = false //用户名
            let possflag = false //密码
            $form = $('.form')
            $username.on('blur', function(ev) { //移出开始传数据
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost/super/TheNorthFace/php/login.php',
                    data: {
                        name: $(ev.target).val()
                    }
                }).done((function(data) {
                    if (!data) {
                        $('.caution-content').eq(0).show()
                        $('.caution-content').eq(0).html('√').css('color', 'green')
                        userflag = true //用户名判断
                    } else {
                        $('.caution-content').eq(0).show()
                        $('.caution-content').eq(0).html('用户名重名').css('color', 'red')
                        userflag = false //用户名判断
                    }
                }))
            })
            $passwod.on('blur', function() {
                if ($passwod.val() !== '') {
                    possflag = true
                }
            })

            //验证码移出解析
            $formitem.on('blur', function() {
                    if ($formitem.val() == $('.formitem em').html()) {
                        formflag = true;
                        $('.caution-content').eq(2).show()
                        $('.caution-content').eq(2).html('√').css('color', 'green')
                    } else {
                        formflag = false;
                        $formitem.val('')
                    }


                })
                // 随机验证码
            function getRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            $('.formitem a').on('click', function() {
                $('.formitem em').html(getRandom(1000, 2000))
            })


            //点击submit判断
            $form.on('submit', function() {

                if ($username.val() === '') {
                    $('.caution-content').eq(0).show()
                    $('.caution-content').eq(0).html('用户名不能为空').css('color', 'red')

                    userflag = false
                }
                if ($passwod.val() === '') {
                    $('.caution-content').eq(1).show()
                    $('.caution-content').eq(1).html('密码不能为空').css('color', 'red')

                    possflag = false
                }
                if ($formitem.val() === '') {
                    $('.caution-content').eq(2).show()
                    $('.caution-content').eq(2).html('验证码不能为空').css('color', 'red')
                    formflag = false
                }
                if (formflag && userflag && possflag) {


                } else {
                    alert('信息错误')
                    return false
                }
            })

        }
    }

});