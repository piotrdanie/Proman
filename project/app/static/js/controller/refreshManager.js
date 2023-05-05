export let refreshManager = {
    getOpenBoards: function() {
        const allBoards = document.querySelectorAll("button.open");
        const allBoardsArray = Array.from(allBoards)
        console.log(allBoardsArray)
        const openBoards = [];

        for (let i = 0; i < allBoardsArray.length; i++) {
            console.log(allBoardsArray[i])
            let boardId = allBoardsArray[i].dataset.boardId;
            openBoards.push(boardId);
        }
        console.log("openBoards: " + openBoards);
        return openBoards;
    }
}