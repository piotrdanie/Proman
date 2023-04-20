import { dataCRUD } from "./dataCRUD.js";

export let columnsHandler = {
    getColumnsByBoardId: async function (boardId) {
        return await dataCRUD.apiGet(`/api/boards/${boardId}/columns/`);
    },
    deleteColumn: async function (columnId) {
        // delete column
        return await dataCRUD.apiDelete(`/api/boards/columns/${columnId}`);
    },
    updataColumn: async function (columnId, newColumnTitle){
        // edit board data
        return await dataCRUD.apiPut(
            `/api/boards/columns/`, 
            {
                "title": newColumnTitle,
                "id": columnId
            });
    },
}