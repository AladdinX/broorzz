var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, t = {}, r = {}, n = e.parcelRequire477f; null == n && ((n = function (e) { if (e in t) return t[e].exports; if (e in r) { var n = r[e]; delete r[e]; var o = { id: e, exports: {} }; return t[e] = o, n.call(o.exports, o, o.exports), o.exports } var s = new Error("Cannot find module '" + e + "'"); throw s.code = "MODULE_NOT_FOUND", s }).register = function (e, t) { r[e] = t }, e.parcelRequire477f = n); var o = n("fE1Gw"), s = n("bolz5"), i = n("iLhJC"); const l = sessionStorage.getItem("usrName"); let a, d = []; const u = i.ref(s.db, "/Users"); i.onValue(u, (e => { const t = e.val(); d = []; for (const e in t) if (d.push(new o.User(t[e].userName, t[e].password, t[e].gender, t[e].img, t[e].bio)), l == e) { a = new o.User(t[e].userName, t[e].password, t[e].gender, t[e].img, t[e].bio), a.createProfileDiv("#main-div"), a.getStatus("#old-status"); document.querySelector("#divDeleter").addEventListener("click", (function (e) { const t = i.ref(s.db, "/Users/" + a.userName); i.remove(t), sessionStorage.clear(), location.replace("../index.html") })) } for (const e of d) { let t = document.createElement("h3"); t.innerText = e.userName, t.id = e.userName, document.querySelector("#profiles-aside").append(t), document.querySelector(`#${e.userName}`).addEventListener("click", (() => { e.createProfileDiv("#main-div"), e.getStatus("#old-status"), l != e.userName && (document.querySelector("#divDeleter").style.display = "none", document.querySelector("#sign-out").style.display = "none", document.querySelector("#new-status").style.display = "none") })) } })), document.querySelector("#new-status").addEventListener("click", (() => { document.querySelector("#profiles-aside").innerHTML = "", a.setStatus(), a.getStatus("#old-status") })), document.querySelector("#sign-out").addEventListener("click", (() => { sessionStorage.clear(), location.replace("index.html") }));
//# sourceMappingURL=profiles.e4891daa.js.map
