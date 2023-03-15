
    $( document ).ready(function() {

 // dxdatagrid 부분----------------------------------------------
    let datagrid = new dxdatagrid();

    let bowl = [['선택삭제', false, true, true, 'trash', onChoiceDelete]];
    let num = bowl.length;

    datagrid.setToolbar(
    num, bowl, callBackToolbarOnclick
    );

    datagrid.setEditing('popup', true, true, true);
    datagrid.setEditingPopup('게시글', 500, 500);
    datagrid.setEditingTexts('게시글', '삭제하시겠습니까?');
    datagrid.setSelection('multiple');

    datagrid.setPaging(10);
// 	//datagrid.setScrolling('virtual');

    const columns = ['RNUM','BIDX','WRITE_DATE','WRITER','SUBJECT','CONTENT','IDX'];
    datagrid.setColumns(columns);

    const dataSource_grid = [
{"RNUM":19,"BIDX":8,"WRITE_DATE":"2023-01-03 17:54:59","WRITER":"ㅇㄴㄹㅇㄴㄹ","SUBJECT":"ㅇㄴㄹㅇㄴㄹㅇㄴ","CONTENT":"ㄹㅇㄴㄹㄴㅇㄹ","IDX":64},{"RNUM":18,"BIDX":5,"WRITE_DATE":"2023-01-03 17:46:01","WRITER":"test writer","SUBJECT":"test subject","CONTENT":"fdsfdsfs","IDX":61},{"RNUM":17,"BIDX":3,"WRITE_DATE":"2022-12-19 16:10:04","WRITER":"노지원","SUBJECT":"노지원","CONTENT":"노지원<br>","IDX":41},{"RNUM":16,"BIDX":4,"WRITE_DATE":"2022-10-02 03:35:36","WRITER":"관리자","SUBJECT":"test","CONTENT":"<p>test</p>","IDX":24},{"RNUM":15,"BIDX":3,"WRITE_DATE":"2022-10-02 03:13:43","WRITER":"관리자","SUBJECT":"재미","CONTENT":"지다","IDX":22},{"RNUM":14,"BIDX":2,"WRITE_DATE":"2022-10-01 22:53:19","WRITER":"관리자","SUBJECT":"까비","CONTENT":"뀨뀨꺄꺄","IDX":21},{"RNUM":13,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"노지원","SUBJECT":"겨울","CONTENT":"오나봐","IDX":13},{"RNUM":12,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"관리자","SUBJECT":"겨울","CONTENT":"오나봐","IDX":12},{"RNUM":11,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"노회원","SUBJECT":"가을","CONTENT":"타나봐","IDX":11},{"RNUM":10,"BIDX":2,"WRITE_DATE":"2018-08-07 17:01:45","WRITER":"지회원","SUBJECT":"여름아","CONTENT":"부탁해","IDX":10},{"RNUM":9,"BIDX":7,"WRITE_DATE":"2018-08-06 16:21:40","WRITER":"문회원","SUBJECT":"노는 게 제일좋아","CONTENT":"모두들 모여라","IDX":9},{"RNUM":8,"BIDX":5,"WRITE_DATE":"2018-08-05 15:43:35","WRITER":"나회원","SUBJECT":"github를 사용합시다","CONTENT":"신세계","IDX":8},{"RNUM":7,"BIDX":3,"WRITE_DATE":"2018-08-04 14:56:30","WRITER":"강회원","SUBJECT":"하드코딩하는 사람들","CONTENT":"가입하면 좋음","IDX":7},{"RNUM":6,"BIDX":2,"WRITE_DATE":"2018-08-03 14:34:20","WRITER":"박회원","SUBJECT":"제목 그대로 내용","CONTENT":"ㅈㄱㄴ","IDX":6},{"RNUM":5,"BIDX":9,"WRITE_DATE":"2018-08-02 13:12:10","WRITER":"박회원","SUBJECT":"ㅈㄱㄴ","CONTENT":"제목 그대로 내용","IDX":5},{"RNUM":4,"BIDX":7,"WRITE_DATE":"2018-08-01 13:43:34","WRITER":"이회원","SUBJECT":"정보처리 산업기사 쉽다","CONTENT":"jquery 쉽네요","IDX":4},{"RNUM":3,"BIDX":5,"WRITE_DATE":"2018-08-01 13:34:56","WRITER":"이회원","SUBJECT":"정보처리 산업기사 어렵다","CONTENT":"jsp 어렵네요","IDX":3},{"RNUM":2,"BIDX":3,"WRITE_DATE":"2018-07-31 12:43:43","WRITER":"김회원","SUBJECT":"웹 디자인 기능사 어렵다","CONTENT":"jquery 어렵네요","IDX":2},{"RNUM":1,"BIDX":1,"WRITE_DATE":"2018-07-31 12:34:56","WRITER":"김회원","SUBJECT":"정보처리 산업기사 쉽다","CONTENT":"jsp 쉽네요","IDX":1}];
    datagrid.setDataSource(dataSource_grid);
    datagrid.setKeyExpr('IDX');

    const dxGrid = $('#gridContainer').dxDataGrid(datagrid).dxDataGrid('instance');

    function callBackToolbarOnclick (e) {
    datagrid.toolbar.items.forEach((item, index) => {
    if (item.options.elementAttr.id == e.element[0].id) {
    datagrid.onClickToolbar(dxGrid, bowl[index][5]);
}
});
}


// dxCircularGauge 부분----------------------------------------------
    let optionS = new options();
    let optionS2 = new options();
    let optionS3 = new options();
    let optionS4 = new options();
    let optionS5 = new options();
    let optionS6 = new options();

    let circularGauge = new dxCircularGauge();
    let circularGauge2 = new dxCircularGauge();
    let circularGauge3 = new dxCircularGauge();
    let circularGauge4 = new dxCircularGauge();
    let circularGauge5 = new dxCircularGauge();
    let circularGauge6 = new dxCircularGauge();

    optionS.setScale(0, 500, 50, 'outside');
    optionS.setValueIndicator('skyblue', 'triangleNeedle', 10);
    optionS.setGeometry(270, 90);
    circularGauge.setValue(350);
    circularGauge.setTitle('1호기(KW)');
    circularGauge.setRangeContainer('#24EB01', 'outside', 20);

    optionS2.setScale(0, 200, 100, 'inside');
    optionS2.setValueIndicator('#E6E6E6', 'twoColorNeedle', 5);
    circularGauge2.setValue(120);
    circularGauge2.setTitle('인버터(DC/AC)변환효율(%)');
    circularGauge2.setRangeContainer('#E6E6E6', 'inside', 10);

    optionS3.setScale(0, 200, 100, 'inside');
    optionS3.setValueIndicator('#E6E6E6', 'rangeBar', 10);
    circularGauge3.setValue(350);
    circularGauge3.setTitle('발전효율(%)');
    circularGauge3.setRangeContainer('#E6E6E6', 'center', 15);

    optionS4.setScale(0, 200, 100, 'inside');
    optionS4.setValueIndicator('#E6E6E6', 'rectangleNeedle', 5);
    circularGauge4.setValue(300);
    circularGauge4.setTitle('현재발전출력(kW)');
    circularGauge4.setRangeContainer('#E6E6E6', 'inside', 10);

    optionS5.setScale(0, 300, 50, 'outside');
    optionS5.setValueIndicator('red', 'textCloud', 20);
    circularGauge5.setValue(60);
    circularGauge5.setTitle('5호기(KW)');
    circularGauge5.setRangeContainer('#00BEEB', 'center', 5);

    optionS6.setScale(0, 200, 60, 'outside');
    optionS6.setValueIndicator('black', 'triangleMarker', 50);
    circularGauge6.setValue(160);
    circularGauge6.setTitle('6호기(KW)');
    circularGauge6.setRangeContainer('#06EBB5', 'center', 10);

    $('#triangleMarker').dxCircularGauge($.extend(true, {}, optionS, circularGauge));
    $('#triangleMarker2').dxCircularGauge($.extend(true, {}, optionS2,circularGauge2));
    $('#triangleMarker3').dxCircularGauge($.extend(true, {}, optionS3,circularGauge3));
    $('#triangleMarker4').dxCircularGauge($.extend(true, {}, optionS4,circularGauge4));
    $('#triangleMarker5').dxCircularGauge($.extend(true, {}, optionS5,circularGauge5));
    $('#triangleMarker6').dxCircularGauge($.extend(true, {}, optionS6,circularGauge6));






//dxchart 부분----------------------------------------------

    let chart21 = new dxchart();
    let chart2 = new dxchart();
    let chart3 = new dxchart();
    let chart18 = new dxchart();
    let chart19 = new dxchart();


    //dxchart PPT 21 PAGE ----------------------------------------------
    const dataSource_sample21 = [
{
    date: '1',
    data: 60,
},
{
    date: '2',
    data: 40,
},
{
    date: '3',
    data: 80,
},
{
    date: '4',
    data: 25,
},
{
    date: '5',
    data: 25,
},
{
    date: '6',
    data: 20,
},
{
    date: '7',
    data: 25,
},
{
    date: '8',
    data: 30,
},
{
    date: '9',
    data: 35,
},
{
    date: '10',
    data: 40,
},
{
    date: '11',
    data: 45,
},
{
    date: '12',
    data: 50,
},
{
    date: '13',
    data: 55,
},
{
    date: '14',
    data: 60,
},
{
    date: '15',
    data: 65,
},
{
    date: '16',
    data: 75,
},
{
    date: '17',
    data: 65,
},
{
    date: '18',
    data: 70,
},
{
    date: '19',
    data: 80,
},
{
    date: '20',
    data: 80,
},
{
    date: '21',
    data: 80,
},
{
    date: '22',
    data: 80,
},
{
    date: '23',
    data: 90,
},
{
    date: '24',
    data: 100,
}];

    chart21.setDataSource(dataSource_sample21);

    chart21.setCommonSeriesSettings(0.7, 'date', 'bar');
    chart21.setSeries(['data'], ['발전량1'], ['#E6E6E6']);
    chart21.setTitle('발전량');
    chart21.setLegend('bottom', 'center', 0, false);
    chart21.setTooltip('true');

    $('#chart21').dxChart(chart21);



    //dxchart PPT 19 PAGE ----------------------------------------------

    const dataSource_sample19 = [
{
    date: 'RPS계약',
    data: 4800,
},
{
    date: 'REC거래',
    data: 4300,
},
{
    date: 'PPA계약',
    data: 4000,
},
{
    date: '렌탈사업',
    data: 3800,
},
{
    date: '탄소배출권',
    data: 300,
}];

    chart19.setDataSource(dataSource_sample19);

    chart19.setCommonSeriesSettings(0.7, 'date', 'bar');
    chart19.setSeries(['data'], ['발전량1'], ['#A9F5E1']);
    chart19.setTitle('판매 사업별 분석결과');
    chart19.setLegend('bottom', 'center', 0, false);
    chart19.setTooltip('true');

    $('#chart19').dxChart(chart19);





//dxchart 부분 차트샘플2----------------------------------------------


// 	let chart2 = new dxchart();

    const dataSource_sample2 = [
{
    date: '1월',
    value: 45,
},
{
    date: '2월',
    value: 70,
},
{
    date: '3월',
    value: 55,
},
{
    date: '4월',
    value: 60,
},
{
    date: '5월',
    value: 70,
},
{
    date: '6월',
    value: 40,
},
{
    date: '7월',
    value: 50,
},
{
    date: '8월',
    value: 65,
},
{
    date: '9월',
    value: 70,
},
{
    date: '10월',
    value: 90,
},
{
    date: '11월',
    value: 90,
},
{
    date: '12월',
    value: 105,
}];

    chart2.setDataSource(dataSource_sample2);

    chart2.setCommonSeriesSettings(0.5, 'date', 'area');
    chart2.setSeries(['value'], ['발전량2'], ['#F6CEF5']);
    chart2.setTitle('KAU22');
    chart2.setLegend('bottom', 'center', 0, false);
    chart2.setArgumentAxis(false);

    $('#chart2').dxChart(chart2);





//dxchart 부분 차트샘플3----------------------------------------------

    const dataSource_sample3 = [
{
    year: '2012년',
    SMP: 160,
    REC: 30,
    RPS: 160,
},
{
    year: '2013년',
    SMP: 150,
    REC: 60,
    RPS: 125,
},
{
    year: '2014년',
    SMP: 140,
    REC: 60,
    RPS: 110,
},
{
    year: '2015년',
    SMP: 100,
    REC: 80,
    RPS: 65,
},
{
    year: '2016년',
    SMP: 70,
    REC: 80,
    RPS: 110,
},
{
    year: '2017년',
    SMP: 80,
    REC: 100,
    RPS: 180,
},
{
    year: '2018년',
    SMP: 100,
    REC: 80,
    RPS: 170,
},
{
    year: '2019년',
    SMP: 90,
    REC: 60,
    RPS: 160,
},
{
    year: '2020년',
    SMP: 70,
    REC: 70,
    RPS: 150,
},
{
    year: '2021년',
    SMP: 90,
    REC: 30,
    RPS: 135,
},
{
    year: '2022년',
    SMP: 180,
    REC: 50,
    RPS: 140,
}];

    chart3.setDataSource(dataSource_sample3);
    chart3.setTooltip(true);
// 	chart3.setPalette('pastel');
    chart3.setCommonSeriesSettings(0.5, 'year', 'line');
    chart3.setSeries(
    ['SMP', 'REC', 'RPS'], // valueField
    ['SMP 단가','REC 단가','RPS 단가'], // name
    ['#81F79F','#0431B4','#F7D358'], // color
    );
    chart3.setTitle('SMP / REC / RPS 가격 추이(10년)');
    chart3.setLegend('top', 'right', 140, true);

    $('#chart3').dxChart(chart3);




//ppt-18 dxchart 차트----------------------------------------------

    const dataSource_sample18 = [
{
    date: '0',
    value: -500,
},
{
    date: '2',
    value: -250,
},
{
    date: '4',
    value: 0,
},
{
    date: '6',
    value: 250,
},
{
    date: '8',
    value: 500,
},
{
    date: '10',
    value: 750,
},
{
    date: '12',
    value: 1000,
},
{
    date: '14',
    value: 1250,
},
{
    date: '16',
    value: 1500,
},
{
    date: '18',
    value: 1750,
},
{
    date: '20',
    value: 2000,
},
{
    date: '22',
    value: 2250,
},
{
    date: '24',
    value: 2500,
}];

    chart18.setDataSource(dataSource_sample18);

    chart18.setCommonSeriesSettings(0.5, 'date', 'area');
    chart18.setSeries(['value'], ['발전량2'], ['#58D3F7']);
    chart18.setTitle('Cash flow');
    chart18.setLegend('bottom', 'center', 0, false);
    chart18.setArgumentAxis(false);

    $('#chart18').dxChart(chart18);



//ppt-18 dxpiechart 도넛차트----------------------------------------------
    let piechart = new dxPieChart();


    const dataSource = [{
    region: '일반관리비',
    val: 58,
}, {
    region: '안전관리자선임',
    val: 23,
}, {
    region: '기자재수선',
    val: 10,
}, {
    region: '기타잡비',
    val: 9,
}];


    piechart.setDataSource(dataSource);
    piechart.setTitle('지출분석도 (n년차 기준)');
    piechart.setType('doughnut');
    piechart.setLegend('bottom', 'right', 162);
    piechart.setSeries('region', 'val', 'fixedPoint', 1, true);

    $('#pie18').dxPieChart(piechart);



}); // ready 함수 끝
































    function onChoiceUpdate(dxGrid) {

    alert('2');
}

    function onChoiceDelete(dxGrid) {
    var arrKey = [];

    dxGrid.getSelectedRowKeys().forEach((key) => {
    arrKey.push(key);
});
    alert('keys: ' + arrKey);
}

