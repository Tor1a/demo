
$( document ).ready(function() {
	alarm1Start();
}); // ready 함수 끝


function alarmSerch(){
	const type = $('select[name="type"]').val();
	const aEv = $('select[name="aEv"]').val();
	const startDay = new Date($('#startDay').val());
	const endDay =  new Date($("#endDay").val());
	endDay.setHours(23);
	endDay.setMinutes(59);
	endDay.setSeconds(59);
	const aT = $('select[name="aT"]').val();
	
	if(new Date(startDay) > new Date(endDay)){
		$('#startDay')[0].value = endDay;
		alert("시작시간이 끝시간을 넘을수 없습니다.");
		return null;
	}

	console.log("장비종류: " + type + ", 알람구분: " + aEv + ", 시작기간: " + startDay + ", 끝 기간: " + endDay + "발생종류: " + aT);


/*		
	$.ajax({
		url:"/" ,
		type: "post",
		dataType: "json",
		data: {
			type: type,
			aEv: aEv,
			startDay: startDay,
			endDay: endDay,
			aT: aT
		},
		success: function(result){
			$('#alarm1Grid').dxDataGrid({
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
	$('#alarmAll').removeClass("alarmCheckedDiv")
	$('#alarmCancel').removeClass('alarmCheckedDiv');
	$('#alarmStart').removeClass('alarmCheckedDiv');
	if(id == "alarmAll"){
		$('select[name="aT"] option[value=""]').prop('selected', 'selected');
		$('#alarmAll').addClass('alarmCheckedDiv');
	}else if(id == "alarmCancel"){
		$('select[name="aT"] option[value=alarmCancel]').prop('selected', 'selected');
		$('#alarmCancel').addClass('alarmCheckedDiv');
	}else if(id == "alarmStart"){
		$('select[name="aT"] option[value=alarmStart]').prop('selected', 'selected');
		$('#alarmStart').addClass('alarmCheckedDiv');
	}
	alarmSerch()
}


	$(window).resize(function () {
		var alarmGridresize = document.getElementById("alarm1Grid");
		if(alarmGridresize){
		var height_size = window.outerHeight;
		if(height_size - 350 > 140){
			alarmGridresize.style.height = height_size - 350 + "px";
		}else{
			alarmGridresize.style.height = "140px";
		}
		}
	});

function alarm1Start(){
	if($('#alarm1Grid')[0]){
		
	let alarm1Grid = new dxdatagrid();
	alarm1Grid.setDataSource(alarm);
	columnName = ['index','description','aDay','aDay2','aDetail', 'aCDay' ,'aCId'];
	alarm1Grid.setColumns(columnName);
	alarm1Grid.setPaging(15);
	captionName = ['구분','해당장비','발생일시','해제일시','알람내용', '확인일시' ,'확인계정'];
	alarm1Grid.setCaptions(captionName);
	alarm1Grid.setWidth('index', 50 +"%");
	alarm1Grid.setWidth('description', 100 +"%");
	alarm1Grid.setWidth('aDay', 150 +"%");
	alarm1Grid.setWidth('aDay2', 150 +"%");
	alarm1Grid.setWidth('aDetail', 200 +"%");
	alarm1Grid.setWidth('aCDay', 150 +"%");
	alarm1Grid.setWidth('aCId', 70 +"%");
	alarm1Grid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
			let fieldHtml = '';
			if(e.column.dataField == "index"){
				fieldHtml += e.row.loadIndex + 1;
				e.cellElement.html(fieldHtml);
			}
		}
	});
	
	document.getElementById('endDay').value = new Date().toISOString().substring(0, 10);;
	
	var height_size = window.outerHeight;
	var alarmGridresize = document.getElementById("alarm1Grid");
	if(height_size - 350 >= 140){
		alarmGridresize.style.height = height_size - 350 + "px";
	}else{
		alarmGridresize.style.height = "140px";
	}
	
	$('#alarm1Grid').dxDataGrid(alarm1Grid);
	}
}
	