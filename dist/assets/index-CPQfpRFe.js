(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function h(e){const t=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&t==="[object Date]"?new e.constructor(+e):typeof e=="number"||t==="[object Number]"||typeof e=="string"||t==="[object String]"?new Date(e):new Date(NaN)}const S=864e5,k=6e4,w=36e5;function y(e){const t=h(e);return t.setHours(0,0,0,0),t}function x(e){const t=h(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function U(e,t){const n=y(e),s=y(t),o=+n-x(n),r=+s-x(s);return Math.round((o-r)/S)}function F(e,t){const n=h(e),s=h(t),o=T(n,s),r=Math.abs(U(n,s));n.setDate(n.getDate()-o*r);const a=+(T(n,s)===-o),i=o*(r-a);return i===0?0:i}function T(e,t){const n=e.getFullYear()-t.getFullYear()||e.getMonth()-t.getMonth()||e.getDate()-t.getDate()||e.getHours()-t.getHours()||e.getMinutes()-t.getMinutes()||e.getSeconds()-t.getSeconds()||e.getMilliseconds()-t.getMilliseconds();return n<0?-1:n>0?1:n}function B(e,t){const s=z(e);let o;if(s.date){const c=H(s.date,2);o=Z(c.restDateString,c.year)}if(!o||isNaN(o.getTime()))return new Date(NaN);const r=o.getTime();let a=0,i;if(s.time&&(a=_(s.time),isNaN(a)))return new Date(NaN);if(s.timezone){if(i=A(s.timezone),isNaN(i))return new Date(NaN)}else{const c=new Date(r+a),d=new Date(0);return d.setFullYear(c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()),d.setHours(c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),c.getUTCMilliseconds()),d}return new Date(r+a+i)}const D={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Y=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,$=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,P=/^([+-])(\d{2})(?::?(\d{2}))?$/;function z(e){const t={},n=e.split(D.dateTimeDelimiter);let s;if(n.length>2)return t;if(/:/.test(n[0])?s=n[0]:(t.date=n[0],s=n[1],D.timeZoneDelimiter.test(t.date)&&(t.date=e.split(D.timeZoneDelimiter)[0],s=e.substr(t.date.length,e.length))),s){const o=D.timezone.exec(s);o?(t.time=s.replace(o[1],""),t.timezone=o[1]):t.time=s}return t}function H(e,t){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),s=e.match(n);if(!s)return{year:NaN,restDateString:""};const o=s[1]?parseInt(s[1]):null,r=s[2]?parseInt(s[2]):null;return{year:r===null?o:r*100,restDateString:e.slice((s[1]||s[2]).length)}}function Z(e,t){if(t===null)return new Date(NaN);const n=e.match(Y);if(!n)return new Date(NaN);const s=!!n[4],o=p(n[1]),r=p(n[2])-1,a=p(n[3]),i=p(n[4]),c=p(n[5])-1;if(s)return K(t,i,c)?W(t,i,c):new Date(NaN);{const d=new Date(0);return!R(t,r,a)||!q(t,o)?new Date(NaN):(d.setUTCFullYear(t,r,Math.max(o,a)),d)}}function p(e){return e?parseInt(e):1}function _(e){const t=e.match($);if(!t)return NaN;const n=N(t[1]),s=N(t[2]),o=N(t[3]);return G(n,s,o)?n*w+s*k+o*1e3:NaN}function N(e){return e&&parseFloat(e.replace(",","."))||0}function A(e){if(e==="Z")return 0;const t=e.match(P);if(!t)return 0;const n=t[1]==="+"?-1:1,s=parseInt(t[2]),o=t[3]&&parseInt(t[3])||0;return Q(s,o)?n*(s*w+o*k):NaN}function W(e,t,n){const s=new Date(0);s.setUTCFullYear(e,0,4);const o=s.getUTCDay()||7,r=(t-1)*7+n+1-o;return s.setUTCDate(s.getUTCDate()+r),s}const J=[31,null,31,30,31,30,31,31,30,31,30,31];function M(e){return e%400===0||e%4===0&&e%100!==0}function R(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(J[t]||(M(e)?29:28))}function q(e,t){return t>=1&&t<=(M(e)?366:365)}function K(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}function G(e,t,n){return e===24?t===0&&n===0:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}function Q(e,t){return t>=0&&t<=59}const V=e=>F(e,y(new Date)),X=e=>{e=e.replace("#","");let t=parseInt(e.substring(0,2),16),n=parseInt(e.substring(2,4),16),s=parseInt(e.substring(4,6),16);return t*.299+n*.587+s*.114>186?"#000000":"#ffffff"},L=document.getElementById("project-container"),ee=document.getElementById("create-project-button"),te=document.getElementById("project-submit"),b=document.getElementById("popup-container"),ne=document.getElementById("cancel"),E=document.getElementById("project-title"),O=document.getElementById("project-due-date"),v=document.getElementById("project-color"),l=[];ee.addEventListener("click",()=>{b.classList.add("popup-open")});ne.addEventListener("click",()=>{b.classList.remove("popup-open"),j()});let j=()=>{E.value="",O.value=""};class se{constructor(t,n,s,o,r){this.id=r,this.title=t,this.dueDate=n,this.color=s,this.tasks=[],this.textColor=o}}te.addEventListener("click",()=>{let e=X(v.value),t=new se(E.value,y(B(O.value)),v.value,e);l.push(t);let n=E.value.split(" ").join("");t.id=l.indexOf(t)+n,j(),b.classList.remove("popup-open"),f()});const f=()=>{L.innerHTML="",l.forEach(e=>{const t=document.createElement("div");t.classList.add("project"),t.id=e.id;const n=document.createElement("h6");n.classList.add("project-title"),n.style.backgroundColor=e.color,n.style.color=e.textColor,n.textContent=e.title;const s=document.createElement("input");s.type="text",s.maxLength=24,s.classList.add("task-input"),s.id=`task-input-${e.id}`;const o=document.createElement("button");o.classList.add("add-button"),o.style.color=e.textColor,o.textContent="+";const r=document.createElement("button");r.classList.add("delete-button"),r.style.color=e.textColor,r.textContent="x",n.appendChild(s),n.appendChild(o),n.appendChild(r);const a=document.createElement("h7");a.classList.add("due-date");let i=V(e.dueDate);!e.dueDate||e.dueDate=="Invalid Date"?a.textContent="":i===0?(a.textContent="Due Today!",a.classList.add("yellow-highlight")):i<0?(a.textContent=`Due ${i*-1} day(s) ago!`,a.classList.add("yellow-highlight")):(a.textContent=`Due in ${i} day(s)`,a.classList.add("due-date-future"));const c=document.createElement("ul");c.classList.add("ul-container"),c.id=`ul-container-${e.id}`,t.appendChild(n),t.appendChild(a),t.appendChild(c),L.appendChild(t),e.tasks.forEach(d=>{const m=document.createElement("li"),g=document.createElement("input");g.type="checkbox",g.classList.add("check-box"),g.id=`${e.id}${d}`;const I=document.createElement("label");I.htmlFor=`${e.id}${d}`,I.textContent=d;const u=document.createElement("input");u.type="button",u.id=d,u.classList.add("task-delete-btn"),u.value="x",m.appendChild(g),m.appendChild(I),m.appendChild(u),c.appendChild(m)})}),C(),console.log(l)},oe=e=>{let t=e.target.parentElement.parentElement.id,n=l.findIndex(o=>o.id===t),s=document.getElementById("task-input-"+t).value;l[n].tasks.push(s),f(),C()};document.addEventListener("click",e=>{e.target.matches(".add-button")&&oe(e)});const re=e=>{let t=l.findIndex(n=>n.id===e.target.parentElement.parentElement.id);l.splice(t,1),f(),C()};document.addEventListener("click",e=>{e.target.matches(".delete-button")&&re(e)});const ae=e=>{let t=l.findIndex(s=>s.id===e.target.parentElement.parentElement.parentElement.id),n=l[t].tasks.findIndex(s=>s===e.target.id);l[t].tasks.splice(n,1),f(),C()};document.addEventListener("click",e=>{e.target.matches(".task-delete-btn")&&ae(e)});const C=()=>{localStorage.setItem("array",JSON.stringify(l))},ce=()=>{let e=localStorage.getItem("array"),t=JSON.parse(e);l.splice(0,l.length,...t)};ce();f();
