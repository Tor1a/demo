
$( document ).ready(function() {

   // dxdatagrid 부분----------------------------------------------
    dataGrid();
}); // ready 함수 끝

function dataGrid(){
    let datagrid = new dxdatagrid();

    let bowl = [['삭제', false, true, true, 'trash', onChoiceDelete], ['신규등록', false, true, true, 'trash', onChoiceUpdate]];
    let num = bowl.length;

    datagrid.setToolbar(
        num, bowl, callBackToolbarOnclick
    );

    // datagrid.setEditing('popup', true, true, true);
    // datagrid.setEditingPopup('게시글', 500, 500);
    // datagrid.setEditingTexts('게시글', '삭제하시겠습니까?');
    datagrid.setSelection('single');

    datagrid.setOnRowDblClick(dblRowClick);

    datagrid.setPaging(10);
// 	//datagrid.setScrolling('virtual');

    const columns = ['RNUM','BIDX','WRITE_DATE','WRITER','SUBJECT','CONTENT','IDX'];
    datagrid.setColumns(columns);

    const dataSource_grid = [
        {"RNUM":19,"BIDX":8,"WRITE_DATE":"2023-01-03 17:54:59","WRITER":"ㅇㄴㄹㅇㄴㄹ","SUBJECT":"ㅇㄴㄹㅇㄴㄹㅇㄴ","CONTENT":"ㄹㅇㄴㄹㄴㅇㄹ","IDX":64},{"RNUM":18,"BIDX":5,"WRITE_DATE":"2023-01-03 17:46:01","WRITER":"test writer","SUBJECT":"test subject","CONTENT":"fdsfdsfs","IDX":61},{"RNUM":17,"BIDX":3,"WRITE_DATE":"2022-12-19 16:10:04","WRITER":"노지원","SUBJECT":"노지원","CONTENT":"노지원<br>","IDX":41},{"RNUM":16,"BIDX":4,"WRITE_DATE":"2022-10-02 03:35:36","WRITER":"관리자","SUBJECT":"test","CONTENT":"<p>test</p>","IDX":24},{"RNUM":15,"BIDX":3,"WRITE_DATE":"2022-10-02 03:13:43","WRITER":"관리자","SUBJECT":"재미","CONTENT":"지다","IDX":22},{"RNUM":14,"BIDX":2,"WRITE_DATE":"2022-10-01 22:53:19","WRITER":"관리자","SUBJECT":"까비","CONTENT":"뀨뀨꺄꺄","IDX":21},{"RNUM":13,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"노지원","SUBJECT":"겨울","CONTENT":"오나봐","IDX":13},{"RNUM":12,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"관리자","SUBJECT":"겨울","CONTENT":"오나봐","IDX":12},{"RNUM":11,"BIDX":1,"WRITE_DATE":"2022-09-27 13:05:09","WRITER":"노회원","SUBJECT":"가을","CONTENT":"타나봐","IDX":11},{"RNUM":10,"BIDX":2,"WRITE_DATE":"2018-08-07 17:01:45","WRITER":"지회원","SUBJECT":"여름아","CONTENT":"부탁해","IDX":10},{"RNUM":9,"BIDX":7,"WRITE_DATE":"2018-08-06 16:21:40","WRITER":"문회원","SUBJECT":"노는 게 제일좋아","CONTENT":"모두들 모여라","IDX":9},{"RNUM":8,"BIDX":5,"WRITE_DATE":"2018-08-05 15:43:35","WRITER":"나회원","SUBJECT":"github를 사용합시다","CONTENT":"신세계","IDX":8},{"RNUM":7,"BIDX":3,"WRITE_DATE":"2018-08-04 14:56:30","WRITER":"강회원","SUBJECT":"하드코딩하는 사람들","CONTENT":"가입하면 좋음","IDX":7},{"RNUM":6,"BIDX":2,"WRITE_DATE":"2018-08-03 14:34:20","WRITER":"박회원","SUBJECT":"제목 그대로 내용","CONTENT":"ㅈㄱㄴ","IDX":6},{"RNUM":5,"BIDX":9,"WRITE_DATE":"2018-08-02 13:12:10","WRITER":"박회원","SUBJECT":"ㅈㄱㄴ","CONTENT":"제목 그대로 내용","IDX":5},{"RNUM":4,"BIDX":7,"WRITE_DATE":"2018-08-01 13:43:34","WRITER":"이회원","SUBJECT":"정보처리 산업기사 쉽다","CONTENT":"jquery 쉽네요","IDX":4},{"RNUM":3,"BIDX":5,"WRITE_DATE":"2018-08-01 13:34:56","WRITER":"이회원","SUBJECT":"정보처리 산업기사 어렵다","CONTENT":"jsp 어렵네요","IDX":3},{"RNUM":2,"BIDX":3,"WRITE_DATE":"2018-07-31 12:43:43","WRITER":"김회원","SUBJECT":"웹 디자인 기능사 어렵다","CONTENT":"jquery 어렵네요","IDX":2},{"RNUM":1,"BIDX":1,"WRITE_DATE":"2018-07-31 12:34:56","WRITER":"김회원","SUBJECT":"정보처리 산업기사 쉽다","CONTENT":"jsp 쉽네요","IDX":1}];
    datagrid.setDataSource(dataSource_grid);
    datagrid.setKeyExpr('IDX');

    const dxGrid = $('#gridSetting').dxDataGrid(datagrid).dxDataGrid('instance');

    function callBackToolbarOnclick (e) {
        datagrid.toolbar.items.forEach((item, index) => {
            if (item.options.elementAttr.id == e.element[0].id) {
                datagrid.onClickToolbar(dxGrid, bowl[index][5]);
            }
        });
    }
}

function onChoiceUpdate(dxGrid) {
    document.getElementById("popup_layer").style.display = "block";

}


function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}


function onChoiceDelete(dxGrid) {
    var arrKey = [];

    dxGrid.getSelectedRowKeys().forEach((key) => {
        arrKey.push(key);
    });
    alert('keys: ' + arrKey);
}

function dblRowClick(){
        alert('test');
}