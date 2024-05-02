// actions.js

// Portal action
export function modalPortal(node) {

    const body = document.body.style;
    // find an element with this ID somewhere in the document
    let slot = document.querySelector('#modals');
    // move this node to that element
    slot?.appendChild(node);
    body.setProperty('touch-action', 'none');
    body.setProperty('overscroll-behavior', 'none');
    body.setProperty('overflow', 'hidden');

    return {
        destroy() {

            body.setProperty('touch-action', null);
            body.setProperty('overscroll-behavior', null);
            body.setProperty('overflow', null);
            // remove the node when component is destroyed
            node.remove()
        }
    }
}
export function portal(node, name) {

    const slot = document.querySelector(name)
    // find an element with this ID somewhere in the document
    // move this node to that element
    slot?.appendChild(node);

    return {
        destroy() {
            node.remove()
        }
    }
}