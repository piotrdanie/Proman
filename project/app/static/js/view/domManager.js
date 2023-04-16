export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("beforeend", childContent);
        } else {
            console.error("could not find such html element for adding child: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
            console.log("added" + parent);
        } else {
            console.error("could not find such html element for event listener: " + parentIdentifier);
        }
    },
    changeBetweenCSSClasses(element, cssClassToRemove, cssClasstoAdd) {
        element.classList.remove(cssClassToRemove);
        element.classList.add(cssClasstoAdd);
    },
    emptyElement(elementIdentifier) {
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.innerHTML = "";
        } else {
            console.error("could not empty specified element: " + element);
        }
    },
    
};
