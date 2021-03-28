function getCookie( name ) 
 {
   
      var start = document.cookie.indexOf( name + "=" );  
      var len = start + name.length + 1;   
      if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) 
	  {
        return null;
      }
        if ( start == -1 ) return null;
        var end = document.cookie.indexOf( ';', len );
        if ( end == -1 ) end = document.cookie.length;
        return unescape( document.cookie.substring( len, end ) );
 }
 
 function setCookie(name, value, expires) 
 {
   document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
 } 
 
 var exp = new Date();    
 exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 30));    

 function setActivestyleSheet(pTitle) 
 {
  var vLoop, vLink;
  for(vLoop=0; (vLink = document.getElementsByTagName("link")[vLoop]); vLoop++)
  {
   if(vLink.getAttribute("rel").indexOf("style")!= -1 && vLink.getAttribute("title")) 
   {
    vLink.disabled = true;
    if(vLink.getAttribute("title") == pTitle)
    vLink.disabled = false;
   }
  }
 }

 function NoiseStyle(pTitle)
 { 
  setActivestyleSheet(pTitle)
  setCookie("mysheet",pTitle, exp);     
 }

 var pTitle=getCookie("mysheet")
 setActivestyleSheet(pTitle)