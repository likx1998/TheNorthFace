define([], function() {
    return {
        init: function() {
            const $downleft = $('.down-left a') //a标签那些按钮
            const $hidebox = $('.hidebox') //二级菜单
            const $car = $('.car') //购物车
            const $sbox = $('.s-box') //购物车盒子
                //二级菜单移入移除显示盒子
            $downleft.hover(function() {
                $(this).addClass('active').siblings('.down-left a').removeClass('active')
                $hidebox.eq($(this).index()).show().siblings('.hidebox').hide()
            }, function() {
                $downleft.removeClass('active');
                $hidebox.hide()
            });
            //能点到二级菜单
            $hidebox.hover(function() {
                $hidebox.show();
            }, function() {
                $hidebox.hide();
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
                    this.len = this.round.length;
                    this.time = null
                    this.time2 = null
                }
                init() {
                    this.round.on('click', (ev) => {
                        this.index = $(ev.target).index()
                        this.round.eq($(ev.target).index()).addClass('tab').siblings().removeClass('tab');
                        // this.round.eq(this.round.index()).addClass('tab').siblings().removeClass('tab')
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
                        }, 300);

                    })

                    this.time2 = setInterval(() => {
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
                        if ($(ev.target).index() > this.index) {
                            this.form.eq(this.index).animate({
                                left: -this.form.width()
                            })
                            this.index = $(ev.target).index()
                            this.form.eq($(ev.target).index()).animate({
                                left: 0
                            })
                        } else if ($(ev.target).index() < this.index) {
                            this.form.eq(this.index).animate({
                                left: this.form.width()
                            })
                            this.index = $(ev.target).index()
                            this.form.eq(this.index).animate({
                                left: 0
                            })
                        }
                        this.span.eq($(ev.target).index()).addClass('active1').siblings().removeClass('active1');

                    })
                    this.boxright.on('click', () => {
                        clearTimeout(this.time)
                        this.time = setTimeout(() => {
                            this.form.eq(this.index).animate({ //0
                                left: -this.form.width()
                            })
                            this.index--
                                if (this.index === -1) {
                                    this.index = 1
                                }
                            this.form.eq(this.index).css({ //1
                                left: this.form.width()
                            }).animate({
                                left: 0
                            })

                        }, 300);
                    })
                    this.boxleft.on('click', () => {
                        this.form.eq(this.index).animate({
                            left: this.form.width()
                        })
                        this.index++
                            if (this.index === this.len) {
                                this.index = 0
                            }
                        this.form.eq(this.index).css({
                            left: -this.form.width()
                        }).animate({
                            left: 0
                        })

                    });
                }
            }
            new ListCarousel().init()
        }
    }
})

// var arr=[]
// arr.length