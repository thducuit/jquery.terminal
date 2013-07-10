/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.6.5
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Wed, 10 Jul 2013 18:58:48 +0000
*/
(function(g,L){function ha(d,i){var h;if(typeof d==="string"&&typeof i==="string"){localStorage[d]=i;return true}else if(typeof d==="object"&&typeof i==="undefined"){for(h in d)if(d.hasOwnProperty(h))localStorage[h]=d[h];return true}return false}function ea(d,i){var h,f;h=new Date;h.setTime(h.getTime()+31536E6);h="; expires="+h.toGMTString();if(typeof d==="string"&&typeof i==="string"){document.cookie=d+"="+i+h+"; path=/";return true}else if(typeof d==="object"&&typeof i==="undefined"){for(f in d)if(d.hasOwnProperty(f))document.cookie=
f+"="+d[f]+h+"; path=/";return true}return false}function ia(d){return localStorage[d]}function ja(d){var i,h,f;d+="=";i=document.cookie.split(";");for(h=0;h<i.length;h++){for(f=i[h];f.charAt(0)===" ";)f=f.substring(1,f.length);if(f.indexOf(d)===0)return f.substring(d.length,f.length)}return null}function ka(d){return delete localStorage[d]}function la(d){return ea(d,"",-1)}function ba(d,i){var h=[],f=d.length;if(f<i)return[d];for(var j=0;j<f;j+=i)h.push(d.substring(j,j+i));return h}function ma(d){var i=
d?[d]:[];g.extend(this,{size:function(){return i.length},pop:function(){if(i.length===0)return null;else{var h=i[i.length-1];i=i.slice(0,i.length-1);return h}},push:function(h){i=i.concat([h]);return h},top:function(){return i.length>0?i[i.length-1]:null}})}function na(d,i){var h=true;if(typeof d==="string"&&d!=="")d+="_";var f=g.Storage.get(d+"commands");f=f?(new Function("return "+f+";"))():[];var j=f.length-1;g.extend(this,{append:function(m){if(h)if(f[f.length-1]!==m){f.push(m);j=f.length-1;if(i&&
f.length>i)f=f.slice(-i);g.Storage.set(d+"commands",g.json_stringify(f))}},data:function(){return f},next:function(){j<f.length-1&&++j;if(j!==-1)return f[j]},reset:function(){j=f.length-1},last:function(){return f[length-1]},end:function(){return j===f.length-1},position:function(){return j},previous:function(){var m=j;j>0&&--j;if(m!==-1)return f[m]},clear:function(){f=[];g.Storage.remove(d+"commands")},enable:function(){h=true},disable:function(){h=false}})}function fa(d){return g("<div>"+g.terminal.strip(d)+
"</div>").text().length}g.omap=function(d,i){var h={};g.each(d,function(f,j){h[f]=i.call(d,f,j)});return h};var aa=typeof window.localStorage!=="undefined";g.extend({Storage:{set:aa?ha:ea,get:aa?ia:ja,remove:aa?ka:la}});jQuery.fn.extend({everyTime:function(d,i,h,f,j){return this.each(function(){jQuery.timer.add(this,d,i,h,f,j)})},oneTime:function(d,i,h){return this.each(function(){jQuery.timer.add(this,d,i,h,1)})},stopTime:function(d,i){return this.each(function(){jQuery.timer.remove(this,d,i)})}});
jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(d){if(d===L||d===null)return null;var i=this.regex.exec(jQuery.trim(d.toString()));return i[2]?parseInt(i[1],10)*(this.powers[i[2]]||1):d},add:function(d,i,h,f,j,m){var u=0;if(jQuery.isFunction(h)){j||(j=f);f=h;h=i}i=jQuery.timer.timeParse(i);if(!(typeof i!=="number"||isNaN(i)||i<=0)){if(j&&j.constructor!==Number){m=!!j;j=0}j=j||0;m=m||false;if(!d.$timers)d.$timers=
{};d.$timers[h]||(d.$timers[h]={});f.$timerID=f.$timerID||this.guid++;var n=function(){if(!(m&&n.inProgress)){n.inProgress=true;if(++u>j&&j!==0||f.call(d,u)===false)jQuery.timer.remove(d,h,f);n.inProgress=false}};n.$timerID=f.$timerID;d.$timers[h][f.$timerID]||(d.$timers[h][f.$timerID]=window.setInterval(n,i));this.global[h]||(this.global[h]=[]);this.global[h].push(d)}},remove:function(d,i,h){var f=d.$timers,j;if(f){if(i){if(f[i]){if(h){if(h.$timerID){window.clearInterval(f[i][h.$timerID]);delete f[i][h.$timerID]}}else for(var m in f[i])if(f[i].hasOwnProperty(m)){window.clearInterval(f[i][m]);
delete f[i][m]}for(j in f[i])if(f[i].hasOwnProperty(j))break;if(!j){j=null;delete f[i]}}}else for(var u in f)f.hasOwnProperty(u)&&this.remove(d,u,h);for(j in f)if(f.hasOwnProperty(j))break;if(!j)d.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",function(){var d=jQuery.timer.global,i;for(i in d)if(d.hasOwnProperty(i))for(var h=d[i],f=h.length;--f;)jQuery.timer.remove(h[f],i)});(function(d){if(String.prototype.split.toString().match(/\[native/)){var i=
String.prototype.split,h=/()??/.exec("")[1]===d,f;f=function(j,m,u){if(Object.prototype.toString.call(m)!=="[object RegExp]")return i.call(j,m,u);var n=[],I=(m.ignoreCase?"i":"")+(m.multiline?"m":"")+(m.extended?"x":"")+(m.sticky?"y":""),x=0,E,v,F;m=RegExp(m.source,I+"g");j+="";h||(E=RegExp("^"+m.source+"$(?!\\s)",I));for(u=u===d?4294967295:u>>>0;v=m.exec(j);){I=v.index+v[0].length;if(I>x){n.push(j.slice(x,v.index));!h&&v.length>1&&v[0].replace(E,function(){for(var P=1;P<arguments.length-2;P++)if(arguments[P]===
d)v[P]=d});v.length>1&&v.index<j.length&&Array.prototype.push.apply(n,v.slice(1));F=v[0].length;x=I;if(n.length>=u)break}m.lastIndex===v.index&&m.lastIndex++}if(x===j.length){if(F||!m.test(""))n.push("")}else n.push(j.slice(x));return n.length>u?n.slice(0,u):n};String.prototype.split=function(j,m){return f(this,j,m)};return f}})();g.json_stringify=function(d,i){var h="",f;i=i===L?1:i;switch(typeof d){case "function":h+=d;break;case "boolean":h+=d?"true":"false";break;case "object":if(d===null)h+=
"null";else if(d instanceof Array){h+="[";var j=d.length;for(f=0;f<j-1;++f)h+=g.json_stringify(d[f],i+1);h+=g.json_stringify(d[j-1],i+1)+"]"}else{h+="{";for(j in d)if(d.hasOwnProperty(j))h+='"'+j+'":'+g.json_stringify(d[j],i+1);h+="}"}break;case "string":j=d;var m={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(f in m)if(m.hasOwnProperty(f))j=j.replace(RegExp(f,"g"),m[f]);h+='"'+j+'"';break;case "number":h+=String(d)}h+=i>1?",":"";if(i===1)h=h.replace(/,([\]}])/g,"$1");
return h.replace(/([\[{]),/g,"$1")};g.fn.cmd=function(d){function i(){b.toggleClass("inverted")}function h(){H="(reverse-i-search)`"+F+"': ";W()}function f(c){var r=N.data(),k=r.length;if(c&&P>0)k-=P;if(F.length>0)for(var K=F.length;K>0;K--){c=RegExp("^"+F.substring(0,K));for(var T=k;T--;)if(c.test(r[T])){P=r.length-T;p=0;n.set(r[T],true);z();if(F.length!==K){F=F.substring(0,K);h()}return}}}function j(c){var r=c.substring(0,x-E);c=c.substring(x-E);return[r].concat(ba(c,x))}function m(){I.focus();
n.oneTime(1,function(){n.insert(I.val());I.blur().val("")})}function u(c){if(typeof d.keydown=="function"){var r=d.keydown(c);if(r!==L)return r}if(Q){if(v&&(c.which===35||c.which===36||c.which===37||c.which===38||c.which===39||c.which===40||c.which===13||c.which===27)){H=U;v=false;P=null;F="";W();if(c.which===27)o="";z();u.call(this,c)}else if(c.altKey){if(c.which===68){n.set(o.slice(0,p)+o.slice(p).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(c.keyCode===13){if(N&&o&&(d.historyFilter&&
d.historyFilter(o)||!d.historyFilter))N.append(o);c=o;N.reset();n.set("");d.commands&&d.commands(c);typeof H==="function"&&W()}else if(c.which===8)if(v){F=F.slice(0,-1);h()}else{if(o!==""&&p>0){o=o.slice(0,p-1)+o.slice(p,o.length);--p;z()}}else if(c.which===9&&!(c.ctrlKey||c.altKey))n.insert("\t");else if(c.which===46){if(o!==""&&p<o.length){o=o.slice(0,p)+o.slice(p+1,o.length);z()}return true}else if(N&&c.which===38||c.which===80&&c.ctrlKey){if(N.end())X=o;n.set(N.previous())}else if(N&&c.which===
40||c.which===78&&c.ctrlKey)n.set(N.end()?X:N.next());else if(c.which===37||c.which===66&&c.ctrlKey)if(c.ctrlKey&&c.which!==66){r=p-1;c=0;for(o[r]===" "&&--r;r>0;--r)if(o[r]===" "&&o[r+1]!==" "){c=r+1;break}else if(o[r]==="\n"&&o[r+1]!=="\n"){c=r;break}n.position(c)}else{if(p>0){--p;z()}}else if(c.which===82&&c.ctrlKey)if(v)f(true);else{U=H;h();X=o;o="";z();v=true}else if(c.which==71&&c.ctrlKey){if(v){H=U;W();o=X;z();v=false}}else if(c.which===39||c.which===70&&c.ctrlKey)if(c.ctrlKey&&c.which!==70){o[p]===
" "&&++p;c=o.slice(p).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!c||c[0].match(/^\s+$/))p=o.length;else if(c[0][0]!==" ")p+=c.index+1;else{p+=c.index+c[0].length-1;c[0][c[0].length-1]!==" "&&--p}z()}else{if(p<o.length){++p;z()}}else if(c.which===123)return true;else if(c.which===36)n.position(0);else if(c.which===35)n.position(o.length);else if(c.shiftKey&&c.which==45){m();return true}else if(c.ctrlKey||c.metaKey){if(c.which===192)return true;if(c.metaKey){if(c.which===82)return true;if(c.which===76)return true}if(c.shiftKey){if(c.which===
84)return true}else if(c.which===87){if(o!==""){c=o.slice(0,p);r=o.slice(p+1);var k=c.match(/([^ ]+ *$)/);p=c.length-k[0].length;o=c.slice(0,p)+r;z()}}else if(c.which===72){if(o!==""&&p>0){o=o.slice(0,--p);if(p<o.length-1)o+=o.slice(p);z()}}else if(c.which===65)n.position(0);else if(c.which===69)n.position(o.length);else if(c.which===88||c.which===67||c.which===84)return true;else if(c.which===86){m();return true}else if(c.which===75)if(p===0)n.set("");else p!==o.length&&n.set(o.slice(0,p));else if(c.which===
85){n.set(o.slice(p,o.length));n.position(0)}}else return true;return false}}var n=this;n.addClass("cmd");n.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var I=g("<textarea/>").addClass("clipboard").appendTo(n);d.width&&n.width(d.width);var x,E,v=false,F="",P=null,U,J=d.mask||false,o="",p=0,H,Q=d.enabled,M=d.historySize||60,Z,N,b=n.find(".cursor"),z=function(c){function r(y,A){if(A===y.length){R.html(g.terminal.encode(y));b.html("&nbsp;");V.html("")}else if(A===
0){R.html("");b.html(g.terminal.encode(y.slice(0,1)));V.html(g.terminal.encode(y.slice(1)))}else{var D=g.terminal.encode(y.slice(0,A));R.html(D);D=y.slice(A,A+1);b.html(D===" "?"&nbsp;":g.terminal.encode(D));A===y.length-1?V.html(""):V.html(g.terminal.encode(y.slice(A+1)))}}function k(y){return"<div>"+g.terminal.encode(y)+"</div>"}function K(y){var A=V;g.each(y,function(D,w){A=g(k(w)).insertAfter(A).addClass("clear")})}function T(y){g.each(y,function(A,D){R.before(k(D))})}var R=b.prev(),V=b.next();
return function(){var y=J?o.replace(/./g,"*"):o,A,D;c.find("div").remove();R.html("");if(y.length>x-E-1||y.match(/\n/)){var w,G=y.match(/\t/g),s=G?G.length*3:0;if(G)y=y.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(y.match(/\n/)){var a=y.split("\n");D=x-E-1;for(A=0;A<a.length-1;++A)a[A]+=" ";if(a[0].length>D){w=[a[0].substring(0,D)];w=w.concat(ba(a[0].substring(D),x))}else w=[a[0]];for(A=1;A<a.length;++A)if(a[A].length>x)w=w.concat(ba(a[A],x));else w.push(a[A])}else w=j(y);if(G)w=g.map(w,function(l){return l.replace(/\x00\x00\x00\x00/g,
"\t")});D=w[0].length;if(!(D===0&&w.length===1))if(p<D){r(w[0],p);K(w.slice(1))}else if(p===D){R.before(k(w[0]));r(w[1],0);K(w.slice(2))}else{A=w.length;if(p<D){r(w[0],p);K(w.slice(1))}else if(p===D){R.before(k(w[0]));r(w[1],0);K(w.slice(2))}else{G=w.slice(-1)[0];a=y.length-p;var e=G.length;y=0;if(a<=e){T(w.slice(0,-1));r(G,(e===a?0:e-a)+s)}else if(A===3){R.before("<div>"+g.terminal.encode(w[0])+"</div>");r(w[1],p-D-1);V.after('<div class="clear">'+g.terminal.encode(w[2])+"</div>")}else{y=p;for(A=
0;A<w.length;++A){D=w[A].length;if(y>D)y-=D;else break}D=w[A];s=A;if(y===D.length){y=0;D=w[++s]}r(D,y);T(w.slice(0,s));K(w.slice(s+1))}}}}else if(y===""){R.html("");b.html("&nbsp;");V.html("")}else r(y,p)}}(n),X,W=function(){var c=n.find(".prompt");return function(){if(typeof H==="string"){E=fa(H);c.html(g.terminal.format(H))}else H(function(r){E=fa(r);c.html(g.terminal.format(r))})}}();g.extend(n,{name:function(c){if(c!==L){Z=c;N=new na(c,M)}else return Z},history:function(){return N},set:function(c,
r){if(c!==L){o=c;if(!r)p=o.length;z();if(typeof d.onCommandChange==="function")d.onCommandChange(o)}},insert:function(c,r){if(p===o.length)o+=c;else o=p===0?c+o:o.slice(0,p)+c+o.slice(p);r||(p+=c.length);z();if(typeof d.onCommandChange==="function")d.onCommandChange(o)},get:function(){return o},commands:function(c){if(c)d.commands=c;else return c},destroy:function(){g(document.documentElement).unbind(".commandline");n.find(".prompt").remove()},prompt:function(c){if(c===L)return H;else{if(typeof c===
"string"||typeof c==="function")H=c;else throw"prompt must be a function or string";W();z()}},position:function(c){if(typeof c==="number"){p=c<0?0:c>o.length?o.length:c;z()}else return p},visible:function(){var c=n.visible;return function(){c.apply(n,[]);z();W()}}(),show:function(){var c=n.show;return function(){c.apply(n,[]);z();W()}}(),resize:function(c){if(c)x=c;else{c=n.width();var r=b.innerWidth();x=Math.floor(c/r)}z()},enable:function(){if(!Q){b.addClass("inverted");n.everyTime(500,"blink",
i);Q=true}},isenabled:function(){return Q},disable:function(){if(Q){n.stopTime("blink",i);b.removeClass("inverted");Q=false}},mask:function(c){if(typeof c==="boolean"){J=c;z()}else return J}});n.name(d.name||"");H=d.prompt||"> ";W();if(d.enabled===L||d.enabled===true)n.enable();g(document.documentElement||window).keypress(function(c){var r;if(c.ctrlKey&&c.which===99)return true;if(!v&&typeof d.keypress==="function")r=d.keypress(c);if(r===L||r){if(Q)if(g.inArray(c.which,[38,13,0,8])>-1&&c.keyCode!==
123&&!(c.which===38&&c.shiftKey))return false;else if(!c.ctrlKey&&!(c.altKey&&c.which===100)||c.altKey){if(v){F+=String.fromCharCode(c.which);f();h()}else n.insert(String.fromCharCode(c.which));return false}}else return r}).keydown(u);return n};var oa=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,ca=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;ca=/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
var ga=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,pa=/https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,qa=/((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;g.terminal={split_equal:function(d,i){for(var h=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,f=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,m=false,u=false,n="",I=[],x=d.replace(h,function(Q,
M,Z){Q=M.match(/;/g).length;return"[["+M+(Q==2?";;":Q==3?";":"")+Z.replace(/\\\]/g,"&#93;").replace(/\n/g,"\\n")+"]"+Z+"]"}).split(/\n/g),E=0,v=x.length;E<v;++E)if(x[E]==="")I.push("");else for(var F=x[E],P=0,U=0,J=0,o=F.length;J<o;++J){if(F[J]==="["&&F[J+1]==="[")m=true;else if(m&&F[J]==="]")if(u)u=m=false;else u=true;else if(m&&u||!m)if(F[J]==="&"){var p=F.substring(J).match(/^(&[^;]+;)/);if(!p)throw"Unclosed html entity at char "+J;J+=p[1].length-2;J===o-1&&I.push(H+p[1]);continue}else if(F[J]===
"]"&&F[J-1]==="\\")--U;else++U;if(U===i||J===o-1){var H=F.substring(P,J+1);if(n){H=n+H;if(H.match("]"))n=""}P=J+1;U=0;if(p=H.match(h)){p=p[p.length-1];if(p[p.length-1]!=="]"){n=p.match(f)[1];H+="]"}else if(H.match(j)){H=H.replace(j,"");n=p.match(f)[1]}}I.push(H)}}return I},encode:function(d){return d.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^=]+=)/,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(d){if(typeof d===
"string"){d=g.terminal.encode(d);var i=d.split(oa);if(i&&i.length>1)d=g.map(i,function(h){return h===""?h:h.substring(0,1)==="["?h.replace(ca,function(f,j,m,u,n,I,x){if(x==="")return"<span>&nbsp;</span>";x=x.replace(/\\]/g,"]");f="";if(j.indexOf("b")!==-1)f+="font-weight:bold;";var E="text-decoration:";if(j.indexOf("u")!==-1)E+="underline ";if(j.indexOf("s")!==-1)E+="line-through";if(j.indexOf("s")!==-1||j.indexOf("u")!==-1)f+=E+";";if(j.indexOf("i")!==-1)f+="font-style:italic;";if(m.match(ga)){f+=
"color:"+m+";";if(j.indexOf("g")!==-1)f+="text-shadow: 0 0 5px "+m+";"}if(u.match(ga))f+="background-color:"+u;return'<span style="'+f+'"'+(n!==""?' class="'+n+'"':"")+' data-text="'+(I===""?x:I.replace(/&#93;/g,"]")).replace('"',"&quote;")+'">'+x+"</span>"}):"<span>"+h+"</span>"}).join("");return g.map(d.split(/(<\/?span[^>]*>)/g),function(h){return h.match(/span/)?h:h.replace(pa,function(f){var j=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+f+'">'+f+"</a>"+(j?".":"")}).replace(qa,
'<a href="mailto:$1">$1</a>')}).join("").replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(d){return d.replace(ca,"$6")},active:function(){return Y.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#AAA"},faited:{black:"#000",red:"#640000",green:"#006100",yellow:"#737300",blue:"#000087",magenta:"#650065",cyan:"#008787",white:"#818181"},bold:{black:"#000",red:"#FF5555",green:"#44D544",
yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",white:"#fff"}},from_ansi:function(){function d(f){var j=f.split(";"),m,u=f=false,n=false,I=[],x="",E="",v;for(v in j){m=parseInt(j[v],10);switch(m){case 1:I.push("b");n=true;f=false;break;case 4:I.push("u");break;case 3:I.push("i");break;case 2:f=true;n=false;break;case 7:u=true}if(h[m])E=h[m];if(i[m])x=i[m]}if(u){v=E;E=x;x=v}x||(x=u?"black":"white");E||(E=u?"white":"black");v=u=g.terminal.ansi_colors.normal;if(n)u=v=g.terminal.ansi_colors.bold;
else if(f)u=v=g.terminal.ansi_colors.faited;return"[["+[I.join(""),u[x],v[E]].join(";")+"]"}var i={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},h={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(f){var j=f.split(/(\x1B\[[0-9;]*[A-Za-z])/g);if(j.length==1)return f;f=[];if(j.length>3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var m=false,u=0;u<j.length;++u){var n=j[u].match(/^\x1B\[([0-9;]*)([A-Za-z])$/);
if(n)switch(n[2]){case "m":if(n[1]=="")continue;if(m){f.push("]");if(n[1]=="0")m=false;else f.push(d(n[1]))}else{m=true;f.push(d(n[1]))}}else f.push(j[u])}m&&f.push("]");return f.join("")}}()};g.fn.visible=function(){return this.css("visibility","visible")};g.fn.hidden=function(){return this.css("visibility","hidden")};g.jrpc=function(d,i,h,f,j,m){i=g.json_stringify({jsonrpc:"2.0",method:h,params:f,id:i});return g.ajax({url:d,data:i,success:j,error:m,contentType:"application/json",dataType:"json",
async:true,cache:false,type:"POST"})};aa=/ {13}$/;var ra=[["jQuery Terminal","(c) 2011-2013 jcubic"],["jQuery Terminal Emulator v. 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __","     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /",
"/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(aa,"")+"version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __","     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /",
"/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(aa,"")+"version 0.6.5","Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"]],da=[],Y=new function(d){var i=d?[d]:[],h=0;g.extend(this,{get:function(){return i},rotate:function(){if(i.length===1)return i[0];else{if(h===i.length-1)h=0;else++h;
return i[h]}},length:function(){return i.length},set:function(f){for(var j=i.length;j--;)if(i[j]===f){h=j;return}this.append(f)},front:function(){return i[h]},append:function(f){i.push(f)}})};g.fn.terminal=function(d,i){function h(){return b.get(0).scrollHeight>b.innerHeight()}function f(){var a=b.find(".cursor").width(),e=Math.floor(b.width()/a);if(h()){var l=b.innerWidth()-b.width();e-=Math.ceil((20-l/2)/(a-1))}return e}function j(a){return a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")}function m(a,
e){if(k.displayExceptions){b.error("&#91;"+e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();g.get(a.fileName,function(l){b.resume();var t=a.lineNumber-1;(l=l.split("\n")[t])&&b.error("&#91;"+a.lineNumber+"&#93;: "+l)})}a.stack&&b.error(a.stack)}}function u(){var a=M.prop?M.prop("scrollHeight"):M.attr("scrollHeight");M.scrollTop(a)}function n(a,e){try{if(typeof e==="function")e(function(){});else if(typeof e!==
"string")throw a+" must be string or function";}catch(l){m(l,a.toUpperCase());return false}return true}function I(a,e){var l=g.extend({raw:false,finalize:g.noop},e||{});a=g.type(a)==="function"?a():a;a=g.type(a)==="string"?a:String(a);var t,q,B;if(!l.raw&&(a.length>c||a.match(/\n/))){var C=g.terminal.split_equal(g.terminal.from_ansi(a),c);t=g("<div></div>");q=0;for(B=C.length;q<B;++q)C[q]===""||C[q]==="\r"?t.append("<div>&nbsp;</div>"):g("<div/>").html(l.raw?C[q]:g.terminal.format(C[q])).appendTo(t)}else{l.raw||
(a=g.terminal.format(g.terminal.from_ansi(a)));t=g("<div/>").html("<div>"+a+"</div>")}X.append(t);t.width("100%");l.finalize(t);u();return t}function x(){if(k.greetings===L)b.echo(b.signature);else k.greetings&&b.echo(k.greetings)}function E(a,e){var l=1,t=function(q,B){e.pause();g.jrpc(a,l++,q,B,function(C){if(C.error)e.error("&#91;RPC&#93; "+C.error.message);else if(typeof C.result==="string")e.echo(C.result);else if(C.result instanceof Array)e.echo(g.map(C.result,function(O){return g.json_stringify(O)}).join(" "));
else typeof C.result==="object"&&e.echo(g.json_stringify(C.result));e.resume()},function(C,O){O!=="abort"&&e.error("&#91;AJAX&#93; "+O+" - Server reponse is: \n"+C.responseText);e.resume()})};return function(q,B){if(q!==""){var C,O;if(q.match(/^[^ ]+ /)){q=H(q);C=q[0];O=q.slice(1)}else{C=q;O=[]}if(!k.login||C==="help")t(C,O);else{var S=B.token();S?t(C,[S].concat(O)):B.error("&#91;AUTH&#93; Access denied (no token)")}}}}function v(a){a=j(g.terminal.encode(a));var e=s.prompt();if(s.mask())a=a.replace(/./g,
"*");typeof e==="function"?e(function(l){b.echo(l+a)}):b.echo(e+a)}function F(a,e){try{Z=a;var l=G.top();if(a==="exit"&&k.exit)if(G.size()===1)if(k.login)U();else{e||v(a);b.echo("You can't exit from main interpeter")}else b.pop("exit");else{e||v(a);var t=z.length-1;if(a==="clear"&&k.clear)b.clear();else{var q=l.eval(a,b);if(q!==L){if(t===z.length-1){z.pop();q!==false&&b.echo(q)}else z=q===false?z.slice(0,t).concat(z.slice(t+1)):z.slice(0,t).concat([q]).concat(z.slice(t+1));b.resize()}}}}catch(B){m(B,
"USER");b.resume();throw B;}}function P(){var a=null;s.prompt("login: ");k.history&&s.history().disable();s.commands(function(e){try{v(e);if(a){s.mask(false);b.pause();if(typeof k.login!=="function")throw"Value of login property must be a function";k.login(a,e,function(t){if(t){var q=k.name;q=q?"_"+q:"";g.Storage.set("token"+q,t);g.Storage.set("login"+q,a);s.commands(F);o()}else{b.error("Wrong password try again");s.prompt("login: ");a=null}b.resume();k.history&&s.history().enable()},b)}else{a=e;
s.prompt("password: ");s.mask(true)}}catch(l){m(l,"LOGIN",b);throw l;}})}function U(){if(typeof k.onBeforelogout==="function")try{if(k.onBeforelogout(b)==false)return}catch(a){m(a,"onBeforelogout");throw a;}var e=k.name;e=e?"_"+e:"";g.Storage.remove("token"+e,null);g.Storage.remove("login"+e,null);k.history&&s.history().disable();P();if(typeof k.onAfterlogout==="function")try{k.onAfterlogout(b)}catch(l){m(l,"onAfterlogout");throw l;}}function J(){var a=G.top(),e="";if(a.name!==L&&a.name!=="")e+=a.name+
"_";e+=W;s.name(e);typeof a.prompt=="function"?s.prompt(function(l){a.prompt(l,b)}):s.prompt(a.prompt);k.history&&s.history().enable();s.set("");if(typeof a.onStart==="function")a.onStart(b)}function o(){J();x();if(typeof k.onInit==="function")try{k.onInit(b)}catch(a){m(a,"OnInit");throw a;}}function p(a){var e=G.top();if(g.type(e.keydown)==="function"){e=e.keydown(a,b);if(e!==L)return e}var l;b.oneTime(10,function(){y()});if(g.type(k.keydown)==="function"){e=k.keydown(a,b);if(e!==L)return e}if(b.paused()){if(a.which===
68&&a.ctrlKey){for(l=da.length;l--;){a=da[l];if(4!==a.readyState)try{a.abort()}catch(t){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)N=0;if(a.which===68&&a.ctrlKey){if(s.get()==="")if(G.size()>1||k.login!==L)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(k.tabcompletion&&a.which===9){++N;var q=s.get().substring(0,s.position());a=q.split(" ");var B;if(a.length==1)B=a[0];else{B=a[a.length-1];for(l=a.length-1;l>0;l--)if(a[l-1][a[l-
1].length-1]=="\\")B=a[l-1]+" "+B;else break}a=B.replace(/([\^\$\[\]\(\)\+\*\.\|])/g,"\\$1");var C=RegExp("^"+a);G.top().completion(b,B,function(O){if(s.get().substring(0,s.position())===q){var S=[];for(l=O.length;l--;)C.test(O[l])&&S.push(O[l]);if(S.length===1)b.insert(S[0].replace(C,""));else if(S.length>1)if(N>=2){v(q);b.echo(S.join("\t"));N=0}else{O=false;var $=B.length;a:for(;$<S[0].length;++$){for(l=1;l<S.length;++l)if(S[0].charAt($)!==S[l].charAt($))break a;O=true}O&&b.insert(S[0].slice(0,
$).replace(C,""))}}});return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){u()});else if(a.which===9&&a.ctrlKey){if(Y.length()>1){b.focus(false);return false}}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}function H(a){return g.map(a.match(/('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g),function(e){if(e[0]==="'"&&e[e.length-1]==="'")return e.replace(/^'|'$/g,"");else if(e[0]==='"'&&e[e.length-
1]==='"'){e=e.replace(/^"|"$/g,"").replace(/\\([" ])/g,"$1");return k.processArguments?e.replace(/\\\\|\\t|\\n/g,function(l){return l[1]==="t"?"\t":l[1]==="n"?"\n":"\\"}).replace(/\\x([0-9a-f]+)/gi,function(l,t){return String.fromCharCode(parseInt(t,16))}).replace(/\\0([0-7]+)/g,function(l,t){return String.fromCharCode(parseInt(t,8))}):e}else return k.processArguments?e[0]==="/"&&e[e.length-1]=="/"?RegExp(e.replace(/^\/|\/$/g,"")):e.match(/^-?[0-9]+$/)?parseInt(e,10):e.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)?
parseFloat(e):e.replace(/\\ /g," "):e[0]==="/"&&e[e.length-1]=="/"?e:e.replace(/\\ /g," ")})}function Q(a){return function(e){if(e!==""){e=H(e);var l=e[0];e=e.slice(1);var t=a[l],q=g.type(t);if(q==="function")return t.apply(b,e);else if(q==="object"||q==="string"){var B=[];if(q==="object"){for(var C in t)t.hasOwnProperty(C)&&B.push(C);t=Q(t)}b.push(t,{prompt:l+"> ",name:l,completion:q==="object"?function(O,S,$){$(B)}:L})}else b.error("Command '"+l+"' Not Found")}}}var M,Z,N=0,b=this;if(this.length>
1)return this.each(function(){g.fn.terminal.call(g(this),d,g.extend({name:b.selector},i))});else{var z=[],X,W=Y.length(),c,r=[],k=g.extend({name:b.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,processArguments:true,login:null,tabcompletion:null,historyFilter:null,onInit:g.noop,onClear:g.noop,onBlur:g.noop,onFocus:g.noop,onTerminalChange:g.noop,onExit:g.noop,keypress:g.noop,keydown:g.noop},i||{});k.width&&b.width(k.width);
k.height&&b.height(k.height);M=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&b[0].tagName.toLowerCase()=="body"?g("html"):b;var K=!k.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';b.ajaxSend(function(a,e){da.push(e)});if(b.data("terminal"))return b.data("terminal");X=g("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&document instanceof
DocumentTouch){b.click(function(){b.find("textarea").focus()});b.find("textarea").focus()}var T,R,V=[];g.extend(b,g.omap({clear:function(){X.html("");s.set("");z=[];try{k.onClear(b)}catch(a){m(a,"onClear");throw a;}b.attr({scrollTop:0});return b},export_view:function(){return{prompt:b.get_prompt(),command:b.get_command(),position:s.position(),lines:z.slice(0)}},import_view:function(a){b.set_prompt(a.prompt);b.set_command(a.command);s.position(a.position);z=a.lines;b.resize();return b},exec:function(a,
e){K?V.push([a,e]):F(a,e);return b},commands:function(){return G.top().eval},greetings:function(){x();return b},paused:function(){return K},pause:function(){if(s){K=true;b.disable();s.hidden()}return b},resume:function(){if(s){b.enable();var a=V;for(V=[];a.length;){var e=a.shift();b.exec.apply(b,e)}s.visible();u()}return b},cols:function(){return c},rows:function(){return Math.floor(b.height()/b.find(".cursor").height())},history:function(){return s.history()},next:function(){if(Y.length()===1)return b;
else{var a=b.offset().top;b.height();b.scrollTop();var e=b,l=g(window).scrollTop(),t=l+g(window).height(),q=g(e).offset().top;if(q+g(e).height()>=l&&q<=t){Y.front().disable();a=Y.rotate().enable();e=a.offset().top-50;g("html,body").animate({scrollTop:e},500);try{k.onTerminalChange(a)}catch(B){m(B,"onTerminalChange");throw B;}return a}else{b.enable();g("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,e){b.oneTime(1,function(){if(Y.length()===1)if(a===false)try{!e&&k.onBlur(b)!==
false&&b.disable()}catch(l){m(l,"onBlur");throw l;}else try{!e&&k.onFocus(b)!==false&&b.enable()}catch(t){m(t,"onFocus");throw t;}else if(a===false)b.next();else{var q=Y.front();if(q!=b){q.disable();if(!e)try{k.onTerminalChange(b)}catch(B){m(B,"onTerminalChange");throw B;}}Y.set(b);b.enable()}});return b},enable:function(){c===L&&b.resize();if(K)if(s){s.enable();K=false}return b},disable:function(){if(s){K=true;s.disable()}return b},enabled:function(){return K},signature:function(){var a=b.cols();
a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?ra[a].join("\n")+"\n":""},version:function(){return"0.6.5"},get_command:function(){return s.get()},insert:function(a){if(typeof a==="string"){s.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(n("prompt",a)){typeof a=="function"?s.prompt(function(e){a(e,b)}):s.prompt(a);G.top().prompt=a}return b},get_prompt:function(){return G.top().prompt},set_command:function(a){s.set(a);return b},set_mask:function(a){s.mask(a);
return b},get_output:function(a){return a?z:g.map(z,function(e,l){return typeof l=="function"?l():l}).join("\n")},resize:function(a,e){if(a&&e){b.width(a);b.height(e)}a=b.width();e=b.height();c=f();s.resize(c);var l=X.detach();X.html("");g.each(z,function(t,q){I.apply(null,q)});b.prepend(l);u();if(g.type(k.onResize)==="function"&&(R!==e||T!==a))k.onResize(b);if(R!==e||T!==a){R=e;T=a}return b},echo:function(a,e){var l=g.extend({raw:false,finalize:g.noop},e||{});z.push([a,l]);I(a,l);y();return b},error:function(a,
e){return b.echo("[[;#f00;]"+j(a).replace(/\\$/,"&#92;")+"]",e)},scroll:function(a){var e;a=Math.round(a);if(M.prop){a>M.prop("scrollTop")&&a>0&&M.prop("scrollTop",0);e=M.prop("scrollTop")}else{a>M.attr("scrollTop")&&a>0&&M.attr("scrollTop",0);e=M.attr("scrollTop")}M.scrollTop(e+a);return b},logout:k.login?function(){for(;G.size()>1;)G.pop();U();return b}:function(){throw"You don't have login function";},token:k.login?function(){var a=k.name;return g.Storage.get("token"+(a?"_"+a:""))}:g.noop,login_name:k.login?
function(){var a=k.name;return g.Storage.get("login"+(a?"_"+a:""))}:g.noop,name:function(){return G.top().name},push:function(a,e){if(e&&(!e.prompt||n("prompt",e.prompt))||!e){e=e||{};e.name=e.name||Z;G.top().mask=s.mask();if(g.type(a)==="string")a=E(a,b);else if(g.type(a)==="object"){var l=[],t;for(t in a)l.push(t);a=Q(a);e=e||{};e.completion=function(q,B,C){C(l)}}else if(g.type(a)!="function")throw"Invalid value as eval in push command";G.push(g.extend({eval:a},e));J()}return b},pop:function(a){a!==
L&&v(a);if(G.top().name===k.name){if(k.login){U();if(g.type(k.onExit)==="function")try{k.onExit(b)}catch(e){m(e,"onExit");throw e;}}}else{a=G.pop();J();if(g.type(a.onExit)==="function")try{a.onExit(b)}catch(l){m(l,"onExit");throw l;}b.set_mask(G.top().mask)}return b},level:function(){return G.size()},reset:function(){for(b.clear();G.size()>1;)G.pop();o()}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(l){a!=="exec"&&m(l,"TERMINAL");throw l;}}}));
var y=function(){var a=h();return function(){if(a!==h()){b.resize();a=h()}}}(),A;if(k.login&&g.type(k.onBeforeLogin)==="function")try{k.onBeforeLogin(b)}catch(D){m(D,"onBeforeLogin");throw D;}if(g.type(d)==="string"){A=d;d=E(d,b)}else if(g.type(d)==="array")throw"You can't use array as eval";else if(g.type(d)==="object"){for(var w in d)d.hasOwnProperty(w)&&r.push(w);d=Q(d)}else if(g.type(d)!=="function")throw'Unknow object "'+String(d)+'" passed as eval';if(A&&(g.type(k.login)==="string"||k.login))k.login=
function(a){var e=1;return function(l,t,q){b.pause();g.jrpc(A,e++,a,[l,t],function(B){b.resume();!B.error&&B.result?q(B.result):q(null)},function(B,C){b.resume();b.error("&#91;AJAX&#92; Response: "+C+"\n"+B.responseText)})}}(g.type(k.login)==="boolean"?"login":k.login);if(n("prompt",k.prompt)){var G=new ma({name:k.name,eval:d,prompt:k.prompt,completion:k.completion?k.completion:function(a,e,l){l(r)},greetings:k.greetings}),s=b.find(".terminal-output").next().cmd({prompt:k.prompt,history:k.history,
historyFilter:k.historyFilter,historySize:k.historySize,width:"100%",keydown:p,keypress:k.keypress?function(a){return k.keypress(a,b)}:null,onCommandChange:function(a){if(g.type(k.onCommandChange)==="function")try{k.onCommandChange(a,b)}catch(e){m(e,"onCommandChange");throw e;}u()},commands:F});c=f();Y.append(b);k.enabled===true?b.focus(L,true):b.disable();g(document).click(function(a){!g(a.target).parents().hasClass("terminal")&&k.onBlur(b)!==false&&b.disable()});g(window).resize(function(){if(b.is(":visible")){var a=
b.width(),e=b.height();if(R!==e||T!==a)b.resize()}});b.click(function(){b.focus()});k.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?P():o();g.type(g.fn.init.prototype.mousewheel)==="function"&&b.mousewheel(function(a,e){e>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}}})(jQuery);
