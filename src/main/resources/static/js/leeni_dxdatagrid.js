/*******************************************************
저작권 : COPYRIGHTⓒ 2023 leenicoms.
작성일자: 2023.02.01
작성자: martino
파일내용: devextreme datagrid wrapper library
	   주1) wrapper library의 파일명은 leeni_xxx.js 형식으로 만들어야 함
	   주2) 사용하는 속성은 function으로 제공하여 app에서는 직접적으로 option 값은 수정 불가능하게 만듬
	   주3) event callback은 overloading하여 사용
변경이력:
	-. 2023.02.01 최초 작성
********************************************************/
function dxdatagrid() {
	
    this.dataSource = [];
    this.showBorders=  true;
	this.paging = {
		enabled: false,
	};
	this.toolbar = {};
	this.option = {};
    this.editing = {};
	this.onRowClick = {};
	this.selection = {};
	this.columns = [];
	
}

/**
 * datagrid의 data source를 지정 = server에서 받아온 data를 넣어준다.
 */
dxdatagrid.prototype.setDataSource = function(dataSource) {
	this.dataSource = dataSource;
};

/**
 * datagrid의 data key 값을 지정, key값으로 CRUD기능 처리한다.
 */
dxdatagrid.prototype.setKeyExpr = function(keyExpr) {
	this.keyExpr = keyExpr;
};

/**
 * datagrid의 모드 설정
 * grid의 mode를 설정하고 추가, 수정, 삭제 기능 사용여부를 결정한다.
 * data type은 String, boolean, boolean, boolean이다. ex) mode = 'popup'; allowAdding = true; allowUpdating = true; allowDeleting = true; 
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/ 
 */
dxdatagrid.prototype.setEditing = function(mode, allowAdding, allowUpdating, allowDeleting) {
	//https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/#mode
		//Accepted Values: 'batch' | 'cell' | 'row' | 'form' | 'popup'
		this.editing.mode = mode;
		this.editing.texts = {};
		this.editing.popup = {};
		this.editing.loadPanel = {};
		this.editing.form = {};
		this.editing.allowAdding = true;
		this.editing.allowUpdating = true;
		this.editing.allowDeleting = true;
		this.editing.loadPanel.enabled = true;
};

/**
 * 추가,수정,삭제 관련 UI 요소에 대한 텍스트를 지정하는 속성을 포함한다.
 * data type은 String, String이다. ex) deleteTitle = '게시글'; deleteMsg = '삭제하시겠습니까?';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/texts/
 */
dxdatagrid.prototype.setEditingTexts = function(deleteTitle, deleteMsg) {
		this.editing.texts.addRow = '추가';
		this.editing.texts.editRow = '수정';
		this.editing.texts.deleteRow = '삭제';
		this.editing.texts.saveRowChanges = '저장';
		this.editing.texts.cancelRowChanges = '취소';
		this.editing.texts.confirmDeleteTitle = deleteTitle;
		this.editing.texts.confirmDeleteMessage = deleteMsg;
};

/**
 * 추가,수정,삭제 관련 UI 요소에 대한 텍스트를 지정하는 속성을 포함한다.
 * data type은 String, int, int이다. ex) title = '게시글'; width = 700; height = 525;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/#popup
 */
dxdatagrid.prototype.setEditingPopup = function(title, width, height) {
		this.editing.popup.showTitle = true;
		this.editing.popup.title = title;
		this.editing.popup.width = width;
		this.editing.popup.height = height;
};

/**
 * popup창 UI 요소에 대한 설정 속성이다.
 * data type은 array, int, int, String이다. 
 * ex) dataField = ['WRITER', 'SUBJECT', 'WRITE_DATE', ['CONTENT',150]]; colCount = 1; colSpan = 2; caption = '게시글'
 * textArea를 사용하려면 배열로 넘겨주면 된다. 높이를 지정할 수 있다.
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/#form
 */
dxdatagrid.prototype.setEditingForm = function(dataField, colCount, colSpan, caption) {
		this.editing.form.items = [];
		let items = {};
		let dxTextArea = {};
		items.itemType = 'group';
		items.colCount = colCount;
		items.colSpan = colSpan;
		items.title = {};
		items.items = [];
		
		for (let i = 0; i < dataField.length; i++){
			dxTextArea = {};
			if (typeof dataField[i] == 'object') {
				dxTextArea.dataField = dataField[i][0];
				dxTextArea.editorType = 'dxTextArea';
				dxTextArea.colSpan = colSpan;
				dxTextArea.editorOptions = {};
				dxTextArea.editorOptions.height = dataField[i][1];
			} else {
				dxTextArea.dataField = dataField[i];
			}
			items.items.push(dxTextArea);
		}
		this.editing.form.items.push(items);
};

/**
 * datagrid의 컬럼을 지정
 * server에서 받아온 데이터 컬럼명을 넣어주면 자동으로 값이 바인딩되서 list가 그려진다.
 * data type은 배열 ex) columns = ['Prefix','FirstName','LastName','Position','StateID','BirthDate']
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/
 */
dxdatagrid.prototype.setColumns = function(columns) {
	columns.forEach(function(column) {
						this.columns.push( { dataField: column } );
					}, this);
};

/**
 * datagrid의 페이징 처리
 * data type은 int다. ex) pageSize = 10;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/paging/
 */
dxdatagrid.prototype.setPaging = function(pageSize) {
	this.paging = {};
	this.paging.enabled = true;
	this.paging.pageSize = pageSize;
};

dxdatagrid.prototype.setScrolling = function(mode) {
	this.scrolling = {};
	this.scrolling.mode = mode;
	this.scrolling.columnRenderingMode = mode;
};

/**
 * datagrid의 행 선택 모드
 * data type은 String이다. ex) mode = 'multiple';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/selection/#mode
 * Accepted Values: 'single' | 'multiple' | 'none'
 */
dxdatagrid.prototype.setSelection = function(mode) {
	this.selection.mode = mode;
};

/**
 * datagrid의 toolbar 생성
 * data type은 int, 2차배열, object이다. 
 * ex) num = 3, btn = [['엑셀다운로드', false, false, true, 'edit', onChoiceUpdate],['삭제', false, true, true, 'trash', onChoiceDelete]]; callback = callBackToolbarOnclick;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/toolbar/
 */
dxdatagrid.prototype.setToolbar = function(num , btn , callback) {
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

dxdatagrid.prototype.onClickToolbar = function(dxGrid, onEvt) {
		onEvt(dxGrid);
}

/**
 * datagrid의 행 클릭 이벤트 처리
 * data type은 object이다. ex) onEvt = onRowClick;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onRowClick
 */
dxdatagrid.prototype.setOnRowClick = function(onEvt) {
	this.onRowClick = onEvt;
};

/**
 * datagrid의 update 기능이다.
 * data type은 object이다. ex) onEvt = updateBoard;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onRowUpdating
 */
dxdatagrid.prototype.setOnRowUpdating = function(onEvt) {
	
	this.onRowUpdating = function (e) {
		const deferred = $.Deferred();
	    const promptPromise = DevExpress.ui.dialog.confirm("수정하시겠습니까?");
	    promptPromise.done((dialogResult) => {
			if (dialogResult) {
				console.log('newData: ' + JSON.stringify(e.newData));
				console.log('oldData: ' + JSON.stringify(e.oldData));
				for (let i in e.newData) {
					console.log('newData key: ' + i + '/ newData value: ' + e.newData[i]);
					//console.log(i); // key
					//console.log(e.newData[i]); // value against the key
					e.oldData[i] = e.newData[i];
				}
				console.log('update oldData: ' + JSON.stringify(e.oldData));
				var data = e.oldData;
				
				onEvt(e.oldData);
			}  else {
	                deferred.resolve(true);              
	            }
	        });
		e.cancel = deferred.promise();
	}
	
};

/**
 * datagrid의 insert 기능이다.
 * data type은 object이다. ex) onEvt = insertBoard;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onRowInserting
 */
dxdatagrid.prototype.setOnRowInserting = function(onEvt) {
	
	this.onRowInserting = function (e) {
		const deferred = $.Deferred();
	    const promptPromise = DevExpress.ui.dialog.confirm("등록하시겠습니까?");
	    promptPromise.done((dialogResult) => {
	        if (dialogResult) {
	        	console.log(JSON.stringify(e.data));
	            onEvt(e.data);
	        } else {
	            deferred.resolve(true);              
	        }
	    });
	    e.cancel = deferred.promise();
	}
};

/**
 * datagrid의 delete 기능이다.
 * data type은 object이다. ex) onEvt = deleteBoard;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onRowRemoving
 */
dxdatagrid.prototype.setOnRowRemoving = function(onEvt) {
	
	this.onRowRemoving = function (e) {
		console.log(e.key);
    	onEvt(e.key);
	}
};

/**
 * columns의 속성
 * 테이블 필드명 지정, caption을 지정하지않으면 server에서 받아온 컬럼으로 필드명이 표시된다.
 * data type은 배열 ex) captions = ['Title','','','','',''] 빈값은 dataField로 표시된다.
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#caption
 */
dxdatagrid.prototype.setCaptions = function(captions) {
	for (let i = 0; i < this.columns.length; i++) {
		if (!captions[i]) continue;
		
		this.columns[i].caption = captions[i];
	}
};

/**
 * datagrid의 alignment 설정
 * grid의 alignment를 설정한다.
 * data type은 String, String이다. ex) dataField = 'ID', width = 'center';
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#alignment
 * Accepted Values: undefined | 'center' | 'left' | 'right' 
*/
dxdatagrid.prototype.setAlignment = function(dataField, alignment) {
	for (let i = 0; i < this.columns.length; i++) {
		if (this.columns[i].dataField != dataField) continue;
		
		this.columns[i].alignment = alignment;
	}
};

/**
 * columns의 속성
 * input태그 placeholder 지정한다.
 * data type은 String이다. ex) text = 'ID'
 */
dxdatagrid.prototype.setPlaceholder = function(text) {
	for (let i = 0; i < this.columns.length; i++) {
		if (!text[i]) continue;
		
		this.columns[i].placeholder = text[i];
	}
};

/**
 * columns의 속성인 validationRules의 속성
 * 빈값 체크, 컬럼의 필수항목입력으로 지정하여 검증하는 함수
 * data type은 String, String, String, String또는int 이다. ex) dataField = 'ID',type = 'required', message = '아이디를 입력해주세요.', param = 10
 * param은 추가 속성으로 max,pattern 등의 값을 넣어준다.
 * Type: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#validationRules
 */
dxdatagrid.prototype.setValidationRules = function(dataField, type, message, param) {
	for (let i = 0; i < this.columns.length; i++) {
		
		if (this.columns[i].dataField !=  dataField) continue;
	
		let array = [];
		let validation = {};
		if (this.columns[i].validationRules != null) {
			for (let j = 0; j < this.columns[i].validationRules.length; j++) {
					validation = {};
					validation.type = this.columns[i].validationRules[j].type;
					validation.message = this.columns[i].validationRules[j].message;
					validation.max = this.columns[i].validationRules[j].max;
					validation.pattern = this.columns[i].validationRules[j].pattern;
					array.push(validation);
				}	
		}
		
		validation = {};
		switch (type) {
			case 'required': 
				break;
			case 'stringLength':
				validation.max = param;
				break;
			case 'pattern':
				validation.pattern = param;
				break;
		}
				
		validation.type = type;
		validation.message = message;
		array.push(validation);
		this.columns[i].validationRules = array;
	}
};

/**
 * datagrid의 width 설정
 * grid의 width를 설정한다.
 * data type은 String, int이다. ex) dataField = 'ID', width = 130;
 * https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#width
 */
dxdatagrid.prototype.setWidth = function(dataField, width) {
	for (let i = 0; i < this.columns.length; i++) {
		if (this.columns[i].dataField != dataField) continue;
		
		this.columns[i].width = width;
	}
};



/**
 * 
 */
//dxdatagrid.prototype.editingMode = function(mode) {
//	this.editing.mode = mode;
//};
	

//////////////////////////////////////////////////////////
//callback define	
/**
 * 
 */
//dxdatagrid.prototype.onEditingStart = function() {
//	console.log('EditingStart');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onInitNewRow = function() {
//	console.log('InitNewRow');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onRowInserted = function() {
//	console.log('RowInserted');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onRowUpdating = function() {
//	console.log('RowUpdating');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onRowUpdated = function() {
//	console.log('RowUpdated');
//};

/**
 * 
 */
//dxdatagrid.prototype.onRowRemoved = function() {
//	console.log('RowRemoved');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onSaving = function() {
//	console.log('Saving');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onSaved = function() {
//	console.log('Saved');
//};
	
/**
 * 
 */
//dxdatagrid.prototype.onEditCanceling = function() {
//	console.log('EditCanceling');
//};
	
/**
 * 
// */
//dxdatagrid.prototype.onEditCanceled = function() {
//	console.log('EditCanceled');
//};

