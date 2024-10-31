//Rich HTML Balloon Tooltip- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
//This notice MUST stay intact for legal use
//Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code

//var defaultsize="S";
var lightboxsupport=0; // Lighbox version 2.x
var disappeardelay=250  //tooltip disappear delay (in miliseconds)

/////No further editting needed

var verticaloffset=0 
var enablearrowhead=1 
var arrowheadimg=["http://snapr.seekxl.de/media/arrow_down.gif", "http://snapr.seekxl.de/media/arrow_up.gif"] 
var arrowheadheight=9 

var ie=document.all
var ns6=document.getElementById&&!document.all
verticaloffset=(enablearrowhead)? verticaloffset+arrowheadheight : verticaloffset
if( document.all ) {
	verticaloffset += 5;
}

function enableTooltips(key,id){

	var links,i,tooltip,c,snapr,link,href,anchor,para,background,havelightbox;
	
	havelightbox = false;
	if( lightboxsupport && typeof Lightbox=='function' ) {
		if( typeof myLightbox=='undefined' ) {
			//myLightbox = new Lightbox();
		}
		havelightbox = true;
	}
	
	c=0;

	if(id==null) 
		links=document.getElementsByTagName("a");
	else 
		links=document.getElementById(id).getElementsByTagName("a");
		
	var size = "S";
	
	if(typeof seekXLThumbnailSize != "undefined" && seekXLThumbnailSize != "" && seekXLShowAll == "true") {
    	size = seekXLThumbnailSize;
    }

	var maxlength = 28;
	
 	if( havelightbox ) disappeardelay += 750;
	
	for(i=0;i<links.length;i++){
    	
    	if( 
    		links[i].getAttribute("seekxl") 
    		|| links[i].getAttribute("id") == 'prevLink'
    		|| links[i].getAttribute("id") == 'nextLink'
    		|| links[i].getAttribute("id") == 'loadingLink'
    		|| links[i].getAttribute("id") == 'bottomNavClose'
    		|| !links[i].getAttribute("href")
    		|| !links[i].getAttribute("href").length
    		|| !links[i].getAttribute("href").match( /^http/ )
    		|| links[i].getAttribute("href").match( eval( "/"+ location.host + "/") )
    		|| ( seekXLShowAll == "false" && !( links[i].getAttribute("size") && links[i].getAttribute("size").length ) )
    	) {
    		continue;
    	}
    	
    	c++;
    	
    	if( havelightbox ) {
			
			anchor=document.createElement("a");
			
			if( typeof seekXLLogoKey != "undefined" && seekXLLogoKey != "" ){
				href = 'http://snapr.seekxl.de?key=' + seekXLLogoKey + '&size=L&url=' + escape( links[i].getAttribute("href") ).replace( /\//g, '%2F' );
			}
			else {
				href = 'http://snapr.seekxl.de?size=L&url=' + escape( links[i].getAttribute("href") ).replace( /\//g, '%2F' );
			}			
			anchor.setAttribute( 'href', href );
			anchor.setAttribute( 'title', links[i].getAttribute("href") );
			anchor.setAttribute( 'seekxl', 'true' );
			anchor.setAttribute( 'rel', 'lightbox[seekxlbubble]' );		
		}
		
    	tooltip=document.createElement("div");
		
		tooltip.id="baloon"+c;
		tooltip.setAttribute("id","baloon"+c);
		if(key!=null) {
			
		}
		
		tooltip.className="seekxl_bubble";
		
		if( document.all ) {
			if ( navigator.appName == "Microsoft Internet Explorer" ) {
				tooltip.style.margin="0px !important";
			}
		}

		tooltip.setAttribute("class","seekxl_bubble");
		
		links[i].setAttribute("rel","baloon"+c);
		
		//tooltip.innerHTML = "Test";
		
		//size = defaultsize;
		if( links[i].getAttribute("size") && links[i].getAttribute("size").length ) {
			if( links[i].getAttribute("size").toLowerCase() == 't') {
				tooltip.style.width="100px";
				size = "T";
				maxlength = 12;
			}
			else if( links[i].getAttribute("size").toLowerCase() == 's') {
				tooltip.style.width="200px";
				size = "S";
				maxlength = 28;
			}
			else if( links[i].getAttribute("size").toLowerCase() == 'm') {
				tooltip.style.width="400px";
				size = "M";
				maxlength = 57;
			}
			else if( links[i].getAttribute("size").toLowerCase() == 'l') {
				tooltip.style.width="640px";
				size = "L";
				maxlength = 77;
			}
		}
		else {
			if( size.toLowerCase() == 't') {
				tooltip.style.width="100px";
				maxlength = 12;
			}
			else if( size.toLowerCase() == 's') {
				tooltip.style.width="200px";
				maxlength = 28;
			}
			else if( size.toLowerCase() == 'm') {
				tooltip.style.width="400px";
				maxlength = 57;
			}
			else if( size.toLowerCase() == 'l') {
				tooltip.style.width="640px";
				maxlength = 77;
			}
		}
		snapr=document.createElement("img");
		
		if( havelightbox ) {
			snapr.setAttribute( 'src', 'http://snapr.seekxl.de/media/loupe_' + size.toLowerCase() + '.gif' );
		}
		else {
			snapr.setAttribute( 'src', 'http://snapr.seekxl.de/media/space_' + size.toLowerCase() + '.gif' );
		}
		
		snapr.setAttribute("border","0");
		
		para=document.createElement("div");
		
		
		
		if( typeof seekXLLogoKey != "undefined" && seekXLLogoKey != "" ) {
			background='http://snapr.seekxl.de?key=' + seekXLLogoKey + '&size=' + size + '&url=' + escape( links[i].getAttribute("href") ).replace( /\//g, '%2F' );
		}
		else {
			background='http://snapr.seekxl.de?size=' + size + '&url=' + escape( links[i].getAttribute("href") ).replace( /\//g, '%2F' );
		}
		tooltip.setAttribute("title",background);
		
		if( havelightbox && anchor ) {
			anchor.appendChild(snapr);
			para.appendChild(anchor);
		}
		else {
			para.appendChild(snapr);
		}
		tooltip.appendChild(para);
		
		link=document.createElement("h2");
		
		link.innerHTML = ( links[i].getAttribute("href").length>maxlength ? links[i].getAttribute("href").substr(0,maxlength - 3)+"..." : links[i].getAttribute("href") );
		
		document.getElementsByTagName("body")[0].appendChild(tooltip);
    }
    
    if( havelightbox ) {
    	if( document.all ) {
    		//var myLightbox;
    	}
    	if( typeof myLightbox!='undefined' ) {
    		myLightbox.updateImageList();
    	}
    	//document.observe('dom:loaded', function () { new Lightbox(); });
    } 
    
	initalizetooltip();
}

function getposOffset(what, offsettype){
	var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	var parentEl=what.offsetParent;
	while (parentEl!=null){
	totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
	parentEl=parentEl.offsetParent;
	}
	return totaloffset;
}

function showhide(obj, e){
	dropmenuobj.style.left=dropmenuobj.style.top="-500px"
	if (e.type=="mouseover")
	obj.visibility="visible"
}

function iecompattest(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
	if (whichedge=="rightedge"){
	edgeoffsetx=0
	var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
	dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
	if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
	edgeoffsetx=dropmenuobj.contentmeasure-obj.offsetWidth
	return edgeoffsetx
}
else{
	edgeoffsety=0
	var topedge=ie && !window.opera? iecompattest().scrollTop : window.pageYOffset
	var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
	dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
	if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure) //move up?
	edgeoffsety=dropmenuobj.contentmeasure+obj.offsetHeight+(verticaloffset*2)
	return edgeoffsety
}
}

function displayballoontip(obj, e){ //main ballooon tooltip function
	
	if (window.event) event.cancelBubble=true
	else if (e.stopPropagation) e.stopPropagation()
	if (typeof dropmenuobj!="undefined") //hide previous tooltip?
	dropmenuobj.style.visibility="hidden"
	
	clearhidemenu()
	//obj.onmouseout=delayhidemenu
	dropmenuobj=document.getElementById(obj.getAttribute("rel"))
	if( dropmenuobj.firstChild ) {
		var bg = dropmenuobj.getAttribute('title');
		myImage = new Image();
		myImage.src = bg; 
	}
	showhide(dropmenuobj.style, e)
	dropmenuobj.x=getposOffset(obj, "left")
	dropmenuobj.y=getposOffset(obj, "top")+verticaloffset
	if( navigator.userAgent.match(/Opera/) ) {
		dropmenuobj.y-=4;
	}
	else if(document.all) {
		dropmenuobj.y+=7;
	}
	else {
		dropmenuobj.y-=3;
	}
	if( dropmenuobj.firstChild ) {
		
		dropmenuobj.firstChild.style.backgroundImage="url(" + myImage.src + ")";
	}
	dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
	dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
	if (enablearrowhead)
	displaytiparrow()
}

function displaytiparrow(){ //function to display optional arrow image associated with tooltip
	var ptop,pleft;
	tiparrow=document.getElementById("seekxl_arrowhead")
	tiparrow.src=(edgeoffsety!=0)? arrowheadimg[0] : arrowheadimg[1]
	var ieshadowwidth=(dropmenuobj.firstChild.filters && dropmenuobj.firstChild.filters[0])? dropmenuobj.firstChild.filters[0].Strength-1 : 0
	//var ieshadowheight=(dropmenuobj.filters && dropmenuobj.filters[0])? dropmenuobj.filters[0].Strength-1 : 0
	//modify "left" value depending on whether there's no room on right edge of browser to display it, respectively
	pleft=(edgeoffsetx!=0)? parseInt(dropmenuobj.style.left)+dropmenuobj.offsetWidth-tiparrow.offsetWidth : parseInt(dropmenuobj.style.left)-1
	//modify "top" value depending on whether there's no room on right edge of browser to display it, respectively
	ptop=(edgeoffsety!=0)? parseInt(dropmenuobj.style.top)+dropmenuobj.offsetHeight-tiparrow.offsetHeight-ieshadowwidth+arrowheadheight+4 : parseInt(dropmenuobj.style.top)-arrowheadheight+4
	if( navigator.userAgent.match(/Opera/) ) {
	
	}
	else if(document.all) {
		if( dropmenuobj.firstChild.filters && dropmenuobj.firstChild.filters[0] && edgeoffsety!=0 ) {
			//dropmenuobj.firstChild.filters[0].Direction = -45;
		}
		ptop=(edgeoffsety!=0)? parseInt(dropmenuobj.style.top)+dropmenuobj.offsetHeight-tiparrow.offsetHeight-ieshadowwidth+arrowheadheight-7 : parseInt(dropmenuobj.style.top)-arrowheadheight-6
		pleft=(edgeoffsetx!=0)? parseInt(dropmenuobj.style.left)+dropmenuobj.offsetWidth-tiparrow.offsetWidth-7: parseInt(dropmenuobj.style.left)-6
	}
	tiparrow.style.top = ptop+"px";
	tiparrow.style.left = pleft+"px";
	tiparrow.style.visibility="visible"
}

function delayhidemenu(){
	delayhide=setTimeout("dropmenuobj.style.visibility='hidden'; dropmenuobj.style.left=0; if (enablearrowhead) tiparrow.style.visibility='hidden'",disappeardelay)
}

function clearhidemenu(){
	if (typeof delayhide!="undefined")
	clearTimeout(delayhide)
}

function reltoelement(linkobj){ //tests if a link has "rel" defined and it's the ID of an element on page
	var relvalue=linkobj.getAttribute("rel")
	return (relvalue!=null && relvalue!="" && document.getElementById(relvalue)!=null && document.getElementById(relvalue).className=="seekxl_bubble")? true : false
}

function initalizetooltip(){
	var all_links=document.getElementsByTagName("a")
	if (enablearrowhead){
		tiparrow=document.createElement("img")
		tiparrow.setAttribute("src", arrowheadimg[0])
		tiparrow.setAttribute("id", "seekxl_arrowhead")
		document.body.appendChild(tiparrow)
	}
	for (var i=0; i<all_links.length; i++){
		if (reltoelement(all_links[i])){ //if link has "rel" defined and it's the ID of an element on page
			all_links[i].onmouseover=function(e){
				var evtobj=window.event? window.event : e
				displayballoontip(this, evtobj)
			}
			all_links[i].onmouseout=delayhidemenu
		}
	}
}

function CreateEl(t,c){
	var x=document.createElement(t);
	x.className=c;
	x.style.display="block";
	return(x);
}

window.onload=function(){enableTooltips();}
