
$( document ).ready(function() {
	trendChart();
}); // ready 함수 끝

$('select[name="menu05_daily"]').change(function(){
	trendDailySetting();
	selectButtonTrend();
});

$('select[name="menu05_type"]').change(function(){
	trendDailySetting();
	selectButtonTrend();
});

$('select[name="menu05_div"]').change(function(){
	trendDailySetting();
	selectButtonTrend();
});
	
function trendDailySetting(){
	const unitApp = $('select[name="menu05_unit"]');
	unitApp.find("option").remove().end();
	if($('select[name="menu05_daily"]').val() == 'd'){
		let optionDis = "";
		if($('select[name="menu05_type"]').val() == 'conbox' || $('select[name="menu05_type"]').val() == 'invert'){
			if($('select[name="menu05_div"]').val() == ''){
				optionDis = "disabled";
			}
		}
		console.log("일일");
		unitApp.append('<option value="60" checked>1시간</option>');
		unitApp.append('<option value="30" '+optionDis+'>30분</option>');
		unitApp.append('<option value="10" '+optionDis+'>10분</option>');
		unitApp.append('<option value="5" '+optionDis+'>5분</option>');
		unitApp.append('<option value="1" '+optionDis+'>RawData</option>');
	}else if($('select[name="menu05_daily"]').val() == 'm'){
		console.log("월간");
		unitApp.append('<option value="61">1일</option>');
		unitApp.append('<option value="60">1시간</option>');
	}else if($('select[name="menu05_daily"]').val() == 'y'){
		console.log("연간");
		unitApp.append('<option value="62">1개월</option>');
		unitApp.append('<option value="61">1일</option>');
	}
}

$('select[name="menu05_unit').change(function() {
	
	if($('select[name="menu05_daily"]').val() == "d"){
		var sdate = $("#trendrange").data("daterangepicker").startDate;
		var edate = $("#trendrange").data("daterangepicker").endDate;
		$("#trendrange").data("daterangepicker").dateLimit = {days : "32"};
		$("#trendrange").data("daterangepicker").singleDatePicker = false;

		// rawdata 선택시
		if($(this).val() == 1){
			
			var term = edate - sdate;
			var cday = 24 * 60 * 60 * 1000;
			
			if(Math.ceil(term/cday) > 1){
				sdate = moment();
				edate = moment();
				alert("RawData조회시 기간이 하루를 초과할 수 없습니다.");
			}
			
			if($("#trendrange").data("daterangepicker")){
				
				$("#trendrange").data("daterangepicker").setStartDate(sdate.format("YYYY-MM-DD"));
				$("#trendrange").data("daterangepicker").setEndDate(edate.format("YYYY-MM-DD"));
				
				$("#trendrange").data("daterangepicker").dateLimit = false;
				$("#trendrange").data("daterangepicker").singleDatePicker = true;
			}
			$("#trendrange span").html(sdate.format("YYYY-MM-DD") + " ~ " + edate.format("YYYY-MM-DD"));
		}
	
	}
	selectButtonTrend();
});
	
	function selectButtonTrend(){
		const type = $('select[name="menu05_type"]').val();
		const div = $('select[name="menu05_div"]').val();
		const menu05_daily = $('select[name="menu05_daily').val();
		const menu05_unit = $('select[name="menu05_unit"]').val();
//		const menu05_trendStartDay = new Date($("#menu05_trendStartDay").val());
//		const menu05_trendEndDay =  new Date($("#menu05_trendEndDay").val());
//		menu05_trendEndDay.setHours(23);
//		menu05_trendEndDay.setMinutes(59);
//		menu05_trendEndDay.setSeconds(59);
		const startDay = $('#trendrange span').html().split(" ~ ")[0];
		const endDay = $('#trendrange span').html().split(" ~ ")[1];
		console.log('startDay: ' + startDay + ', endDay : ' + endDay);
		
		
		// acb나 vcb일때 장비 구분 잠그기
		if($('select[name="menu05_type"]').val() == "acb"){
			$('select[name="menu05_div"] option[value=""]').prop('selected', 'selected');
			$('select[name="menu05_div"]').prop('disabled', 'disabled');
		}else if($('select[name="menu05_type"]').val() == "vcb"){
			$('select[name="menu05_div"] option[value=""]').prop('selected', 'selected');
			$('select[name="menu05_div"]').prop('disabled', 'disabled');
		}else{
			$('select[name="menu05_div"]').prop('disabled', false);
		}
		
		
		$('#menu05_trendChart').dxChart({dataSource: data2});	
		console.log("장비종류: " + type, ",장비구분 :" + div + ", 보고서:" + menu05_daily + ", 자료형태: "+ menu05_unit);	
}

	$(window).resize(function () {
		var menu05_trendChartResize = document.getElementById("menu05_trendChart");
		if(menu05_trendChartResize){
			var height_size = window.outerHeight;
			menu05_trendChartResize.style.height = height_size - 350 + "px";
		}
	});
	
function trendcb(start, end) 
	    {
	    	// 일
	    	if($('select[name="menu05_daily').val() == "d")
	    	{
	    		var _sdate = start;
	    		var _edate = end;
				var term = end - start;
				var cday = 24 * 60 * 60 * 1000;
				
				// 1시간평균, 순시값
	    		if($('select[name="menu05_unit"]').val() > 1)
	    		{
					if(Math.ceil(term/cday) > 32) 
					{
						_sdate = moment();
						_edate = moment();
					}
	    		}
		    	// rawdata
		    	else
		    	{
					if(Math.ceil(term/cday) > 1) 
					{
						_sdate = moment();
						_edate = moment();
						
						alert("RawData조회시 기간이 하루를 초과할 수 없습니다.");
					}
		    	}
	    		
	        	if($("#trendrange").data("daterangepicker"))
	        	{
					$("#trendrange").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
		    		$("#trendrange").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));
	        	}
	        	
	        	$("#trendrange span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	    	}
	    	// 월
	    	else if($('select[name="menu05_daily').val() == "m")
	    	{
	    		var _sdate = start;
	    		var _edate = end;
				var term = end - start;
				var cday = 24 * 60 * 60 * 1000;
				
				if(Math.ceil(term/cday) > 32) 
				{
					_sdate = moment().startOf("month");
					_edate = moment().endOf("month");
				}
				else
				{
		    		_sdate = moment(start).startOf("month");
		    		_edate = moment(start).endOf("month");
				}

				$("#trendrange").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
	    		$("#trendrange").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));

	        	$("#trendrange span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	    	}
	    	// 년
	    	else if($('select[name="menu05_daily').val() == "y")
	    	{
	    		var _sdate = start.format("YYYY") + "-01-01";
	    		var _edate = start.format("YYYY") + "-12-31";
	    		
	    		$("#trendrange").data("daterangepicker").setStartDate(_sdate);
	    		$("#trendrange").data("daterangepicker").setEndDate(_edate);
	    		
	        	$("#trendrange span").html(_sdate + " ~ " + _edate);
	    	}
	    	selectButtonTrend()
	    }

	function trendChart(){
		var menu05_trendChartResize = document.getElementById("menu05_trendChart");
		if(menu05_trendChartResize){
		$("#trendrange").daterangepicker({
				locale: {
					format: "YYYY-MM-DD",
					separator: " ~ ",
					customRangeLabel: "직접선택",
					daysOfWeek: [
						"일",
						"월",
						"화",
						"수",
						"목",
						"금",
						"토"
					],
					monthNames: [
						"1월",
						"2월",
						"3월",
						"4월",
						"5월",
						"6월",
						"7월",
						"8월",
						"9월",
						"10월",
						"11월",
						"12월"
					],
					firstDay: 1
				},
				showDropdowns: true,
				autoApply: true,
				dateLimit: {
					"days": 32
				},
				ranges: {
				   "금일": [moment(), moment()],
				   "전일": [moment().subtract(1, "days"), moment().subtract(1, "days")],
				   "지난 한주": [moment().subtract(6, "days"), moment()],
				   "지난 30일": [moment().subtract(29, "days"), moment()],
				   "이번달": [moment().startOf("month"), moment().endOf("month")],
				   "지난달": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
				},
				opens: "left"
		    }, trendcb);	
		    trendcb(moment(),moment());
			
			let chartTrend = new dxchart();
			chartTrend.setDataSource(data);

			chartTrend.setCommonSeriesSettings(3,'day','bar');
			chartTrend.setSeries(['t'],['발전량'],['']);
			chartTrend.setTitle('발전량(kWh)');
			chartTrend.setTooltip('true');
			chartTrend.setScrollBar('true');
			chartTrend.setZoomAndPan('both', 'pan');
			chartTrend.setLegend(false,false,false,false,false);


			var height_size = window.outerHeight;
			menu05_trendChartResize.style.height = height_size - 350 + "px";

			$('#menu05_trendChart').dxChart(chartTrend);
		}
	}




	