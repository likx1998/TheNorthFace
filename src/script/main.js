//配置模块
//第三方文件

require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazy': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min', //懒加载
        'jqcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min' //cookie
    },
    waitSeconds: 15,
    shim: {
        'lazy': {
            deps: ['jquery']
        },
        'jqcookie': {
            deps: ['jquery']
        }
    }


});

//加载模块
require(['jquery', 'lazy', 'jqcookie'], function($, l, cookie) {
    let mod = $('#currentpage').attr('currentmod'); //获取script标签下面的属性值
    if (mod) {
        //如果mod存在，加载对应的模块
        require([mod], function(modlist) {
            modlist.init();
        });
    }
});