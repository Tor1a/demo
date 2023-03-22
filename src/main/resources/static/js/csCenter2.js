$( document ).ready(function() {
	csCenter2Start();
}); // ready 함수 끝


//팝업 스크립트
function popOpenInquiry() {
	$('#popup_layer_inq').fadeIn();
	$('#popupBg')[0].style.display = "block";
}

function popOpenAnswer() {
	$('#popup_layer_ans').fadeIn();
	$('#popupBg')[0].style.display = "block";

}
function popCloseAnswer() {
	$('#popup_layer_ans')[0].style.display = "none";
	$('#popupBg')[0].style.display = "none";

// answer 부분
	$('#ansB')[0].style.display = 'none';
	$('#ansUb')[0].style.display = 'none';	
	inputSet("ansContents", "readonly", true);
	inputSet("ansGroup", "readonly", true);
	inputSet("ansPhone", "readonly", true);
	inputSet("ansId", "disablend", false);
	$('#suvT')[0].style.display = 'contents';
	
	$('#ansSubject')[0].innerHTML = "";
	$('#layer-head-answer')[0].innerHTML = '답변 상세정보';
	
	
	$('#ansForm').each(function() {
		this.reset();
	});
}
function popCloseInquiry() {
	$('#popup_layer_inq')[0].style.display = "none";
	$('#popupBg')[0].style.display = "none";
	$('#inqT')[0].style.display = 'contents';
// inquiry부분
	$('#inqUb')[0].style.display = 'none';
	$('#inqB')[0].style.display = 'none';	
	$('#ansSb')[0].style.display = 'inline-block';
	
	inputSet("inqId", "disabled", false);
	inputSet("inqService", "disabled", true);
	inputSet("inqSubject", "readonly", true);
	inputSet("inqContents", "readonly", true);
	inputSet("inqPhone", "readonly", true);

	$(":radio[name='INQUIRY_DIV']").attr("onclick", "return false");

	$('.layer-head')[0].innerHTML = "문의사항 상세정보";

	$(":radio[name='INQUIRY_DIV']").attr("checked", false);
// 폼 초기화
	$('#inqForm').each(function() {
		this.reset();
	});
}

//inquiry popup

function inqUpdate(){
	$('.layer-head')[0].innerHTML = "문의사항 수정";
	inputSet("inqService", "disabled", false);
	inputSet("inqSubject", "readonly", false);
	inputSet("inqContents", "readonly", false);
	inputSet("inqPhone", "readonly", false);
	$('#inqB')[0].style.display = 'inline-block';
	$('#inqUb')[0].style.display = 'none';
	$('#ansSb')[0].style.display = 'none';
	$(":radio[name='INQUIRY_DIV']").removeAttr("onclick", "return false");
}

function inqSave(){
	$(":radio[name='INQUIRY_DIV'][value='1']").attr("checked", true);
	$(":radio[name='INQUIRY_DIV']").removeAttr("onclick", "return false");
	
	inputSet("inqId", "disabled", true);
	inputSet("inqService", "disabled", false);
	inputSet("inqSubject", "readonly", false);
	inputSet("inqContents", "readonly", false);
	$('#inqB')[0].style.display = 'inline-block';
	$('#ansSb')[0].style.display = 'none';
	$('#inqId').val("");
	$('#inqPhone').val($('#sessionPhone').val());
	$('#inqCrtId').val($('#sessionId').val());
	$('#inqT')[0].style.display = 'none';
	
	popOpenInquiry()
}


function inquiryUpdateSet(e){
	if(e.CRT_ID  == $('#sessionId').val()){
		$('#inqUb')[0].style.display = 'inline-block';
	}

	$('#inqId').val(e.INQUIRY_IDX);
	$('#inqService').val(e.SERVICE_DIVISION);
	$('#inqSubject').val(e.INQUIRY_SUBJECT);
	$('#inqContents').val(e.INQUIRY_CONTENTS);
	$('#inqPhone').val(e.PHONE);

	$('#inqCrtId').val(e.CRT_ID);
	
	if(e.UPT_DT){
		$('#inqDT')[0].innerHTML = e.UPT_DT;		
	}else{
		$('#inqDT')[0].innerHTML = e.CRT_DT;
	}
	$(":radio[name='INQUIRY_DIV'][value='" + e.INQUIRY_DIV + "']").attr("checked", true);
}

// answer popup

function ansSave(){
	$('#suvT')[0].style.display = 'none';
	$('#ansSubject')[0].innerHTML = $('#inqSubject').val();
	$('#ansId').val('');
	$('#ansInqId').val($('#inqId').val());
	$('#ansCrtId').val($('#sessionId').val());
	$('#ansPhone').val($('#sessionPhone').val());
	$('#ansB')[0].style.display = 'inline-block';
	
	popOpenAnswer();
	popCloseInquiry();
	inputSet("ansId", "disablend", true);
	inputSet("ansContents", "readonly", false);
	inputSet("ansGroup", "readonly", false);
}

function answerUpdateSet(e){
	if(e.CRT_ID  == $('#sessionId').val()){
		$('#ansUb')[0].style.display = 'inline-block';
	}

	$('#ansSubject')[0].innerHTML = e.INQUIRY_SUBJECT;
	$('#ansId').val(e.ANSWERS_TO_INQUIRIES_IDX);
	$('#ansInqId').val(e.INQUIRY_IDX);
	$('#ansContents').val(e.CONTENTS);
	$('#ansGroup').val(e.GROUP);
	$('#ansPhone').val(e.PHONE);

	$('#ansCrtId').val(e.CRT_ID);

	if(e.UPT_DT){
		$('#ansDT')[0].innerHTML = e.UPT_DT;		
	}else{
		$('#ansDT')[0].innerHTML = e.CRT_DT;
	}
}

function ansUpdate(){
	$('#ansUb')[0].style.display = 'none';
	$('#ansB')[0].style.display = 'inline-block';
	
	$('#layer-head-answer')[0].innerHTML = '답변 수정';
	
	inputSet("ansContents", "readonly", false);
	inputSet("ansGroup", "readonly", false);
	inputSet("ansPhone", "readonly", false);
}

// form 전송(ajax)쪽 스크립트
function cs2Search(){
	const searchContents = $('#cs2Search').val();
	console.log("검색어: " + searchContents);
}

// inq부분 저장 수정여부는 id값유무로 자동 체크
function inqSaveForm(){
	const form = $('#inqForm').serialize();
	const idCheck = $('#inqId').val();
	const inqService = $('#inqService').val();
	const inqSubject = $('#inqSubject').val();
	const inqContents = $('#inqContents').val();
	const inqPhone = $('#inqPhone').val();
	const phoneCheck = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
	
	if(inqService == ""){
		alert("서비스를 입력해주세요.");
		$('#inqService').focus();
		return null;
	}else if(inqSubject == ""){
		alert("제목을 입력해주세요.");
		$('#inqSubject').focus();
		return null;
	}else if(inqContents == ""){
		alert("내용을 입력해주세요.");
		$('#inqContents').focus();
		return null;
	}else if(phoneCheck.test(inqPhone) == false){
		alert("전화번호 형식에 맞게 입력해주세요. \n (000-0000-0000)");
		$('#inqPhone').focus();
		return null;
	}
	
	
	
	let formUrl;
	//update인지 insert인지 id의 유무로 판단
	if(idCheck){
		formUrl = "/update";
	}else{
		formUrl = "/insert";
	}
	
	
	alert("폼 데이터: " + form + ", url주소: " + formUrl);
	popCloseInquiry();
}

// ans부분 저장 수정여부는 id값유무로 자동 체크
function ansSaveForm(){
	const form = $('#ansForm').serialize();
	const idCheck = $('#ansId').val();
	const ansContents = $('#ansContents').val();
	const ansGroup = $('#ansGroup').val();
	const ansPhone = $('#ansPhone').val();
	const phoneCheck = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
	
	if(ansContents == ""){
		alert("서비스를 입력해주세요.");
		$('#ansContents').focus();
		return null;
	}else if(ansGroup == ""){
		alert("제목을 입력해주세요.");
		$('#ansGroup').focus();
		return null;
	}else if(phoneCheck.test(ansPhone) == false){
		alert("전화번호 형식에 맞게 입력해주세요. \n (000-0000-0000)");
		$('#ansPhone').focus();
		return null;
	}
	
	
	
	let formUrl;
	//update인지 insert인지 id의 유무로 판단
	if(idCheck){
		formUrl = "/update";
	}else{
		formUrl = "/insert";
	}
	
	
	alert("폼 데이터: " + form + ", url주소: " + formUrl);
	popCloseAnswer();
}

function inputSet(id,pro,set){
	$("#"+id).attr(pro,set);
}
	

function csCenter2Start(){
	if($('#csCenter2Grid')[0]){

// grid 만드는 작업
let csCenter2Grid = new dxtreelist();
csCenter2Grid.setDataSource(center2list);
columnName = ["ID",'SERVICE_DIVISION','INQUIRY_SUBJECT','GROUP','CRT_ID', 'PHONE' ,'CRT_DT'];
csCenter2Grid.setColumns(columnName);
csCenter2Grid.setPaging(15);
captionName = ['구분','서비스','제목','사업그룹','등록자', '답변연락처' ,'등록일시'];
csCenter2Grid.setToolbar(1,[['문의작성',false, false, true, 'edit']], inqSave);
csCenter2Grid.setCaptions(captionName);
csCenter2Grid.setAutoExpandAll(true);
csCenter2Grid.setId('ID','INQUIRY_ID',false);
csCenter2Grid.setWidth('ID', 35+"%");
csCenter2Grid.setWidth('SERVICE_DIVISION', 100+"%");
csCenter2Grid.setWidth('INQUIRY_SUBJECT', 250+"%");
csCenter2Grid.setWidth('GROUP', 100+"%");
csCenter2Grid.setWidth('CRT_ID', 100+"%");
csCenter2Grid.setWidth('PHONE', 100+"%");
csCenter2Grid.setWidth('DT', 150+"%");
csCenter2Grid.setSelection("single");
csCenter2Grid.setHoverStateEnabled(true);
csCenter2Grid.setShowRowLines(true)
csCenter2Grid.setOnCellPrepared(function(e){
		if (e.rowType == "data") {
		let fieldHtml = '';
		if(e.column.dataField == "ID"){
			fieldHtml += e.row.loadIndex + 1;
			if(e.row.node.hasChildren){
				if(e.row.isExpanded){
					fieldHtml = '<div class="dx-treelist-icon-container"><div class="dx-treelist-empty-space dx-treelist-expanded"><span></span></div></div>' + fieldHtml;
				}else{
					fieldHtml = '<div class="dx-treelist-icon-container"><div class="dx-treelist-empty-space dx-treelist-collapsed"><span></span></div></div>' + fieldHtml;
				}
			}
			e.cellElement.html(fieldHtml);
		}
		else if(e.column.dataField == "SERVICE_DIVISION"){
			if(e.value == 'Supply'){
				fieldHtml = '공급기업';
			}else if(e.value == 'Demand'){
				fieldHtml = '수요기업';
			}
			e.cellElement.html(fieldHtml);
		}
		else if(e.column.dataField == "INQUIRY_SUBJECT"){
		let newDay = new Date(new Date().setHours(0,0,0,0));
		newDay.setDate(newDay.getDate()-2);
		let eDate = new Date(e.data.CRT_DT);
				if(e.data.ANSWERS_TO_INQUIRIES_IDX && eDate >= newDay){
					fieldHtml += "┗> [답변]" + e.value + /* 아이콘 넣기 */ `<span class='newIcon'>new</span>`;
				}else if(eDate >= newDay){
					fieldHtml += e.value + /* 아이콘 넣기 */ `<span class='newIcon'>new</span>`;
				}else if(e.data.ANSWERS_TO_INQUIRIES_IDX){
					fieldHtml += "┗> [답변]" + ` ` + e.value;
				}else{
					return null;
				}
				e.cellElement.html(fieldHtml);
			}
		}
	});
csCenter2Grid.setOnCellClick(function(e){
	if(e.rowType == 'data'){
		if(e.column.dataField != "INQUIRY_SUBJECT"){
			if(!e.data.ANSWERS_TO_INQUIRIES_IDX){
				if(e.row.isExpanded){
					e.component.collapseRow(e.data.ID);
				}else{
					e.component.expandRow(e.data.ID);
				}
			}
		}
	}
});
csCenter2Grid.setOnCellDblClick(function(e){
	if(e.rowType == 'data'){
		if(e.column.dataField == "INQUIRY_SUBJECT"){
			if(e.data.ANSWERS_TO_INQUIRIES_IDX){
				answerUpdateSet(e.data);
				popOpenAnswer();
			}
			else{
				inquiryUpdateSet(e.data);
				popOpenInquiry()
			}
		}
	}
})
		$('#csCenter2Grid').dxTreeList(csCenter2Grid);
	}
}

	
