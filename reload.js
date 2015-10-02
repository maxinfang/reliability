function redraw(history){
  
 myNodes=deserialiseC(history);
 mylinks=deserialiseL(history);
 final = deserialiseF(history);
  
  console.log("print ");
   
   
    
      console.log($('#answer').val(final));
   
 
  
 if (myNodes == []) return;
 
   if(mode == "submission" || mode == "student")
  { for(n=0; n<myNodes.length;n++){ 
    var node= myNodes[n];
    console.log(node);
    drawnode(node);
  }   
  
}
   

 
if(mode=="correct") { 
 var root = new Node();
 root = findrootnode();  
 var linkedArray= new Array(); 
 var linkedArray2= new Array();  
 for(n=0; n<myNodes.length;n++){  
  var node=myNodes[n];  
       //console.log(node);
       var linkedNode= new NodeClass(node)
     // console.log(linkedNode);
     linkedArray.push(linkedNode);  
     linkedArray2.push(linkedNode);
   } 
   
  
  
  function findlinkednode(id){
    
   for (x=0;x<linkedArray2.length;x++){ 
     var li=linkedArray2[x];
     if(li.id==id){return li;}
   } 
   return "none";
 } 
 
 
 
    // console.log(du[root.activity]);
    // console.log(du[root.activity]);
    
    
    
    
    
     //set children and parents; 
     
     for (j=0;j<linkedArray.length;j++){ 
      
      var linkedNode=linkedArray[j]; 
      var children= new Array(); 
      var parents= new Array(); 
      for(var n=0; n<mylinks.length;n++){ 
       var link= mylinks[n]; 
       if (link.t==linkedNode.id){
         parents.push(findlinkednode(link.h));
       }
       
       if (link.h == linkedNode.id){
         children.push(findlinkednode(link.t))
       }
     }
           // linkedNode.node.parentID;  
         // console.log(children);
         linkedNode.prevNode=parents; 
         linkedNode.nextNodes=children;
       }
       
       var linkedrootnode=findlinkednode(root.id)
       recursive(linkedrootnode); 
       var deep =linkedrootnode.level;
       console.log(linkedrootnode);
   
       for(var n=deep; n>0 ;n--){
        
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {  
            
             var parentnodes=lnode.prevNode; 
             
             var maxValudeofParentEFT=0;
             for(var k=0; k<parentnodes.length; k++ ){
              var nodedata= parentnodes[k].node;
              var parentEFT= nodedata.EFT;
              if(maxValudeofParentEFT < parentEFT)
                {maxValudeofParentEFT = parentEFT; }
            }
            
            calculateEST(lnode.node,maxValudeofParentEFT);
            calculateEFT(lnode.node);
            
          }
        }
      }
      var project_duration=0; 
      
      for( var i=1; i<=deep; i++ )   {
       for (var j=0;j<linkedArray.length;j++){
         var lnode= linkedArray[j];
         var nodeEFT= lnode.node.EFT;
         if(project_duration < nodeEFT){
          project_duration =nodeEFT;
          
        } 
      }
    }
     
    for( var i=1; i<=deep; i++ )   {
      for (var j=0;j<linkedArray.length;j++){
       var  lnode=  linkedArray[j]; 
       if(lnode.level==i) {
        var childrenodes=lnode.nextNodes;  
        var minValueofChildLST=project_duration;
        var minValueofChildEST=project_duration;
        for(var k=0; k< childrenodes.length; k++ ){
          var nodedata= childrenodes[k].node;
          var childLST= nodedata.LST; 
          var childEST =  nodedata.EST;
          if( minValueofChildLST > childLST)
            {minValueofChildLST = childLST;
            }
            if(  minValueofChildEST > childEST){
             minValueofChildEST = childEST;
           }
         }
         
         calculateLFT(lnode.node,minValueofChildLST);
         calculateLST(lnode.node);  
         calculateFFTF(lnode.node,minValueofChildEST);   
        }
        
      }
      
    }
     
     for(n=0; n<myNodes.length;n++){ 
       var node= myNodes[n];
     //console.log(node);
        drawnode(node);  
   } 
  addConnections(mylinks);
   
 }
  
  else if(mode=="correct"  ){
    
    for(n=0; n<myNodes.length;n++){ 
       var node= myNodes[n];
    // console.log(node);
       drawnode(node);  
   } 
    
    //data structure first
    // nodelist
    
     var linkedArray= new Array(); 
     var linkedArray2= new Array();  
    
     for(n=0; n<myNodes.length;n++){  
        var node=myNodes[n];  
       //console.log(node);
       var linkedNode= new NodeClass(node);
     // console.log(linkedNode);
     linkedArray.push(linkedNode);  
     linkedArray2.push(linkedNode);
   } 
    
     for (j=0;j<linkedArray.length;j++){ 
      
      var linkedNode=linkedArray[j]; 
      var children= new Array(); 
      var parents= new Array(); 
      for(var n=0; n<mylinks.length;n++){ 
       var link= mylinks[n]; 
       if (link.t==linkedNode.id){
         parents.push(findlinkednode(link.h));
       }
       
       if (link.h == linkedNode.id){
         children.push(findlinkednode(link.t))
       }
     }    
      linkedNode.prevNode=parents; 
      linkedNode.nextNodes=children;  
      console.log(linkedNode);
  
     } 
    
    // connectionlist
    
   var linkedconnections=new Array(); 
   var linkedconnectionsserach=new Array(); 
    
    for(x=0; x<mylinks.length; x++ ){
    
      var   connector =  mylinks[x];
      var linkedconnector= new connectionClass(connector);  
    
    /*  var predecessor= new Array(); 
      var successor= new Array();   
      
      linkedconnector.prevLinks=predecessor; 
      linkedconnector.nextLinks=findsuccessor;            */
      linkedconnections.push(linkedconnector); 
      
      
    }
    
    
   for (j=0;j<linkedArray.length;j++){ 
      
      var linkedNode=linkedArray[j]; 
      var predessors=Array();
      var successors=Array();
     
      predessors= linkedNode.prevNode;
      successors=linkedNode.nextNodes;
     
       //findlink();
       var prevlink=Array();
      for (p=0; p<predessors.length;p++){
        var head=predessors[p].id;
        var link=findlink(head,linkedNode.id);
         prevlink.push(link);  
     }
       linkedNode.prevconnectors=prevlink;
     
      var suclink=Array();
      for (s=0; s<successors.length;s++){
        var tail=successors[s].id;
        var link=findlink(linkedNode.id,tail);
         suclink.push(link);  
     }
       linkedNode.nextconnectors=suclink;
     
       
   }
    
    
   
    
    var root = findrootnode(); 
     var linkedrootnode= findlinkednode(root.id)
     recursive(linkedrootnode); 
    
     var deep =linkedrootnode.level;
     var maxvalueofEFT=0;
    
       for(var n=deep; n>0 ;n--){
        
         for (var j=0;j<linkedArray.length;j++){
           var  lnode=  linkedArray[j];
           if(lnode.level== n) {   
             var parentlinks=lnode.prevconnectors;
             var maxValudeofParentEFT=0; 
             for(var k=0; k<parentlinks.length; k++ ){
              var linkdata= parentlinks[k];
              
              var parentEFT= linkdata.EFT;
              if(maxValudeofParentEFT < parentEFT)
                {maxValudeofParentEFT = parentEFT; 
                 if(maxValudeofParentEFT>maxvalueofEFT){maxvalueofEFT=maxValudeofParentEFT;}
                }
            }
           
             var nextlinks=lnode.nextconnectors; 
             for(var k=0; k<nextlinks.length;k++ ){
              var linkdata= nextlinks[k]; 
                calculateEST(linkdata,maxValudeofParentEFT);
                calculateEFT(linkdata); 
            }
             
             
             
            
          }
        }
      }
    
    
     for( var i=1; i<=deep; i++ )   {
       
      for (var j=0;j<linkedArray.length;j++){
       var  lnode=  linkedArray[j]; 
       if(lnode.level==i) {
         var childrelinks=lnode.nextconnectors;   
         var ValueofChildEFT=maxvalueofEFT;
         var ValueofChildEST=maxvalueofEFT;
         
       
         for(var k=0; k< childrelinks.length; k++ ){
          var linkdata= childrelinks[k]; 
          var childLST= linkdata.LST;
          var childEST= linkdata.EST;
          if(childLST < ValueofChildEFT){  
            ValueofChildEFT=childLST;   }  
           
           if(childEST< ValueofChildEST) {
              ValueofChildEST=childEST; 
              
              }
           
           
         }
         
         
         
           var prelinks=lnode.prevconnectors; 
             for(var k=0; k<prelinks.length;k++ ){
              link=prelinks[k];  
              calculateLFT(link, ValueofChildEFT);
              calculateLST(link);  
              calculateFFTF(link,ValueofChildEST);   
                } 
        }
      }
    }
      for (j=0;j<linkedArray.length;j++){ console.log(linkedArray[j]);}
    
     addConnections(mylinks);
    
  }
}

