
// this file must be a webpack thing -- i.e., this index.js file seems to be used as an aggregator for importing and then exporting all the exports from the other .js files in this 'render' submodule


// this import seems to be unnecessary and circular, but this technique is employed in other modules, so I'll leave this in out of an abundance of caution (presumably webpack will know to handle this correctly)
import PDFJSAnnotate from '../PDFJSAnnotate';

// I am commenting out this import because it seems to be NOT used at all
/* import renderScreenReaderHints from '../a11y/renderScreenReaderHints'; */

import appendChild from './appendChild';


/**
 * Render the response from PDFJSAnnotate.getStoreAdapter().getAnnotations to SVG
 *
 * @param {SVGElement} svg The SVG element to render the annotations to
 * @param {Object} viewport The page viewport data
 * @param {Object} data The response from PDFJSAnnotate.getStoreAdapter().getAnnotations
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: SVGElement
 *    - rejected: Error
 */
export default function render(svg, viewport, data) {
	console.log('svg: ', svg);

	return new Promise((resolve, reject) => {
		// Reset the content of the SVG
		svg.innerHTML = '';
		svg.setAttribute('data-pdf-annotate-container', true);
		svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));
		svg.removeAttribute('data-pdf-annotate-document');
		svg.removeAttribute('data-pdf-annotate-page');

		// If there's no data nothing can be done
		if (!data) {
			return resolve(svg);
		}

		svg.setAttribute('data-pdf-annotate-document', data.documentId);
		svg.setAttribute('data-pdf-annotate-page', data.pageNumber);

		// Make sure annotations is an array
		if (!Array.isArray(data.annotations) || data.annotations.length === 0) {
			return resolve(svg);
		}

		// Append annotation to svg
		data.annotations.forEach((a) => {
			appendChild(svg, a, viewport);
		});

		resolve(svg);
	});
}
