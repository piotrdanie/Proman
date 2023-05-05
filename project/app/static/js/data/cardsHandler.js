import { dataCRUD } from "./dataCRUD.js";


export let cardsHandler = {
    getCards: async function () {
    },

    getCard: async function (cardId) {
        return await dataCRUD.apiGet(`/api/boards/columns/cards/${cardId}/`);
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
        return await dataCRUD.apiDelete(`/api/boards/columns/cards/${cardId}/`);
    },
    updateColumnIdInCard: async function (cardId, columnId, cardOrder) {
        // 
        return await dataCRUD.apiPatch(
            `/api/boards/columns/cards/`,
            {
                "id": cardId,
                "column_id": columnId,
                "card_order": cardOrder,
            }
            );
    },
    updataCard: async function (cardId, newCardTitle){
        return await dataCRUD.apiPut(
            `/api/boards/columns/cards`, 
            {
                "title": newCardTitle,
                "id": cardId
            });
    },
}
