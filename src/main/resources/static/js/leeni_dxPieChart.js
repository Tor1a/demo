/*******************************************************
저작권 : COPYRIGHTⓒ 2023 leenicoms.
작성일자: 2023.02.13
작성자: njw
파일내용: devextreme chart wrapper library
	   주1) wrapper library의 파일명은 leeni_xxx.js 형식으로 만들어야 함
	   주2) 사용하는 속성은 function으로 제공하여 app에서는 직접적으로 option 값은 수정 불가능하게 만듬
	   주3) event callback은 overloading하여 사용
변경이력:
	-. 2023.02.23 최초 작성
********************************************************/
function dxPieChart() {
    this.dataSource = [];
    this.series=  [];
}

/**
 * pieChart의 data source를 지정 = server에서 받아온 data를 넣어준다.
 */
dxPieChart.prototype.setDataSource = function(dataSource) {
	this.dataSource = dataSource;
};

/**
 * pieChart의 계열의 유형을 지정합니다.
 * data type은 String이다. ex) type = 'doughnut';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPieChart/Configuration/#type
 */
dxPieChart.prototype.setType = function(type) {
	//Accepted Values: 'donut' | 'doughnut' | 'pie' | 'Soft Blue' | 'Material' | 'Office'
	this.type = type;
};

/**
 * pieChart의 계열 및 해당 요소를 색칠하는 데 사용할 팔레트를 설정합니다.
 * data type은 String 또는 array이다. ex) palette = 'Soft Pastel' 또는 palette = '['#082238']';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPieChart/Configuration/#palette
 */
dxPieChart.prototype.setPalette = function(palette) {
	//Accepted Values: 'Bright' | 'Harmony Light' | 'Ocean' | 'Pastel' | 'Soft' | 'Soft Pastel' | 'Vintage' | 'Violet' | 'Carmine' | 'Dark Moon' | 'Dark Violet' | 'Green Mist' | 'Soft Blue' | 'Material' | 'Office'
	this.palette = palette;
};

/**
 * pieChart의 UI 구성 요소의 제목을 구성합니다.
 * data type은 String이다. ex) title = '각 인버터에 속한 접속함들의 전류합';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPieChart/Configuration/title/
 */
dxPieChart.prototype.setTitle = function(title) {
	this.title = title;
};

/**
 * dxPieChart의 모든 계열에 공통된 설정을 지정합니다.
 * data type은 String, String, int이다. ex) verticalAlignment = 'bottom'; horizontalAlignment = 'center'; margin = 0;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/
 */
dxPieChart.prototype.setLegend = function(verticalAlignment, horizontalAlignment, margin) {
	this.legend = {};
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/#verticalAlignment
		//Accepted Values: 'bottom' | 'top'
	this.legend.verticalAlignment = verticalAlignment;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/#horizontalAlignment
		//Accepted Values: 'center' | 'left' | 'right'
	this.legend.horizontalAlignment = horizontalAlignment;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/margin/
	this.legend.margin = margin;
};

/**
 * dxPieChart의 UI 구성 요소 계열의 속성을 지정합니다.
 * data type은 String, String, String, int, boolean이다. 
 * ex) argumentField = '데이터컬럼명'; valueField = '데이터컬럼명'; fixedPoint = 'fixedPoint'; precision = 1; connector = true;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPieChart/Configuration/series/
 */
dxPieChart.prototype.setSeries = function(argumentField, valueField, fixedPoint, precision, connector) {
	this.series = [];
	
	let obj = {};
	obj.argumentField = argumentField;
	obj.valueField = valueField;
	
	obj.label = {};
	obj.label.visible = true;
	obj.label.fixedPoint = fixedPoint;
	obj.label.precision = precision;
	if (connector) {
		obj.label.connector = {};
		obj.label.connector.visible = connector;
	}
	obj.label.customizeText = function() {
		return this.argumentText + '\n' + this.valueText;
	}
	
	this.series.push(obj);
};

/**
 * 툴팁을 구성합니다.
 * data type은 String, int, int이다. 
 * ex) fixedPoint = 'fixedPoint'; precision = 1; cornerRadius = 15;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPieChart/Configuration/tooltip/
 */
dxPieChart.prototype.setTooltip = function(fixedPoint, precision, cornerRadius) {
	this.tooltip = {};
	this.tooltip.enabled = true;
	this.tooltip.fixedPoint = fixedPoint;
	this.tooltip.precision = precision;
	this.tooltip.cornerRadius = cornerRadius;
	this.tooltip.customizeTooltip = function(arg) {
        return {
          text: arg.argumentText + '\n ' + (arg.percent * 100).toFixed(2) + '%',
        };
      };
	
};

dxPieChart.prototype.setOnPointClick = function (onEvt){
	this.onPointClick = onEvt;
}