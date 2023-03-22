$( document ).ready(function() {
	reportStart();
}); // ready 함수 끝


function selectButtonReport(){
		const type = $('select[name="type"]').val();
		const div = $('select[name="div"]').val();
		const daily = $('select[name="daily"]').val();
		const unit = $('select[name="unit"]').val();
		const reportStartDay = new Date($('#reportStartDay').val());
		const reportEndDay =  new Date($("#reportEndDay").val());
		reportEndDay.setHours(23);
		reportEndDay.setMinutes(59);
		reportEndDay.setSeconds(59);
		
		
		if(new Date(reportStartDay) > new Date(reportEndDay)){
			$('#reportStartDay')[0].value = reportEndDay;
			alert("시작시간이 끝시간을 넘을수 없습니다.");
			return null;
		}
		
		// acb나 vcb일때 장비 구분 잠그기
		if($('select[name="type"]').val() == "acb"){
			$('select[name="div"] option[value=""]').prop('selected', 'selected');
			$('select[name="div"]').prop('disabled', 'disabled');
		}else if($('select[name="type"]').val() == "vcb"){
			$('select[name="div"] option[value=""]').prop('selected', 'selected');
			$('select[name="div"]').prop('disabled', 'disabled');
		}else{
			$('select[name="div"]').prop('disabled', false);
		}
		
		
		$('#reportGridContainer').dxDataGrid({dataSource: customers2});
		console.log("장비종류: " + type, ",장비구분 :" + div + ", 보고서:" + daily + ", 자료형태: "+ unit + ", 시작날짜: " + reportStartDay + ", 끝날짜: " + reportEndDay);

/*		
		$.ajax({
			url:"" ,
			type: "post",
			dataType: "json",
			data: {
				type: type,
				div: div,
				daily: daily,
				unit: unit,
				reportStartDay: reportStartDay,
				reportEndDay: reportEndDay,
			},
			success: function(result){
				$('#reportGridContainer').dxDataGrid({
					dataSource: result
				});
			},
			error: function(data){
				console.log(data.result);
			}
		}) */
	}
	
	
	$(window).resize(function () {
		var reportGridResize = document.getElementById("reportGridContainer");
		if(reportGridResize){
		var height_size = window.outerHeight;
		if(height_size - 400 > 140){
			reportGridResize.style.height = height_size - 400 + "px";
		}else{
			reportGridResize.style.height = "140px";
		}
		}
	});
		
function reportStart(){
	var reportGridResize = document.getElementById("reportGridContainer");
	if(reportGridResize){
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
		
		
	var height_size = window.outerHeight;
	if(height_size - 400 >= 140){
		reportGridResize.style.height = height_size - 400 + "px";
	}else{
		reportGridResize.style.height = "140px";
	}
	document.getElementById('reportEndDay').value = new Date().toISOString().substring(0, 10);;

	$('#reportGridContainer').dxDataGrid(reportGrid);
	}
}
