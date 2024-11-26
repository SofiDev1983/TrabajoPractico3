import { App as ClientApp } from "/tienda/App/App.js";
import { App as AdminApp } from "./App.js";

document.addEventListener("DOMContentLoaded", ClientApp);
window.addEventListener("hashchange", ClientApp);
