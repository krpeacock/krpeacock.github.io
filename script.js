// Avoiding real JSON so this doesn't require a server.
var images = [{ 1: "pictures/1.png"}, {2: "pictures/2.png"}, {3: "pictures/3.png"}, {4: "pictures/4.png"}, {5: "pictures/5.png"}, {6: "pictures/6.png"}, {7: "pictures/7.png"}, {8: "pictures/8.png"}, {9: "pictures/9.png"}, {10: "pictures/10.png"}, {11: "pictures/11.png"}, {12: "pictures/12.png"}]

var app = document.getElementById('app');
// dragged is placeholder for moving element
var dragged;

// Iterate through array to create tiles
function renderDom(){
	images.forEach((img, idx)=>{
		for (name in img){
			addTile(img[name], name, idx)
		}
	})
}

// Tile constructor
// Index in image array is ID, Key is stored as "name"
function addTile (img, name, idx){
	var newImg = document.createElement("img"); 
	newImg.id = idx;
	newImg.className="tile";
	newImg.draggable="true";
	newImg.src = img;
	newImg.name = name;
	
	app.appendChild(newImg);
}


function init(){
	document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;

  }, false);
	
	document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);
	
	 document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);
	
	 document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "tile" ) {
          event.target.style.opacity = .3;
      }

  }, false);
	
	 document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "tile" ) {
          event.target.style.opacity = "";
      }

  }, false);
	
	document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className == "tile" ) {
          event.target.style.opacity = "";
      
			// store the image to be moved
				var movedImg = images[dragged.id];
			
				
			// edit the array (equivalent to making a change in a backend)
				
			// remove dragged image	
			images.splice(dragged.id, 1);
				
			// insert dragged image in front of drag-over
			images.splice(event.target.id, 0, movedImg);
				
				
			// redraw the DOM
			app.innerHTML = "";
			renderDom();
			dragged = undefined;

			}
    
  }, false);
}

window.onload = function() {
	init();
	renderDom();
};