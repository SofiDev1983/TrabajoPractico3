import { App as AdminApp } from "./App.js";

sessionStorage.clear();

document.addEventListener("DOMContentLoaded", AdminApp);
window.addEventListener("hashchange", AdminApp);
