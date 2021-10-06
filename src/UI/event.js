import EventEmitter from 'events';

import {
	findSVGAtPoint,
	findAnnotationAtPoint
} from './utils';

const emitter = new EventEmitter;

let clickNode;

/**
 * Handle document.click event
 *
 * @param {Event} e The DOM event to be handled
 */
document.addEventListener('click', function handleDocumentClick(e) {
	// Find the applicable svg child element (if any) -- i.e., NOT the parent svg container, but rather the actual svg child element for this annotation
	console.log('client X, Y: ', e.clientX, e.clientY);
	console.log('page X, Y: ', e.pageX, e.pageY);
	let target = findAnnotationAtPoint(e.clientX, e.clientY);

	// Emit annotation:blur if clickNode is no longer clicked
	if (clickNode && clickNode !== target) {
		// the listener is attached in 'edit.js'
		emitter.emit('annotation:blur', clickNode);
	}

	// Emit annotation:click if target was clicked
	if (target) {
		// the listener is attached in 'edit.js'
		emitter.emit('annotation:click', target);
	}

	clickNode = target;
});

// let pointerOverNode;
/* document.addEventListener('pointermove', function handleDocumentPointermove(e) {
	let target = findAnnotationAtPoint(e.clientX, e.clientY);

	// Emit annotation:pointerout if target was pointerout'd
	if (pointerOverNode && !target) {
		emitter.emit('annotation:pointerout', pointerOverNode);
	}

	// Emit annotation:pointerover if target was pointerover'd
	if (target && pointerOverNode !== target) {
		emitter.emit('annotation:pointerover', target);
	}

	pointerOverNode = target;
}); */

export function fireEvent() {
	emitter.emit(...arguments);
};
export function addEventListener() {
	emitter.on(...arguments);
};
export function removeEventListener() {
	emitter.removeListener(...arguments);
};
