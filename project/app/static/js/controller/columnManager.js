import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import { columnsHandler } from "../data/columnsHandler.js";
import { boardsManager } from "./boardsManager.js";
import { dragManager } from "./dragManager.js";


export let columnManager = {
    loadColumns: async function(boardId) {
        const columns = await columnsHandler.getColumnsByBoardId(boardId);

        for(let column of columns) {
            await columnManager.loadColumn(column, boardId);
        }

        // add div with button and niput for creating the new column
        addAddColumnElement(boardId);

    },
    loadColumn: async function(column, boardId) {
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const content = columnBuilder(column);
        domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
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
    },
}

async function addColumnButton(clickEvent) {
    let boardId = await clickEvent.currentTarget.dataset.boardId

    let columnTitleElement = document.querySelector(`[data-board-id="${boardId}"].add-column-imput`)
    let columnTitle = columnTitleElement.value
    let columnResponse = await columnsHandler.createColumn(columnTitle, boardId)

    let columnPromise = await columnResponse;

    let columnId = columnPromise[0][0].id;
    let column = await columnsHandler.getColumn(columnId)

    await removeAddColumnElement(boardId);
    await columnManager.loadColumn(column[0], boardId);

    // columnTitleElement.value = ""
    addAddColumnElement(boardId);
    dragManager.initDragManager();
}


async function deleteColumnButton(clickEvent) {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    let columnId = await clickEvent.currentTarget.dataset.columnId
    columnsHandler.deleteColumn(columnId) 

    let columnElement = document.querySelector(`.column-body[data-column-id="${columnId}"]`)
    columnElement.remove()
}

async function updataColumnTilte(event) {
    let columnElement = await event.currentTarget
    let columnId = columnElement.dataset.columnId

        if (event.keyCode === 13) {
    // Zapobiegnięcie domyślnej akcji (np. przeładowania strony)
            event.preventDefault();

    // Odbieranie focusu z pola edycji tytułu
            let newColumnTitle = columnElement.innerText;
            await columnsHandler.updataColumn(columnId,newColumnTitle)
            columnElement.setAttribute("contenteditable", "false");
        }
}

async function addAddColumnElement(boardId) {
    const columnBuilder = htmlFactory(htmlTemplates.addColumn);
    const content = columnBuilder(boardId);
    domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
    domManager.addEventListener(
        `[data-board-id="${boardId}"].add-column-button`,
        "click",
        addColumnButton
    );
    
}

async function removeAddColumnElement(boardId){
    let addColumnElement = document.querySelector(`[data-board-id="${boardId}"].add-column-element`)
    addColumnElement.remove()
}