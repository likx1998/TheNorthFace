define(['index', 'jquery.pagination'], function(index, p) { //依赖index模块的功能
    return {
        init: function() {
            index.init() //首页效果
                //渲染
            class Rendering {
                constructor() {
                    this.price = $('.price') //价格按钮
                    this.sales = $('.sales') //销量按钮
                    this.default = $('.default') //默认按钮
                    this.plist = $('.product-list') //包容的父盒子

                }
                init() {
                    // 排序的初始值
                    let arryd = [] //默认排序的数组
                    let array = [] //排序过的数组
                    let prev = null;
                    let next = null;
                    //1
                    $.ajax({ //初始化渲染
                        url: 'http://10.31.163.49//super/TheNorthFace/php/list.php',
                        dataType: 'json'
                    }).done((data) => {
                        this.str = '<ul>'
                        $.each(data, (index, value) => {
                            this.str += `
                            <a href="details.html?sid=${value.sid}">
                            <li>
                            <img data-original="${value.url}"class="lazy" width="215"height="215"> 
                            <span>${value.title}</span>  
                            <p class='price'>${value.price}</p>
                            </li>`;
                        })
                        this.str += '</ul>'
                        this.plist.html(this.str);
                        $(function() { //懒加载//2
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        arryd = [] //默认排序的数组
                        array = [] //排序过的数组
                        prev = null;
                        next = null;

                        $('.product-list li').each(function(index, ele) {
                                arryd[index] = $(this) //10个li
                                array[index] = $(this) //10个li

                            })
                            // console.log(arryd);
                            // console.log(array);

                    })


                    //开始分页
                    $('.page').pagination({
                            pageCount: 3,
                            coping: true,
                            prevContent: '上一页',
                            nextContent: '下一页',
                            homePage: '首页',
                            endPage: '尾页',
                            callback: (api) => {
                                $.ajax({
                                    url: 'http://10.31.163.49//super/TheNorthFace/php/list.php',
                                    dataType: 'json',
                                    data: {
                                        page: api.getCurrent() //把当前点击的页
                                    },
                                }).done((data) => {
                                    // console.log(data)
                                    this.str = '<ul>'
                                    $.each(data, (index, value) => {

                                        this.str += `
                                        <a href="details.html?sid=${value.sid}">
                                        <li>
                                        <img data-original="${value.url}"class="lazy" width="215"height="215"> 
                                        <span>${value.title}</span>  
                                        <p class='price'>${value.price}</p>
                                        </li>
                                    `;
                                    })
                                    this.str += '</ul>'
                                    this.plist.html(this.str);
                                    $(function() { //懒加载
                                        $("img.lazy").lazyload({ effect: "fadeIn" });
                                    });
                                    //分页结束
                                    arryd = [] //默认排序的数组
                                    array = [] //排序过的数组
                                    prev = null;
                                    next = null;
                                    $('.product-list li').each(function(index, ele) {
                                        arryd[index] = $(this);
                                        array[index] = $(this);

                                    })

                                })
                            }
                        })
                        // 默认
                    this.default.on('click', function() {
                        $.each(arryd, function(index, value) {
                            $('.product-list ul').append(value)
                        });
                        return;

                    })

                    // 价格
                    this.price.on('click', function() {
                        for (let i = 0; i < array.length - 1; i++) {
                            for (let j = 0; j < array.length - i - 1; j++) {
                                prev = parseFloat(array[j].find('.price').html());
                                next = parseFloat(array[j + 1].find('.price').html());
                                // console.log(prev, next);
                                if (prev > next) {
                                    let temp = array[j];
                                    array[j] = array[j + 1];
                                    array[j + 1] = temp;
                                    console.log(prev, next);
                                }

                            }
                        };
                        // console.log(array);
                        $.each(array, function(index, value) {
                            $('.product-list ul').append(value);
                        });
                    })




                }
            }
            new Rendering().init()

            // 左边二级菜单点击收起
            class Packup {
                constructor() {
                    this.btn = $('.fa') //按钮
                    this.list = $('.list') //ul
                }
                init() {
                    this.btn.on('click', (ev) => {
                        let parent = $(ev.target).parentsUntil('.bigbox').eq(2).find('ul').toggleClass('hide');
                        console.log(a);
                    })
                }

            }
            new Packup().init()

        }
    }

});