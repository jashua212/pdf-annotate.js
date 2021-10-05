import PDFJSAnnotate from '../PDFJSAnnotate';
import appendChild from '../render/appendChild';
import { fireEvent } from './event';
import {
	BORDER_COLOR,
	disableUserSelect,
	enableUserSelect,
	findSVGAtPoint,
	getMetadata,
	getOffset,
	scaleDown,
	scaleUp
} from './utils';

let _enabled = false;
let _type;
let _drawMode;
let _borderColor;
let overlay;
let originX;
let originY;

/**
 * Get the current window selection as rects
 *
 * @return {Array} An Array of rects
 */
function getSelectionRects() {
	try {
		let selection = window.getSelection();
		let range = selection.getRangeAt(0);
		let rects = range.getClientRects();

		if (rects.length > 0 &&
			rects[0].width > 0 &&
			rects[0].height > 0) {
			return rects;
		}
	} catch (e) {
		console.log('could NOT get selection\'s rects');
	}

	return null;
}

/**
 * Handle document.pointerdown event
 * This creates a temporary div overlay
 * This does NOT apply to either 'highlight' or 'strikeout.' HOW then do those 2 types work ??
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointerdown(e) {
	let svg;

	if (_drawMode !== 'area' || !(svg = findSVGAtPoint(e.clientX, e.clientY))) {
		return; // bail
	}

	let rect = svg.getBoundingClientRect();

	// e.clientX && e.clientY returns position in the viewport (as opposed to in the page)
	originX = e.clientX;
	originY = e.clientY;
	console.log('origin e.clientX: ', e.clientX);
	console.log('origin e.clientY: ', e.clientY);

	overlay = document.createElement('div'); // temporary div
	overlay.style.position = 'absolute';
	overlay.style.left = `${originX - rect.left}px`;
	overlay.style.top = `${originY - rect.top}px`;
	overlay.style.border = `3px solid ${BORDER_COLOR}`;
	overlay.style.borderRadius = '3px';
	svg.parentNode.appendChild(overlay);

	// so pointermove method, as well, does NOT apply to either 'highlight' or 'strikeout'
	document.addEventListener('pointermove', handleDocumentPointermove);
	disableUserSelect();
}

/**
 * Handle document.pointermove event
 * This does NOT apply to either 'highlight' or 'strikeout.' HOW then do those 2 types work ??
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointermove(e) {
	// overlay.closest does NOT work -- WHY ??
	let svg = overlay.parentNode.querySelector('svg.annotationLayer');
	let rect = svg.getBoundingClientRect();

	let deltaX = (e.clientX - originX);
	let deltaY = (e.clientY - originY);
	let absDeltaX = Math.abs(deltaX);
	let absDeltaY = Math.abs(deltaY);
	let maxAbsDeltaX = Math.abs(originX - rect.left);
	let maxAbsDeltaY = Math.abs(originY - rect.top);

	// commented out original formulation
	/* if (originX + (e.clientX - originX) < rect.right) {
		overlay.style.width = `${e.clientX - originX}px`;
	}
	if (originY + (e.clientY - originY) < rect.bottom) {
		overlay.style.height = `${e.clientY - originY}px`;
	} */

	if (deltaX < 0) {
		overlay.style.left = Math.max(5, e.clientX - rect.left) + 'px';
		overlay.style.width = Math.min(
			(maxAbsDeltaX - 5),
			absDeltaX
		) + 'px';
	} else {
		overlay.style.width = absDeltaX + 'px';
	}

	if (deltaY < 0) {
		overlay.style.top = Math.max(5, e.clientY - rect.top) + 'px';
		overlay.style.height = Math.min(
			(maxAbsDeltaY - 5),
			absDeltaY
		) + 'px';
	} else {
		overlay.style.height = absDeltaY + 'px';
	}
}

/**
 * Handle document.pointerup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointerup(e) {
	let rects;

	if (_drawMode !== 'area' && (rects = getSelectionRects())) {
		let svg = findSVGAtPoint(rects[0].left, rects[0].top);
		saveRect(
			_type,
			[...rects].map((r) => {
				return {
					top: r.top,
					left: r.left,
					width: r.width,
					height: r.height
				};
			})
		);

	} else if (_drawMode === 'area' && overlay) {
		let svg = overlay.parentNode.querySelector('svg.annotationLayer');
		let rect = svg.getBoundingClientRect();

		saveRect(
			_drawMode,
			[{
				top: parseInt(overlay.style.top, 10) + rect.top,
				left: parseInt(overlay.style.left, 10) + rect.left,
				width: parseInt(overlay.style.width, 10),
				height: parseInt(overlay.style.height, 10)
			}],
			_borderColor
		);

		overlay.parentNode.removeChild(overlay);
		overlay = null;

		document.removeEventListener('pointermove', handleDocumentPointermove);
		enableUserSelect();
	}

	fireEvent('resetToolbar');
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentKeyup(e) {
	// Cancel rect if Esc is pressed
	if (e.keyCode === 27) {
		let selection = window.getSelection();
		selection.removeAllRanges();
		if (overlay && overlay.parentNode) {
			overlay.parentNode.removeChild(overlay);
			overlay = null;
			document.removeEventListener('pointermove', handleDocumentPointermove);
		}
		enableUserSelect();
		fireEvent('resetToolbar');
	}
}

/**
 * Save a rect annotation
 *
 * @param {String} type The type of rect (area, highlight, strikeout)
 * @param {Array} rects The rects to use for annotation
 * @param {String} color The color of the rects
 */
function saveRect(type, rects, color) {
	let svg = findSVGAtPoint(rects[0].left, rects[0].top);
	let node;
	let annotation;

	if (!svg) {
		return;
	}

	let boundingRect = svg.getBoundingClientRect();

	if (type !== 'area' && !color) {
		if (type === 'highlight') {
			color = 'FFFF00';
		} else if (type === 'strikeout') {
			color = 'FF0000';
		}
	}

	// Initialize the annotation
	annotation = {
		type,
		color,
		rectangles: [...rects].map((r) => {
			let offset = 0;

			if (type === 'strikeout') {
				offset = r.height / 2;
			}

			return scaleDown(svg, {
				y: (r.top + offset) - boundingRect.top,
				x: r.left - boundingRect.left,
				width: r.width,
				height: r.height
			});
		}).filter((r) => r.width > 0 && r.height > 0 && r.x > -1 && r.y > -1)
	};

	// Short circuit if no rectangles exist
	if (annotation.rectangles.length === 0) {
		return;
	}

	// Special treatment for area as it only supports a single rect
	if (type === 'area') {
		let rect = annotation.rectangles[0];
		delete annotation.rectangles;
		annotation.x = rect.x;
		annotation.y = rect.y;
		annotation.width = rect.width;
		annotation.height = rect.height;
	}

	let {
		documentId,
		pageNumber
	} = getMetadata(svg);

	// Add the annotation
	PDFJSAnnotate.getStoreAdapter()
		.addAnnotation(documentId, pageNumber, annotation)
		.then((annotation) => appendChild(svg, annotation));
}

/**
 * Enable rect behavior
 */
export function enableRect(type) {
	_type = type;
	_drawMode = /^area/.test(type) ? 'area' : 'highlight-strikeout';
	_borderColor = /blue/.test(type) ? 'blue' : 'red';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('pointerup', handleDocumentPointerup);
	document.addEventListener('pointerdown', handleDocumentPointerdown);
	document.addEventListener('keyup', handleDocumentKeyup);
}

/**
 * Disable rect behavior
 */
export function disableRect() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('pointerup', handleDocumentPointerup);
	document.removeEventListener('pointerdown', handleDocumentPointerdown);
	document.removeEventListener('keyup', handleDocumentKeyup);
}
