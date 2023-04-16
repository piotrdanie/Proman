import { dataCRUD } from "./dataCRUD.js";


export let cardsHandler = {
    getCards: async function () {

    },
    getCard: async function (cardId) {

    },
    getCardsByColumnId: async function (columnId) {
        return await dataCRUD.apiGet(`/api/boards/columns/${columnId}/cards/`);
    },
    createNewCard: async function (cardTitle, columnId) {
        // creates new card, saves it and calls the callback function with its data
        return await dataCRUD.apiPost(`/api/boards/columns/${columnId}/cards/`, {"title": cardTitle});
    },
    deleteCard: async function (cardId) {
        // delete card
        return await dataCRUD.apiDelete(`/api/boards/columns/cards/${cardId}`);
    },
    updateColumnIdInCard: async function (cardId, columnId) {
        // 
        return await dataCRUD.apiPost(`/api/boards/columns/${columnId}/cards/${cardId}/edit`, {"columnId": columnId});
    },
}
