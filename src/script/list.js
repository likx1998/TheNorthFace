define(['index'], function(index) { //依赖index模块的功能
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
                    $.ajax({
                        url: 'http://localhost/super/TheNorthFace/php/list.php',
                        dataType: 'json'
                    }).done((data) => {
                        console.log(data)
                        this.str = '<ul>'
                        $.each(data, (index, value) => {
                            this.str += `<li>
                            <img src="${value.url}"> 
                            <span>${value.title}</span>  
                            <p>${value.price}</p>
                            </li>`;
                        })
                        this.str += '</ul>'
                        this.plist.html(this.str);
                    })
                    alert(1)
                }
            }
            new Rendering().init()
        }
    }

});