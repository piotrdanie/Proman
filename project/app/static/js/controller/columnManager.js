import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import { columnsHandler } from "../data/columnsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let columnManager = {
    loadColumn: async function(boardId) {
        const columns = await columnsHandler.getColumnsByBoardId(boardId);
        console.log(columns);
        let isFirst = true;
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
        }
        // // addNewColumnButton
        const columnBuilder = htmlFactory(htmlTemplates.addColumn);
        const content = columnBuilder(clumnId);
        domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
    }
}

async function deleteColumnButton(clickEvent) {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    let columnId = await clickEvent.currentTarget.dataset.columnId
    console.log("delete column: "+ columnId)
    columnsHandler.deleteColumn(columnId)

    // remove element from board in view
    // let columnElement = document.querySelector(`.col-sm-4[data-column-id="${columnId}"]`)
    // columnElement.remove()
    
}
