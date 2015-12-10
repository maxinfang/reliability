/*Use “a” as separator between red rectangles and end node data and between end node data and green rectangles
 
Use “b” as separator between red rectangles
Use “c” as separator between red rectangle fields
Use “d” as separator between parent nodes
 
Use “d” as separator between parent nodes of end node
 
Use “g” as separator between green rectangles
Use “h” as separator between green rectangle fields
*/
var general_separator='a';
var red_SEPARATOR='b';
var red_fileds_SEPARATOR ='c';
var parent_SEPARATOR ='d';
var green_SEPARATOR ='g';
var green_feilds_SEPARATOR='h';
    


if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
  
function Node(id,type,parent,top,left,selectvalue,emv,prob){      
       this.id = "";
       this.type="";
       this.parentID =[]; 
    console.log("add some thing here");
       this.top ="";
       this.left=""; 
       this.value=""; 
       this.emv="";//change this to the type? 
       this.prob="" ;
     
     }  

function bgNode(id,type,top,left,bottom,right,prob) {
       this.id = "";
       this.type=""; 
       this.top ="";
       this.left=""; 
       this.bottom=""; 
       this.right=""; 
       this.prob="" ;
}  
 

 
 
function deserialise(string){
      
       var array= new Array();
    //if (string ="no answer") return array;
       var stringnode=  string.split('a');
       var stringnode = stringnode[0].split('b');
       for(i=0;i<stringnode.length-1;i++){
        //   if(stringnode[i]==" ") continue;
         console.log(stringnode);
       var nodeAttribute=stringnode[i].split('c');
       //console.log(nodeAttribute[1]);
       var node = new Node();
       console.log(nodeAttribute);
       node.type= nodeAttribute[0]
       node.id=nodeAttribute[1];
       node.value=nodeAttribute[2];
       node.left =nodeAttribute[3];
       node.top =nodeAttribute[4]; 
       node.emv=nodeAttribute[5];
       node.prob=nodeAttribute[6]; 
       node.parentID="test";//nodeAttribute[7];   
       console.log(node);
       array.push(node);
       }   
  console.log(array); 
     return array; 
}


function serialise(myNodes,mybgNodes){
    var answervalue =""; 
  
    //if(myNodes ==[] && mybgNodes ==[] )
    for(l=0;l<myNodes.length;l++){
      var thisnode=myNodes[l]; 
      answervalue+=thisnode.type;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.id;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.value;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.left;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.top;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.emv;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.prob;
      answervalue+=red_fileds_SEPARATOR;
      answervalue+=thisnode.parentID;
      answervalue+=red_fileds_SEPARATOR; 
      answervalue+=red_SEPARATOR;
    } 
      
  
      answervalue+= general_separator;
  
       for(l=0;l<mybgNodes.length;l++){
      var thisnode=mybgNodes[l]; 
         
      answervalue+=thisnode.type;
      answervalue+=green_feilds_SEPARATOR;
      answervalue+=thisnode.id;
      answervalue+=green_feilds_SEPARATOR; 
      answervalue+=thisnode.left;
      answervalue+=green_feilds_SEPARATOR;
      answervalue+=thisnode.top;
      answervalue+=green_feilds_SEPARATOR;
      answervalue+=thisnode.right;
      answervalue+=green_feilds_SEPARATOR;
      answervalue+=thisnode.bottom;
      answervalue+=green_feilds_SEPARATOR;
      answervalue+=thisnode.prob;
      answervalue+=green_feilds_SEPARATOR;
       
      answervalue+=green_SEPARATOR;
    } 
     if (answervalue.length  <3) return "";
      return answervalue;
};

function generateID(mymerged){
      
  if (typeof(mymerged) == "undefined" ) {return 1;} 
      var myNodesArray=(mymerged);
      var max=0;   
      for(n=0; n<myNodesArray.length;n++){ 
         var node= mymerged[n]; 
          node.id >=max;
          max=node.id 
       } 
  
      var ret= Number(max) +1;
      return ret;
      
      };

function generategreenID(mynodes){
      
  if (typeof(mynodes) == "undefined" ) {return 1;} 
      var myNodesArray=(mynodes);
      var max=9999;   
      for(n=0; n<myNodesArray.length;n++){ 
         var node= mynodes[n]; 
          node.id >=max;
          max=node.id 
       } 
  
      var ret= Number(max) +1;
      return ret;
      
      };

  function findnode(id){ 
       for(n=0; n<myNodes.length;n++){
         if (myNodes[n].id == id){ 
         return myNodes[n];
         }
       }
       }

 function addNewNode(node){ 
     myNodes.push(node);
     sentToparentPage();
   }
 function addNewbgNode(node){ 
     mybgNodes.push(node);
   console.log( mybgNodes);
     sentToparentPage();
   }


function  emptymyNodes(){ 
    myNodes=[];
    jsPlumb.reset; 
    sentToparentPage();
   }

 function updatebgNode(node,property){ 
      var myNodesArray=mybgNodes; 
      for(n=0; n<myNodesArray.length;n++){ 
         var n= mybgNodes[n]; 
        if(  n.id== node.id){
          if(property=="top") {n.top=node.top;}
          if(property=="left"){n.left=node.left;}
          if(property=="bottom"){n.bottom=node.bottom;}
          if(property=="right"){n.right=node.right;}
          if(property=="prob"){n.prob=node.prob;}
         
        }
       } 
   if(mode == "student"){ sentToparentPage();}
   return;
      };




 function updateNode(node,property){ 
      var myNodesArray=myNodes; 
      for(n=0; n<myNodesArray.length;n++){ 
         var n= myNodes[n]; 
        if(  n.id== node.id){
          if(property=="top") {n.top=node.top;}
          if(property=="left"){n.left=node.left;}
          if(property=="parentID"){ n.parentID=node.parentID;  }
          if(property=="emv"){n.emv=node.emv;}
          if(property=="prob"){n.prob=node.prob;}
          if(property=="value"){n.value=node.value;}
        }
       } 
   if(mode == "student"){ sentToparentPage();}
   return;
      };


function  giveWarning(){
      var numberOfnoParent=0;
  for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        var parentid = node.parentID;
        if(parentid=="") numberOfnoParent++;
       }  
         if (numberOfnoParent>1) {
           
           $("body").css("background-color","#fee");
           $("p").text("Warning: Not all nodes are connected!");
            
         }  
            else{
              $("body").css("background-color","transparent");
              $("p").text("");
            
       }; 
}

function sentToparentPage()
{ console.log(myNodes);
  console.log(mybgNodes);
  giveWarning();
  var answervalue = serialise(myNodes,mybgNodes); 
  
  if(mode !="submission" && mode !="correct"){
 // window.parent.save(answervalue);
 // $('#answer').val(answervalue); 
      var elem= parent.document.getElementsByTagName("input"); 
 
    
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
  for(; i < elem.length; i++) {
        att = elem[i].getAttribute("type");
    if(att =="text") {
       elem[i].value   = answervalue;
    }  
         
    } 
   
   console.log("save:"+answervalue);
  }
  
  if(mode =="submission" || mode =="correct"){
  
    console.log(" ");
  
  
  
  }
}

 
function deleteNode(node)
{
       var deletedNodeid=node.id; 
       var index = myNodes.indexOf(node); 
       
       myNodes.splice(index,1); 
       for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        
        if(node.parentID==node.id){ 
        node.parentID="";
                                             $("#"+node.id).children().each(function(no,el){
        if($(el).hasClass("droplist")){
        $(el).hide();
        } 
        });}
       }  
       giveWarning();  
      $("#"+deletedNodeid).remove();
      
}



  function validateNum(value)
{
    var num = value;
    var regex=/^[-+]?[0-9]*\.?[0-9]*$/;
    var emdashregex=/[－]+/;
    var commaregex=/[,]+/;
  
  message="true";
  
  if (!num.match(regex)) { message="Numbers must only contain -.1234567890"; 
                          }
     
     
  if(num.match(emdashregex)){
         message +="\nHint: Are you using the standard negative sign? ";  
              } 
  
 if(num.match(commaregex)){
        message +="\nHint: Do not use comma (,) as decimal point? ";  
  }
         
   return message;
  
  
 }

  function checkInp(value)

 {
   var x=value ;
    regex=/^[-+]?[0-9]*\.?[0-9]*$/;;
    if (!x.match(regex))
      { 
        return false;
      }

 }
 