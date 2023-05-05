import { boardsManager } from "./boardsManager.js";
import { columnManager } from "./columnManager.js";


export let eventListeners = {
    addGlobalEventListeners: function() {        
        let saveBoardButton = document.querySelector("button#save-board");
        saveBoardButton.addEventListener("click", boardsManager.createBoard);

        // let saveColumnButton = document.querySelector("button#save-column");
        // saveColumnButton.addEventListener("click", columnManager.createColumn);
    }
}
