define([], function() {
    return {
        init: function() {
            //获取cookie渲染
            class Rendering {
                constructor() {
                    this.str = '';
                }
                init() {

                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        console.log($.cookie('cookiesid'));
                        this.sid = $.cookie('cookiesid').split(',') //取
                        this.num = $.cookie('cookienum').split(',') //取
                            // console.log(this.sid, this.num);
                        $.each(this.sid, (index, value) => {
                            this.callback(this.sid[index], this.num[index]);
                        })
                    } else {
                        this.sid = []
                        this.num = []
                    }

                }
                callback(sid, num) {
                    $.ajax({
                        url: 'http://10.31.163.49//super/TheNorthFace/php/car.php',
                        dataType: 'json',
                    }).done((data) => {
                        // console.log(data)
                        $.each(data, (index, value) => {
                            if (sid == value.sid) {
                                this.str += `  <div class="cart-product " ;">
                                <div class="carts">
                                    <input type="checkbox" style="margin-left: 15px;margin-top: 50px;" class="cart-input">
                                    <div class="p-left">
                                        <div class="pic">
                                            <img src="${value.url}" alt="">
                                        </div>
                                        <span class="p-title">
                                            ${value.title}
                                        </span>
                                    </div>
                                    <div class="p-right">
                                        <ul>
                                            <li style="padding-top: 40px;" class="p-money">
                                                <p>${value.price}</p>
                                            </li>
                                            <li style="padding-top: 40px;" class="p-num">
                                                <div class="jiaan">
                                                    <a href="javascript:;" class="jian">-</a>
                                                    <input type="text" value="${num}">
                                                    <a href="javascript:;" class="jia">+</a>
                                                </div>
                                                <span class="warn-message">
                                                    余量有限
                                                </span>
                                            </li>
                                            <li style="padding-top: 40px;" class="p-subtotal">
                                                ${value.price*num}
                                            </li>
                                            <li style="padding-top: 40px;" class="p-action">
                                                <a href="">收藏</a>
                                                <i>|</i>
                                                <a href="javascipt:;" id="remove" data-index="${value.sid}">移除</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`
                                this.str += ''
                                $('.cart-box').html(this.str)
                            };


                        });
                        // 删除
                        $('.p-action #remove').on('click', function() {
                            $(this).parents('.cart-product ').remove();
                            if ($.cookie('cookienum') && $.cookie('cookiesid')) {
                                this.sid = $.cookie('cookiesid').split(',') //取
                                console.log(this.sid);
                                this.num = $.cookie('cookienum').split(',') //取
                                let cookenum = $(this).attr('data-index')
                                let cooksid = this.sid.indexOf() //找对对应的位置
                                this.sid.splice(cooksid, 1)
                                this.num.splice(cooksid, 1)
                                $.cookie('cookienum', this.num, {
                                    expires: 7,
                                    path: '/'
                                })
                                $.cookie('cookiesid', this.sid, {
                                    expires: 7,
                                    path: '/'
                                })

                            }


                        })

                    })

                }

                //购物车功能
                //1.点击移出商品消失


            }
            new Rendering().init()





        }
    }

});