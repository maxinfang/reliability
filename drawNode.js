function drawnode(node){ 
      //should rewrite the reload and redraw mode;
      
      newdiv= document.createElement('div'); 
      $(newdiv).attr('id',node.id);
      var containerId = $(newdiv).attr('id');
      $(newdiv).addClass("container");
      $(newdiv).addClass(node.type);
      
     //postion
     if(node.top==""){ 
     }
     else{
       console.log("css:"+node.top+":"+node.left);
      $(newdiv).css({ top: node.top, left: node.left });
    } 
    
    $("#canvasdiv").append(newdiv); 
    dragzone= document.createElement('div'); 
    deletezone= document.createElement('div'); 
    var elem = document.createElement("img");
    elem.setAttribute("src", " icon-error.png");
    $(elem).uniqueId();
    $(elem).attr('align', 'right');
    $(deletezone).append(elem); 
    $(deletezone).addClass("delete");
      //$(deletezone).text("delete");
      
      $(dragzone).uniqueId();
      var deleteId  =$(elem).attr("id");
      var currentId=$(dragzone).attr("id"); 
      $(newdiv).append(deletezone);
      $(newdiv).append(dragzone);  
      addShape("C",dragzone);  
      
      
      var dropL;
      var dropLid;
      
      
    
      if(node.activity==""){ 
       node.activity=0;
     //  dropL=addDroplist();
       dropLid=$(dropL).prop('id');
       //$(dropL).width('90%'); 
      // dropL.show();
     }
     
       else{        
       // dropL=addDroplist(node.activity);
        dropLid=$(dropL).prop('id'); 
       // $(dropL).width('90%');
        
      }    
     
    
      
      var dataLeft= $(newdiv).position().left;
      var dataTop= $(newdiv).position().top; 
      datadiv= document.createElement('div');
      $(datadiv).uniqueId();
      
      
      var datadivId=$(datadiv).attr("id");
      $(datadiv).addClass("datatable"); 
      
      var element = document.createElement('span');
      element.className = "normal short";
      
    //$(element).append(durationdiv);
    
    var oNewP = document.createElement("div");
    oNewP.style.display = 'block';
    
    
    var durationL= addlabel("Duration: "+du[node.activity]);
   // $(durationL).uniqueId();
    //var durationId = $(durationL).attr('id');
   // $(oNewP).append(durationL);

    $(newdiv).append(datadiv);
    
    $(datadiv).append(dropL); 
   // $(datadiv).append(oNewP);
    $(datadiv).append(element);
    
   //$(element).append(addlabel("EST"));
   
   var EST = (node.EST=="") ? addtext("EST") :     addtext("EST",node.EST);
   
   var ESTdata = document.createElement("div");
   ESTdata.style.display = 'block';
   
   
   $(ESTdata).append(addlabel("Answer"));
   $(ESTdata).append(EST);
   
   
   
   var EFT = (node.EFT=="") ? addtext("EFT") :     addtext("EFT",node.EFT);
   
   
   //$(ESTdata).append(addlabel("EFT"));
   //$(ESTdata).append(EFT);
   
   $(element).append (ESTdata); 
   
   var LSTdata = document.createElement("div");
  // ESTdata.style.display = 'block';
   
   
 //  $(LSTdata).append(addlabel("LST")); 
    
   var LST = (node.LST=="") ? addtext("LST") : addtext("LST",node.LST);
   
//   $(LSTdata).append (LST);
   
   var LFT = (node.LFT=="") ? addtext("LFT") : addtext("LFT",node.LFT);
   
  // $(LSTdata).append(addlabel("LFT"));
  // $(LSTdata).append (LFT);
   
  // $(element).append( LSTdata); 
   
   
   var FFdata = document.createElement("div");
  // ESTdata.style.display = 'block';
   
   
   
  // $(FFdata).append(addlabel("FF"+"&nbsp&nbsp")); 
   var FF= (node.FF=="") ? addtext("FF") : addtext("FF",node.FF);
   
   
   
   
   $(FFdata).append (FF);
   
  // $(FFdata).append(addlabel("TF" +"&nbsp&nbsp"));
   
   
   
   var TF= (node.TF=="") ? addtext("TF") : addtext("TF",node.TF);
   
 //  $(FFdata).append (TF);
 //  $(element).append( FFdata); 
   
   
   $(EST).change(function() {
     node.EST= $(EST).val();
     updateNode(node,"EST");
     
   });   
   $(EFT).change(function() {
     node.EFT= $(EFT).val();
     updateNode(node,"EFT");
     
   });  
   $(LST).change(function() {
     node.LST= $(LST).val();
     updateNode(node,"LST");
     
   }); 
   $(LFT).change(function() {
     node.LFT= $(LFT).val();
     updateNode(node,"LFT");
     
   }); 
   $(FF).change(function() {
     node.FF= $(FF).val();
     updateNode(node,"FF");
     
   }); 
   $(TF).change(function() {
     node.TF= $(TF).val();
     updateNode(node,"TF");
     console.log("the value has been changed");
     
   }); 
   
   $(dropL).change(function() { 
     
    
    var indexvalue= $( "#"+dropLid+" option:selected" ).val();
    node.activity= indexvalue;
    updateNode(node,"activity");
    
   // $("#"+durationId).text("Duration: "+du[node.activity]);
    
    
  })
   
   
   $("#"+deleteId).click(function() { 
    if (confirm('Delete this node?')) {   
      jsPlumb.detachAllConnections(currentId )
      jsPlumb.removeAllEndpoints(currentId); 
       
      $("#"+node.id).empty();  
      
       deleteNode(node);
      
      
    }  
    
  });
   
  
    
  
    
   $(dragzone).bind("dblclick","doubletap",
      function() { 
     $("#"+datadivId).toggle("slow") ;
   }
      );
  
   console.log(node);
  $(datadiv).hide();
// if(node.activity==0){$(datadiv).hide()}
    
//  if(mode != "correct") {$(datadiv).hide();  }



jsPlumb.draggable(containerId);

$("#"+containerId).draggable(    
  {   containment: $("#canvasdiv").parent(),
  scroll:false,
  handle:  "#"+currentId,
  stop: function(event, ui ){ 
   position = ui.position; 
   value="top:"+position.top+"left"+position.left;
   node.top=position.top;
   node.left=position.left; 
   updateNode(node,"top");
   updateNode(node,"left"); 
 }
}
);   
    //connection
      
      var top= $('#'+containerId).position().top;
      var left=$('#'+containerId).position().left;
      
      node.top=top;
      node.left=left;
      
      return node;
      
    }