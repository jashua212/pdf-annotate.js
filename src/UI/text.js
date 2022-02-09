import PDFJSAnnotate from '../PDFJSAnnotate';
import appendChild from '../render/appendChild';
import {
	BORDER_COLOR,
	findSVGAtPoint,
	getMetadata,
	scaleDown
} from './utils';

let _enabled = false;
let input;
let viewerRectTop = document.getElementById('viewer').getBoundingClientRect().top;
console.log('viewerRectTop: ', viewerRectTop);

// since I've disabled the toolbar button that gives user the ability to set
// the variable for '_textSize', am locking it in here
let _textSize = 12;
let _fontFamily = 'Times new roman';

// textColor variable will be set depending on which toolbar button is clicked
// see enableText(type) below
let _textColor;

// set y-scroll variables
let initialInputY = 0;
let initialScrollElmY = 0;
let scrollElm = document.querySelector('#viewer');

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
	if (input || !findSVGAtPoint(e.clientX, e.clientY)) {
		return;
	}

	input = document.createElement('input');
	input.setAttribute('id', 'pdf-annotate-text-input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', 'Enter text');
	input.style.border = `3px solid ${_utils__WEBPACK_IMPORTED_MODULE_2__.BORDER_COLOR}`;
	input.style.borderRadius = '3px';
	input.style.position = 'absolute';

	// adjust input so that it resembles what will be saved as an svg
	// also, need to add in parent elm's scrollLeft since getBoundingClientRect()
	// only get position relative to viewport and thus leaves out parent's scroll --
	// this attempt commented out below is not good enough -- something's missing
	/* const relevantScrollParent = document.querySelector('.well');
	const scrollLeft = parseInt(relevantScrollParent.scrollLeft, 10);
	console.log('scrollLeft: ', scrollLeft);
	const relevantOffsetParent = document.querySelector('#main');
	const offsetLeft = parseInt(relevantOffsetParent.offsetLeft, 10);
	console.log('offsetLeft: ', offsetLeft); */

	input.style.top = `${e.clientY - 8}px`;
	input.style.left = `${e.clientX - 4}px`;
	input.style.fontFamily = `${_fontFamily}`;
	input.style.color = `${_textColor}`;
	input.style.lineHeight = '1.2';
	input.style.fontSize = '18px';
	input.style.backgroundColor = 'transparent';

	// add event listeners
	input.addEventListener('blur', handleInputBlur);
	input.addEventListener('keyup', handleInputKeyup);

	// append input to body and put focus on it
	document.body.appendChild(input);
	input.focus();

	// MINE: add scroll event listener on scroll element, which is #viewer
	/* console.log('parent scroll top: ', scrollElm.scrollTop);
	console.log('parent offset top: ', scrollElm.getBoundingClientRect().top); */
	initialInputY = parseInt(input.style.top, 10);
	initialScrollElmY = scrollElm.scrollTop;
	scrollElm.addEventListener('scroll', handleParentScroll, { passive: true });
}

/**
 * MINE: Handle parent.scroll event
 */
function handleParentScroll(e) {
	let deltaY = scrollElm.scrollTop - initialScrollElmY;
	input.style.top = `${initialInputY - deltaY}px`;
}

/**
 * Handle input.blur event
 */
function handleInputBlur() {
	saveText();
}

/**
 * Handle input.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleInputKeyup(e) {
	if (e.keyCode === 27) {
		closeInput();
	} else if (e.keyCode === 13) {
		saveText();
	}
}

/**
 * Save a text annotation from input
 */
function saveText() {
	if (input.value.trim().length > 0) {
		let clientX = parseInt(input.style.left, 10);
		let clientY = parseInt(input.style.top, 10);
		let svg = findSVGAtPoint(clientX, clientY);
		if (!svg) {
			return;
		}
		console.log('svg: ', svg);

		let {
			documentId,
			pageNumber
		} = getMetadata(svg);
		let rect = svg.getBoundingClientRect();
		let annotation = Object.assign({
			type: 'textbox',
			size: _textSize,
			color: _textColor,
			content: input.value.trim()
		}, scaleDown(svg, {
				x: clientX - rect.left,
				y: clientY - rect.top,
				width: input.offsetWidth,
				height: input.offsetHeight
			}));

		PDFJSAnnotate.getStoreAdapter()
			.addAnnotation(documentId, pageNumber, annotation)
			.then((annotation) => {
				appendChild(svg, annotation);
			});
	}

	closeInput();
}

/**
 * Close the input
 */
function closeInput() {
	if (input) {
		input.removeEventListener('blur', handleInputBlur);
		input.removeEventListener('keyup', handleInputKeyup);
		document.body.removeChild(input);
		input = null;
	}
	scrollElm.removeEventListener('scroll', handleParentScroll);
}

/**
 * Set the text attributes
 *
 * @param {Number} textSize The size of the text
 * @param {String} textColor The color of the text
 */
export function setText(textSize = 12, textColor = '000000') {
	_textSize = parseInt(textSize, 10);
	_textColor = textColor;
}

/**
 * Enable text behavior
 */
export function enableText(type) {
	// I added this line so that textColor is set depending on which
	// toolbar button is clicked
	_textColor = /blue/.test(type) ? '#00f' : '#f00';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable text behavior
 */
export function disableText() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('mouseup', handleDocumentMouseup);
}
