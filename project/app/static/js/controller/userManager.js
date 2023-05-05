import { boardsManager } from "./boardsManager.js";

export let userManager = {
    checkIfUser: function () {
        let userName = document.getElementById("user_name");
        console.log("userName: " + userName);
        
        if (userName) {
            let userId = userName.dataset.userId;
            console.log("userId: " + userId);
            console.log("show all boards, private and public");
            console.log(userName.innerText);
            boardsManager.loadBoards(userId);

        } else {
            // shows only public boards
            boardsManager.loadBoards(null);

        }

    },
}
