
$( document ).ready(function() {

    csStatusDxDataGrid();
    csStatusDxPieChart();
    csStatusDxChart();

}); // ready 함수 끝

function csStatusDxDataGrid(){
    // // dxdatagrid 부분----------------------------------------------
    let datagrid = new dxdatagrid();


    datagrid.setPaging(10);
// 	//datagrid.setScrolling('virtual');

    const columns = ['a','b','c','d','e','f','g','i'];
    datagrid.setColumns(columns);
    const captions = ['접솔할명','통신상태','전체전압' ,'전체전류' ,'CH1' ,'CH2' ,'CH3','내부온도']
    datagrid.setCaptions(captions);

    const dataSource_grid = [
        {"a":19,"b":8,"c":"2023-01-03 17:54:59","d":"ㅇㄴㄹㅇㄴㄹ","e":"ㅇㄴㄹㅇㄴㄹㅇㄴ","f":"ㄹㅇㄴㄹㄴㅇㄹ","g":64,'i':50}];
    datagrid.setDataSource(dataSource_grid);
    datagrid.setKeyExpr('a');

    const dxGrid = $('#girdCsStatus').dxDataGrid(datagrid).dxDataGrid('instance');
}

function csStatusDxPieChart(){
    // dxpiechart 도넛차트----------------------------------------------
    let piechart = new dxPieChart();

    piechart.setDataSource(dataSource);
    piechart.setType('doughnut');
    piechart.setLegend('top', 'right', 0);
    piechart.setSeries('region', 'val', 'fixedPoint', 1, true);
    piechart.setOnPointClick(onEvt);

    $('#csPie18').dxPieChart(piechart);
}

function onEvt() {
    let piechart = new dxPieChart();

    piechart.setDataSource(dataSource3);
    piechart.setType('doughnut');
    piechart.setLegend('bottom', 'right', 162);
    piechart.setSeries('region2', 'val', 'fixedPoint', 1, true);

    $('#csPie1').dxPieChart(piechart);
}

function csStatusDxChart(){
    let chart19 = new dxchart();

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
}

const dataSource = [{
    region: 'INV#1',
    val: 4119626293,
}, {
    region: 'INV#2',
    val: 1012956064,
}, {
    region: 'INV#3',
    val: 344124520,
}, {
    region: 'INV#4',
    val: 590946440,
}, {
    region: 'INV#5',
    val: 727082222,
}, {
    region: 'INV#6',
    val: 35104756,
}];

const dataSource3 = [{
    region2: 'COMBO#1',
    val: 110,
}];