(function() {
  document.addEventListener("DOMContentLoaded", function(event) {
    includeCss();
    addPopup();
    processLinks();

    function processLinks(){
      var AnchorTagCollection = document.getElementsByTagName("a");

      for (var i = 0; i < AnchorTagCollection.length; i++) {
        var processor = new LinkProcessor(AnchorTagCollection[i]);

        processor.process();
      }
    }

    function addPopup(){
      var containerDiv = document.createElement('div');
      var popupDiv = document.createElement('div');
      var iframe = document.createElement('iframe');

      containerDiv.setAttribute("id", "gumroad-container");
      popupDiv.setAttribute("id", "popup");
      iframe.setAttribute("id", "gumroad-frame");

      document.body.appendChild(containerDiv);
      containerDiv.appendChild(popupDiv);
      popupDiv.appendChild(iframe);
    }

    function includeCss(){
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');

      link.id   = 'gumroad-css';
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = '../css/gumroad.css';
      link.media = 'all';

      head.appendChild(link);
    }
  });
})();

//Class defined for processing anchor tag item
class LinkProcessor {
  constructor(item) {
    this.item = item;
  }

  process() {
    if(this.hasGumroadHost()){
      // this.modifyGumRoadLink();
      this.addTargetBlank();

      if(this.hasGumRoadButtonClass())
      {
        this.modifyGumRoadLink();
      }

      this.addIframeListener();
    }
  }

  hasGumroadHost() {
    var url = new URL(this.item.href);

    return url.hostname === 'gumroad.com' || url.hostname === 'gum.co';
  }

  modifyGumRoadLink() {
    if(this.item.classList.contains('gumroad-button')) {
      this.styleGumRoadButton();
    }
  }

  addTargetBlank() {
    this.item.setAttribute("target", "_blank");
  }

  styleGumRoadButton() {
    var buttonSpan = document.createElement("span");
    buttonSpan.setAttribute("class", "gumroad-button-logo");

    this.item.prepend(buttonSpan);
  }

  hasGumRoadButtonClass() {
    return this.item.classList.contains('gumroad-button');
  }

  addIframeListener() {
    this.item.onclick = function(e) {
      e.preventDefault();

      var isInit = true;
      var isClosed = false;

      var containerDiv = document.getElementById("gumroad-container");
      var popupDiv = document.getElementById("popup");

      popupDiv.style.display = "block";

      document.getElementById('gumroad-frame').src = this.href;
      popupDiv.className ="full-frame"

      containerDiv.className = "darken";
      document.body.onclick = function() {

        if(isInit){isInit=false;return;}
        if(isClosed){return;}

        popupDiv.style.display = "none";
        containerDiv.className = "";
        popupDiv.className = "";

        isClosed=true;
      }
      return false;
    }
  }
}
