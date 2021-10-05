import PDFJSAnnotate from '../PDFJSAnnotate';
import appendChild from '../render/appendChild';
import { fireEvent } from './event';
import {
	disableUserSelect,
	enableUserSelect,
	findSVGAtPoint,
	getMetadata,
	scaleDown
} from './utils';

let _enabled = false;
let _penSize;
let _penColor;
let _penMode;
let path;
let lines;

/**
 * Handle document.pointerdown event
 * UNLIKE 'rect.js' module, this does NOT create a temporary div overlay
 */
function handleDocumentPointerdown() {
	path = null;
	lines = [];

	document.addEventListener('pointermove', handleDocumentPointermove);
	document.addEventListener('pointerup', handleDocumentPointerup);
	disableUserSelect();
}

/**
 * Handle document.pointermove event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentPointermove(e) {
	savePoint(e.clientX, e.clientY);
}

/**
 * Handle document.pointerup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentPointerup(e) {
	console.log('What is path ?? ', path);

	let svg;
	if (lines.length > 1 && (svg = findSVGAtPoint(e.clientX, e.clientY))) {
		let {
			documentId,
			pageNumber
		} = getMetadata(svg);
		console.log('lines: ', lines);

		PDFJSAnnotate.getStoreAdapter()
			.addAnnotation(documentId, pageNumber, {
				type: _penMode, // this affects how the svg element is rendered
				width: _penSize,
				color: _penColor,
				lines
			})
			.then((annotation) => {
				if (path) {
					svg.removeChild(path);
				}

				// render.appendChild() is the entry method to render the svg element on the parent svg for the applicable page
				appendChild(svg, annotation);
			});
	}

	document.removeEventListener('pointermove', handleDocumentPointermove);
	document.removeEventListener('pointerup', handleDocumentPointerup);
	enableUserSelect();

	fireEvent('resetToolbar');
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentKeyup(e) {
	// Cancel rect if Esc is pressed
	if (e.keyCode === 27) {
		lines = null;
		path.parentNode.removeChild(path);
		document.removeEventListener('pointermove', handleDocumentPointermove);
		document.removeEventListener('pointerup', handleDocumentPointerup);
		enableUserSelect();
		fireEvent('resetToolbar');
	}
}

/**
 * Save a point to the line being drawn.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 */
function savePoint(x, y) {
	let svg = findSVGAtPoint(x, y);
	if (!svg) {
		return;
	}

	let rect = svg.getBoundingClientRect();
	let point = scaleDown(svg, {
		x: x - rect.left,
		y: y - rect.top
	});

	if (!lines.length || lines.length === 0) {
		lines.push([point.x, point.y]);
	} else {
		if (_penMode === 'line') {
			lines[1] = [point.x, point.y];
		} else {
			lines.push([point.x, point.y]);
		}
	}

	if (lines.length <= 1) {
		return;
	}

	if (path) {
		svg.removeChild(path);
	}

	path = appendChild(svg, {
		type: _penMode,
		color: _penColor,
		width: _penSize,
		lines
	});
}

/**
 * Set the attributes of the pen.
 *
 * @param {Number} penSize The size of the lines drawn by the pen
 * @param {String} penColor The color of the lines drawn by the pen
 */
/* export function setPen(penSize = 1, penColor = '000000') {
	_penSize = parseInt(penSize, 10);
	_penColor = penColor;
} */

/**
 * Enable the pen behavior
 */
export function enablePen(type) {
	// I added this block b/c am no longer using setPen() function immed above
	_penSize = 1;
	_penColor = /blue/.test(type) ? '#00f' : '#f00';
	_penMode = /freehand/.test(type) ? 'drawing' : 'line';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('pointerdown', handleDocumentPointerdown);
	document.addEventListener('keyup', handleDocumentKeyup);
	disableUserSelect();
}

/**
 * Disable the pen behavior
 */
export function disablePen() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('pointerdown', handleDocumentPointerdown);
	document.removeEventListener('keyup', handleDocumentKeyup);
	enableUserSelect();
}
