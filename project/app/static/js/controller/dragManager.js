import { cardsHandler } from "../data/cardsHandler.js";
import { columnManager } from "./columnManager.js";


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
                const afterElement = getDragAfterElement(container, e.clientY)

                // there is the element 
                console.log("after element: " + afterElement);
                console.log(afterElement)
                
                
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
                let cardOrder = draggable.dataset.cardOrder
                console.log('order: '+draggable.dataset.cardOrder)
                await cardsHandler.updateColumnIdInCard(cardId,columnId, cardOrder)

                let boardElement = document.querySelector(`#div-cards[data-board-id="1"]`);
                boardElement.innerHTML = ""
                await columnManager.loadColumn(1);
                dragManager.initDragManager();

            })
        })

        
    }
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.card-draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

    