import { boardsHandler } from "../data/boardsHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import { boardsManagerFunc } from "./boardsManagerFunc.js";
import { userManager } from "./userManager.js";



export let boardsManager = {
    loadBoards: async function (userId) {
        console.log("get user id from flask: " + userId);
        const boards = await boardsHandler.getBoards();
        for (let board of boards) {
            this.loadBoard(board, userId);
        }
    },
    loadBoard: async function (board, userId) {
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
    },
    createBoard: async function () {
        // console.log("print something modal works")
        // let titleField = document.querySelector("input#title-board");
        // let title = titleField.value;
        // let boardStatus = document.querySelector("#board-status").checked;
        // boardsHandler.createNewBoard(title, boardStatus);

        let userName = document.getElementById("user_name");
        console.log("userName: " + userName);
        
        if (userName) {
            console.log("logIn")
            let userId = userName.dataset.userId;
            console.log("userId: " + userId);
            let titleField = document.querySelector("input#title-board");
            let title = titleField.value;
            let boardStatus = document.querySelector("#board-status").checked;
            let boardResponse = boardsHandler.createNewBoard(title, boardStatus, userId);
            boardsManagerFunc.getBoardAfterCreate(boardResponse, userId)

        } else {
            console.log("not logIn")
            let titleField = document.querySelector("input#title-board");
            let title = titleField.value;
            let boardResponse = boardsHandler.createNewBoard(title);
            boardsManagerFunc.getBoardAfterCreate(boardResponse, null)
        }

        

    
        },
};