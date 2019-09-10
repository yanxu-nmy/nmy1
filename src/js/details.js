class datail {
	constructor() {
		// 小轮播图属性
		this.sBanner = $('.search_right')
		this.li = $('.search_right li');
		this.three = $('.three');
		this.four = $('.four');
		this.num = 0;
		this.timer = null;
		//放大镜属性
		this.spic = $('#spic'); //小图
		this.sf = $('#sf'); //小放
		this.bf = $('#bf'); //大放
		this.bpic = $('#bpic'); //大图
		this.arrsid = []; //商品的sid
		this.arrnum = []; //商品的数量
		this.prev = $('.amount-btn .prev');
		this.next = $('.amount-btn .next');
		this.box_add = $('.box .add');
		this.list = $('#list ul');
		this.wrap = $('.goodsinfo');
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
		// 小轮播图左切换
		this.three.on('click', function () {
			_this.s_left()
		});
		//小轮播图右切换
		this.four.on('click', function () {
			_this.s_right()
		});
		//自动播放
		this.timer = setInterval(function () {
			_this.s_right()
		}, 500)
		// 放大镜效果
		//获取sid
		this.picid = location.search.substring(1).split('=')[1];
		//将当前的id传给后端获取对应的数据
		$.ajax({
			url: 'http://localhost/js1907/JS/Day33/src/php/detail.php',
			data: {
				sid: this.picid
			},
			dataType: 'json'
		}).done(function (data) { //data:后端返回的和id对应的数据
			// console.log(data);
			$('#smallpic').attr('src', data[0].url);
			$('#bpic').attr('src', data[0].url);
			$('#smallpic').attr('sid', data[0].sid);
			$('.loadtitle').html(data[0].tittle);
			$('.loadpcp').html(data[0].prices);
			var arr = data[0].urls.split(',');
			// console.log(data[0]);
			var str = '';
			$.each(arr, function (index, value) {
				str += '<li><img src="' + value + '"/></li>';
			});
			$('#list ul').html(str);
		});
		//鼠标移入小图，显示小放和大放。移出同理
		$('#spic').hover(function () {
			$('#sf,#bf').css('visibility', 'visible');
			$(this).on('mousemove', function (ev) {
				//鼠标移动，小放跟随
				_this.spicmove(ev);
			});
		}, function () {
			$('#sf,#bf').css('visibility', 'hidden');
		});
		//求小放的尺寸。
		this.sf.css({
			width: this.spic.width() * this.bf.width() / this.bpic.width(),
			height: this.spic.height() * this.bf.height() / this.bpic.height(),
		});
		//4.求比例
		this.bili = this.bpic.width() / this.spic.width();
		//5.给下面的列表li添加点击事件
		this.list.on('click', 'li', function () {
			var $imgurl = $(this).find('img').attr('src');
			$('#smallpic').attr('src', $imgurl);
			$('#bpic').attr('src', $imgurl);
		});
		// 手动增加物品数量
		this.prev.on('click', function () {
			_this.artice_prev($(this))
		});
		// 手动减少物品数量
		this.next.on('click', function () {
			_this.artice_next($(this))
		});

		// 点击添加cookie数据
		this.box_add.on('click', function (ev) {
			ev.preventDefault()
			alert('加入购物车成功')
			var $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
			_this.cookietoarray();

			if ($.inArray($sid, _this.arrsid) != -1) { //商品存在，数量叠加 
				//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
				var num = parseInt(_this.arrnum[$.inArray($sid, _this.arrsid)]) + parseInt($('#count').val());
				_this.arrnum[$.inArray($sid, _this.arrsid)] = num;
				addcookie('cookienum', _this.arrnum.toString(), 10); //数组存入cookie

			} else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
				_this.arrsid.push($sid); //将当前的id存入数组
				addcookie('cookiesid', _this.arrsid.toString(), 10); //数组存入cookie
				_this.arrnum.push($('#count').val());
				addcookie('cookienum', _this.arrnum.toString(), 10); //数组存入cookie
			}
		});


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
	spicmove(ev) {
		let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
		let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
		if (l < 0) {
			l = 0;
		} else if (l >= this.spic.width() - this.sf.width()) {
			l = this.spic.width() - this.sf.width();
		}
		if (t < 0) {
			t = 0;
		} else if (t >= this.spic.height() - this.sf.height()) {
			t = this.spic.height() - this.sf.height();
		}

		this.sf.css({
			left: l,
			top: t
		});

		this.bpic.css({
			left: -l * this.bili,
			top: -t * this.bili
		})
	}


	changepicurl(obj) {
		let $imgurl = obj.find('img').attr('src');
		this.spic.find('img').attr('src', $imgurl);
		this.bpic.attr('src', $imgurl);
		//切换后重新设置小放的尺寸和比例
		this.sf.css({
			width: this.spic.width() * this.bf.width() / this.bpic.width(),
			height: this.spic.height() * this.bf.height() / this.bpic.height(),
		});
		this.bili = this.bpic.width() / this.spic.width();
	}

	cookietoarray() {
		if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
			this.arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
			this.arrnum = getcookie('cookienum').split(','); //cookie商品的num
		}
	}

	artice_prev(obj1) {
		var $count = obj1.parents('.goodsinfo').find('.p-btn input').val(); //值
		$count++;
		if ($count >= 99) {
			$count = 99;
		}
		obj1.parents('.goodsinfo').find('.p-btn input').val($count); //赋值回去
	}

	artice_next(obj2) {
		var $count = obj2.parents('.goodsinfo').find('.p-btn input').val(); //值
		$count--;
		if ($count <= 1) {
			$count = 1;
		}
		obj2.parents('.goodsinfo').find('.p-btn input').val($count); //赋值回去
	}
}

new datail().init()




// 小轮播图
// ! function () {
// 	var $sBanner = $('.search_right')
// 	var $li = $('.search_right li');
// 	var $three = $('.three');
// 	var $four = $('.four');
// 	var $num = 0;
// 	// 开启关闭定时器
// 	$sBanner.hover(function () {
// 		clearInterval($timer1)
// 	}, function () {
// 		$timer1 = setInterval(function () {
// 			$num++;
// 			if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
// 				$num = 0;
// 			}
// 			$li.eq($num).css('display', 'block').siblings().css('display', 'none')
// 		}, 200)
// 	});
// 	// 点击事件
// 	$three.on('click', function () {
// 		$num--;
// 		if ($num < 0) { //如果num大于最大的索引值，重新设置为0
// 			$num = $li.length - 1;
// 		}
// 		$li.eq($num).css('display', 'block').siblings().css('display', 'none')
// 	});

// 	$four.on('click', function () {
// 		$num++;
// 		if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
// 			$num = 0;
// 		}
// 		$li.eq($num).css('display', 'block').siblings().css('display', 'none')
// 	});
// 	var $timer1 = setInterval(function () {
// 		$num++;
// 		if ($num > $li.length - 1) { //如果num大于最大的索引值，重新设置为0
// 			$num = 0;
// 		}
// 		$li.eq($num).css('display', 'block').siblings().css('display', 'none')
// 	}, 500)
// }()
// // 放大镜
// ! function () {
// 	//1.获取sid
// 	var picid = location.search.substring(1).split('=')[1];


// 	//2.将当前的id传给后端获取对应的数据
// 	$.ajax({
// 		url: 'http://localhost/js1907/JS/Day%2033/src/php/detail.php',
// 		data: {
// 			sid: picid
// 		},
// 		dataType: 'json'
// 	}).done(function (data) { //data:后端返回的和id对应的数据
// 		// console.log(data);
// 		$('#smallpic').attr('src', data[0].url);
// 		$('#bpic').attr('src', data[0].url);
// 		$('#smallpic').attr('sid', data[0].sid);
// 		$('.loadtitle').html(data[0].tittle);
// 		$('.loadpcp').html(data[0].prices);
// 		var arr = data[0].urls.split(',');
// 		// console.log(data[0]);
// 		var str = '';
// 		$.each(arr, function (index, value) {
// 			str += '<li><img src="' + value + '"/></li>';
// 		});
// 		$('#list ul').html(str);
// 	});

// 	//3.放大镜效果
// 	! function () {
// 		$('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
// 		$('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
// 		var bili = $('#bpic').width() / $('#spic').width();
// 		$('#spic').hover(function () {
// 			$('#sf').css('visibility', 'visible');
// 			$('#bf').css('visibility', 'visible');
// 			$(this).on('mousemove', function (ev) {
// 				var $left = ev.pageX - $('.goodsinfo').offset().left - $('#sf').width() / 2;
// 				var $top = ev.pageY - $('.goodsinfo').offset().top - $('#sf').height() / 2;
// 				if ($left < 0) {
// 					$left = 0;
// 				} else if ($left >= $('#spic').width() - $('#sf').width()) {
// 					$left = $('#spic').width() - $('#sf').width();
// 				}
// 				if ($top < 0) {
// 					$top = 0;
// 				} else if ($top >= $('#spic').height() - $('#sf').height()) {
// 					$top = $('#spic').height() - $('#sf').height();
// 				}
// 				$('#sf').css('left', $left);
// 				$('#sf').css('top', $top);
// 				$('#bpic').css('left', -$left * bili);
// 				$('#bpic').css('top', -$top * bili);
// 			});
// 		}, function () {
// 			$('#sf').css('visibility', 'hidden');
// 			$('#bf').css('visibility', 'hidden');
// 		});

// 		//点击小图切换
// 		$('#list ul').on('click', 'li', function () {
// 			var $imgurl = $(this).find('img').attr('src');
// 			$('#smallpic').attr('src', $imgurl);
// 			$('#bpic').attr('src', $imgurl);
// 		});

// 		//点击箭头进行切换
// 		var $num = 6; //放大镜显示6张。
// 		$('#right').on('click', function () {
// 			var $list = $('#list ul li'); //8
// 			if ($list.length > $num) {
// 				$num++;
// 				$('#left').css('color', '#333');
// 				if ($list.length == $num) {
// 					$('#right').css('color', '#fff');
// 				}
// 				$('#list ul').animate({
// 					left: -($num - 6) * $list.eq(0).innerWidth()
// 				})
// 			}
// 		});

// 		$('#left').on('click', function () {
// 			var $list = $('#list ul li'); //8
// 			if ($num > 6) {
// 				$num--;
// 				$('#right').css('color', '#333');
// 				if ($num <= 6) {
// 					$('#left').css('color', '#fff');
// 				}
// 				$('#list ul').animate({
// 					left: -($num - 6) * $list.eq(0).innerWidth()
// 				})
// 			}
// 		});
// 	}();

// 	var arrsid = []; //商品的sid
// 	var arrnum = []; //商品的数量
// 	function cookietoarray() {
// 		if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
// 			arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
// 			arrnum = getcookie('cookienum').split(','); //cookie商品的num
// 		}
// 	}

// 	// 手动增加物品数量
// 	$('.amount-btn .prev').on('click', function () {
// 		var $count = $(this).parents('.goodsinfo').find('.p-btn input').val(); //值
// 		$count++;
// 		if ($count >= 99) {
// 			$count = 99;
// 		}
// 		$(this).parents('.goodsinfo').find('.p-btn input').val($count); //赋值回去

// 	});
// 	// 手动减少物品数量
// 	$('.amount-btn .next').on('click', function () {
// 		var $count = $(this).parents('.goodsinfo').find('.p-btn input').val(); //值
// 		$count--;
// 		if ($count <= 1) {
// 			$count = 1;
// 		}
// 		$(this).parents('.goodsinfo').find('.p-btn input').val($count); //赋值回去

// 	});

// 	// 点击添加cookie数据
// 	$('.box .add').on('click', function (ev) {
// 		ev.preventDefault()
// 		alert('加入购物车成功')
// 		var $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
// 		cookietoarray();

// 		if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
// 			//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
// 			var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
// 			arrnum[$.inArray($sid, arrsid)] = num;
// 			addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

// 		} else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
// 			arrsid.push($sid); //将当前的id存入数组
// 			addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
// 			arrnum.push($('#count').val());
// 			addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
// 		}
// 	});

// }();