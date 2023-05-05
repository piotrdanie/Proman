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
                const draggableElements = [...container.querySelectorAll('.card-draggable:not(.dragging)')]
                console.log("dragable elements:")
                console.log(draggableElements)


                // there is the element 
                console.log("after element: " + afterElement);
                console.log(afterElement)
                
                
                const draggable = document.querySelector('.dragging')

                if (afterElement == null){
                    container.appendChild(draggable)
                    // get the length of the elements in containers and set the card order to it
                }
                else{
                    container.insertBefore(draggable, afterElement)

                    // get after element and elements after afterElement
                    console.log("card order of afterElement")
                    console.log(afterElement.dataset.cardOrder)

                }

            })
            container.addEventListener('dragend', async e =>{
                const draggable = document.querySelector('.dragging')
                draggable.classList.remove('dragging')
                let columnId = container.dataset.columnId
                let cardId = draggable.dataset.cardId
                let cardOrder = draggable.dataset.cardOrder
                console.log(cardId + 'order: '+ draggable.dataset.cardOrder)


                // get all element from container
                const draggableElements = [...container.querySelectorAll('.card-draggable:not(.dragging)')]
                console.log("dragable container elements:")
                console.log(draggableElements)
                
                for (let i = 0; i < draggableElements.length; i++) {
                    console.log("card title: " + draggableElements[i].innerText +  ", card id: " + draggableElements[i].dataset.cardId + ", card order: " + i)
                    
                    // TODO: update card_order for each card
                    await cardsHandler.updateColumnIdInCard(
                        draggableElements[i].dataset.cardId,
                        columnId,
                        i
                    )
                }

                console.log(cardId + 'order after: '+ draggable.dataset.cardOrder)

                

                // let boardElement = document.querySelector(`#div-cards[data-board-id="1"]`);
                // boardElement.innerHTML = ""
                // await columnManager.loadColumns(1);
                // dragManager.initDragManager();  

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

    