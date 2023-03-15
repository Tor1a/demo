/*******************************************************
저작권 : COPYRIGHTⓒ 2023 leenicoms.
작성일자: 2023.02.13
작성자: njw
파일내용: devextreme chart wrapper library
	   주1) wrapper library의 파일명은 leeni_xxx.js 형식으로 만들어야 함
	   주2) 사용하는 속성은 function으로 제공하여 app에서는 직접적으로 option 값은 수정 불가능하게 만듬
	   주3) event callback은 overloading하여 사용
변경이력:
	-. 2023.02.13 최초 작성
********************************************************/
function dxchart() {
    this.dataSource = [];
}


/**
 * chart의 data source를 지정 = server에서 받아온 data를 넣어준다.
 */
dxchart.prototype.setDataSource = function(dataSource) {
	this.dataSource = dataSource;
};

/**
 * chart의 계열 및 해당 요소를 색칠하는 데 사용할 팔레트를 설정합니다.
 * data type은 array이다. ex) palette = '['#082238']';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/#palette
 */
dxchart.prototype.setPalette = function(palette) {
	this.palette = palette;
};

/**
 * chart의 UI 구성 요소의 제목을 구성합니다.
 * data type은 String이다. ex) title = '발전량(kw)';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/title/
 */
dxchart.prototype.setTitle = function(title) {
	this.title = title;
};

/**
 * chart의 모든 계열에 공통된 설정을 지정합니다.
 * data type은 float, String, String이다. ex) barPadding = 0.5; argumentField = '데이터컬럼명'; type = 'bar';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/commonSeriesSettings/
 */
dxchart.prototype.setCommonSeriesSettings = function(barPadding, argumentField, type) {
	this.commonSeriesSettings = {};
	this.commonSeriesSettings.barPadding = barPadding;
	this.commonSeriesSettings.argumentField = argumentField;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/commonSeriesSettings/#type
		/*
		Accepted Values: 'area' | 'bar' | 'bubble' | 'candlestick' | 'fullstackedarea' | 'fullstackedbar' | 'fullstackedline' |
		'fullstackedspline' | 'fullstackedsplinearea' | 'line' | 'rangearea' | 'rangebar' | 'scatter' | 'spline' | 'splinearea' |
		'stackedarea' | 'stackedbar' | 'stackedline' | 'stackedspline' | 'stackedsplinearea' | 'steparea' | 'stepline' | 'stock'
		*/
    this.commonSeriesSettings.type = type;
};

/**
 * chart의 모든 계열에 공통된 설정을 지정합니다.
 * data type은 String, String, int이다. ex) verticalAlignment = 'bottom'; horizontalAlignment = 'center'; margin = 0;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/
 */
dxchart.prototype.setLegend = function(verticalAlignment, horizontalAlignment, margin, visible) {
	this.legend = {};
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/#verticalAlignment
		//Accepted Values: 'bottom' | 'top'
	this.legend.verticalAlignment = verticalAlignment;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/#horizontalAlignment
		//Accepted Values: 'center' | 'left' | 'right'
	this.legend.horizontalAlignment = horizontalAlignment;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/legend/margin/
	this.legend.margin = margin;
	this.legend.visible = visible; // kuni 추가
	
};

// kuni tooltip 추가 생성
dxchart.prototype.setTooltip = function(enabled) {
	this.tooltip = {};
	this.tooltip.enabled = enabled;
};

// kuni argumentAxis 추가 생성
dxchart.prototype.setArgumentAxis = function(valueMarginsEnabled) {
	this.argumentAxis = {};
	this.argumentAxis.valueMarginsEnabled = valueMarginsEnabled;
};

/**
 * chart의 UI 구성 요소 계열의 속성을 지정합니다.
 * data type은 String, String이다. ex) valueField = '데이터컬럼명'; name = '발전량';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Configuration/series/
 */
//dxchart.prototype.setSeries = function(valueField, name) {
//	this.series = [];
//	
//	let obj = {};
//	obj.valueField = valueField;
//	obj.name = name;
////	obj.color = color; //kuni 추가
//	this.series.push(obj);
//};

dxchart.prototype.setSeries = function(valueField, name, color) {
	this.series = [];
	
	for (let i=0; i < valueField.length; i++) {
		let obj = {};
		obj.valueField = valueField[i];
		obj.name = name[i];
		obj.color = color[i]; //kuni 추가
		this.series.push(obj);
	}
	
	console.log(this.series);

};
// 추가로 필요한것
/*
chart의 확대 시의 스크롤바의 유무를 지정
visible = 'true' or 'false'
*/
dxchart.prototype.setScrollBar = function(visible){
	this.scrollBar = {};
	this.scrollBar.visible = visible;
}

/*
chart의 줌의 속성을 지정
argumentAxis = 가로대상의 중, valueAxis = 세로대상의 줌을 지원한다
값은 'zoom' 줌 'pan' 드래그 'none' 없음 'both' 둘다
	https://js.devexpress.com/Documentation/Guide/UI_Components/Chart/Zooming_and_Panning/
*/
dxchart.prototype.setZoomAndPan = function(argumentAxis,valueAxis){
	this.zoomAndPan = {};
	this.zoomAndPan.argumentAxis = argumentAxis;
	this.zoomAndPan.valueAxis = valueAxis;
}