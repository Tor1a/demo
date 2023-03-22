
$( document ).ready(function() {
	trendChart();
}); // ready 함수 끝

	function selectButtonTrend(){
		const type = $('select[name="type"]').val();
		const div = $('select[name="div"]').val();
		const daily = $('select[name="daily').val();
		const unit = $('select[name="unit"]').val();
		const trendStartDay = new Date($("#trendStartDay").val());
		const trendEndDay =  new Date($("#trendEndDay").val());
		trendEndDay.setHours(23);
		trendEndDay.setMinutes(59);
		trendEndDay.setSeconds(59);
		
		if(new Date(trendStartDay) > new Date(trendEndDay)){
			$('#trendStartDay')[0].value = trendEndDay;
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
		
		
		$('#trendChart').dxChart({dataSource: data2});	
		console.log("장비종류: " + type, ",장비구분 :" + div + ", 보고서:" + daily + ", 자료형태: "+ unit + ", 시작날짜: " + trendStartDay + ", 끝날짜: " + trendEndDay);	
}

	$(window).resize(function () {
		var trendChartResize = document.getElementById("trendChart");
		if(trendChartResize){
			var height_size = window.outerHeight;
			trendChartResize.style.height = height_size - 350 + "px";
		}
	});
	
	

	function trendChart(){
		var trendChartResize = document.getElementById("trendChart");
		if(trendChartResize){
			let chartTrend = new dxchart();
			chartTrend.setDataSource(data);

			chartTrend.setCommonSeriesSettings(3,'day','bar');
			chartTrend.setSeries(['t'],['발전량'],['']);
			chartTrend.setTitle('발전량(kWh)');
			chartTrend.setTooltip('true');
			chartTrend.setScrollBar('true');
			chartTrend.setZoomAndPan('both', 'pan');
			chartTrend.setLegend(false,false,false,false,false);
			document.getElementById('trendEndDay').value = new Date().toISOString().substring(0, 10);


			var height_size = window.outerHeight;
			trendChartResize.style.height = height_size - 350 + "px";

			$('#trendChart').dxChart(chartTrend);
		}
	}




	