var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=e.parcelRequire477f;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){o[e]=r},e.parcelRequire477f=n);var t=n("iLhJC"),l=n("bolz5");document.querySelector(".login-box"),document.querySelector("#thread-container");const a=document.querySelector("#user-name-login"),s=document.querySelector("#user-password-login");document.getElementById("login-btn").addEventListener("click",(e=>{e.preventDefault();const r=t.ref(l.db,"/Users/");t.onValue(r,(e=>{let r=!1;for(let o in e.val())e.val()[o].userName==a.value&&(r=!0,e.val()[o].password==s.value?(sessionStorage.setItem("usrName",a.value),location.replace("html/thread.html")):e.val()[o].password!=s.value&&alert("Wrong Password"));r||alert("user is not found")}))}));
//# sourceMappingURL=index.79555219.js.map
