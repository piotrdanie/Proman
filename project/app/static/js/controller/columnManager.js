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
            const content = columnBuilder(column, isFirst);
            domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
            isFirst = false
            console.log("columnId: " + column.id)
            await cardsManager.loadCards(column.id)
            domManager.addEventListener(
                `div.div-button[data-column-id="${column.id}"]`,
                "click",
                deleteColumnButton
            )    
        }
    }
}

async function deleteColumnButton(clickEvent) {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    let columnId = await clickEvent.currentTarget.dataset.columnId
    console.log("delete column: "+ columnId)
    columnsHandler.deleteColumn(columnId)

    // remove element from board in view
    let columnElement = document.querySelector(`.col-sm-4[data-column-id="${columnId}"]`)
    columnElement.remove()

    domManager.emptyElement('#root');
    await boardsManager.loadBoards(null)
}
