$(function(){
 
  $("#slide-open").click(function()    {
    if($("#burgur").hasClass('on')){
      $("#burgur").removeClass('on');
      $("#slide").removeClass('on');
     
    } else{
      $("#burgur").addClass('on');
     $("#slide").addClass('on'); 
    }
  });
  
});

const dashboard = () =>{
  alert('test');
}