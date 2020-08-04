define(['index', 'jquery.pagination'], function(index, p) { //依赖index模块的功能
    return {
        init: function() {
            index.init() //首页效果
                //渲染
            class Rendering {
                constructor() {
                    this.arryd = [] //默认排序的数组
                    this.array = [] //排序过的数组
                    this.prev = null;
                    this.next = null;
                    this.plist = $('.product-list')

                }
                init() {
                    $.ajax({ //初始化渲染
                        url: 'http://localhost/super/TheNorthFace/php/list.php',
                        dataType: 'json'
                    }).done((data) => {
                        console.log(data)
                        this.str = '<ul>'
                        $.each(data, (index, value) => {
                            this.str += `<li>
                            <img data-original="${value.url}"class="lazy" width="215"height="215"> 
                            <span>${value.title}</span>  
                            <p>${value.price}</p>
                            </li>`;
                        })
                        this.str += '</ul>'
                        this.plist.html(this.str);
                        $(function() { //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
                    this.arryd = [] //默认排序的数组
                    this.array = [] //排序过的数组
                    this.prev = null;
                    this.next = null;
                    $('.product-list li').each(function(index, value) {
                        this.arryd[index] = $(this);
                        this.array[index] = $(this)
                    })
                    $('.page').pagination({
                        pageCount: 3,
                        coping: true,
                        prevContent: '上一页',
                        nextContent: '下一页',
                        homePage: '首页',
                        endPage: '尾页',
                        callback: (api) => {
                            console.log(api.getCurrent());
                            $.ajax({
                                url: 'http://localhost/super/TheNorthFace/php/list.php',
                                data: {
                                    page: api.getCurrent() //把当前点击的页面
                                },
                                dataType: 'json'
                            }).done((data) => {
                                console.log(data)
                                this.str = '<ul>'
                                $.each(data, (index, value) => {
                                    this.str += `<li>
                                    <img data-original="${value.url}"class="lazy" width="215"height="215"> 
                                    <span>${value.title}</span>  
                                    <p>${value.price}</p>
                                    </li>`;
                                })
                                this.str += '</ul>'
                                this.plist.html(this.str);
                                $(function() { //懒加载
                                    $("img.lazy").lazyload({ effect: "fadeIn" });
                                });
                            })
                        }
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
                        //当我点击当前的btn list消失
                        // console.log(this.btn);
                        // console.log(this.list);

                        this.btn.on('click', (ev) => {
                            let parent = $(ev.target).parentsUntil('.bigbox').eq(2).find('ul').toggleClass('hide');
                            // console.log(parent);
                            // console.log($(ev.target).index());
                            // this.list.eq($(ev.target).index()).toggleClass('hide')
                        })
                    }
                    // rtindex(jqnode) {
                    //     let curr = 0;
                    //     $.each(this.btn, function(index, node) {
                    //         console.log(index, node);
                    //         if ($(this) == jqnode) {
                    //             curr = index;
                    //         }
                    //     });
                    //     return curr;
                    // }
            }
            new Packup().init()

        }
    }

});