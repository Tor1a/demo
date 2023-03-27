//open버튼 누를때 보이기
function openBtn() {
    if ($('#eachInverter').css("display") == "none") {
        $('#eachInverter').css("display", "flex");
    } else {
        $('#eachInverter').css("display", "none");
    }
}

function chart2Draw (){
    let chart2 = new dxchart();

    const dataSource_sample2 = [
        {
            inverter: '1월',
            value: 45,
        },
        {
            inverter: '2월',
            value: 70,
        },
        {
            inverter: '3월',
            value: 55,
        },
        {
            inverter: '4월',
            value: 60,
        },
        {
            inverter: '5월',
            value: 70,
        },
        {
            inverter: '6월',
            value: 40,
        },
        {
            inverter: '7월',
            value: 50,
        },
        {
            inverter: '8월',
            value: 65,
        },
        {
            inverter: '9월',
            value: 70,
        },
        {
            inverter: '10월',
            value: 90,
        },
        {
            inverter: '11월',
            value: 90,
        },
        {
            inverter: '12월',
            value: 105,
        }];

    chart2.setDataSource(dataSource_sample2);

    chart2.setCommonSeriesSettings(0.5, 'inverter', 'area');
    chart2.setSeries(['value'], ['발전량2'], ['#AAA']);
    chart2.setTitle('발전량(kW)');
    chart2.setLegend('bottom', 'center', 0, false);
    chart2.setArgumentAxis(false);

    $('#menu03_realtimeChart').dxChart(chart2);
}

function chart21Draw(){
    let chart21 = new dxchart();

    const dataSource_sample21 = [
        {
            inverter: 'INV#1',
            ac: 42,
            dc: 43,
        },
        {
            inverter: 'INV#2',
            ac: 42,
            dc: 42,
        },
        {
            inverter: 'INV#3',
            ac: 39,
            dc: 40,
        },
        {
            inverter: 'INV#4',
            ac: 41,
            dc: 42,
        },
        {
            inverter: 'INV#5',
            ac: 41,
            dc: 42,
        },
        {
            inverter: 'INV#6',
            ac: 42,
            dc: 41,
        },
        {
            inverter: 'INV#7',
            ac: 41,
            dc: 40,
        },
        {
            inverter: 'INV#8',
            ac: 40,
            dc: 43,
        }];

    chart21.setDataSource(dataSource_sample21);

    chart21.setCommonSeriesSettings(0, 'inverter', 'bar');
    chart21.setSeries(['ac','dc'], ['AC출력','DC입력'], ['#1D3C75','#8BB7E4']);
    chart21.setTitle('발전량');
    chart21.setLegend('bottom', 'center', 0, false);
    chart21.setTooltip('true');

    $('#menu03_invDCAC').dxChart(chart21);
}

function eachInverterDraw(){

    let inverter1 = new dxCircularGauge();
    let option1 = new options();

    option1.setGeometry(90,450);
    option1.setScale(0,120,'false','false');    //endValue를 최대kW로 설정
    option1.setTick("",0,0,'false',0);
    option1.setValueIndicator(' #c5fd38', 'rangeBar', 20, -4, 4);
    option1.setSize(190,190);

    inverter1.setRangeContainer('gray','outside',4);
    inverter1.setValue(46.8);

    $('.inverter_gauge').dxCircularGauge($.extend(true, {}, option1, inverter1));
}