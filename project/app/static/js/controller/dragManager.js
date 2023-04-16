import { cardsHandler } from "../data/cardsHandler.js";


export let dragManager = {
    initDragManager: function() {
        const draggables = document.querySelectorAll('.card-draggable')
        const containers = document.querySelectorAll('.card-body')

        console.log("dragables: " + draggables);
        console.log(draggables)
        console.log(containers);


        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                console.log('drag start')
                draggable.classList.add('dragging')
                console.log(draggable.dataset.cardId)
            })

            draggable.addEventListener('dragend', () =>{
                draggable.classList.remove('.dragging')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', async e => {
                e.preventDefault()
                const afterElement = this.getDragAfterElement(container, e.clientY)
                const draggable = document.querySelector('.dragging')

                if (afterElement == null){
                    container.appendChild(draggable)
                }
                else{
                    container.insertBefore(draggable, afterElement)

                }

            })
            container.addEventListener('dragend', async e =>{
                const draggable = document.querySelector('.dragging')
                let columnId = container.dataset.columnId
                let cardId = draggable.dataset.cardId
                console.log('order: '+draggable.dataset.cardOrder)
                await cardsHandler.updateColumnIdInCard(cardId,columnId)
            })
        })

        
    },
    getDragAfterElement: function(container, y) {
        const draggableElements = [...container.querySelectorAll('.card-m-2:not(.dragging)')]

        return draggableElements.reduce((closest, child)=> {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            console.log(box)
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}.element)
    }
}

    