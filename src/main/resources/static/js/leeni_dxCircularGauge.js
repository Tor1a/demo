/*******************************************************
저작권 : COPYRIGHTⓒ 2023 leenicoms.
작성일자: 2023.02.13
작성자: njw
파일내용: devextreme circularGauge wrapper library
	   주1) wrapper library의 파일명은 leeni_xxx.js 형식으로 만들어야 함
	   주2) 사용하는 속성은 function으로 제공하여 app에서는 직접적으로 option 값은 수정 불가능하게 만듬
	   주3) event callback은 overloading하여 사용
변경이력:
	-. 2023.02.13 최초 작성
********************************************************/
function dxCircularGauge() {
    this.dataSource = [];
}

/**
 * circularGauge의 계열 및 해당 요소를 색칠하는 데 사용할 팔레트를 설정합니다.
 * data type은 int이다. server에서 받아온 data를 넣어준다. ex) value = 80;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/#value
 */
dxCircularGauge.prototype.setValue = function(value) {
	this.value = value;
};

/**
 * circularGauge의 UI 구성 요소의 제목을 구성합니다.
 * data type은 String이다. ex) title = '현재발전출력 (KW)';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/title/
 */
dxCircularGauge.prototype.setTitle = function(title) {
	this.title = {};
	this.title.text = title;
};

/**
 * circularGauge의 계기 범위 컨테이너 속성을 지정합니다.
 * data type은 String, String, int이다. ex) backgroundColor = '#fcd874'; orientation = 'inside'; width = 100;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/title/
 */
dxCircularGauge.prototype.setRangeContainer = function(backgroundColor, orientation, width) {
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/rangeContainer/#orientation
		//Accepted Values: 'center' | 'inside' | 'outside'
	this.rangeContainer = {};
	this.rangeContainer.backgroundColor = backgroundColor;
	this.rangeContainer.orientation = orientation;
	this.rangeContainer.width = width;
};

/**
 * circularGauge의 계기 범위 컨테이너 속성을 지정합니다.
 * data type은 String, String, int이다. ex) backgroundColor = '#fcd874'; orientation = 'inside'; width = 100;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/title/
 */
dxCircularGauge.prototype.setRangeContainer = function(backgroundColor, orientation, width) {
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/rangeContainer/#orientation
		//Accepted Values: 'center' | 'inside' | 'outside'
	this.rangeContainer = {};
	this.rangeContainer.backgroundColor = backgroundColor;
	this.rangeContainer.orientation = orientation;
	this.rangeContainer.width = width;
};

/**
 * 공통 옵션을 설정합니다.
 */
function options() {
	this.geometry = {};
	this.scale = {};
	this.tick = {};
	this.valueIndicator = {};
};

/**
 * UI 구성 요소의 기하 도형을 설정하는 데 필요한 속성을 지정합니다.
 * data type은 int, int이다. ex) startAngle = 180; endAngle = 0;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/geometry/
 */
options.prototype.setGeometry = function(startAngle, endAngle) {
	this.geometry.startAngle = startAngle;
	this.geometry.endAngle = endAngle;
}

/**
 * 계기의 배율 속성을 지정합니다.
 * data type은 int, int, int, String이다. ex) startValue = 0; endValue = 200; tickInterval = 100; orientation = 'inside';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/scale/
 */
options.prototype.setScale = function(startValue, endValue, tickInterval, orientation) {
	this.scale.startValue = startValue;
	this.scale.endValue = endValue;
	this.scale.tickInterval = tickInterval;
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/scale/#orientation
		//Accepted Values: 'center' | 'inside' | 'outside'
	this.scale.orientation = orientation;
}

/**
 * 계기의 마이너 틱 속성을 지정합니다.
 * data type은 String, int, int, boolean, int이다. ex) color = "#FFFFFF"; length = 1; opacity = 1; visible = false; width = 10;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/scale/minorTick/
 */
options.prototype.setMinorTick = function(color, length, opacity, visible, width) {
	this.scale.minorTick = {
		color: "#FFFFFF",
		length: 1,
		opacity: 1,
		visible: false,
		width: 10
	}
}

/**
 * 주 축 눈금의 모양을 구성합니다.
 * data type은 String, int, int, boolean, int이다. ex) color = "#000000"; length = 30; opacity = 1; visible = true; width = 2;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/scale/tick/
 */
options.prototype.setTick = function(color, length, opacity, visible, width) {
	this.scale.tick = {
		color: "#000000",
		length: 30,
		opacity: 1,
		visible: true,
		width: 2
	}
}

/**
 * 값 표시기의 모양 특성을 지정합니다.
 * data type은 String, int, int이다. ex) color = "black"; type = "triangleNeedle"; width = 20;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/valueIndicator/
 */
options.prototype.setValueIndicator = function(color, type, width) {
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxCircularGauge/Configuration/valueIndicator/#type
		//Accepted Values: 'rectangleNeedle' | 'triangleNeedle' | 'twoColorNeedle' | 'rangeBar' | 'triangleMarker' | 'textCloud'

	this.valueIndicator.color = color;
	this.valueIndicator.type = type;
	this.valueIndicator.width = width;
	
//	this.valueIndicator = {
//		color: "black",
//	    type: "triangleNeedle",
//	    width:20
//	}
}
