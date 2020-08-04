define([], function() {
    return {
        init: function() {
            const $downleft = $('.down-left a') //a标签那些按钮
            const $hideboxking = $('.hideboxking') //最外面的盒子
            const $hidebox = $('.hidebox') //二级菜单
            const $car = $('.car') //购物车
            const $sbox = $('.s-box') //购物车盒子
            const $navtop = $('.f-top .nav-top') //右边固定定位
            const $aking = $('.aking') //点击返回顶部
            const $ewml = $('.nav-top #ewm-l') //2个二维码
            $navtop.eq(1).hover(function() { //导航栏第一个
                $ewml.eq(0).show()
            }, function() {
                $ewml.eq(0).hide()
            })
            $navtop.eq(2).hover(function() {
                    $ewml.eq(1).show()
                }, function() {
                    $ewml.eq(1).hide()
                })
                //返回顶部
            $aking.on('click', function() {
                    $('html,body').animate({
                        scrollTop: 0
                    })
                })
                //二级菜单移入移除显示盒子
            $downleft.on('mousemove', function() {
                $hideboxking.show() //大盒子
                $(this).addClass('active').siblings('.down-left a').removeClass('active')

                $hidebox.eq($(this).index()).show().siblings('.hidebox').hide() //小盒子当前显示其他消失
            })
            $downleft.on('mouseout', function() {
                    $hideboxking.hide() //大盒子
                })
                //     //能点到二级菜单
            $hideboxking.hover(function() { //大盒子自己点击消失
                $hideboxking.show(); //大盒子
            }, function() {
                $hideboxking.hide(); //大盒子
            });
            //点击显示购物车
            $car.hover(function() {
                $sbox.show();
            }, function() {
                $sbox.hide();
            });
            // 能点到购物车盒子
            $sbox.hover(function() {
                $sbox.show();
            }, function() {
                $sbox.hide();
            });

            //轮播图
            class Carousel {
                constructor(obj) {
                    this.slidebox = $(obj.selector);
                    this.btnr = this.slidebox.find(obj.right); //右按钮
                    this.btnl = this.slidebox.find(obj.left); //左按钮
                    this.round = this.slidebox.find(obj.span); //4个小圆圈
                    this.picul = this.slidebox.find(obj.ul); //ul
                    this.index = 0;
                    this.len = this.round.length; //小圆点的个数，来和this.index比较
                    this.time = null
                    this.time2 = null

                }
                init() {
                    this.round.on('click', (ev) => {
                        this.index = $(ev.target).index()
                        this.round.eq($(ev.target).index()).addClass('tab').siblings().removeClass('tab');
                        this.shift()
                    })
                    this.btnr.on('click', () => {
                        clearTimeout(this.time)
                        this.time = setTimeout(() => {
                            this.index++
                                if (this.index === this.len) { //圆圈按钮长度是4相当于按了第五下超出了
                                    this.index = 0
                                }
                            this.shift()
                        }, 300);

                    });
                    this.btnl.on('click', () => {
                        clearTimeout(this.time)
                        this.time = setTimeout(() => {
                            this.index--
                                if (this.index === -1) {
                                    this.index = this.len - 1
                                }
                            this.shift()
                        }, 500);

                    })

                    setInterval(() => { //3秒一次
                        this.btnr.click()
                    }, 3000);

                };

                shift() {
                    this.round.eq(this.index).addClass('tab').siblings('span').removeClass('tab');
                    this.picul.stop(true).animate({
                        left: -this.index * this.slidebox.width()
                    })
                }
            }
            new Carousel({ selector: '.slideshow', right: '.right', left: '.left', span: ' span', ul: 'ul' }).init()
                //下面列表框轮播图运动
            class ListCarousel {
                constructor() {
                    this.boxleft = $('.boxleft') //左按钮
                    this.boxright = $('.boxright') //右按钮
                    this.span = $('.pagination span') //2个小按钮
                    this.map = $('.maps-list')
                    this.form = $('.form') //一开始存在的
                    this.len = this.span.length;
                    this.time = null
                    this.index = 0
                }
                init() {
                    this.span.on('click', (ev) => {
                            let curr = $(ev.target).index() //存取当前点击的索引，理解为新索引
                            if (curr > this.index) { //新索引大于旧索引
                                this.move(-1)
                                this.index = curr //把新索引赋值给旧索引
                                this.form.eq(curr).css({ //让代表当前新索引的图片进来，看上去就像2张一起移动
                                    left: this.form.width()
                                }).animate({
                                    left: 0
                                })
                            } else if (curr < this.index) {
                                this.move(1) //回调函数
                                this.form.eq(this.index).animate({
                                    left: 0
                                }).css({
                                    left: this.form.width()
                                })
                            }
                            this.span.eq(curr).addClass('active1').siblings().removeClass('active1');
                            console.log(`click` + this.index);



                        })
                        // console.log(this.index);
                    this.boxright.on('click', () => {
                        clearTimeout(this.time)
                        this.time = setTimeout(() => {
                            this.form.eq(this.index).animate({ //0
                                left: -this.form.width()
                            })
                            this.index++
                                if (this.index > 1) {
                                    this.index = 0
                                }
                            this.form.eq(this.index).css({ //1
                                left: this.form.width()
                            }).animate({
                                left: 0
                            })
                            console.log(`
                                                        btn ` + this.index);
                            this.span.eq(this.index).addClass('active1').siblings().removeClass('active1');
                        }, 500);
                    })
                    this.boxleft.on('click', () => {
                        this.form.eq(this.index).animate({
                            left: this.form.width()
                        })
                        this.index--
                            if (this.index < 0) {
                                this.index = this.len - 1;
                            }
                        this.form.eq(this.index).css({
                            left: -this.form.width()
                        }).animate({
                            left: 0
                        })
                        this.span.eq(this.index).addClass('active1').siblings().removeClass('active1');
                        console.log(`
                                                        btn ` + this.index);
                    });

                    setInterval(() => { //3秒点一次
                        this.boxright.click()
                    }, 3000);

                }
                move(i) {
                    this.form.eq(this.index).animate({ //赋值之前我要把原来旧的索引代表的图片远动出去 把0一出去
                        left: i * this.form.width()
                    })
                    this.index = curr
                }
            }
            new ListCarousel().init()
                // 底部切换
            class Switchover {
                constructor() {
                    this.list = $('.ullist   a') //两个按钮
                    this.box1 = $('.box1') //两张图片

                }
                init() {
                    this.list.on('click', (ev) => {
                        this.list.eq($(ev.target).index()).addClass('logo-k').siblings().removeClass('logo-k');
                        this.box1.eq($(ev.target).index()).show().siblings().hide()

                    })
                }
            }
            new Switchover().init()
        }
    }
})