

//***********************************************
// docs/main.js is the entry file for webpack
// docs/index.js is the resulting compiled file, which I rename as 'pdf-annotate-index' for use in exams_SAT
//
// Structure:
// 		div#content-wrapper       --> originally, position absolute and scroll element
//			div.pdfViewer#viewer  --> now, position absolute and scroll element
//				div.page
//					div.canvasWrapper
//					svg.annotationLayer(1)
//					div.textLayer
//
//	(1) pdfJS is supposed to create a div for the annotation layer (see pdf_viewer.js). But does pdfjs-annotate libe step in to create the layer as just an svg element ??
//
//***********************************************


// NOT using twitter for posting comments
/* import twitter from 'twitter-text'; */

// NOT using colorpicker
/* import initColorPicker from './shared/initColorPicker'; */

/* import PDFJSAnnotate from '../'; */
// above is NOT as good as import PDFJSAnnotate from '../src/PDFJSAnnotate.js', which rebuilds its submodules and, thus, incorporates any changes made in them
// also, the below (instead of "import * from") seems to be importing all the exports as a 'namespace'
import PDFJSAnnotate from '../src/PDFJSAnnotate.js';

const { UI } = PDFJSAnnotate;
// above is same as const UI = PDFJSAnnotate.UI

const tempTitleElm = document.querySelector('.delete.exam-title');
const documentId = tempTitleElm.textContent;

let PAGE_HEIGHT;
let RENDER_OPTIONS = {
	documentId: documentId,
	pdfDocument: null,
	scale: 1.6,
	rotate: 0
};

// Use LocalStorageAdapter to save and retrieve user's annotations
PDFJSAnnotate.setStoreAdapter(new PDFJSAnnotate.LocalStoreAdapter());

// PDFJS's worker is that library's CORE module (not its DISPLAY or VIEWER module)
// PDFJS's api (called pdfJS itself) is its DISPLAY module and gets loaded via a script tag on the html page
// older versions of PDFJS have a separate VIEWER module which also gets loaded via a script tage on the html page
/* PDFJS.workerSrc = './shared/pdf.worker.js'; */
/* PDFJS.workerSrc = '../pdf-assets/shared/pdf.worker.js'; */
PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.4.162/pdf.worker.min.js';


// Render stuff
let viewer = document.getElementById('viewer');
let NUM_PAGES = 0;
let CURRENT_PAGE = 1;
let createdPageElms;
let renderedPages = {};

// NOT using scrolling of viewer to navigate between pages
/* document.querySelector('.pdfViewer').addEventListener('scroll', function (e) {
	let visiblePageNum = Math.round(e.target.scrollTop / PAGE_HEIGHT) + 1;
	let visiblePage = document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');
	if (visiblePage) {
		// Prevent invoking UI.renderPage on the same page more than once
		if (!renderedPages[visiblePageNum]) {
			renderedPages[visiblePageNum] = true;
			setTimeout(function () {
				UI.renderPage(visiblePageNum, RENDER_OPTIONS);
			});
		}
	}
}); */

function render() {
	PDFJS.getDocument(RENDER_OPTIONS.documentId)
		.then((pdf) => {
			// store the pdf code generated by pdfJS libe in RENDER_OPTIONS object
			RENDER_OPTIONS.pdfDocument = pdf;

			viewer.innerHTML = '';
			NUM_PAGES = pdf.pdfInfo.numPages;

			// create a page element (which includes a canvas AND svg.annotationLayer) for each page
			// originally, a page element also included a div.textLayer, but I've removed it
			for (let i = 0; i < NUM_PAGES; i++) {
				let page = UI.createPage(i + 1);

				// but hide each page element that is NOT the 1st page
				if (i > 0) {
					page.classList.add('hidden');
				}

				// append each newly created page element to the viewer element
				viewer.appendChild(page);
			}

			// use PDFJSAnnotate's UI.renderPage() to create the svg.annotationLayer, BUT ONLY for the 1st page
			// n.b., PDFJSAnnotate is NOT using pdfJS's own annotationLayer (which is a div, NOT an svg)
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS)
				.then(([pdfPage, annotations]) => {
					let viewport = pdfPage.getViewport(
						RENDER_OPTIONS.scale,
						RENDER_OPTIONS.rotate
					);
					/* console.log('viewport: ', viewport); */
					PAGE_HEIGHT = viewport.height;
				});

			// create an array to store references to the newly created page elements
			createdPageElms = Array.from(document.querySelectorAll('.page'));
		});
}
render();

// Nav button stuff
// this comes from my own 'pdf-page-script.js' (which was created using latest version of pdfJS)
(function () {
	// scroll up page
	function scrollUp(page) {
		viewer.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}

	// displays previous page
	const prevBtn = document.querySelector('.previous');
	function onPrevPage() {
		if (CURRENT_PAGE <= 1) {
			return;
		}
		CURRENT_PAGE--;
		createdPageElms[CURRENT_PAGE].classList.add('hidden');
		createdPageElms[CURRENT_PAGE - 1].classList.remove('hidden');
		if (!renderedPages[CURRENT_PAGE]) {
			renderedPages[CURRENT_PAGE] = true;
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS);
		}
		scrollUp(createdPageElms[CURRENT_PAGE - 1]);
		nextBtn.removeAttribute('disabled');
		if (CURRENT_PAGE <= 1) {
			prevBtn.setAttribute('disabled', true);
		}
	}
	prevBtn.addEventListener('click', onPrevPage);

	// displays next page
	const nextBtn = document.querySelector('.next');
	function onNextPage() {
		if (CURRENT_PAGE >= NUM_PAGES) {
			return;
		}
		prevBtn.removeAttribute('disabled');
		CURRENT_PAGE++;
		createdPageElms[CURRENT_PAGE - 2].classList.add('hidden');
		createdPageElms[CURRENT_PAGE - 1].classList.remove('hidden');
		if (!renderedPages[CURRENT_PAGE]) {
			renderedPages[CURRENT_PAGE] = true;
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS);
		}
		scrollUp(createdPageElms[CURRENT_PAGE - 1]);
		if (CURRENT_PAGE >= NUM_PAGES) {
			nextBtn.setAttribute('disabled', true);
		}
	}
	nextBtn.addEventListener('click', onNextPage);
})();

// Toolbar buttons
(function () {
	// always set initial tooltype state as 'none'
	// NO need to store tooltype state in localStorage b/c not persisting it after closing browser
	let tooltype = 'none';
	setActiveToolbarItem(tooltype);

	function setActiveToolbarItem(type, btn) {
		// when this function is invoked, the pre-existing state is 'tooltype'
		// the new state is 'type'
		console.log('preexisting state stored as tooltype: ', tooltype);
		console.log('new type passed as param: ', type);

		// turn off pre-existing button state
		let active = document.querySelector('.toolbar button.active');
		if (active) {
			active.classList.remove('active');

			switch (tooltype) {
			/* case 'cursor':
				UI.disableEdit();
				break; */
			case 'draw-red-line':
			case 'draw-blue-line':
			case 'draw-red-freehand':
			case 'draw-blue-freehand':
				UI.disablePen();
				break;
			case 'text-red':
			case 'text-blue':
				UI.disableText();
				break;
			/* case 'point':
				UI.disablePoint();
				break; */
			case 'area-red-border':
			case 'area-blue-border':
			/* case 'highlight':
			case 'strikeout': */
				UI.disableRect();
				break;
			}
		}

		// turn on current button state
		let button = btn || document.querySelector(`.toolbar button[data-tooltype=${type}]`);
		if (button) {
			button.classList.add('active');

			switch (type) {
			/* case 'cursor':
				UI.enableEdit();
				break; */
			// since NO LONGER using colorPicker and thicknessPicker for drawing, there is no need for setPen function (imported from UI.pen) anymore
			// instead, pass in type as a parameter to UI.enablePen just like what we already do for UI.enableRect(type) below
			case 'draw-red-line':
			case 'draw-blue-line':
			case 'draw-red-freehand':
			case 'draw-blue-freehand':
				UI.enablePen(type);
				break;
			case 'text-red':
			case 'text-blue':
				UI.enableText(type);
				break;
			/* case 'point':
				UI.enablePoint();
				break; */
			case 'area-red-border':
			case 'area-blue-border':
			/* case 'highlight':
			case 'strikeout': */
				UI.enableRect(type);
				break;
			}
		}

		// set passed in param ('type') to be the global variable ('tooltype')
		tooltype = type;
	}

	function handleToolbarClick(e) {
		const target = e.target;
		const type = e.target.getAttribute('data-tooltype');
		if (target.nodeName === 'BUTTON' && type) {
			console.log('handleToolbarClick type: ', type);

			// need to blur every button after it has been clicked; otherwise, it
			// will be affected by style imposed on all buttons by page-styles.css
			target.blur();

			if (type === 'page-clear' || type === tooltype) {
				// ensure that this clicked btn does NOT get activated, while
				// de-activating it if it is being re-clicked by user
				setActiveToolbarItem('none');
			} else {
				// normal behavior
				setActiveToolbarItem(type, target);
			}
		}
	}
	document.querySelector('.toolbar').addEventListener('click', handleToolbarClick);

	// a 'resetToolbar' event gets fired elsewhere whenever an annotation is created
	UI.addEventListener('resetToolbar', (e) => {
		// KEY: pass in preexisting 'tooltype' state so buttons (and their related listeners)
		// remain selected ('active') after drawing an annotation
		setActiveToolbarItem(tooltype);
	});
})();

// Text size stuff
/* (function () {
	let textSize;
	let textColor;

	function initText() {
		let size = document.querySelector('.toolbar .text-size');
		[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].forEach((s) => {
			size.appendChild(new Option(s, s));
		});

		setText(
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/text/size`) || 14,
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/text/color`) || '#000000');

		initColorPicker(document.querySelector('.text-color'), textColor, function (value) {
			setText(textSize, value);
		});
	}

	function setText(size, color) {
		let modified = false;

		if (textSize !== size) {
			modified = true;
			textSize = size;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/text/size`, textSize);
			document.querySelector('.toolbar .text-size').value = textSize;
		}

		if (textColor !== color) {
			modified = true;
			textColor = color;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/text/color`, textColor);

			let selected = document.querySelector('.toolbar .text-color.color-selected');
			if (selected) {
				selected.classList.remove('color-selected');
				selected.removeAttribute('aria-selected');
			}

			selected = document.querySelector(`.toolbar .text-color[data-color="${color}"]`);
			if (selected) {
				selected.classList.add('color-selected');
				selected.setAttribute('aria-selected', true);
			}

		}

		if (modified) {
			UI.setText(textSize, textColor);
		}
	}

	function handleTextSizeChange(e) {
		setText(e.target.value, textColor);
	}

	document.querySelector('.toolbar .text-size').addEventListener('change', handleTextSizeChange);

	initText();
})(); */

// Pen size stuff
/* (function () {
	let penSize;
	let penColor;

	function initPen() {
		let size = document.querySelector('.toolbar .pen-size');
		for (let i = 0; i < 20; i++) {
			size.appendChild(new Option(i + 1, i + 1));
		}

		setPen(
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/pen/size`) || 1,
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/pen/color`) || '#000000');

		initColorPicker(document.querySelector('.pen-color'), penColor, function (value) {
			setPen(penSize, value);
		});
	}

	function setPen(size, color) {
		let modified = false;

		if (penSize !== size) {
			modified = true;
			penSize = size;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/pen/size`, penSize);
			document.querySelector('.toolbar .pen-size').value = penSize;
		}

		if (penColor !== color) {
			modified = true;
			penColor = color;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/pen/color`, penColor);

			let selected = document.querySelector('.toolbar .pen-color.color-selected');
			if (selected) {
				selected.classList.remove('color-selected');
				selected.removeAttribute('aria-selected');
			}

			selected = document.querySelector(`.toolbar .pen-color[data-color="${color}"]`);
			if (selected) {
				selected.classList.add('color-selected');
				selected.setAttribute('aria-selected', true);
			}
		}

		if (modified) {
			UI.setPen(penSize, penColor);
		}
	}

	function handlePenSizeChange(e) {
		setPen(e.target.value, penColor);
	}

	document.querySelector('.toolbar .pen-size').addEventListener('change', handlePenSizeChange);

	initPen();
})(); */

// Scale/rotate
/* (function () {
	function setScaleRotate(scale, rotate) {
		scale = parseFloat(scale, 10);
		rotate = parseInt(rotate, 10);

		if (RENDER_OPTIONS.scale !== scale || RENDER_OPTIONS.rotate !== rotate) {
			RENDER_OPTIONS.scale = scale;
			RENDER_OPTIONS.rotate = rotate;

			localStorage.setItem(`${RENDER_OPTIONS.documentId}/scale`, RENDER_OPTIONS.scale);
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/rotate`, RENDER_OPTIONS.rotate % 360);

			render();
		}
	}

	function handleScaleChange(e) {
		setScaleRotate(e.target.value, RENDER_OPTIONS.rotate);
	}

	function handleRotateCWClick() {
		setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate + 90);
	}

	function handleRotateCCWClick() {
		setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate - 90);
	}

	document.querySelector('.toolbar select.scale').value = RENDER_OPTIONS.scale;
	document.querySelector('.toolbar select.scale').addEventListener('change', handleScaleChange);
	document.querySelector('.toolbar .rotate-ccw').addEventListener('click', handleRotateCCWClick);
	document.querySelector('.toolbar .rotate-cw').addEventListener('click', handleRotateCWClick);
})(); */

// Clear and page-clear toolbar button
(function () {
	/* function handleClearClick(e) {
		if (confirm('\nAre you sure you want to clear ALL annotations?')) {
			for (let i = 0; i < NUM_PAGES; i++) {
				document.querySelector(`div#pageContainer${i+1} svg.annotationLayer`).innerHTML = '';
			}

			localStorage.removeItem(`${RENDER_OPTIONS.documentId}/annotations`);
		}
	}
	document.querySelector('.toolbar .clear').addEventListener('click', handleClearClick); */

	function handlePageClearClick(e) {
		const page = document.querySelector('div.page:not(.hidden)');
		const annoLayer = page.querySelector('svg.annotationLayer');
		if (annoLayer && annoLayer.innerHTML.trim().length > 0) {
			if (confirm('\nRemove all the annotations from this page?')) {
				const num = page.getAttribute('data-page-number');
				annoLayer.innerHTML = '';
				removeFromStorage(num);
			}
		}
	}

	function removeFromStorage(num) {
		const clearedPageNum = parseInt(num, 10);
		const storedArray = JSON.parse(localStorage.getItem(`${RENDER_OPTIONS.documentId}/annotations`));
		const newArray = JSON.stringify(storedArray.filter((o) => o.page !== clearedPageNum));
		localStorage.setItem(`${RENDER_OPTIONS.documentId}/annotations`, newArray);
	}

	document.querySelector('.toolbar .page-clear').addEventListener('click', handlePageClearClick);
})();

// Comment stuff -- triggered by 'point' button
/* (function (window, document) {
	let commentList = document.querySelector('#comment-wrapper .comment-list-container');
	let commentForm = document.querySelector('#comment-wrapper .comment-list-form');
	let commentText = commentForm.querySelector('input[type="text"]');

	function supportsComments(target) {
		let type = target.getAttribute('data-pdf-annotate-type');
		return ['point', 'highlight', 'area'].indexOf(type) > -1;
	}

	function insertComment(comment) {
		let child = document.createElement('div');
		child.className = 'comment-list-item';
		child.innerHTML = twitter.autoLink(twitter.htmlEscape(comment.content));

		commentList.appendChild(child);
	}

	function handleAnnotationClick(target) {
		if (supportsComments(target)) {
			let documentId = target.parentNode.getAttribute('data-pdf-annotate-document');
			let annotationId = target.getAttribute('data-pdf-annotate-id');

			PDFJSAnnotate.getStoreAdapter().getComments(documentId, annotationId).then((comments) => {
				commentList.innerHTML = '';
				commentForm.style.display = '';
				commentText.focus();

				commentForm.onsubmit = function () {
					PDFJSAnnotate.getStoreAdapter().addComment(documentId, annotationId, commentText.value.trim())
					.then(insertComment)
					.then(() => {
						commentText.value = '';
						commentText.focus();
					});

					return false;
				};

				comments.forEach(insertComment);
			});
		}
	}

	function handleAnnotationBlur(target) {
		if (supportsComments(target)) {
			commentList.innerHTML = '';
			commentForm.style.display = 'none';
			commentForm.onsubmit = null;

			insertComment({
				content: 'No comments'
			});
		}
	}

	UI.addEventListener('annotation:click', handleAnnotationClick);
	UI.addEventListener('annotation:blur', handleAnnotationBlur);
})(window, document); */
