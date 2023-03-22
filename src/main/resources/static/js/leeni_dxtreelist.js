/*******************************************************
저작권 : COPYRIGHTⓒ 2023 leenicoms.
작성일자: 2023.03.16
작성자: 
파일내용: devextreme treelist wrapper library
	   주1) wrapper library의 파일명은 leeni_xxx.js 형식으로 만들어야 함
	   주2) 사용하는 속성은 function으로 제공하여 app에서는 직접적으로 option 값은 수정 불가능하게 만듬
	   주3) event callback은 overloading하여 사용
변경이력:
	-. 2023.03.16 최초 작성
********************************************************/
function dxtreelist() {
	this.dataSource = [];
	this.columns = [];
	this.showBorders = true;
	this.columnAutoWidth = true;
	this.paging = {
		enabled: false,
	};
	this.toolbar = {};
	this.option = {};
	this.editing = {};
	this.onRowClick = {};
	this.selection = {};
}

/**
 * keyType 넣어질 데이터의 key가될 ID 컬럼 이름(ID) 
 * parentId 참조한 ID이름
 * 테이블 2개의 내용을 합쳐서가져올 경우 서로의 ID명은 같고 참조된 테이블의 다른 한쪽의 ID명을 다르게 해야함 
 * root는 parentId의 최소값을 정함 부모객체에 parentId값이 없을 경우 false로 넣어주면 됨
 */
dxtreelist.prototype.setId = function(keyId,parentId,root){
	this.keyExpr = keyId;
    this.parentIdExpr = parentId;
	this.rootValue = root;
}

 // sorting은 열기준 정렬을 허용하는지의 여부 boolaen속성
dxtreelist.prototype.setSorting = function(sorting){
	this.sorting = sorting;
}

/**
 * treelist의 data source를 지정 = server에서 받아온 data를 넣어준다.
 */
dxtreelist.prototype.setDataSource = function(dataSource) {
	this.dataSource = dataSource;
};

/**
 * paging처리 pagesize datatype은 int 로 페이지 내에 표시할 게시글 갯수를 적는다
 */
dxtreelist.prototype.setPaging = function(pageSize){
	this.paging = {};
	this.paging.enabled = true;
	this.paging.pageSize = pageSize;
}

/**
 * treelist의 컬럼을 지정
 * server에서 받아온 데이터 컬럼명을 넣어주면 자동으로 값이 바인딩되서 list가 그려진다.
 * data type은 배열 ex) columns = ['Prefix','FirstName','LastName','Position','StateID','BirthDate']
 */
dxtreelist.prototype.setColumns = function(columns) {
	columns.forEach(function(column) {
						this.columns.push( { dataField: column } );
					}, this);
};

/**
 * 로드시 자동으로 모든 행을 열어둘 것인지 datatype은 boolean
 */
dxtreelist.prototype.setAutoExpandAll = function(autoExpand){
	this.autoExpandAll = autoExpand;
}

// 	열의 밑줄표시 여부 boolaen타입
dxtreelist.prototype.setShowRowLines = function(rowLines){
	this.showRowLines = rowLines;
}


/**
 * columns의 속성
 * 테이블 필드명 지정, caption을 지정하지않으면 server에서 받아온 컬럼으로 필드명이 표시된다.
 * data type은 배열 ex) captions = ['Title','','','','',''] 빈값은 dataField로 표시된다.
 */
dxtreelist.prototype.setCaptions = function(captions) {
	for (let i = 0; i < this.columns.length; i++) {
		if (!captions[i]) continue;
		
		this.columns[i].caption = captions[i];
	}
};


/**
 * treelist의 width 설정
 * grid의 width를 설정한다.
 * data type은 String, int이다. ex) dataField = 'ID', width = 130;
 */
dxtreelist.prototype.setWidth = function(dataField, width) {
	for (let i = 0; i < this.columns.length; i++) {
		if (this.columns[i].dataField != dataField) continue;
		
		this.columns[i].width = width;
	}
};


/**
 * treelist의 행 선택 모드
 * data type은 String이다. ex) mode = 'multiple';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxtreelist/Configuration/selection/#mode
 * Accepted Values: 'single' | 'multiple' | 'none'
 */
dxtreelist.prototype.setSelection = function(mode) {
	this.selection = {};
	this.selection.mode = mode;
};


// type = true false
// 마우스를 올렸을 때 색변경
dxtreelist.prototype.setHoverStateEnabled = function(type){
	this.hoverStateEnabled = type;
}

// https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onCellPrepared
// 각 셀의 정보를 수정가능
dxtreelist.prototype.setOnCellPrepared = function(onEvt) {
	this.onCellPrepared = onEvt;
};

/**
 * treelist의 행 클릭 이벤트 처리
 * data type은 object이다. ex) onEvt = onRowClick;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxtreelist/Configuration/#onRowClick
 */
dxtreelist.prototype.setOnRowClick = function(onEvt) {
	this.onRowClick = onEvt;
};

dxtreelist.prototype.setOnRowDblClick = function(onEvt) {
	this.onRowDblClick = onEvt;
};

dxtreelist.prototype.setOnCellClick = function(onEvt) {
	this.onCellClick = onEvt;
};


dxtreelist.prototype.setOnCellDblClick = function(onEvt) {
	this.onCellDblClick = onEvt;
};

/**
 * datagrid의 toolbar 생성
 * data type은 int, 2차배열, object이다.
 * ex) num = 3, btn = [['엑셀다운로드', false, false, true, 'edit', onChoiceUpdate],['삭제', false, true, true, 'trash', onChoiceDelete]]; callback = callBackToolbarOnclick;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/toolbar/
 */
dxtreelist.prototype.setToolbar = function(num , btn , callback) {
	this.toolbar.items = [];

	for (let i = 0; i < num; i++) {
		items = {};
		items.options = {};
		items.showText = 'always';
		items.options.text = btn[i][0];
		items.location = 'after';
		items.widget = 'dxButton';

		items.options.elementAttr = {
			id: "btnText" + i,
		};

		if (btn[i][1]) {
			items.name = 'addRowButton';
		} else {
			//if (onEvt[i] != '') {
			items.name = btn[i][0];
			items.options.onClick = callback;
			//}
		}

		if (btn[i][3]) {
			items.options.icon = btn[i][4];
		}
		console.log(btn[i][2]);
		this.toolbar.items.push(items);
	}
};

dxtreelist.prototype.onClickToolbar = function(dxGrid, onEvt) {
	onEvt(dxGrid);
}