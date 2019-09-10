// 面向对象
class specialEffects {
    constructor() {
        // 小轮播图属性
        this.sBanner =$('.search_right');
        this.li = $('.search_right li');
        this.three = $('.three');
        this.four = $('.four');
        this.num = 0;
        this.timer = null;
        //展开关闭属性
        this.big = $('.big');
        this.sml = $('.sml');
        this.close = $('.close')
        this.n = this.close.html()
        // 大轮播图属性
        this.banner = $('.banner');
        this.btns = $('.banner_dot li');
        this.pics = $('.banner_pic li');
        this.prev = $('.banner .prev');
        this.next = $('.banner .next');
        this.num1 = 0; //存放当前的索引。
        this.timer1 = null;
        // 登录注册属性
        this.login = $('#login')
        this.register = $('#register')
        this.span1 = $('.login-h .close1')
        this.span2 = $('.register-h .close1')
        this.register_b = $('#register-b')
        this.id = $('.login-h .phone-n')
        this.pass = $('.login-h .pass')
        this.id1 = $('.register-h .phone-n')
        this.pass1 = $('.register-h .pass')
        this.login_b = $('.login-h button')
        this.reg_b = $('.register-h button')
        this.reg_span = $('.register-h .hint')
        this.tel = /^1[34578]\d{9}$/; //规则

    }

    init() {
        let _this = this
        //小轮播图移入移出开启关闭定时器
        this.sBanner.hover(function () {
            clearInterval(_this.timer)
        }, function () {
            _this.timer = setInterval(function () {
                _this.s_right()
            }, 500)
        });

        this.three.on('click', function () {
            _this.s_left()
        });

        this.four.on('click', function () {
            _this.s_right()
        });
        this.timer = setInterval(function () {
            _this.s_right()
        }, 500)
        //展开收起
        this.close.on('click', function () {
            if (_this.n == '收起<i>&lt;</i>') {
                // $big.css('height',0)
                _this.big.animate({
                    height: 0
                })
                _this.sml.animate({
                    height: 60
                }, 200)
                _this.n = '展开<i>&lt;</i>'
                _this.close.html(_this.n)
            } else if (_this.n == '展开<i>&lt;</i>') {
                _this.big.animate({
                    height: 400
                })
                _this.sml.animate({
                    height: 0
                }, 200)
                _this.n = '收起<i>&lt;</i>'
                _this.close.html(_this.n)
            }
        })

        //大轮播图效果
        //1.给小圆圈按钮添加点击事件
        this.btns.on('click', function () {
            _this.num1 = $(this).index();
            _this.pics.eq(_this.num1).css('display', 'block').siblings().css('display', 'none')
        })
        // 给小圆圈添加hover事件
        this.btns.hover(function () {
            $(this).addClass('red').siblings().removeClass('red');

        });
        //移入移出开启关闭定时器
        this.banner.hover(function () {
            $('.prev,.next').show();
            clearInterval(_this.timer1)
        }, function () {
            $('.prev,.next').hide();
            _this.timer1 = setInterval(function () {
                _this.b_next()
            }, 500)
        });

        this.next.on('click', function () {
            _this.b_next()
        });

        this.prev.on('click', function () {
            _this.b_prev()
        });
        this.timer1 = setInterval(function () {
            _this.b_next()
        }, 500)
        //数据渲染
        $.ajax({
            url: 'http://localhost/js1907/JS/Day33/src/php/aiqiyi.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '<ul>';
            console.log(data);
            $.each(data, function (index, value) {
                $html += `
                        <li>
                            <a href="details.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}" />
                                <span>${value.tittle}</span>
                                <p>¥${value.prices}</p>
                            </a>
                        </li>
                    `;
            });
            $html += '</ul>';
            $('.goodslist').html($html);
        });

        //登录注册
        this.login.on('click', function () {
            $('.mengban').css('display', 'block')
            $('.login-h').css('display', 'block')
        })

        this.span1.on('click', function () {
            $('.mengban').css('display', 'none')
            $('.login-h').css('display', 'none')
        })

        this.register.on('click', function () {
            $('.mengban').css('display', 'block')
            $('.register-h').css('display', 'block')
        })

        this.span2.on('click', function () {
            $('.mengban').css('display', 'none')
            $('.register-h').css('display', 'none')
        })
        this.register_b.on('click', function (ev) {
            ev.preventDefault()
            $('.login-h').hide()
            $('.register-h').show()
        })
        this.id.on('focus', function () {
            $(this).attr('placeholder', '')
        })
        this.id1.on('focus', function () {
            $(this).attr('placeholder', '')
        })
        // 表单提交
        this.login_b.on('click', function () {
            $.ajax({
                type: 'post',
                url: 'http://localhost/js1907/JS/Day33/src/php/login.php',
                data: {
                    user: _this.id.val(),
                    pass: _this.pass.val()
                },
                success: function (d) {
                    if (!d) {
                        alert('用户名和密码错误');
                    } else {
                        alert('登录成功');
                        location.href = 'http://localhost/js1907/JS/Day33/src/aiqiyi.html';
                    }
                }
            });
        })
        // 注册提交
        // 判断
        this.id1.on('focus', function () {
            if ($(this).val() === '') {
                _this.reg_span.html('请输入手机号');
                _this.reg_span.css('color', '#ccc');
            }
        })



        this.id1.on('blur', function () {
            $.ajax({
                type: 'post',
                url: 'http://localhost/js1907/JS/Day33/src/php/register.php',
                data: { //给后端
                    checkname: $(this).val(),
                },
                success: function (d) {
                    console.log(d)
                    if (_this.id1.val() !== '') {
                        if (!d) {
                            _this.reg_span.html('√');
                            _this.reg_span.css('color', 'green');
                            // let $tel = /^1[34578]\d{9}$/; //规则
                            if (_this.tel.test(_this.id1.val())) {
                                _this.reg_span.html('√');
                                _this.reg_span.css('color', 'green');
                                // telflag = true;
                            } else {
                                _this.reg_span.html('手机号码有误');
                                _this.reg_span.css('color', 'red');
                                // telflag = false;

                            }
                        } else {
                            alert('该用户名已存在,请重新输入')
                            _this.id1.val('');
                            _this.id1.focus();
                        }
                    } else {
                        _this.reg_span.html('手机号不能为空');
                        _this.reg_span.css('color', 'red');;
                        // telflag = false;
                    }
                }
            })
        })
        // 提交
        this.reg_b.on('click', function () {
            if (!_this.tel.test(_this.id1.val()) || _this.id1.val() == '') {
                alert('手机号输入有误，请重新输入');
                _this.id1.val('');
                _this.id1.focus();
            } else if(_this.pass1.val() == ''){
                alert('密码不能为空，请重新输入');
                _this.pass1.focus();
            }else {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/js1907/JS/Day33/src/php/register.php',
                    data: { //给后端
                        username: _this.id1.val(),
                        password: _this.pass1.val()
                    },
                    success: function () {
                        alert('注册成功');
                        location.href = 'http://localhost/js1907/JS/Day33/src/aiqiyi.html';
                    }
                })
            }

        })
    }


    //小轮播图左切换
    s_left() {
        this.num--;
        if (this.num < 0) { //如果num大于最大的索引值，重新设置为0
            this.num = this.li.length - 1;
        }
        this.li.eq(this.num).css('display', 'block').siblings().css('display', 'none')
    };
    //小轮播图右切换
    s_right() {
        this.num++;
        if (this.num > this.li.length - 1) { //如果num大于最大的索引值，重新设置为0
            this.num = 0;
        }
        this.li.eq(this.num).css('display', 'block').siblings().css('display', 'none')
    };
    //大轮播图右切换
    b_next() {
        this.num1++;
        if (this.num1 > this.btns.length - 1) { //如果num大于最大的索引值，重新设置为0
            this.num1 = 0;
        }
        this.pics.eq(this.num1).css('display', 'block').siblings().css('display', 'none')
        this.btns.eq(this.num1).addClass('red').siblings().removeClass('red');
    };
    //大轮播图左切换
    b_prev() {
        this.num1--;
        if (this.num1 < 0) { //如果num大于最大的索引值，重新设置为0
            this.num1 = this.btns.length - 1;
        }
        this.pics.eq(this.num1).css('display', 'block').siblings().css('display', 'none')
        this.btns.eq(this.num1).addClass('red').siblings().removeClass('red');
    };


}


new specialEffects().init()


let $loutinav = $('#loutinav'); //获取楼梯
let $loutinavli = $('#loutinav li');
let $louceng = $('.louti');
//1.拖动滚动条，显示隐藏楼梯

$(window).on('scroll', function () {
    let $topvalue = $(this).scrollTop(); //滚动条的top值
    if ($topvalue >= 800) {
        $loutinav.show();
    } else {
        $loutinav.hide();
    }
    //4.触发滚轮，对应的楼梯天类名active,获取每一个楼层的top值。
    $louceng.each(function (index, element) {
        let $loucenttop = $(element).offset().top + $(element).height() / 2; //每个楼层的top值。
        if ($loucenttop > $topvalue) { //楼层的top值>滚动条的top
            $loutinavli.eq(index).addClass('active').siblings().removeClass('active'); //给满足条件的第一个添加类。
            return false; //满足一次就终止循环
        }
    });
});
//2.左侧楼梯添加点击事件

$loutinavli.not('.last').on('click', function () {
    //当前的楼梯添加类active;
    $(this).addClass('active').siblings().removeClass('active');
    //获取每一个和当前楼梯对应的楼层的top值。
    let $top = $louceng.eq($(this).index()).offset().top //$(this).index():当前点击楼梯的li的索引
    $('html,body').animate({
        scrollTop: $top
    });
});
//3.回到顶部
$('.last').on('click', function () {
    $('html,body').animate({
        scrollTop: 0
    });
});




// 小轮播图
// ! function () {
//     var $sBanner = $('.search_right')
//     var $li = $('.search_right li');
//     var $three = $('.three');
//     var $four = $('.four');
//     var $num = 0;
//     // 开启关闭定时器
//     $sBanner.hover(function () {
//         clearInterval($timer1)
//     }, function () {
//         $timer1 = setInterval(function () {
//             $num++;
//             if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
//                 $num = 0;
//             }
//             $li.eq($num).css('display', 'block').siblings().css('display', 'none')
//         }, 200)
//     });
//     // 点击事件
//     $three.on('click', function () {
//         $num--;
//         if ($num < 0) { //如果num大于最大的索引值，重新设置为0
//             $num = $li.length - 1;
//         }
//         $li.eq($num).css('display', 'block').siblings().css('display', 'none')
//     });

//     $four.on('click', function () {
//         $num++;
//         if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
//             $num = 0;
//         }
//         $li.eq($num).css('display', 'block').siblings().css('display', 'none')
//     });
//     var $timer1 = setInterval(function () {
//         $num++;
//         if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
//             $num = 0;
//         }
//         $li.eq($num).css('display', 'block').siblings().css('display', 'none')
//     }, 500)
// }()

// //展开、收起
// ! function () {
//     var $big = $('.big');
//     var $sml = $('.sml');
//     var $close = $('.close')
//     var n = $close.html()
//     $('.close').on('click', function () {
//         if (n == '收起<i>&lt;</i>') {
//             // $big.css('height',0)
//             $big.animate({
//                 height: 0
//             })
//             $sml.animate({
//                 height: 60
//             }, 200)
//             n = '展开<i>&lt;</i>'
//             $close.html(n)
//         } else if (n == '展开<i>&lt;</i>') {
//             $big.animate({
//                 height: 400
//             })
//             $sml.animate({
//                 height: 0
//             }, 200)
//             n = '收起<i>&lt;</i>'
//             $close.html(n)
//         }
//     })

// }()

// // 大轮播图效果
// ! function () {
//     var $banner = $('.banner');
//     var $btns = $('.banner_dot li');
//     var $pics = $('.banner_pic li');
//     var $prev = $('.banner .prev');
//     var $next = $('.banner .next');
//     var $num = 0; //存放当前的索引。

//     //1.给小圆圈按钮添加点击事件
//     $btns.on('click', function () {
//         $num = $(this).index();
//         $pics.eq($num).css('display', 'block').siblings().css('display', 'none')
//     })
//     // 给小圆圈添加hover事件
//     $btns.hover(function () {
//         $(this).addClass('red').siblings().removeClass('red');

//     });

//     $banner.hover(function () {
//         $('.prev,.next').show();
//         clearInterval($timer)
//     }, function () {
//         $('.prev,.next').hide();
//         $timer = setInterval(function () {
//             $num++;
//             if ($num > $btns.length - 1) { //如果num大于最大的索引值，重新设置为0
//                 $num = 0;
//             }
//             $pics.eq($num).css('display', 'block').siblings().css('display', 'none')
//             $btns.eq($num).addClass('red').siblings().removeClass('red');
//         }, 500)
//     });


//     $next.on('click', function () {
//         $num++;
//         if ($num > $btns.length - 1) { //如果num大于最大的索引值，重新设置为0
//             $num = 0;
//         }
//         $pics.eq($num).css('display', 'block').siblings().css('display', 'none')
//         $btns.eq($num).addClass('red').siblings().removeClass('red');
//     });


//     $prev.on('click', function () {
//         $num--;
//         if ($num < 0) { //如果num大于最大的索引值，重新设置为0
//             $num = $btns.length - 1;
//         }
//         $pics.eq($num).css('display', 'block').siblings().css('display', 'none')
//         $btns.eq($num).addClass('red').siblings().removeClass('red');
//     });

//     // 定时器
//     var $timer = setInterval(function () {
//         $num++;
//         if ($num > $btns.length - 1) { //如果num大于最大的索引值，重新设置为0
//             $num = 0;
//         }
//         $pics.eq($num).css('display', 'block').siblings().css('display', 'none')
//         $btns.eq($num).addClass('red').siblings().removeClass('red');
//     }, 500)
// }()
// // 数据渲染
// ! function () {
//     //1.拼接数据
//     $.ajax({
//         url: 'http://localhost/js1907/JS/Day33/src/php/aiqiyi.php',
//         dataType: 'json'
//     }).done(function (data) {
//         var $html = '<ul>';
//         console.log(data);
//         $.each(data, function (index, value) {
//             $html += `
// 				<li>
// 					<a href="details.html?sid=${value.sid}" target="_blank">
// 						<img src="${value.url}" />
// 						<span>${value.tittle}</span>
// 						<p>¥${value.prices}</p>
// 					</a>
// 				</li>
// 			`;
//         });
//         $html += '</ul>';
//         $('.goodslist').html($html);
//     });
// }();

// // 登录注册
// var $login = $('#login')
// var $register = $('#register')
// var $span1 = $('.login-h .close1')
// var $span2 = $('.register-h .close1')
// var $register_b = $('#register-b')
// var $id = $('.login-h .phone-n')
// var $pass = $('.login-h .pass')
// var $id1 = $('.register-h .phone-n')
// var $pass1 = $('.register-h .pass')
// var $login_b = $('.login-h button')
// var $reg_b = $('.register-h button')
// var $reg_span = $('.register-h .hint')


// $login.on('click', function () {
//     $('.mengban').css('display', 'block')
//     $('.login-h').css('display', 'block')
// })

// $span1.on('click', function () {
//     $('.mengban').css('display', 'none')
//     $('.login-h').css('display', 'none')
// })

// $register.on('click', function () {
//     $('.mengban').css('display', 'block')
//     $('.register-h').css('display', 'block')
// })

// $span2.on('click', function () {
//     $('.mengban').css('display', 'none')
//     $('.register-h').css('display', 'none')
// })
// $register_b.on('click', function (ev) {
//     ev.preventDefault()
//     $('.login-h').hide()
//     $('.register-h').show()
// })
// $id.on('focus', function () {
//     $id.attr('placeholder', '')
// })

// // 表单提交
// $login_b.on('click', function () {
//     $.ajax({
//         type: 'post',
//         url: 'http://localhost/js1907/JS/Day%2033/src/php/login.php',
//         data: {
//             user: $id.val(),
//             pass: $pass.val()
//         },
//         success: function (d) {
//             if (!d) {
//                 alert('用户名和密码错误');
//             } else {
//                 alert('登录成功');
//                 location.href = 'http://localhost/js1907/JS/Day%2033/src/aiqiyi.html';
//             }
//         }
//     });
// })
// // 注册提交
// // 判断
// $id1.on('click', function () {
//     if ($(this).val() === '') {
//         $reg_span.html('请输入手机号');
//         $reg_span.css('color', '#ccc');
//         telflag = false;
//     }
// })



// $id1.on('blur', function () {
//     $.ajax({
//         url: 'http://localhost/js1907/JS/Day%2033/src/php/register.php',
//         data: { //给后端
//             checkname: $id1.val(),
//         },
//         success: function (d) {
//             console.log(d)
//             if (!d) {
//                 $reg_span.html('√');
//                 $reg_span.css('color', 'green');
//                 if ($id1.val() !== '') {
//                     let $tel = /^1[34578]\d{9}$/; //规则
//                     if ($tel.test($id1.val())) {
//                         $reg_span.html('√');
//                         $reg_span.css('color', 'green');
//                         // telflag = true;
//                     } else {
//                         $reg_span.html('手机号码有误');
//                         $reg_span.css('color', 'red');
//                         telflag = false;
//                     }
//                 } else {
//                     $reg_span.html('手机号码不能为空');
//                     $reg_span.css('color', 'red');;
//                     telflag = false;
//                 }
//             } else {
//                 $reg_span.html('该用户名已存在');
//                 $reg_span.css('color', 'red');
//             }
//         }
//     })
// })
// // 提交
// $reg_b.on('click', function () {
//     $.ajax({
//         url: 'http://localhost/js1907/JS/Day%2033/src/php/register.php',
//         data: { //给后端
//             username: $id1.val(),
//             password: $pass1.val()
//         },
//         success: function () {
//             alert('注册成功');
//             location.href = 'http://localhost/js1907/JS/Day%2033/src/aiqiyi.html';
//         }
//     })
// })