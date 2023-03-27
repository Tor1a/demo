$( document ).ready(function() {
	reportStart();
}); // ready 함수 끝


$('select[name="menu06_daily"]').change(function(){
	reportDailySetting();
	selectButtonTrend();
});

$('select[name="menu06_type"]').change(function(){
	reportDailySetting();
	selectButtonTrend();
});

$('select[name="menu06_div"]').change(function(){
	reportDailySetting();
	selectButtonTrend();
});
	
function reportDailySetting(){
	const unitApp = $('select[name="menu06_unit"]');
	unitApp.find("option").remove().end();
	if($('select[name="menu06_daily"]').val() == 'd'){
		let optionDis = "";
		if($('select[name="menu06_type"]').val() == 'conbox' || $('select[name="menu06_type"]').val() == 'invert'){
			if($('select[name="menu06_div"]').val() == ''){
				optionDis = "disabled";
			}
		}
		console.log("일일");
		unitApp.append('<option value="60" checked>1시간</option>');
		unitApp.append('<option value="30" '+optionDis+'>30분</option>');
		unitApp.append('<option value="10" '+optionDis+'>10분</option>');
		unitApp.append('<option value="5" '+optionDis+'>5분</option>');
		unitApp.append('<option value="1" '+optionDis+'>RawData</option>');
	}else if($('select[name="menu06_daily"]').val() == 'm'){
		console.log("월간");
		unitApp.append('<option value="61">1일</option>');
		unitApp.append('<option value="60">1시간</option>');
	}else if($('select[name="menu06_daily"]').val() == 'y'){
		console.log("연간");
		unitApp.append('<option value="62">1개월</option>');
		unitApp.append('<option value="61">1일</option>');
	}
}

$('select[name="menu06_unit').change(function() {
	
	if($('select[name="menu06_daily').val() == "d"){
		var sdate = $("#reportrange").data("daterangepicker").startDate;
		var edate = $("#reportrange").data("daterangepicker").endDate;
		$("#reportrange").data("daterangepicker").dateLimit = {days : "32"};
		$("#reportrange").data("daterangepicker").singleDatePicker = false;

		// rawdata 선택시
		if($(this).val() == 1){
			
			var term = edate - sdate;
			var cday = 24 * 60 * 60 * 1000;
			
			if(Math.ceil(term/cday) > 1){
				sdate = moment();
				edate = moment();
				alert("RawData조회시 기간이 하루를 초과할 수 없습니다.");
			}
			
			if($("#reportrange").data("daterangepicker")){
				
				$("#reportrange").data("daterangepicker").setStartDate(sdate.format("YYYY-MM-DD"));
				$("#reportrange").data("daterangepicker").setEndDate(edate.format("YYYY-MM-DD"));
				
				$("#reportrange").data("daterangepicker").dateLimit = false;
				$("#reportrange").data("daterangepicker").singleDatePicker = true;
			}
			$("#reportrange span").html(sdate.format("YYYY-MM-DD") + " ~ " + edate.format("YYYY-MM-DD"));
		}
	
	}
	selectButtonReport()
});


function selectButtonReport(){
		const type = $('select[name="menu06_type"]').val();
		const div = $('select[name="menu06_div"]').val();
		const daily = $('select[name="menu06_daily"]').val();
		const unit = $('select[name="menu06_unit"]').val();
		/**
		
		const menu06_reportStartDay = new Date($('#menu06_reportStartDay').val());
		const menu06_reportEndDay =  new Date($("#menu06_reportEndDay").val());
		menu06_reportEndDay.setHours(23);
		menu06_reportEndDay.setMinutes(59);
		menu06_reportEndDay.setSeconds(59);
		 */

		const startDay = $('#reportrange span').html().split(" ~ ")[0];
		const endDay = $('#reportrange span').html().split(" ~ ")[1];
		console.log('startDay: ' + startDay + ', endDay : ' + endDay);
		
		// acb나 vcb일때 장비 구분 잠그기
		if($('select[name="menu06_type"]').val() == "acb"){
			$('select[name="menu06_div"] option[value=""]').prop('selected', 'selected');
			$('select[name="menu06_div"]').prop('disabled', 'disabled');
		}else if($('select[name="menu06_type"]').val() == "vcb"){
			$('select[name="menu06_div"] option[value=""]').prop('selected', 'selected');
			$('select[name="menu06_div"]').prop('disabled', 'disabled');
		}else{
			$('select[name="menu06_div"]').prop('disabled', false);
		}
		
		
//		$('#menu06_reportGridContainer').dxDataGrid({dataSource: customers2});

		console.log("장비종류: " + type, ",장비구분 :" + div + ", 보고서:" + daily + ", 자료형태: "+ unit);

		/**
		$.ajax({
			url:"http://192.168.0.25:8081/api/v1/single/TB_INV_DATA?" ,
			type: "post",
			dataType: "json",
			success: function(result){
				console.log(result);
				$('#menu06_reportGridContainer').dxDataGrid({
					dataSource: result
				});
			},
			error: function(data){
				console.log(data.result);
			}
		});
		
		 */
	}
	
	

function reportcb(start, end) 
	    {
	    	// 일
	    	if($('select[name="menu06_daily').val() == "d")
	    	{
	    		var _sdate = start;
	    		var _edate = end;
				var term = end - start;
				var cday = 24 * 60 * 60 * 1000;
				
				// 1시간평균, 순시값
	    		if($('select[name="menu06_unit"]').val() > 1)
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
	    		
	        	if($("#reportrange").data("daterangepicker"))
	        	{
					$("#reportrange").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
		    		$("#reportrange").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));
	        	}
	        	
	        	$("#reportrange span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	    	}
	    	// 월
	    	else if($('select[name="menu06_daily').val() == "m")
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

				$("#reportrange").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
	    		$("#reportrange").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));

	        	$("#reportrange span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	    	}
	    	// 년
	    	else if($('select[name="menu06_daily').val() == "y")
	    	{
	    		var _sdate = start.format("YYYY") + "-01-01";
	    		var _edate = start.format("YYYY") + "-12-31";
	    		
	    		$("#reportrange").data("daterangepicker").setStartDate(_sdate);
	    		$("#reportrange").data("daterangepicker").setEndDate(_edate);
	    		
	        	$("#reportrange span").html(_sdate + " ~ " + _edate);
	    	}
	    	selectButtonReport()
	    }
	
		
function reportStart(){
	var reportGridResize = document.getElementById("menu06_reportGridContainer");
	if(reportGridResize){
		$("#reportrange").daterangepicker({
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
		    }, reportcb);	
		    reportcb(moment(),moment());
		
	let reportGrid = new dxdatagrid();
	reportGrid.setDataSource(customers);
	columnName = ['index','day','r1','s1','t1', 'rs' ,'st' ,
	'tr','r2','s2','t2','kw','kwh','kwh2','jupa','yuk','time'];
	reportGrid.setColumns(columnName);
	reportGrid.setPaging(15);
	captionName = ['구분','일시','전압(R)','전압(S)','전압(T)', '전압(RS)' ,'전압(ST)' ,
	'전압(TR)','전류(R)','전류(S)','전류(T)','출력(kW)','발전량(kWh)','누적발전량(kWh)','주파수','역률','발전시간'];
	reportGrid.setCaptions(captionName);
	reportGrid.setWidth('index', 50);
	reportGrid.setWidth('day', 150);
	reportGrid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
			let fieldHtml = '';
			if(e.column.dataField == "index"){
				fieldHtml += e.row.loadIndex + 1;
				e.cellElement.html(fieldHtml);
			}
		}
	});
		
		


	$('#menu06_reportGridContainer').dxDataGrid(reportGrid);
	}
}
