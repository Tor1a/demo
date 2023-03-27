function csCenter1Start(){
    if($('#menu13_csCenterGrid')[0]){

        const center1list = [{
            ID: 1,
            INQUIRY_IDX: 1,
            INQUIRY_DIV: 3,
            SERVICE_DIVISION: 'Supply',
            INQUIRY_SUBJECT: "문제있습니다.",
            INQUIRY_CONTENTS: "이런저런",
            PHONE: "010-2222-4444",
            USE_YN: "Y",
            CRT_ID: "member1",
            CRT_DT: "2023-02-25 15:00"
        },{
            ID: 2,
            INQUIRY_IDX: 2,
            INQUIRY_DIV: 2,
            SERVICE_DIVISION: 'Demand',
            INQUIRY_SUBJECT: "또 문제있습니다.",
            INQUIRY_CONTENTS: "이런저런 이런",
            PHONE: "010-2222-4444",
            USE_YN: "Y",
            CRT_ID: "member1",
            CRT_DT: "2023-02-25 15:00",
            UPT_DT: "2023-03-09 21:00"
        },{
            ID: 4,
            INQUIRY_IDX: 4,
            INQUIRY_DIV: 1,
            SERVICE_DIVISION: 'Supply',
            INQUIRY_SUBJECT: "ㄴㅁㅇㄹ",
            INQUIRY_CONTENTS: "ㅁㄴㅇㄹ",
            PHONE: "010-2222-4444",
            USE_YN: "Y",
            CRT_ID: "member2",
            CRT_DT: "2023-03-12 15:00",
        },{
            ID: 5,
            INQUIRY_IDX: 1,
            INQUIRY_ID: 1,
            ANSWERS_TO_INQUIRIES_IDX: 1,
            SERVICE_DIVISION: 'Supply',
            INQUIRY_SUBJECT: "문제있습니다.",
            CONTENTS: "어쩌구 저쩌구",
            USE_YN: "Y",
            GROUP: "삼성이엔지",
            PHONE: "010-2222-4444",
            CRT_ID: "member1",
            CRT_DT: "2023-03-09 15:00",
            UPT_DT: "2023-03-10 15:00",
        },{
            ID: 7,
            INQUIRY_IDX: 3,
            INQUIRY_ID: 1,
            ANSWERS_TO_INQUIRIES_IDX: 3,
            SERVICE_DIVISION: 'Demand',
            INQUIRY_SUBJECT: "문제있습니다.ㅁㄴㅇ",
            CONTENTS: "이런저런22",
            GROUP: "삼성이엔지",
            PHONE: "010-2222-4444",
            USE_YN: "Y",
            CRT_ID: "admin",
            CRT_DT: "2023-05-21 15:00"
        }];


// grid 만드는 작업
        let csCenter1Grid = new dxtreelist();
        csCenter1Grid.setDataSource(center1list);
        columnName = ["ID",'SERVICE_DIVISION','INQUIRY_SUBJECT','GROUP','CRT_ID', 'PHONE' ,'CRT_DT'];
        csCenter1Grid.setColumns(columnName);
        csCenter1Grid.setPaging(15);
        captionName = ['구분','서비스','제목','사업그룹','등록자', '답변연락처' ,'등록일시'];
        csCenter1Grid.setCaptions(captionName);
        csCenter1Grid.setAutoExpandAll(true);
        csCenter1Grid.setId('ID','INQUIRY_ID',false);
        csCenter1Grid.setWidth('ID', 35+"%");
        csCenter1Grid.setWidth('SERVICE_DIVISION', 100+"%");
        csCenter1Grid.setWidth('INQUIRY_SUBJECT', 250+"%");
        csCenter1Grid.setWidth('GROUP', 100+"%");
        csCenter1Grid.setWidth('CRT_ID', 100+"%");
        csCenter1Grid.setWidth('PHONE', 100+"%");
        csCenter1Grid.setWidth('DT', 150+"%");
        csCenter1Grid.setSelection("single");
        csCenter1Grid.setHoverStateEnabled(true);
        csCenter1Grid.setShowRowLines(true)
        csCenter1Grid.setOnCellPrepared(function(e){
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
                    if(eDate >= newDay){
                        fieldHtml += e.value + /* 아이콘 넣기 */ `<span class='newIcon'>new</span>`;
                    }else{
                        return null;
                    }
                    e.cellElement.html(fieldHtml);
                }
            }
        });
        csCenter1Grid.setOnCellClick(function(e){
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
        csCenter1Grid.setOnCellDblClick(function(e){
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
        $('#menu13_csCenterGrid').dxTreeList(csCenter1Grid);
    }
}