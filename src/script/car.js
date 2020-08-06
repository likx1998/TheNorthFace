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
                            // console.log(this.sid[index]);
                            // console.log(this.num[index]);
                        })
                    }

                }
                callback(sid, num) {
                    $.ajax({
                        url: 'http://localhost/super/TheNorthFace/php/car.php',
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
                                                <a href="" class="remove">移除</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`
                                this.str += ''
                                $('.cart-box').html(this.str)
                            };

                        });

                    })
                }
            }
            new Rendering().init()
        }
    }

});