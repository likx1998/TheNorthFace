define([], function() {
    return {
        init: function() {
            //获取cookie渲染
            class Rendering {
                constructor() {
                    this.carbox = $('.cart-product ')
                }
                init() {
                    // console.log(123);
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        // console.log(123);
                        this.sidarr = $.cookie('cookiesid').split(', ')
                        this.numarr = $.cookie('cookienum').split(', ')
                        console.log(this.sidarr); //[1,2]
                        console.log(this.numarr); //[10,20]
                    }
                    $.each(this.sidarr, (index, value) => {
                        console.log(value); //sid数据 (1, 2)
                        // console.log(this.sidarr[value]); 
                        // console.log(this.numarr[value]);
                        // this.callback(this.sidarr[value], this.numarr[value])
                        this.callback(value);
                    })

                }

                callback(sid) {
                    $.ajax({
                        url: 'http://localhost/super/TheNorthFace/php/detalis.php',
                        dataType: 'json',
                        data: {
                            sid
                        }
                    }).done((data) => {
                        console.log(data);
                    })
                }
            }
            new Rendering().init()
        }
    }

});