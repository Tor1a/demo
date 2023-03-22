
$( document ).ready(function() {
	alarm3Start();
}); // ready 함수 끝
	
function alarm3Start(){
	if($('#alarm3Grid')[0]){
	
	let alarm3Grid = new dxdatagrid();
	alarm3Grid.setDataSource(conbox);
	columnName = ['ID','description','surver'];
	alarm3Grid.setColumns(columnName);
	captionName = ['','',''];
	alarm3Grid.setCaptions(captionName);
	alarm3Grid.setShowColumnHeader(false);
	alarm3Grid.setAlignment('ID', 'center');
	alarm3Grid.setAlignment('description', 'center');
	alarm3Grid.setAlignment('surver', 'center');
	alarm3Grid.setShowBorders(false);
	alarm3Grid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
			if(e.column.dataField == "ID"){
				e.cellElement.css("background-color", 'rgb(223, 240, 255)');
			}
		}
	});

	
  $('#alarm3Grid').dxDataGrid(alarm3Grid);
	let alarm3Grid_acb = alarm3Grid;
	alarm3Grid_acb.setDataSource(acb);
  $('#alarm3Grid_acb').dxDataGrid(alarm3Grid_acb);
	let alarm3Grid_vcb = alarm3Grid;
	alarm3Grid_acb.setDataSource(vcb);
  $('#alarm3Grid_vcb').dxDataGrid(alarm3Grid_vcb);
	let alarm3Grid_inv = alarm3Grid;
	alarm3Grid_acb.setDataSource(inv);
  $('#alarm3Grid_inv').dxDataGrid(alarm3Grid_inv);
	let alarm3Grid_tr = alarm3Grid;
	alarm3Grid_acb.setDataSource(tr);
  $('#alarm3Grid_tr').dxDataGrid(alarm3Grid_tr);
}
}
