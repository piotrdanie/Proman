import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import { columnsHandler } from "../data/columnsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let columnManager = {
    loadColumn: async function(boardId) {
        const columns = await columnsHandler.getColumnsByBoardId(boardId);
        console.log(columns);
        // let isFirst = true;
        for(let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
            console.log("columnId: " + column.id)
            await cardsManager.loadCards(column.id)
            domManager.addEventListener(
                `div.div-button[data-column-id="${column.id}"]`,
                "click",
                deleteColumnButton
            )
            domManager.addEventListener(
                `[data-column-id="${column.id}"].column-header-title--editable`,
                "keypress",
                updataColumnTilte)
        }
        // // addNewColumnButton
        const columnBuilder = htmlFactory(htmlTemplates.addColumn);
        const content = columnBuilder();
        domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
    }
}

async function deleteColumnButton(clickEvent) {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    let columnId = await clickEvent.currentTarget.dataset.columnId
    columnsHandler.deleteColumn(columnId) 
}

async function updataColumnTilte(event) {
<<<<<<< HEAD
    let columnId = await event.currentTarget.dataset.columnId
=======
    let columnElement = await event.currentTarget
    let columnId = columnElement.dataset.columnId

>>>>>>> development
        if (event.keyCode === 13) {
            event.preventDefault();

<<<<<<< HEAD
            let newColumnTitle = document.querySelector(`[data-column-id="${columnId}"].column-header-title--editable`).innerText;
            await columnsHandler.updataColumn(columnId,newColumnTitle)
=======
    // Odbieranie focusu z pola edycji tytułu
            let newColumnTitle = columnElement.innerText;
            await columnsHandler.updataColumn(columnId,newColumnTitle)
            columnElement.setAttribute("contenteditable", "false");
>>>>>>> development
        }

}
