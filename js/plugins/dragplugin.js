var sortable=function(){"use strict";function d(e,t,n){if(void 0===n)return e&&e.h5s&&e.h5s.data&&e.h5s.data[t];e.h5s=e.h5s||{},e.h5s.data=e.h5s.data||{},e.h5s.data[t]=n}function u(e,t){if(!(e instanceof NodeList||e instanceof HTMLCollection||e instanceof Array))throw new Error("You must provide a nodeList/HTMLCollection/Array of elements to be filtered.");return"string"!=typeof t?Array.from(e):Array.from(e).filter(function(e){return 1===e.nodeType&&e.matches(t)})}var p=new Map,t=function(){function e(){this._config=new Map,this._placeholder=void 0,this._data=new Map}return Object.defineProperty(e.prototype,"config",{get:function(){var n={};return this._config.forEach(function(e,t){n[t]=e}),n},set:function(e){if("object"!=typeof e)throw new Error("You must provide a valid configuration object to the config setter.");var t=Object.assign({},e);this._config=new Map(Object.entries(t))},enumerable:!0,configurable:!0}),e.prototype.setConfig=function(e,t){if(!this._config.has(e))throw new Error("Trying to set invalid configuration item: "+e);this._config.set(e,t)},e.prototype.getConfig=function(e){if(!this._config.has(e))throw new Error("Invalid configuration item requested: "+e);return this._config.get(e)},Object.defineProperty(e.prototype,"placeholder",{get:function(){return this._placeholder},set:function(e){if(!(e instanceof HTMLElement)&&null!==e)throw new Error("A placeholder must be an html element or null.");this._placeholder=e},enumerable:!0,configurable:!0}),e.prototype.setData=function(e,t){if("string"!=typeof e)throw new Error("The key must be a string.");this._data.set(e,t)},e.prototype.getData=function(e){if("string"!=typeof e)throw new Error("The key must be a string.");return this._data.get(e)},e.prototype.deleteData=function(e){if("string"!=typeof e)throw new Error("The key must be a string.");return this._data.delete(e)},e}();function m(e){if(!(e instanceof HTMLElement))throw new Error("Please provide a sortable to the store function.");return p.has(e)||p.set(e,new t),p.get(e)}function h(e,t,n){if(e instanceof Array)for(var r=0;r<e.length;++r)h(e[r],t,n);else e.addEventListener(t,n),m(e).setData("event"+t,n)}function l(e,t){if(e instanceof Array)for(var n=0;n<e.length;++n)l(e[n],t);else e.removeEventListener(t,m(e).getData("event"+t)),m(e).deleteData("event"+t)}function g(e,t,n){if(e instanceof Array)for(var r=0;r<e.length;++r)g(e[r],t,n);else e.setAttribute(t,n)}function s(e,t){if(e instanceof Array)for(var n=0;n<e.length;++n)s(e[n],t);else e.removeAttribute(t)}function v(e){if(!e.parentElement||0===e.getClientRects().length)throw new Error("target element must be part of the dom");var t=e.getClientRects()[0];return{left:t.left+window.pageXOffset,right:t.right+window.pageXOffset,top:t.top+window.pageYOffset,bottom:t.bottom+window.pageYOffset}}function y(e,t){if(!(e instanceof HTMLElement&&(t instanceof NodeList||t instanceof HTMLCollection||t instanceof Array)))throw new Error("You must provide an element and a list of elements.");return Array.from(t).indexOf(e)}function E(e){if(!(e instanceof HTMLElement))throw new Error("Element is not a node element.");return null!==e.parentNode}var n=function(e,t,n){if(!(e instanceof HTMLElement&&e.parentElement instanceof HTMLElement))throw new Error("target and element must be a node");e.parentElement.insertBefore(t,"before"===n?e:e.nextElementSibling)},w=function(e,t){return n(e,t,"before")},b=function(e,t){return n(e,t,"after")};function T(e){if(!(e instanceof HTMLElement))throw new Error("You must provide a valid dom element");var n=window.getComputedStyle(e);return["height","padding-top","padding-bottom"].map(function(e){var t=parseInt(n.getPropertyValue(e),10);return isNaN(t)?0:t}).reduce(function(e,t){return e+t})}function c(e,t){if(!(e instanceof Array))throw new Error("You must provide a Array of HTMLElements to be filtered.");return"string"!=typeof t?e:e.filter(function(e){return e.querySelector(t)instanceof HTMLElement||e.shadowRoot&&e.shadowRoot.querySelector(t)instanceof HTMLElement}).map(function(e){return e.querySelector(t)||e.shadowRoot&&e.shadowRoot.querySelector(t)})}function L(e){return e.composedPath&&e.composedPath()[0]||e.target}var C=function(e,t,n){return{element:e,posX:n.pageX-t.left,posY:n.pageY-t.top}};function M(e,t){if(!0===e.isSortable){var n=m(e).getConfig("acceptFrom");if(null!==n&&!1!==n&&"string"!=typeof n)throw new Error('HTML5Sortable: Wrong argument, "acceptFrom" must be "null", "false", or a valid selector string.');if(null!==n)return!1!==n&&0<n.split(",").filter(function(e){return 0<e.length&&t.matches(e)}).length;if(e===t)return!0;if(void 0!==m(e).getConfig("connectWith")&&null!==m(e).getConfig("connectWith"))return m(e).getConfig("connectWith")===m(t).getConfig("connectWith")}return!1}var x,H,A,D,I,S,Y,O,_={items:null,connectWith:null,disableIEFix:null,acceptFrom:null,copy:!1,placeholder:null,placeholderClass:"sortable-placeholder",draggingClass:"sortable-dragging",hoverClass:!1,debounce:0,throttleTime:100,maxItems:0,itemSerializer:void 0,containerSerializer:void 0,customDragImage:null};function P(e,t){if("string"==typeof m(e).getConfig("hoverClass")){var o=m(e).getConfig("hoverClass").split(" ");!0===t?(h(e,"mousemove",function(r,o){var i=this;if(void 0===o&&(o=250),"function"!=typeof r)throw new Error("You must provide a function as the first argument for throttle.");if("number"!=typeof o)throw new Error("You must provide a number as the second argument for throttle.");var a=null;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];var n=Date.now();(null===a||o<=n-a)&&(a=n,r.apply(i,e))}}(function(r){0===r.buttons&&u(e.children,m(e).getConfig("items")).forEach(function(e){var t,n;e!==r.target?(t=e.classList).remove.apply(t,o):(n=e.classList).add.apply(n,o)})},m(e).getConfig("throttleTime"))),h(e,"mouseleave",function(){u(e.children,m(e).getConfig("items")).forEach(function(e){var t;(t=e.classList).remove.apply(t,o)})})):(l(e,"mousemove"),l(e,"mouseleave"))}}var f=function(e){l(e,"dragstart"),l(e,"dragend"),l(e,"dragover"),l(e,"dragenter"),l(e,"drop"),l(e,"mouseenter"),l(e,"mouseleave")},W=function(e,t){var n=e;return!0===m(t).getConfig("copy")&&(g(n=e.cloneNode(!0),"aria-copied","true"),e.parentElement.appendChild(n),n.style.display="none",n.oldDisplay=e.style.display),n};function F(e,t){if(t.composedPath)return t.composedPath().find(function(e){return e.isSortable});for(;!0!==e.isSortable;)e=e.parentElement;return e}function N(e,t){var n=d(e,"opts"),r=u(e.children,n.items).filter(function(e){return e.contains(t)||e.shadowRoot&&e.shadowRoot.contains(t)});return 0<r.length?r[0]:t}var r=function(e){var t,n,r,o=d(e,"opts")||{},i=u(e.children,o.items),a=c(i,o.handle);l(e,"dragover"),l(e,"dragenter"),l(e,"drop"),(n=t=e).h5s&&delete n.h5s.data,s(t,"aria-dropeffect"),l(a,"mousedown"),f(i),s(r=i,"aria-grabbed"),s(r,"aria-copied"),s(r,"draggable"),s(r,"role")},j=function(e){var t=d(e,"opts"),n=u(e.children,t.items),r=c(n,t.handle);(g(e,"aria-dropeffect","move"),d(e,"_disabled","false"),g(r,"draggable","true"),!1===t.disableIEFix)&&("function"==typeof(document||window.document).createElement("span").dragDrop&&h(r,"mousedown",function(){if(-1!==n.indexOf(this))this.dragDrop();else{for(var e=this.parentElement;-1===n.indexOf(e);)e=e.parentElement;e.dragDrop()}}))},q=function(e){var t=d(e,"opts"),n=u(e.children,t.items),r=c(n,t.handle);d(e,"_disabled","false"),f(n),l(r,"mousedown"),l(e,"dragover"),l(e,"dragenter"),l(e,"drop")};function z(e,f){var c=String(f);return f=f||{},"string"==typeof e&&(e=document.querySelectorAll(e)),e instanceof HTMLElement&&(e=[e]),e=Array.prototype.slice.call(e),/serialize/.test(c)?e.map(function(e){var t=d(e,"opts");return function(t,n,e){if(void 0===n&&(n=function(e,t){return e}),void 0===e&&(e=function(e){return e}),!(t instanceof HTMLElement)||1==!t.isSortable)throw new Error("You need to provide a sortableContainer to be serialized.");if("function"!=typeof n||"function"!=typeof e)throw new Error("You need to provide a valid serializer for items and the container.");var r=d(t,"opts").items,o=u(t.children,r),i=o.map(function(e){return{parent:t,node:e,html:e.outerHTML,index:y(e,o)}});return{container:e({node:t,itemCount:i.length}),items:i.map(function(e){return n(e,t)})}}(e,t.itemSerializer,t.containerSerializer)}):(e.forEach(function(s){if(/enable|disable|destroy/.test(c))return z[c](s);["connectWith","disableIEFix"].forEach(function(e){f.hasOwnProperty(e)&&null!==f[e]&&console.warn('HTML5Sortable: You are using the deprecated configuration "'+e+'". This will be removed in an upcoming version, make sure to migrate to the new options when updating.')}),f=Object.assign({},_,m(s).config,f),m(s).config=f,d(s,"opts",f),s.isSortable=!0,q(s);var e,t=u(s.children,f.items);if(null!==f.placeholder&&void 0!==f.placeholder){var n=document.createElement(s.tagName);f.placeholder instanceof HTMLElement?n.appendChild(f.placeholder):n.innerHTML=f.placeholder,e=n.children[0]}m(s).placeholder=function(e,t,n){if(void 0===n&&(n="sortable-placeholder"),!(e instanceof HTMLElement))throw new Error("You must provide a valid element as a sortable.");if(!(t instanceof HTMLElement)&&void 0!==t)throw new Error("You must provide a valid element as a placeholder or set ot to undefined.");return void 0===t&&(["UL","OL"].includes(e.tagName)?t=document.createElement("li"):["TABLE","TBODY"].includes(e.tagName)?(t=document.createElement("tr")).innerHTML='<td colspan="100"></td>':t=document.createElement("div")),"string"==typeof n&&(r=t.classList).add.apply(r,n.split(" ")),t;var r}(s,e,f.placeholderClass),d(s,"items",f.items),f.acceptFrom?d(s,"acceptFrom",f.acceptFrom):f.connectWith&&d(s,"connectWith",f.connectWith),j(s),g(t,"role","option"),g(t,"aria-grabbed","false"),P(s,!0),h(s,"dragstart",function(e){var t=L(e);if(!0!==t.isSortable&&(e.stopImmediatePropagation(),(!f.handle||t.matches(f.handle))&&"false"!==t.getAttribute("draggable"))){var n=F(t,e),r=N(n,t);S=u(n.children,f.items),D=S.indexOf(r),I=y(r,n.children),A=n,function(e,t,n){if(!(e instanceof Event))throw new Error("setDragImage requires a DragEvent as the first argument.");if(!(t instanceof HTMLElement))throw new Error("setDragImage requires the dragged element as the second argument.");if(n||(n=C),e.dataTransfer&&e.dataTransfer.setDragImage){var r=n(t,v(t),e);if(!(r.element instanceof HTMLElement)||"number"!=typeof r.posX||"number"!=typeof r.posY)throw new Error("The customDragImage function you provided must return and object with the properties element[string], posX[integer], posY[integer].");e.dataTransfer.effectAllowed="copyMove",e.dataTransfer.setData("text/plain",L(e).id),e.dataTransfer.setDragImage(r.element,r.posX,r.posY)}}(e,r,f.customDragImage),H=T(r),r.classList.add(f.draggingClass),g(x=W(r,n),"aria-grabbed","true"),n.dispatchEvent(new CustomEvent("sortstart",{detail:{origin:{elementIndex:I,index:D,container:A},item:x,originalTarget:t}}))}}),h(s,"dragenter",function(e){var t=L(e),n=F(t,e);n&&n!==Y&&(O=u(n.children,d(n,"items")).filter(function(e){return e!==m(s).placeholder}),n.dispatchEvent(new CustomEvent("sortenter",{detail:{origin:{elementIndex:I,index:D,container:A},destination:{container:n,itemsBeforeUpdate:O},item:x,originalTarget:t}}))),Y=n}),h(s,"dragend",function(e){if(x){x.classList.remove(f.draggingClass),g(x,"aria-grabbed","false"),"true"===x.getAttribute("aria-copied")&&"true"!==d(x,"dropped")&&x.remove(),x.style.display=x.oldDisplay,delete x.oldDisplay;var t=Array.from(p.values()).map(function(e){return e.placeholder}).filter(function(e){return e instanceof HTMLElement}).filter(E)[0];t&&t.remove(),s.dispatchEvent(new CustomEvent("sortstop",{detail:{origin:{elementIndex:I,index:D,container:A},item:x}})),H=x=Y=null}}),h(s,"drop",function(e){if(M(s,x.parentElement)){e.preventDefault(),e.stopPropagation(),d(x,"dropped","true");var t=Array.from(p.values()).map(function(e){return e.placeholder}).filter(function(e){return e instanceof HTMLElement}).filter(E)[0];b(t,x),t.remove(),s.dispatchEvent(new CustomEvent("sortstop",{detail:{origin:{elementIndex:I,index:D,container:A},item:x}}));var n=m(s).placeholder,r=u(A.children,f.items).filter(function(e){return e!==n}),o=!0===this.isSortable?this:this.parentElement,i=u(o.children,d(o,"items")).filter(function(e){return e!==n}),a=y(x,Array.from(x.parentElement.children).filter(function(e){return e!==n})),l=y(x,i);I===a&&A===o||s.dispatchEvent(new CustomEvent("sortupdate",{detail:{origin:{elementIndex:I,index:D,container:A,itemsBeforeUpdate:S,items:r},destination:{index:l,elementIndex:a,container:o,itemsBeforeUpdate:O,items:i},item:x}}))}});var r,o,i,a=(r=function(t,e,n){if(x)if(f.forcePlaceholderSize&&(m(t).placeholder.style.height=H+"px"),-1<Array.from(t.children).indexOf(e)){var r=T(e),o=y(m(t).placeholder,e.parentElement.children),i=y(e,e.parentElement.children);if(H<r){var a=r-H,l=v(e).top;if(o<i&&n<l)return;if(i<o&&l+r-a<n)return}void 0===x.oldDisplay&&(x.oldDisplay=x.style.display),"none"!==x.style.display&&(x.style.display="none");var s=!1;try{s=v(e).top+e.offsetHeight/2<=n}catch(e){s=o<i}s?b(e,m(t).placeholder):w(e,m(t).placeholder),Array.from(p.values()).filter(function(e){return void 0!==e.placeholder}).forEach(function(e){e.placeholder!==m(t).placeholder&&e.placeholder.remove()})}else{var c=Array.from(p.values()).filter(function(e){return void 0!==e.placeholder}).map(function(e){return e.placeholder});-1!==c.indexOf(e)||t!==e||u(e.children,f.items).length||(c.forEach(function(e){return e.remove()}),e.appendChild(m(t).placeholder))}},void 0===(o=f.debounce)&&(o=0),function(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];clearTimeout(i),i=setTimeout(function(){r.apply(void 0,e)},o)}),l=function(e){var t=e.target,n=!0===t.isSortable?t:F(t,e);if(t=N(n,t),x&&M(n,x.parentElement)&&"true"!==d(n,"_disabled")){var r=d(n,"opts");parseInt(r.maxItems)&&u(n.children,d(n,"items")).length>=parseInt(r.maxItems)&&x.parentElement!==n||(e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect=!0===m(n).getConfig("copy")?"copy":"move",a(n,t,e.pageY))}};h(t.concat(s),"dragover",l),h(t.concat(s),"dragenter",l)}),e)}return z.destroy=function(e){r(e)},z.enable=function(e){j(e)},z.disable=function(e){var t,n,r;n=d(t=e,"opts"),r=c(u(t.children,n.items),n.handle),g(t,"aria-dropeffect","none"),d(t,"_disabled","true"),g(r,"draggable","false"),l(r,"mousedown")},z}();


var fdrag = `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M8.957 11.413a2.459 2.459 0 0 1-2.456-2.456 2.459 2.459 0 0 1 2.456-2.456 2.459 2.459 0 0 1 2.456 2.456 2.459 2.459 0 0 1-2.456 2.456zm0-3.508a1.054 1.054 0 0 0 0 2.105 1.054 1.054 0 0 0 0-2.105zm-4.275 3.784L1.985 8.992l2.697-2.696-.993-.993L0 8.993l3.69 3.689.992-.993zm8 2.607l-.993-.993L8.992 16l-2.591-2.592-.993.993 3.584 3.584 3.69-3.69zm5.303-5.304L14.4 5.408l-.993.993L16 8.992l-2.627 2.627.993.992 3.619-3.619zM12.682 3.69L8.992 0 5.373 3.619l.993.992 2.626-2.626 2.697 2.697.993-.993z" fill="#000" fill-rule="evenodd"/></svg>`;

var dragpluginCSS = `.ph-class{
  border:4px dashed #eee;
  height:30px;
}

.f-drag {
  transition:all ease 0.4s;
  background:#fff;
  font-size:18px;
  top:2px;
  left:2px;
  position:absolute;
  padding:4px 10px 0 10px;
  border:1px solid rgb(9, 214, 187);
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.f-drag:active{
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.f-drag:hover{
  transform: scale(0.9);
  background: rgb(9, 214, 187);
}
.f-drag:hover svg path{
  fill:#fff;
}`

sortable('#l-editor', {
    forcePlaceholderSize: true,
    placeholderClass: 'ph-class',
  });

  let styleForDragPlugin = document.createElement("style");
  styleForDragPlugin.className ="drag-plugin";
  styleForDragPlugin.innerHTML = dragpluginCSS;
  document.head.append(styleForDragPlugin);

  var allE = document.querySelectorAll(".leditor");      
  allE.forEach(e=>{
        let dragIcon = document.createElement("span");
        dragIcon.className = "f-drag";
        dragIcon.setAttribute("contenteditable", "false");
        dragIcon.innerHTML = fdrag;
        e.appendChild(dragIcon);
  })
  
  sortable('#l-editor')[0].addEventListener('sortstop', function(e) {
      allE.forEach(e=>{
        e.setAttribute("contenteditable","false");
      })
  })