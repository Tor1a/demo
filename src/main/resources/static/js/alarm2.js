$( document ).ready(function() {
	alarm2Start();
}); // ready 함수 끝
function alarm2TypeChange(){
	const type = $('select[name="menu09_type"]').val();
	let equipID = "";
	let equipHtmlAlarmAna = '<select id="menu09_equipType" name="menu09_equipType" onchange="alarm2Serch()" class="common_select">';
	equipHtmlAlarmAna += '<option value="">전체</option>';
	if(type == "1"){
		equipID = "001";
	}else if(type == "2"){
		equipID = "002";
	}else if(type == "3"){
		equipID = "003";
	}else if(type == "4"){
		equipID = "004";
	}else if(type == "5"){
		equipID = "005";
	}
	if(equipID != ""){
		for(let i = 0;i < equipType.length; i++){
			if(equipType[i].TYPE == equipID){
				equipHtmlAlarmAna += '<option value="' + equipType[i].XID + '">' + equipType[i].NAME + '</option>';
			}
		}
	}
	equipHtmlAlarmAna += '</select>';
	$('#menu09_equipType')[0].innerHTML = equipHtmlAlarmAna;
	alarm2Serch();
}
function alarm2TypeChangeAjax(){
	const type = $('select[name="menu09_type"]').val();
	try{
		$.ajax({
			url: '',
			type: post,
			data: {
				type: type
			},
			dataType: 'json',
			success: function(data){
				$("#menu09_equipType").find("option").remove().end();
				$("#menu09_equipType").append("<option value='' selected>전체</option>");
				$.each(data, function(i){
					$("#menu09_equipType").append("<option value='" + data[i].XID + "'>" + data[i].NAME + "</option>");
				})
			},error: function(e){
				alert("error:" + e);
			}
		});
			alarm2Serch();
	}catch(e){
		alert(e);
	}
}

function alarm2Serch(){
	const type = $('select[name="menu09_type"]').val();
	let equip = $('select[name="menu09_equipType"]').val();
	const aUse = $('select[name="menu09_aUse"]').val();
	/**
	let startDay = new Date($('#startDay').val());
	const endDay =  new Date($("#endDay").val());
	endDay.setHours(23);
	endDay.setMinutes(59);
	endDay.setSeconds(59);
	if(startDay == "Invalid Date"){
		startDay = new Date(1500,1,1);
	}

	if(new Date(startDay) > new Date(endDay)){
		$('#startDay')[0].value = endDay;
		alert("시작시간이 끝시간을 넘을수 없습니다.");
		return null;
	}
	 */
	const startDay = $('#alarm2range span').html().split(" ~ ")[0];
	const endDay = $('#alarm2range span').html().split(" ~ ")[1];
	console.log('startDay: ' + startDay + ', endDay : ' + endDay);
	
	console.log("장비종류: " + type + ", 알람종류: " + equip + ", 사용여부: " + aUse);
	
/*	
	$.ajax({
		url:"/" ,
		type: "post",
		dataType: "json",
		data: {
			type: type,
			equip: equip,
			aUse: aUse,
			startDay: startDay,
			endDay: endDay,
		},
		success: function(result){
			$('#menu09_alarm2Grid').dxDataGrid({
				dataSource: result
			});
		},
		error: function(data){
			console.log(data.result);
		}
	});
	
*/
}

/**	
$(window).resize(function () {
	if($('#menu09_alarm2Grid')[0]){
		var height_size = window.outerHeight;
		$('#menu09_alarm2Chart').dxChart({size: {height: height_size / 10 * 3}});
		$('#menu09_alarm2Grid').dxDataGrid({height: height_size / 10 * 3});
	}
});
	 */
	
function alarm2cb(start, end){
	    var _sdate = start;
		var _edate = end;

    	if($("#alarm2range").data("daterangepicker"))
    	{
			$("#alarm2range").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
    		$("#alarm2range").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));
    	}
    	
    	$("#alarm2range span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	alarm2Serch();
}
	
function alarm2Start(){
	if($('#menu09_alarm2Grid')[0]){
		$("#alarm2range").daterangepicker({
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
		    }, alarm2cb);	
		    alarm2cb(moment(),moment());
		
		
// grid
	let alarm2Grid = new dxdatagrid();
	alarm2Grid.setDataSource(alarm2);
	columnName = ['index','description','aDetail','aCode','aUse', 'aDCode' ,'aCount'];
	alarm2Grid.setColumns(columnName);
	alarm2Grid.setPaging(6);
	captionName = ['구분','해당장비','알람내용','알람코드','사용여부', '장비코드' ,'발생횟수'];
	alarm2Grid.setCaptions(captionName);
	alarm2Grid.setWidth('index', 50);
	alarm2Grid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
			let fieldHtml = '';
			if(e.column.dataField == "index"){
				fieldHtml += e.row.loadIndex + 1;
				e.cellElement.html(fieldHtml);
			}
		}
	});
	
// chart
	let chartAlarm = new dxchart();
	chartAlarm.setDataSource(alarm2);
	
	chartAlarm.setCommonSeriesSettings(3,'aCode','bar');
	chartAlarm.setSeries(['aCount'],['발생 빈도'],['']);
	chartAlarm.setTitle('알람발생 빈도 Top 10');
	chartAlarm.setTooltip('true');
	chartAlarm.setScrollBar('true');
	chartAlarm.setZoomAndPan('both', 'pan');
	chartAlarm.setLegend(false,false,false,false,false);
	
		
		

		
	$('#menu09_alarm2Chart').dxChart(chartAlarm);
	$('#menu09_alarm2Grid').dxDataGrid(alarm2Grid);
	
//	var height_size = window.outerHeight;
//	$('#menu09_alarm2Grid').dxDataGrid({height: height_size / 10 * 3});
	
//	$('#menu09_alarm2Chart').dxChart({size: {height: height_size / 10 * 3}});
	
	}
}

