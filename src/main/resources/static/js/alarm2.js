$( document ).ready(function() {
	alarm2Start();
}); // ready 함수 끝
function alarm2TypeChange(){
	const type = $('select[name="type"]').val();
	let equipID = "";
	let equipHtmlAlarmAna = '<select id="equipType" name="equipType" onchange="alarm2Serch()" class="common_select">';
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
	$('#equipType')[0].innerHTML = equipHtmlAlarmAna;
	alarm2Serch();
}
function alarm2Serch(){
	const type = $('select[name="type"]').val();
	let equip = $('select[name="equipType"]').val();
	const aUse = $('select[name="aUse"]').val();
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
	
	console.log("장비종류: " + type + ", 알람종류: " + equip + ", 사용여부: " + aUse + ", 시작기간: " + startDay + ", 끝 기간: " + endDay);
	
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
			$('#alarm2Grid').dxDataGrid({
				dataSource: result
			});
		},
		error: function(data){
			console.log(data.result);
		}
	});
	
*/
}

	
$(window).resize(function () {
	if($('#alarm2Grid')[0]){
		var height_size = window.outerHeight;
		$('#alarm2Chart').dxChart({size: {height: height_size / 10 * 3}});
		$('#alarm2Grid').dxDataGrid({height: height_size / 10 * 3});
	}
});
	
function alarm2Start(){
	if($('#alarm2Grid')[0]){
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
	
		
		
	document.getElementById('endDay').value = new Date().toISOString().substring(0, 10);
		
	
	var height_size = window.outerHeight;
	$('#alarm2Grid').dxDataGrid(alarm2Grid);
	$('#alarm2Grid').dxDataGrid({height: height_size / 10 * 3});
	
	$('#alarm2Chart').dxChart(chartAlarm);
	$('#alarm2Chart').dxChart({size: {height: height_size / 10 * 3}});
	
	}
}

