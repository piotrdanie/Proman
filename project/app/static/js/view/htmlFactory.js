export const htmlTemplates = {
    board: 1,
    card: 2,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,

};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
};

function columnBuilder(board) {
    return `
            <div class="row" data-board-id="${board.id}">
                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">New</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">In progress</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">Testing</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">Done</h5>
                        </div>
                    </div>
                </div>



            </div>
                
            `;
};

function boardBuilder(board) {
    return `
            <div class="card m-3">
            <div class="row card-header">
                <div class="col-sm-11">
                <h5  data-board-id="${board.id}">${board.title}</h5>
                </div>
                <div class="col-sm-1" data-board-id="${board.id}">
                <button class="btn btn-primary" type="button" align="right" data-board-id="${board.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>
                </div>
            </div>
                <div id="div-cards" data-board-id="${board.id}"></div>

            </div>
            `;
};

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
};