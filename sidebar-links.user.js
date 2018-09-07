// ==UserScript==
// @name          Sidebar Links in Header
// @description   Put Question, Tag, User, Badge, Unanswered, Ask links into the header.
// @author        a stone arachnid
// @namespace     https://github.com/a-stone-arachnid/
// @version       1.1
// @include       http*://stackoverflow.com/*
// @include       http*://*stackoverflow.com/*
// @include       http*://*askubuntu.com/*
// @include       http*://*superuser.com/*
// @include       http*://*serverfault.com/*
// @include       http*://*mathoverflow.net/*
// @include       http*://*stackexchange.com/*
// @exclude       http*://chat.*.com/*
// ==/UserScript==

function with_jquery(f) 
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "if (window.jQuery) (" + f.toString() + ")(window.jQuery)" + "\n\n//# sourceURL=" + encodeURI(GM_info.script.namespace.replace(/\/?$/, "/")) + encodeURIComponent(GM_info.script.name); // make this easier to debug
  document.body.appendChild(script);
};
 
with_jquery(function(){
  
  
  // USER CONFIGURABLE ZONE
  
  
  const config={
    activeLinkColor: "#060", // The color of a link when it is activated
    hideHamburgerMenu: false,
    makeHeaderTaller: false
  };
  
  
  // END USER CONFIGURABLE ZONE
  
  
  function synthesize(url,id,text){
    $("#mrsb-head").append($("<a/>").attr({"href":"https://"+window.location.hostname+url,"id":id}).text(text));
  }
  var k=$("<div/>").attr("id","mrsb-head");
 	$(".site-header--container").append(k);
    
  synthesize("/questions",  "mrsb-ques", "Questions");
  synthesize("/tags",       "mrsb-tags", "Tags");
  synthesize("/users",      "mrsb-user", "Users");
  synthesize("/badges",     "mrsb-badg", "Badges");
  synthesize("/unanswered", "mrsb-unan", "Unanswered");
	$("<span/>").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").appendTo("#mrsb-head");
  synthesize("/questions/ask","mrsb-askq", "Ask Question");
    
  if(window.location.pathname.match(/^\/questions/) && !(window.location.pathname.match(/^\/questions\/ask/))){
    $("#mrsb-ques").css("background-color",config.activeLinkColor);
  } else if(window.location.pathname.match(/^\/tags/)){
    $("#mrsb-tags").css("background-color",config.activeLinkColor);
  } else if(window.location.pathname.match(/^\/users/)){
    $("#mrsb-user").css("background-color",config.activeLinkColor);
  } else if(window.location.pathname.match(/^\/badges/)){
    $("#mrsb-badg").css("background-color",config.activeLinkColor);
  } else if(window.location.pathname.match(/^\/unanswered/)){
    $("#mrsb-unan").css("background-color",config.activeLinkColor);
  } else if(window.location.pathname.match(/^\/questions\/ask/)){
    $("#mrsb-askq").css("background-color",config.activeLinkColor);
  }
  let globalStyles=`
#mrsb-head a{
  display:inline-block;
  background:#333;
  color:#e7e7e7;
  font:bold 16px Arial,sans-serif;
  padding:4px 8px;
	margin:0 4px;
}
#mrsb-head a:hover{color:#FFF;background:#444}
`;

  if(config.makeHeaderTaller){
globalStyles += `
.site-header .site-header--container{
  height:120px;
}
`;
  }
  if(config.hideHamburgerMenu){
    $(".left-sidebar-toggle").hide();$(".top-bar .-container").css("max-width","1100px"); 
  }
  $("<style/>").text(globalStyles).appendTo($("head"));
});
