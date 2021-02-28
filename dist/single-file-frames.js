!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="single-filez-load-image",t="single-filez-image-loaded",s=globalThis.browser,o=e=>globalThis.dispatchEvent(e),n=globalThis.CustomEvent,i=globalThis.document,r=globalThis.HTMLDocument,a=globalThis.FileReader,l=globalThis.Blob,d=[];if(i instanceof r&&s&&s.runtime&&s.runtime.getURL){c="single-filez-new-font-face",m=e=>{const t=e.detail;d.find((e=>JSON.stringify(e)==JSON.stringify(t)))||d.push(e.detail)},globalThis.addEventListener(c,m,u);let e=i.createElement("script");e.textContent="("+function(){const e=globalThis.console,t=e=>globalThis.dispatchEvent(e),s=globalThis.CustomEvent,o=e&&e.warn&&((...t)=>e.warn(...t))||(()=>{}),n="single-filez-new-font-face",i={family:"font-family",style:"font-style",weight:"font-weight",stretch:"font-stretch",unicodeRange:"unicode-range",variant:"font-variant",featureSettings:"font-feature-settings"};if(globalThis.FontFace){const e=globalThis.FontFace;let r;globalThis.FontFace=function(){r||(o("SingleFileZ is hooking the FontFace constructor to get font URLs."),r=!0);const d={};d["font-family"]=arguments[0],d.src=arguments[1];const c=arguments[2];if(c&&Object.keys(c).forEach((e=>{i[e]&&(d[i[e]]=c[e])})),d.src instanceof ArrayBuffer){const e=new a;e.readAsDataURL(new l([d.src])),e.addEventListener("load",(()=>{d.src="url("+e.result+")",t(new s(n,{detail:d}))}))}else t(new s(n,{detail:d}));return new e(...arguments)},globalThis.FontFace.toString=function(){return"function FontFace() { [native code] }"}}}.toString()+")()",(i.documentElement||i).appendChild(e),e.remove(),e=i.createElement("script"),e.src=s.runtime.getURL("/dist/web/hooks/hooks-frames-web.js"),e.async=!1,(i.documentElement||i).appendChild(e),e.remove()}var c,m,u;const f=new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)","ig");const g="data-single-filez-removed-content",h="data-single-filez-hidden-content",p="data-single-filez-kept-content",b="data-single-filez-hidden-frame",w="data-single-filez-preserved-space-element",E="data-single-filez-shadow-root-element",y="data-single-filez-image",T="data-single-filez-poster",A="data-single-filez-canvas",I="data-single-filez-import",v="data-single-filez-input-value",S="data-single-filez-lazy-loaded-src",R="data-single-filez-stylesheet",C="data-single-filez-disabled-noscript",F="data-single-filez-async-script",z="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",M=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD"],N=/^'(.*?)'$/,k=/^"(.*?)"$/,q={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},L="single-file-ui-element";function x(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],shadowRoots:[],imports:[],markedElements:[]},i){return Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let r,a,l;if((o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=e.getComputedStyle(s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(a=(i||s.closest("html > head"))&&M.includes(s.tagName)||s.closest("details"),a||(r=i||function(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),i=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==i)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}(s,l),r&&(s.setAttribute(h,""),n.markedElements.push(s)))),!r)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(w,""),n.markedElements.push(s))}o.removeUnusedFonts&&(P(l,o,n.usedFonts),P(e.getComputedStyle(s,":first-letter"),o,n.usedFonts),P(e.getComputedStyle(s,":before"),o,n.usedFonts),P(e.getComputedStyle(s,":after"),o,n.usedFonts))}!function(e,t,s,o,n,i,r){if("CANVAS"==s.tagName)try{const t=function(e,t,s){let o=t.naturalWidth,n=t.naturalHeight;if(!o&&!n){let i,r,a,l,d,c,m,u,f=!1;if("content-box"==(s=s||e.getComputedStyle(t)).getPropertyValue("box-sizing")){const e=t.style.getPropertyValue("box-sizing"),s=t.style.getPropertyPriority("box-sizing"),o=t.clientWidth;t.style.setProperty("box-sizing","border-box","important"),f=t.clientWidth!=o,e?t.style.setProperty("box-sizing",e,s):t.style.removeProperty("box-sizing")}i=U("padding-left",s),r=U("padding-right",s),a=U("padding-top",s),l=U("padding-bottom",s),f?(d=U("border-left-width",s),c=U("border-right-width",s),m=U("border-top-width",s),u=U("border-bottom-width",s)):d=c=m=u=0,o=Math.max(0,t.clientWidth-i-r-d-c),n=Math.max(0,t.clientHeight-a-l-m-u)}return{pxWidth:o,pxHeight:n}}(e,s,r);n.canvases.push({dataURI:s.toDataURL("image/png",""),width:t.width,height:t.height}),s.setAttribute(A,n.canvases.length-1),n.markedElements.push(s)}catch(e){}if("IMG"==s.tagName){const e={currentSrc:i?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":o.loadDeferredImages&&s.getAttribute(S)||s.currentSrc};n.images.push(e),s.setAttribute(y,n.images.length-1),n.markedElements.push(s),s.removeAttribute(S)}if("VIDEO"==s.tagName&&!s.poster){const e=t.createElement("canvas"),o=e.getContext("2d");e.width=s.clientWidth,e.height=s.clientHeight;try{o.drawImage(s,0,0,e.width,e.height),n.posters.push(e.toDataURL("image/png","")),s.setAttribute(T,n.posters.length-1),n.markedElements.push(s)}catch(e){}}"IFRAME"==s.tagName&&i&&o.removeHiddenElements&&(s.setAttribute(b,""),n.markedElements.push(s));"LINK"==s.tagName&&s.import&&s.import.documentElement&&(n.imports.push({content:B(s.import)}),s.setAttribute(I,n.imports.length-1),n.markedElements.push(s));"INPUT"==s.tagName&&("password"!=s.type&&(s.setAttribute(v,s.value),n.markedElements.push(s)),"radio"!=s.type&&"checkbox"!=s.type||(s.setAttribute(v,s.checked),n.markedElements.push(s)));"TEXTAREA"==s.tagName&&(s.setAttribute(v,s.value),n.markedElements.push(s));"SELECT"==s.tagName&&s.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(v,""),n.markedElements.push(e))}));"SCRIPT"==s.tagName&&(s.async&&""!=s.getAttribute("async")&&"async"!=s.getAttribute("async")&&(s.setAttribute(F,""),n.markedElements.push(s)),s.textContent=s.textContent.replace(/<\/script>/gi,"<\\/script>"))}(e,t,s,o,n,r,l);const d=!(s instanceof e.SVGElement)&&D(s);if(d&&!s.classList.contains(L)){const i={};s.setAttribute(E,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(i),x(e,t,d,o,n,r),i.content=d.innerHTML,i.delegatesFocus=d.delegatesFocus,i.mode=d.mode,d.adoptedStyleSheets&&d.adoptedStyleSheets.length&&(i.adoptedStyleSheets=Array.from(d.adoptedStyleSheets).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))))}x(e,t,s,o,n,r),!o.autoSaveExternalSave&&o.removeHiddenElements&&i&&(a||""==s.getAttribute(p)?s.parentElement&&(s.parentElement.setAttribute(p,""),n.markedElements.push(s.parentElement)):r&&(s.setAttribute(g,""),n.markedElements.push(s)))})),n}function P(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=_(n),!t.loadedFonts||t.loadedFonts.find((e=>_(e.family)==n&&e.style==o))){const t=(i=e.getPropertyValue("font-weight"),q[i.toLowerCase().trim()]||i),r=e.getPropertyValue("font-variant")||"normal",a=[n,t,o,r];s.set(JSON.stringify(a),[n,t,o,r])}var i}))}}function D(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function _(e=""){return function(e){e=e.match(N)?e.replace(N,"$1"):e.replace(k,"$1");return e.trim()}((t=e.trim(),t.replace(f,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function O(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const i=n.sheet;n.remove(),i&&i.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(R,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function U(e,t){if(t.getPropertyValue(e).endsWith("px"))return parseFloat(t.getPropertyValue(e))}function B(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML}const V=S,H=L,W="attributes",j=globalThis.browser,J=globalThis.document,K=globalThis.MutationObserver,G=(e,t,s)=>globalThis.addEventListener(e,t,s),Y=(e,t,s)=>globalThis.removeEventListener(e,t,s),Z=new Map;async function $(s){if(J.documentElement){Z.clear();const i=Math.max(J.documentElement.scrollHeight-1.5*J.documentElement.clientHeight,0),r=Math.max(J.documentElement.scrollWidth-1.5*J.documentElement.clientWidth,0);if(globalThis.scrollY<=i&&globalThis.scrollX<=r)return function(s){return new Promise((async i=>{let r;const a=new Set,l=new K((async e=>{if((e=e.filter((e=>e.type==W))).length){e.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(V,e.target.src),e.target.addEventListener("load",d)),"src"==e.attributeName||"srcset"==e.attributeName||"SOURCE"==e.target.tagName)return!e.target.classList||!e.target.classList.contains(H)})).length&&(r=!0,await Q(l,s,u),a.size||await X(l,s,u))}}));function d(e){const t=e.target;t.removeAttribute(V),t.removeEventListener("load",d)}async function c(e){r=!0,await Q(l,s,u),await X(l,s,u),e.detail&&a.add(e.detail)}async function m(e){await Q(l,s,u),await X(l,s,u),a.delete(e.detail),a.size||await X(l,s,u)}function u(s){l.disconnect(),Y(e,c),Y(t,m),i(s)}await te("idleTimeout",(()=>{r||(se("loadTimeout"),se("maxTimeout"),ee(l,s,u))}),2*s.loadDeferredImagesMaxIdleTime),await Q(l,s,u),l.observe(J,{subtree:!0,childList:!0,attributes:!0}),G(e,c),G(t,m),function(e){e.loadDeferredImagesBlockCookies&&o(new n("single-filez-block-cookies-start")),e.loadDeferredImagesBlockStorage&&o(new n("single-filez-block-storage-start")),e.loadDeferredImagesKeepZoomLevel?o(new n("single-filez-load-deferred-images-keep-zoom-level-start")):o(new n("single-filez-load-deferred-images-start"))}(s)}))}(s)}}async function X(e,t,s){await te("loadTimeout",(()=>ee(e,t,s)),t.loadDeferredImagesMaxIdleTime)}async function Q(e,t,s){await te("maxTimeout",(async()=>{await se("loadTimeout"),await ee(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime)}async function ee(e,t,s){await se("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&o(new n("single-filez-block-cookies-end")),e.loadDeferredImagesBlockStorage&&o(new n("single-filez-block-storage-end")),e.loadDeferredImagesKeepZoomLevel?o(new n("single-filez-load-deferred-images-keep-zoom-level-end")):o(new n("single-filez-load-deferred-images-end"))}(t),await te("endTimeout",(async()=>{await se("maxTimeout"),s()}),t.loadDeferredImagesMaxIdleTime/2),e.disconnect()}async function te(e,t,s){if(j&&j.runtime&&j.runtime.sendMessage){if(!Z.get(e)||!Z.get(e).pending){const o={callback:t,pending:!0};Z.set(e,o),await j.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s}),o.pending=!1}}else{const o=Z.get(e);o&&globalThis.clearTimeout(o),Z.set(e,t),globalThis.setTimeout(t,s)}}async function se(e){if(j&&j.runtime&&j.runtime.sendMessage)await j.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e});else{const t=Z.get(e);Z.delete(e),t&&globalThis.clearTimeout(t)}}j&&j.runtime&&j.runtime.onMessage&&j.runtime.onMessage.addListener&&j.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=Z.get(e.type);t&&(Z.delete(e.type),t.callback())}}));const oe={ON_BEFORE_CAPTURE_EVENT_NAME:"single-filez-on-before-capture",ON_AFTER_CAPTURE_EVENT_NAME:"single-filez-on-after-capture",WIN_ID_ATTRIBUTE_NAME:"data-single-filez-win-id",preProcessDoc:function(e,t,s){let o;return e.querySelectorAll("noscript:not([data-single-filez-disabled-noscript])").forEach((e=>{e.setAttribute(C,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(z).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+z+", html > body > "+z);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))})),o=t&&e.documentElement?x(t,e,e.documentElement,s):{canvases:[],images:[],posters:[],usedFonts:[],shadowRoots:[],imports:[],markedElements:[]},{canvases:o.canvases,fonts:d,stylesheets:O(e),images:o.images,posters:o.posters,usedFonts:Array.from(o.usedFonts.values()),shadowRoots:o.shadowRoots,imports:o.imports,referrer:e.referrer,markedElements:o.markedElements}},serialize:B,postProcessDoc:function(e,t){if(e.querySelectorAll("[data-single-filez-disabled-noscript]").forEach((t=>{t.textContent=t.getAttribute(C),t.removeAttribute(C),e.body.firstChild?e.body.insertBefore(t,e.body.firstChild):e.body.appendChild(t)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[g,b,h,w,y,T,A,v,E,I,R,F];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(g),e.removeAttribute(h),e.removeAttribute(p),e.removeAttribute(b),e.removeAttribute(w),e.removeAttribute(y),e.removeAttribute(T),e.removeAttribute(A),e.removeAttribute(v),e.removeAttribute(E),e.removeAttribute(I),e.removeAttribute(R),e.removeAttribute(F)}))},getShadowRoot:D},ne="__sfz_frameTree__::",ie='iframe, frame, object[type="text/html"][data]',re="singlefile.frameTree.initRequest",ae="singlefile.frameTree.ackInitRequest",le="singlefile.frameTree.cleanupRequest",de="singlefile.frameTree.initResponse",ce=".",me=globalThis.window==globalThis.top,ue=globalThis.browser,fe=globalThis.top,ge=globalThis.MessageChannel,he=globalThis.document,pe=new Map;let be;function we(e){e.frames.forEach((t=>ye("responseTimeouts",e.sessionId,t.windowId)));const t=pe.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.url=e.url,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.imports=e.imports,s.processed=e.processed)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(ce).length-e.windowId.split(ce).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function Ee(e,t,s,o){const n=Re(e);!function(e,t,s,o,n){const i=[];let r;pe.get(n)?r=pe.get(n).requestTimeouts:(r={},pe.set(n,{requestTimeouts:r}));t.forEach(((e,t)=>{const s=o+ce+t;e.setAttribute(oe.WIN_ID_ATTRIBUTE_NAME,s),i.push({windowId:s})})),Ie({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const i=o+ce+t;try{ve(e.contentWindow,{method:re,windowId:i,sessionId:n,options:s})}catch(e){}r[i]=globalThis.setTimeout((()=>Ie({frames:[{windowId:i,processed:!0}],sessionId:n})),750)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const i=[];t.forEach(((e,t)=>{const r=o+ce+t;let a;try{a=e.contentDocument}catch(e){}if(a)try{const t=e.contentWindow;t.stop(),ye("requestTimeouts",n,r),Ee(a,s,r,n),i.push(Se(a,t,r,s))}catch(e){i.push({windowId:r,processed:!0})}})),Ie({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function ye(e,t,s){const o=pe.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function Te(e,t){const s=pe.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>Ie({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function Ae(e,t,s){e.forEach(((e,o)=>{const n=t+ce+o;e.removeAttribute(oe.WIN_ID_ATTRIBUTE_NAME);try{ve(e.contentWindow,{method:le,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+ce+o;let i;try{i=e.contentDocument}catch(e){}if(i)try{Ae(Re(i),n,s)}catch(e){}}))}function Ie(e){e.method=de;try{fe.singlefile.processors.frameTree.initResponse(e)}catch(t){ve(fe,e,!0)}}function ve(e,t,s){if(e==fe&&ue&&ue.runtime&&ue.runtime.sendMessage)ue.runtime.sendMessage(t);else if(s){const s=new ge;e.postMessage(ne+JSON.stringify({method:t.method,sessionId:t.sessionId}),"*",[s.port2]),s.port1.postMessage(t)}else e.postMessage(ne+JSON.stringify(t),"*")}function Se(e,t,s,o){const n=oe.preProcessDoc(e,t,o),i=oe.serialize(e);oe.postProcessDoc(e,n.markedElements);return{windowId:s,content:i,baseURI:e.baseURI.split("#")[0],url:e.location.href,title:e.title,canvases:n.canvases,fonts:n.fonts,stylesheets:n.stylesheets,images:n.images,posters:n.posters,usedFonts:n.usedFonts,shadowRoots:n.shadowRoots,imports:n.imports,processed:!0}}function Re(e){let t=Array.from(e.querySelectorAll(ie));return e.querySelectorAll("*").forEach((e=>{const s=oe.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(ie)))})),t}me&&(be="0",ue&&ue.runtime&&ue.runtime.onMessage&&ue.runtime.onMessage.addListener&&ue.runtime.onMessage.addListener((e=>e.method==de?(we(e),Promise.resolve({})):e.method==ae?(ye("requestTimeouts",e.sessionId,e.windowId),Te(e.sessionId,e.windowId),Promise.resolve({})):void 0))),((e,t,s)=>{globalThis.addEventListener(e,t,s)})("message",(async e=>{if("string"==typeof e.data&&e.data.startsWith(ne)){e.preventDefault(),e.stopPropagation();const t=JSON.parse(e.data.substring(ne.length));if(t.method==re)e.source&&ve(e.source,{method:ae,windowId:t.windowId,sessionId:t.sessionId}),me||(globalThis.stop(),t.options.loadDeferredImages&&$(t.options),await async function(e){const t=e.sessionId,s=globalThis._singleFileZ_waitForUserScript;me||(be=globalThis.frameId=e.windowId);Ee(he,e.options,be,t),me||(e.options.userScriptEnabled&&s&&await s(oe.ON_BEFORE_CAPTURE_EVENT_NAME),Ie({frames:[Se(he,globalThis,be,e.options)],sessionId:t,requestedFrameId:he.documentElement.dataset.requestedFrameId&&be}),e.options.userScriptEnabled&&s&&await s(oe.ON_AFTER_CAPTURE_EVENT_NAME),delete he.documentElement.dataset.requestedFrameId)}(t));else if(t.method==ae)ye("requestTimeouts",t.sessionId,t.windowId),Te(t.sessionId,t.windowId);else if(t.method==le)!function(e){const t=e.sessionId;Ae(Re(he),e.windowId,t)}(t);else if(t.method==de&&pe.get(t.sessionId)){e.ports[0].onmessage=e=>we(e.data)}}}),!0)}));
