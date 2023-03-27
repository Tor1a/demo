
$( document ).ready(function() {
	alarm1Start();
}); // ready 함수 끝


function alarmSerch(){
	const type = $('select[name="menu07_type"]').val();
	const aEv = $('select[name="menu07_aEv"]').val();
	/**
	const menu07_startDay = new Date($('#menu07_startDay').val());
	const menu07_endDay =  new Date($("#menu07_endDay").val());
	menu07_endDay.setHours(23);
	menu07_endDay.setMinutes(59);
	menu07_endDay.setSeconds(59);
	 */
	const aT = $('select[name="menu07_aT"]').val();
	
	const startDay = $('#alarm1range span').html().split(" ~ ")[0];
	const endDay = $('#alarm1range span').html().split(" ~ ")[1];
	console.log('startDay: ' + startDay + ', endDay : ' + endDay);
	
	/**
	if(new Date(menu07_startDay) > new Date(menu07_endDay)){
		$('#menu07_startDay')[0].value = menu07_endDay;
		alert("시작시간이 끝시간을 넘을수 없습니다.");
		return null;
	}
 */

	console.log("장비종류: " + type + ", 알람구분: " + aEv + ", 발생종류: " + aT);


/*		
	$.ajax({
		url:"/" ,
		type: "post",
		dataType: "json",
		data: {
			type: type,
			aEv: aEv,
			menu07_startDay: menu07_startDay,
			menu07_endDay: menu07_endDay,
			aT: aT
		},
		success: function(result){
			$('#menu07_alarm1Grid').dxDataGrid({
				dataSource: result
			});
		},
		error: function(data){
			console.log(data.result);
		}
	});
	
*/
}

function alarmCheckOnClick(id){
	$('#menu07_alarmAll')[0].style.color = "white";
	$('#menu07_alarmCancel')[0].style.color = "white";
	$('#menu07_alarmStart')[0].style.color = "white";
	if(id == "menu07_alarmAll"){
		$('select[name="menu07_aT"] option[value=""]').prop('selected', 'selected');
		$('#menu07_alarmAll').addClass('alarmCheckedDiv');
		$('#menu07_alarmAll')[0].style.color = "blue";
	}else if(id == "menu07_alarmCancel"){
		$('select[name="menu07_aT"] option[value=alarmCancel]').prop('selected', 'selected');
		$('#menu07_alarmCancel')[0].style.color = "blue";
	}else if(id == "menu07_alarmStart"){
		$('select[name="menu07_aT"] option[value=alarmStart]').prop('selected', 'selected');
		$('#menu07_alarmStart')[0].style.color = "blue";
	}
	alarmSerch()
}

function alarm1cb(start, end){
	    var _sdate = start;
		var _edate = end;

    	if($("#alarm1range").data("daterangepicker"))
    	{
			$("#alarm1range").data("daterangepicker").setStartDate(_sdate.format("YYYY-MM-DD"));
    		$("#alarm1range").data("daterangepicker").setEndDate(_edate.format("YYYY-MM-DD"));
    	}
    	
    	$("#alarm1range span").html(_sdate.format("YYYY-MM-DD") + " ~ " + _edate.format("YYYY-MM-DD"));
	alarmSerch();
}

function alarm1Start(){
	if($('#menu07_alarm1Grid')[0]){
		$("#alarm1range").daterangepicker({
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
		    }, alarm1cb);	
		    alarm1cb(moment(),moment());
		
		
	let menu07_alarm1Grid = new dxdatagrid();
	menu07_alarm1Grid.setDataSource(alarm);
	columnName = ['index','description','aDay','aDay2','aDetail', 'aCDay' ,'aCId'];
	menu07_alarm1Grid.setColumns(columnName);
	menu07_alarm1Grid.setPaging(15);
	captionName = ['구분','해당장비','발생일시','해제일시','알람내용', '확인일시' ,'확인계정'];
	menu07_alarm1Grid.setCaptions(captionName);
	menu07_alarm1Grid.setWidth('index', 50 +"%");
	menu07_alarm1Grid.setWidth('description', 100 +"%");
	menu07_alarm1Grid.setWidth('aDay', 150 +"%");
	menu07_alarm1Grid.setWidth('aDay2', 150 +"%");
	menu07_alarm1Grid.setWidth('aDetail', 200 +"%");
	menu07_alarm1Grid.setWidth('aCDay', 150 +"%");
	menu07_alarm1Grid.setWidth('aCId', 70 +"%");
	menu07_alarm1Grid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
			let fieldHtml = '';
			if(e.column.dataField == "index"){
				fieldHtml += e.row.loadIndex + 1;
				e.cellElement.html(fieldHtml);
			}
		}
	});
	
	
	$('#menu07_alarm1Grid').dxDataGrid(menu07_alarm1Grid);
	}
}
	