"use strict";var _createClass=function(){function n(i,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(i,t,s){return t&&n(i.prototype,t),s&&n(i,s),i}}();function _classCallCheck(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}var datail=function(){function i(){_classCallCheck(this,i),this.sBanner=$(".search_right"),this.li=$(".search_right li"),this.three=$(".three"),this.four=$(".four"),this.num=0,this.timer=null,this.spic=$("#spic"),this.sf=$("#sf"),this.bf=$("#bf"),this.bpic=$("#bpic"),this.arrsid=[],this.arrnum=[],this.prev=$(".amount-btn .prev"),this.next=$(".amount-btn .next"),this.box_add=$(".box .add"),this.list=$("#list ul"),this.wrap=$(".goodsinfo")}return _createClass(i,[{key:"init",value:function(){var n=this;this.sBanner.hover(function(){clearInterval(n.timer)},function(){n.timer=setInterval(function(){n.s_right()},500)}),this.three.on("click",function(){n.s_left()}),this.four.on("click",function(){n.s_right()}),this.timer=setInterval(function(){n.s_right()},500),this.picid=location.search.substring(1).split("=")[1],$.ajax({url:"http://10.31.157.38/js1907/JS/Day%2033/src/php/detail.php",data:{sid:this.picid},dataType:"json"}).done(function(i){$("#smallpic").attr("src",i[0].url),$("#bpic").attr("src",i[0].url),$("#smallpic").attr("sid",i[0].sid),$(".loadtitle").html(i[0].tittle),$(".loadpcp").html(i[0].prices);var t=i[0].urls.split(","),s="";$.each(t,function(i,t){s+='<li><img src="'+t+'"/></li>'}),$("#list ul").html(s)}),$("#spic").hover(function(){$("#sf,#bf").css("visibility","visible"),$(this).on("mousemove",function(i){n.spicmove(i)})},function(){$("#sf,#bf").css("visibility","hidden")}),this.sf.css({width:this.spic.width()*this.bf.width()/this.bpic.width(),height:this.spic.height()*this.bf.height()/this.bpic.height()}),this.bili=this.bpic.width()/this.spic.width(),this.list.on("click","li",function(){var i=$(this).find("img").attr("src");$("#smallpic").attr("src",i),$("#bpic").attr("src",i)}),this.prev.on("click",function(){n.artice_prev($(this))}),this.next.on("click",function(){n.artice_next($(this))}),this.box_add.on("click",function(i){i.preventDefault(),alert("加入购物车成功");var t=$(this).parents(".goodsinfo").find("#smallpic").attr("sid");if(n.cookietoarray(),-1!=$.inArray(t,n.arrsid)){var s=parseInt(n.arrnum[$.inArray(t,n.arrsid)])+parseInt($("#count").val());n.arrnum[$.inArray(t,n.arrsid)]=s,addcookie("cookienum",n.arrnum.toString(),10)}else n.arrsid.push(t),addcookie("cookiesid",n.arrsid.toString(),10),n.arrnum.push($("#count").val()),addcookie("cookienum",n.arrnum.toString(),10)})}},{key:"s_left",value:function(){this.num--,this.num<0&&(this.num=this.li.length-1),this.li.eq(this.num).css("display","block").siblings().css("display","none")}},{key:"s_right",value:function(){this.num++,this.num>this.li.length-1&&(this.num=0),this.li.eq(this.num).css("display","block").siblings().css("display","none")}},{key:"spicmove",value:function(i){var t=i.pageX-this.wrap.offset().left-this.sf.width()/2,s=i.pageY-this.wrap.offset().top-this.sf.height()/2;t<0?t=0:t>=this.spic.width()-this.sf.width()&&(t=this.spic.width()-this.sf.width()),s<0?s=0:s>=this.spic.height()-this.sf.height()&&(s=this.spic.height()-this.sf.height()),this.sf.css({left:t,top:s}),this.bpic.css({left:-t*this.bili,top:-s*this.bili})}},{key:"changepicurl",value:function(i){var t=i.find("img").attr("src");this.spic.find("img").attr("src",t),this.bpic.attr("src",t),this.sf.css({width:this.spic.width()*this.bf.width()/this.bpic.width(),height:this.spic.height()*this.bf.height()/this.bpic.height()}),this.bili=this.bpic.width()/this.spic.width()}},{key:"cookietoarray",value:function(){getcookie("cookiesid")&&getcookie("cookienum")&&(this.arrsid=getcookie("cookiesid").split(","),this.arrnum=getcookie("cookienum").split(","))}},{key:"artice_prev",value:function(i){var t=i.parents(".goodsinfo").find(".p-btn input").val();99<=++t&&(t=99),i.parents(".goodsinfo").find(".p-btn input").val(t)}},{key:"artice_next",value:function(i){var t=i.parents(".goodsinfo").find(".p-btn input").val();--t<=1&&(t=1),i.parents(".goodsinfo").find(".p-btn input").val(t)}}]),i}();(new datail).init();