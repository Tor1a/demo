    $(document).ready(function(){

		$(".slide_menu").click(function() {
		   $(this).next(".treeview-menu").stop().slideToggle(300);
		   $(this).toggleClass('on').siblings().removeClass('on');
		   $(this).next(".treeview-menu").siblings(".treeview-menu").slideUp(300); // 1개씩 펼치기
		});
	});

	$(document).ready(function(){
		$(".close").click(function(){
		   $(".close").hide();
		   $(".open").show();
		   $("#mini_display").animate({'left':'100px'});
		   $(".siteMapBtn").animate({'left':'50px'});
		$(".cont_logo").animate({'width':'50px','padding-left':'10px'});
		$('#main-sidebar').css({'width':'50px'});
		$("#contents").animate({'margin-left':'50px','width':'98%'});
		});

		$(".open").click(function(){
		   $(".open").hide();
		   $(".close").show();
		   $("#mini_display").animate({'left':'10px'});
		   $(".siteMapBtn").animate({'left':'220px'});
		   $(".cont_logo").animate({'width':'220px','padding-left':'20px'});
		$('#main-sidebar').css({'width':'220px'});
		$("#contents").animate({'margin-left':'220px','width':'88.5%'});
		});

	});