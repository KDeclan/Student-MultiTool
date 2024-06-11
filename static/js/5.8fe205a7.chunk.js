(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{20:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(1),r=(a(5),a(19)),o=a(21),m=a(22);a(20),a(4);const s=e=>{let{handleSettingsClick:t,theme:a,toggleTheme:n}=e;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"settings-top-bar"},l.a.createElement("h2",{id:"settings-head-text"},l.a.createElement(r.d,null)," Settings")),l.a.createElement("div",{id:"color-settings"},l.a.createElement("h2",null,l.a.createElement(o.c,null),"Dark Mode"),l.a.createElement("label",{className:"toggle-switch"},l.a.createElement("input",{type:"checkbox",className:"toggle-switch-checkbox",onChange:n,checked:"dark"===a}),l.a.createElement("span",{className:"toggle-switch-slider"}))),l.a.createElement("div",{className:"hover-effect return-btn-section"},l.a.createElement("button",{className:"btn return-btn",onClick:t},"\u25c4 Return")))},i=e=>{let{quote:t,handleNewQuote:a,handleQuoteDisplay:n,backgroundColor:c}=e;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"quote-display"},l.a.createElement("h2",null,l.a.createElement(r.h,{size:"1.5rem"})," Quote Machine")),l.a.createElement("div",{id:"quote-text"},l.a.createElement("p",{className:"card p-3",style:{color:"black",backgroundColor:c}},t.text),l.a.createElement("p",{style:{alignSelf:"flex-end"}},"- ",t.author||"Unknown")),l.a.createElement("div",{id:"new-quote-btn"},l.a.createElement("button",{className:"btn btn-primary",onClick:a},"New Quote")),l.a.createElement("div",{className:"hover-effect return-btn-section"},l.a.createElement("button",{className:"btn return-btn",onClick:n},"\u25c4 Return")))},u=e=>{let{handleShowTimer:t,studyTime:a,breakTime:c,incrementStudy:m,decrementStudy:s,incrementBreak:i,decrementBreak:u}=e;const[d,E]=Object(n.useState)(!1),[b,h]=Object(n.useState)(60*a),[f,k]=Object(n.useState)(null),[p,g]=Object(n.useState)(!0),[v,S]=Object(n.useState)(!1),y=l.a.useRef(null),[C,N]=Object(n.useState)(.5);Object(n.useEffect)(()=>(y.current=new Audio("/timer-sound.mp3"),()=>{y.current.pause(),y.current=null}),[]),Object(n.useEffect)(()=>{y.current&&(y.current.volume=C)},[C]),Object(n.useEffect)(()=>{h(60*(p?a:c))},[a,c,p]);const w=Object(n.useCallback)(()=>{if(d)clearInterval(f),k(null);else{const e=setInterval(()=>{h(e=>Math.max(e-1,0))},1e3);k(e)}E(e=>!e)},[d,f,h,k]),j=Object(n.useCallback)(()=>{y.current&&y.current.play().then(()=>{S(!0),w(),g(!p),h(60*(p?c:a))}).catch(e=>console.error("Failed to play sound:",e))},[S,g,h,w,a,c,p]);Object(n.useEffect)(()=>{0===b&&j()},[b,j]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"timer-display",className:"border-bar"},l.a.createElement("h2",null,l.a.createElement(r.j,null)," Study Clock")),l.a.createElement("div",{id:"timer-container"},l.a.createElement("div",{id:"study-section"},l.a.createElement("p",null,"Study"),l.a.createElement("p",{className:"hover-effect",onClick:m},l.a.createElement(o.b,{color:"var(--accent-color)"})),l.a.createElement("p",null,a),l.a.createElement("p",{className:"hover-effect",onClick:s},l.a.createElement(o.a,{color:"var(--accent-color)"}))),l.a.createElement("div",{id:"break-section"},l.a.createElement("p",null,"Break"),l.a.createElement("p",{className:"hover-effect",onClick:i},l.a.createElement(o.b,{color:"var(--accent-color)"})),l.a.createElement("p",null,c),l.a.createElement("p",{className:"hover-effect",onClick:u},l.a.createElement(o.a,{color:"var(--accent-color)"})))),l.a.createElement("div",{id:"time-display",className:"card p-3",style:{color:"black",fontSize:"2rem"}},l.a.createElement("p",{style:{backgroundColor:"#ccc",borderRadius:".2em"}},(e=>{const t=Math.floor(e/60),a=e%60;return"".concat(t.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"))})(b)),l.a.createElement("div",{id:"time-btns"},l.a.createElement("button",{className:"btn btn-primary",onClick:w},d?l.a.createElement(r.f,null):l.a.createElement(r.g,null)),l.a.createElement("button",{className:"btn btn-primary",onClick:()=>{f&&clearInterval(f),E(!1),k(null),h(60*(p?a:c))}},l.a.createElement(r.i,null)),v&&l.a.createElement("button",{className:"btn btn-warning",onClick:()=>{y.current&&(y.current.pause(),y.current.currentTime=0,S(!1))}},l.a.createElement(r.e,null)))),l.a.createElement("div",{className:"volume-slider-container"},l.a.createElement("input",{type:"range",min:"0",max:"1",step:"0.01",value:C,onChange:e=>N(e.target.value),style:{width:"100%",background:"transparent"}})),l.a.createElement("div",{className:"hover-effect return-btn-section"},l.a.createElement("button",{className:"btn return-btn",onClick:t},"\u25c4 Return")))},d=e=>{let{onAddTaskClick:t,onFilterChange:a,handleSettingsClick:n,handleQuoteDisplay:c,handleShowTimer:o}=e;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"add-bttn-section",className:"hover-effect",style:{fontSize:"2rem",marginTop:".5em"}},l.a.createElement("p",{id:"add-bttn",onClick:t},l.a.createElement(m.a,null)," Add Task")),l.a.createElement("div",{id:"date-tags",className:"border-bar",style:{fontSize:"2rem",margin:"1em 0"}},l.a.createElement("p",{id:"today-tag",className:"hover-effect",onClick:()=>a("Today")},l.a.createElement(r.b,null)," Today"),l.a.createElement("p",{id:"sevenDay-tag",className:"hover-effect",onClick:()=>a("Next 7 Days")},l.a.createElement(r.c,null)," Next 7 Days"),l.a.createElement("p",{id:"fullDay-tag",className:"hover-effect",onClick:()=>a("Full Schedule")},l.a.createElement(r.a,null)," Full Schedule")),l.a.createElement("div",{id:"tools",className:"border-bar",style:{fontSize:"2rem",margin:"1em 0"}},l.a.createElement("p",{className:"hover-effect",onClick:c},l.a.createElement(r.h,{size:"1.5rem"})," Quote Machine"),l.a.createElement("p",{className:"hover-effect",onClick:o},l.a.createElement(r.j,null)," Study Clock")),l.a.createElement("div",{id:"settings",className:"hover-effect",style:{fontSize:"2rem",marginBottom:".5em"}},l.a.createElement("p",{onClick:n},l.a.createElement(r.d,null)," Settings")))};t.default=(e=>{let{onAddTaskClick:t,onFilterChange:a}=e;const[r,o]=Object(n.useState)(!1),[m,E]=Object(n.useState)(!1),[b,h]=Object(n.useState)(!1),[f,k]=Object(n.useState)(25),[p,g]=Object(n.useState)(5),[v,S]=Object(n.useState)(""),[y,C]=Object(n.useState)({text:"Press 'New Quote' Button",author:""}),{theme:N,toggleTheme:w}=Object(c.b)();return l.a.createElement("div",{id:"sidebar-top-level",className:"d-flex flex-column align-items-center justify-content-between vh-100","data-theme":N,style:{boxShadow:".2em 0 .5em var(--sidebar-shadow)",position:"fixed",width:"20em",top:0,left:0}},r?l.a.createElement(s,{handleSettingsClick:()=>o(!r),theme:N,toggleTheme:w}):m?l.a.createElement(i,{quote:y,handleNewQuote:()=>{const e=["#c8f4f3","#ff8680","#c2ffa9","#ffb783","#ff97ed","#b395ff","#A87676","#EBE3D5","#ffe9aa"],t=e[Math.floor(Math.random()*e.length)];S(t),fetch("https://api.quotable.io/random").then(e=>e.json()).then(e=>C({text:e.content,author:e.author})).catch(()=>C({text:"Failed to load quote",author:""}))},handleQuoteDisplay:()=>E(!m),backgroundColor:v}):b?l.a.createElement(u,{handleShowTimer:()=>h(!b),studyTime:f,breakTime:p,incrementStudy:()=>{f<60&&k(f+1)},decrementStudy:()=>{f>1&&k(f-1)},incrementBreak:()=>{p<30&&g(p+1)},decrementBreak:()=>{p>1&&g(p-1)}}):l.a.createElement(d,{onAddTaskClick:t,onFilterChange:a,handleSettingsClick:()=>o(!r),handleQuoteDisplay:()=>E(!m),handleShowTimer:()=>h(!b)}))})}}]);
//# sourceMappingURL=5.8fe205a7.chunk.js.map