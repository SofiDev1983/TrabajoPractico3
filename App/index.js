import { App as ClientApp } from "/tienda/App/App.js";
import { App as AdminApp } from "./App.js";

document.addEventListener("DOMContentLoaded", AdminApp);
window.addEventListener("hashchange", AdminApp);

// document.addEventListener("DOMContentLoaded", ClientApp);
// window.addEventListener("hashchange", ClientApp);
