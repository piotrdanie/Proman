import { boardsHandler } from "../data/boardsHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import { refreshManager } from "./refreshManager.js";
import { boardsManagerFunc } from "./boardsManagerFunc.js";


export let boardsManager = {
    loadBoards: async function (userId) {
        console.log("get user id from flask: " + userId);
        const boards = await boardsHandler.getBoards();
        for (let board of boards) {
            console.log("board type: " + board.type + ", board userId: " + board.user_id + board.id);
            if (board.type == 1 || board.user_id == userId) {
                const boardBuilder = htmlFactory(htmlTemplates.board);
                const content = boardBuilder(board);
                domManager.addChild("#root", content);
                domManager.addEventListener(
                    `button[data-board-id="${board.id}"]`,
                    "click",
                    boardsManagerFunc.showHideButtonHandler
                );
                domManager.addEventListener(
                    `[data-board-id="${board.id}"].card-header-title--editable`,
                    "keypress",
                    boardsManagerFunc.editBoardTilte
                );
                domManager.addEventListener(
                    `div.div-button[data-board-id="${board.id}"]`,
                    "click",
                    boardsManagerFunc.deleteBoardButton
                );
                domManager.addEventListener(
                    `[data-board-id="${board.id}"].card-header-title--editable`,
                    "click",
                    boardsManagerFunc.changeElementEdit
                )
            }; 
        }
    },
    createBoard: async function () {
        console.log("print something modal works")
        let titleField = document.querySelector("input#title-board");
        console.log(titleField);
        let title = titleField.value;
        console.log("text from field: " + title);
        boardsHandler.createNewBoard(title);

        // TODO add user id and use it in refreshing page by AJAX
        const openBoardId = refreshManager.getOpenBoards();
        domManager.emptyElement('#root');
        await boardsManager.loadBoards(null, openBoardId);
    },
};