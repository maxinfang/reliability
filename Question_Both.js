 var myNodes=new Array();
 var mylinks=new Array();
 var final = "";
 var templink;
 var questionId=this.frameElement.attributes.id.value; 
 var array = questionId.split("_");

//  jsPlumb.Defaults.Connector = [ "Flowchart", { stub: [10, 50], //midpoint: 0.0001 } ];
// Special handling may be required here if iframe id has double quotes included.
if(array[0] != "question"){
  alert ("iframe id does not match required format. It should begin with question_: " + questionId);
};
 
 
var mode="student";
var history_page=""; 
var namespaceforSub = array[0]+"_"+array[1]+"_submission";
var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
var namespaceforLabel= array[0]+"_"+array[1]+"_label"; 
var namespaceforDuration= array[0]+"_"+array[1]+"_duration"; 
var namespaceforFinal= array[0]+"_"+array[1]+"_final"; 
var op= new Array();

 
if(parent.document.getElementById(namespaceforSub))
 {mode ="submission";
}
else{
  mode="student";
};

function getDuration(){
 var elements=new Array();  
 var  seq=0;
 var  flag =1;
 
 while(flag){
   
  var  tempname= namespaceforDuration+"_"+seq; 
  var element=parent.document.getElementById(tempname);
  
  if ( typeof element !="undefined"&& element !=null ) { 
    
    var bu =element.innerHTML;
    
    elements.push( bu);
    seq++;
  }else {flag=0;}
  
}
 
  return elements;
}

function getEntry(){
 
  var elements=new Array();  
  var  seq=0;
  var  flag =1;
  
  while(flag){
   
    var  tempname= namespaceforEntry+"_"+seq; 
    var element=parent.document.getElementById(tempname);
    
    
    if ( typeof element !="undefined"&& element !=null ) { 
      
      var bu =element.innerHTML;
      
      elements.push( bu);
      seq++;
    }else {flag=0;}
    
  }
  return elements;
} 


function getHistory(){
  
  var elem= parent.document.getElementsByTagName("input"); 
  
  
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
   
  for(i; i < elem.length; i++) {
    att = elem[i].getAttribute("type");
    if(att =="text") {
      return elem[i].value   
    }  
    
  }
  
  
} 



function getSubmission(){
  var element=parent.document.getElementById(namespaceforSub);
  
  //console.log(element.innerHTML);
  return element.innerHTML;
}

var op = getEntry();
var du= getDuration();
//console.log(du);


$(document).ready(function()  {  
    //initialize jsPlumb 
    /*initialize endpoint Class*/
    jsPlumb.setRenderMode(jsPlumb.SVG);
    jsPlumb.Defaults.Container = $("#canvasdiv"); 
    jsPlumb.DefaultDragOptions = {  cursor:"pointer",
    zIndex: 2000 };
    jsPlumb.endpointClass = "endpointClass";
    jsPlumb.connectorClass =  "connectorClass";   
    $(".datatable").jLzindex();
 
    if(mode=="submission") {  history_page= getSubmission();
      
    }
     
    if(mode=="student"){history_page=getHistory();
    }
    
    if(history_page == "" ){ 
    }
    else{  
     redraw(history_page); 
     addConnections(mylinks);
   }
   
 
   
   jsPlumb.bind("connection",
    function(info, originalEvent) {
      
     var conn = info.connection;
     var parentId=$('#'+conn.sourceId).parent().attr('id');
     var childId=$('#'+conn.targetId).parent().attr('id');
      
      
      
      if( $("#"+parentId) !=null ) 
        {
       $("#"+parentId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           
           console.log($(el));
             $(el).hide();
          
         } 
       })
      
       
     }
      
      if( $("#"+childId) !=null ) 
        {
       $("#"+childId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           
           console.log($(el));
             $(el).show();
          
         } 
       })
      
       
     }
     
     
     if (parentId != childId) {
      
       var cc= findlink(parentId,childId);  
       cc = new connector();
       cc.h=parentId;
       cc.t=childId;  
       cc.id=generateLinkID(mylinks); 
       addNewLink(cc);
       
       //console.log(conn);       
       conn.setPaintStyle({lineWidth: 2, 
         strokeStyle:"#666",
         dashstyle:"4 2"})   
         
       if (conn.getOverlays().length<=1){
        jsPlumb.select(conn).addOverlay( ["Custom", {
          create:function(component) {  
            var boxvalue= drawbox("line",cc,conn);  
            return $(boxvalue);  
          },
          location:0.5,
                cssClass:"datatable"//,
               // id: cc.id
             }]);  
      }
      
       
      var box= conn.getOverlays();
      
    console.log(box);
    
       box[1].setVisible(true);
     
     $(".datatable").jLzindex(); 
       
   }
    
    }  
   
   );
   //initialzie button action to different buttons;
   
    
   
   jsPlumb.bind("connectionDetached", function(info, originalEvent) {
     var conn = info.connection;
      var parentId=$('#'+conn.sourceId).parent().attr('id');
    var childId=$('#'+conn.targetId).parent().attr('id'); 
    var beforeId= $('#'+info.targetId).parent().attr('id');
     
       if( $("#"+parentId) !=null ) 
        {
       $("#"+parentId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           
           console.log($(el));
             $(el).show();
          
         } 
       })
      
       
     }
      
      if( $("#"+childId) !=null ) 
        {
       $("#"+childId).children().each(function(no,el){
         if($(el).hasClass("datatable")){
           
           console.log($(el));
             $(el).hide();
          
         } 
       })
      
       
     }
     
     
     
    
     console.log("*******************event trigged");
    console.log("thisnodepriviousid"+beforeId);   
    console.log("thisnodeconnected"+childId);
    console.log("thisnodeconnected"+parentId);
    
    
     if(beforeId!=childId){  
       if (parentId != childId){
           deletelink(parentId,childId);   //change  
         } 
       }
       console.log("do I need deleted?")
       console.log(originalEvent);
       if(beforeId==childId){ 
        if (parentId != childId){
          if (typeof(originalEvent) != "undefined"){
           if(originalEvent.type=="drop")
             { deletelink(parentId,childId); 
               console.log("chekck");
             }
             if(originalEvent.type=="dragstop")
               { deletelink(parentId,childId); 
                 console.log("chekck");
               }
             }
           } 
         } 
     
       })
 
 
 
 
  
 if(mode!="submission"){ 
  $("#c").click(function(){ 
   var node= new Node();
   node.id =generateID(myNodes); 
   node= drawnode(node); 
   addNewNode(node);
 });
  
  
   $("#answer").change(function(){ 
     console.log( $("#answer").val());
     final = $("#answer").val();
      sentToparentPage(); 
                   
 });
   
    
   
   
  $("#clear").click(function(){ 
   if (confirm('Delete all nodes?')) { 
      
     for(var n=0; n<myNodes.length;n++){
       var node= myNodes[n];
       var currentId=node.id;   
      console.log(currentId); 
      
        if( $("#"+currentId) !=null ) 
        {
       $("#"+currentId).children().each(function(no,el){
         if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
           // console.log(el.id);
           jsPlumb.detachAllConnections(el.id);
           jsPlumb.removeAllEndpoints(el.id);  
         } 
       })
       $("#"+currentId).remove();
       
     }
     } 
     jsPlumb.deleteEveryEndpoint();
      jsPlumb.reset();
     myNodes.length = 0; 
     mylinks.length= 0;
     sentToparentPage(); 
   }  
 })
}
else{  
 $("#c").hide(); 
 $("#clear").hide();
 
}

})