define(['index'], function(index) {
    return {
        init: function() {
            index.init() //首页效果
            class Rendering {
                constructor() {
                    this.sid = location.search.substring(1).split('=')[1];
                    this.money = $('.m-top p') //价格
                    this.title = $('.buy-a h1') //标题
                    this.list = $('.listbb') //大盒子
                    this.pic = $('.bigimg img') //大图片
                    this.li = $('.listbb li')

                }
                init() {
                    // 渲染
                    $.ajax({
                        url: 'http://10.31.163.49//super/TheNorthFace/php/detalis.php',
                        type: 'GET',
                        dataType: 'json',
                        data: { sid: this.sid }
                    }).done((data) => {
                        this.money.html(data.price)
                        this.title.html(data.title)
                        this.pic.attr('src', data.url)
                        let bpic = data.src.split(',') //转成数组

                        let str = ''
                        $.each(bpic, (index, value) => {
                                str += `<li '>
                               <img src='${value}'>
                                </li>`
                            })
                            // class='activess
                        this.list.html(str)
                    });
                    this.list.on('mousemove', 'li', (ev) => {
                        //？？加上类被划
                        $(ev.target).parents('li').addClass('activess').siblings().removeClass('activess')
                        let surl = $(ev.target).attr('src')
                        this.pic.attr('src', surl)
                    })

                }
            }
            new Rendering().init()
                //购物车存cookie
            class Cart {
                constructor() {
                    this.minus = $('.minus') //'减'按钮
                    this.push = $('.push') //加按钮
                    this.value = $('.value input') //值
                    this.btnb = $('.btn-b') //加入购物车的按钮
                    this.pics = $('.s-box p') //隐藏的盒子
                    this.sidarr = [] //存放sid
                    this.numarr = [] //存放数量
                    this.num = 1 //数量的值
                    this.sid = location.search.substring(1).split('=')[1]; // 获取地址栏的sid
                }
                init() {
                    this.push.on('click', () => {
                        this.num++
                            this.value.val(this.num) //input里的值

                    })
                    this.minus.on('click', () => {
                        this.num--
                            if (this.num <= 1) {
                                this.num = 1
                            }
                        this.value.val(this.num)

                    });
                    this.btnb.on('click', () => {
                        $('.s-box p').html('已加入购物车')
                        $('.s-box').show()
                        this.cookie()
                        if ($.inArray(this.sid, this.sidarr) === -1) { //如果第一次获取到的sid和数量一起push，如果不是那让数量让他原来的加上新获取到的
                            this.sidarr.push(this.sid)
                            this.numarr.push(this.value.val())
                            $.cookie('cookiesid', this.sidarr, {
                                expires: 7,
                                path: '/'
                            })
                            $.cookie('cookienum', this.numarr, {
                                expires: 7,
                                path: '/'
                            })
                        } else {
                            this.numarr[$.inArray(this.sid, this.sidarr)] = parseInt(this.numarr[$.inArray(this.sid, this.sidarr)]) + parseInt(this.value.val())
                            $.cookie('cookienum', this.numarr, {
                                expires: 7,
                                path: '/'
                            })
                        }
                        console.log(this.sidarr);
                        console.log(this.numarr);


                    })
                }
                cookie() { //判断cookie是否存在存在转成数值
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        this.sidarr = $.cookie('cookiesid').split(',')
                        this.numarr = $.cookie('cookienum').split(',')
                    } else {
                        this.sidarr = [] //存放sid
                        this.numarr = [] //存放数量
                    }
                }
            }
            new Cart().init()






        }

    }

});