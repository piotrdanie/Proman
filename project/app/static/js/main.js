import { dragManager } from "./controller/dragManager.js";
import { eventListeners } from "./controller/eventListeners.js";
import { userManager } from "./controller/userManager.js";


function init() {
    userManager.checkIfUser();
    eventListeners.addGlobalEventListeners();
    dragManager.initDragManager();
}

init();