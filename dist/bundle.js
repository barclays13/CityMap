!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const n=new class{constructor(t,e){const i=t.split(e).filter(t=>t||0!==t.length).map(t=>t.replace(/"/g,"").split(","));let n=[],s=[];i.map(t=>{n.push(Number(t[2])),s.push(Number(t[3]))}),this.oneCity=i,this.listLatitudes=n,this.listLongitudes=s}findNameCity(t,e,i){const n=this.oneCity.findIndex(i=>Number(i[e])===t),s=this.oneCity[n];console.log(`Крайний город на ${i} :${s[0]},${s[1]}`)}sideOfLight(t){switch(t){case"North":const e=Math.max(...this.listLatitudes);this.findNameCity(e,2,t);break;case"South":const i=Math.min(...this.listLatitudes);this.findNameCity(i,2,t);break;case"East":const n=Math.max(...this.listLongitudes);this.findNameCity(n,3,t);break;case"West":const s=Math.min(...this.listLongitudes);this.findNameCity(s,3,t);break;default:alert("Нет такого значения")}}nearCity(t,e){const i=this.listLatitudes.map(e=>t-e),n=this.listLongitudes.map(t=>e-t);let s=[];for(let t=0;t<i.length;t++){const e=Math.sqrt(i[t]**2+n[t]**2);s.push(e)}const o=Math.min(...s),r=s.findIndex(t=>t===o);console.log(`Ближайший город ${this.oneCity[r][0]}, для ${t} - широты ${e} - долготы`)}stateAbbreviations(){const t=this.oneCity.map(t=>t[1].trim());let e=[];for(let i of t)e.includes(i)||e.push(`${i}`);let i=e.join(" ");console.log(`Уникальные названия штатов: "${i}"`)}}('"Nashville, TN", 36.17, -86.78; "New York, NY", 40.71, -74.00; "Atlanta, GA", 33.75, -84.39; "Denver, CO", 39.74, -104.98; "Seattle, WA", 47.61, -122.33; "Los Angeles, CA", 34.05, -118.24; "Memphis, TN", 35.15, -90.05;',";");n.sideOfLight("West"),n.nearCity(200.23,200.66),n.stateAbbreviations()}]);