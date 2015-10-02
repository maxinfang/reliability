

var Color="#fa0000";
if(mode=="correct") { Color= "#5cc902"};
if(mode=="submission") { Color= "#0060bf"};  

function addShape(type,dragzone){
  if (type=="C") {addCircle(dragzone);} 
}
 
 
function addCircle(dragzone) {
  var paper = new Raphael(
    $(dragzone).get(0), 102, 102);   
  var circle =paper.circle(50, 50)
  .attr({
    fill : Color, 
    r : 45
  }); 
  
  
  var sourcePoint= {
    anchor:"Right",  
    // deleteEndpointsOnDetach: false,
    connectorStyle: {
      lineWidth: 2,
      strokeStyle: '#666' 
       
    }, 
     maxConnections: -1,
    connector: ["Straight"], 
     connectorOverlays: [["Arrow",
    { width: 15,
     length: 15}]],
  
     isSource:true,
     isTarget:false
    
   };
 
   var targetPoint= {
    anchor: "Left",
    maxConnections: -1, 
    isSource:false,
    isTarget:true,
    //deleteEndpointsOnDetach: false,
    beforeDrop:function(conn) {  
     
     var        existingConnections=jsPlumb.getConnections({source:conn.sourceId,target:conn.targetId});
      if(existingConnections.length >0 ) return false;
      else return true;
      

        } 
   
  };  
  var currentId = $(dragzone).attr('id'); 
  

  e1= jsPlumb.addEndpoint(currentId, sourcePoint);
  e2= jsPlumb.addEndpoint(currentId, targetPoint); 
 
  //jsPlumb.makeTarget(currentId, targetPoint);
 
 
  
}

