import { boardsManager } from "./boardsManager.js";
import { cardsManager } from "./cardsManager.js";


export let eventListeners = {
    addGlobalEventListeners: function() {        
        let saveBoardButton = document.querySelector("button#save-board");
        saveBoardButton.addEventListener("click", boardsManager.createBoard);

        let saveCardButton = document.querySelector("button#save-card");
        saveCardButton.addEventListener("click", cardsManager.createCard);
    }
}
