import { dataCRUD } from "./dataCRUD.js";


export let boardsHandler = {
    getBoards: async function () {
        return await dataCRUD.apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await dataCRUD.apiGet(`/api/boards/${boardId}/`);
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        return await dataCRUD.apiPost(`/api/boards/`,{"title": boardTitle});
    },
    deleteBoard: async function (boardId) {
        // delete board
        return await dataCRUD.apiDelete(`/api/boards/${boardId}`);
    },
}