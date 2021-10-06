import createStyleSheet from 'create-stylesheet';

export const BORDER_COLOR = '#00BFFF';

const userSelectStyleSheet = createStyleSheet({
	body: {
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		'user-select': 'none'
	}
});
userSelectStyleSheet.setAttribute('data-pdf-annotate-user-select', 'true');

/**
 * Find the SVGElement that contains all the annotations for a page
 *
 * @param {Element} node An annotation within that container
 * @return {SVGElement} The container SVG or null if it can't be found
 */
export function findSVGContainer(node) {
	let parentNode = node;
	while ((parentNode = parentNode.parentNode) &&
		parentNode !== document) {
		if (parentNode.nodeName.toUpperCase() === 'SVG' &&
			parentNode.getAttribute('data-pdf-annotate-container') === 'true') {
			return parentNode;
		}
	}

	return null;
}

/**
 * Find an SVGElement container at a given point
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {SVGElement} The container SVG or null if one can't be found
 */
export function findSVGAtPoint(x, y) {
	let elements = document.querySelectorAll('svg[data-pdf-annotate-container="true"]');

	for (let i = 0, l = elements.length; i < l; i++) {
		let el = elements[i];
		let rect = el.getBoundingClientRect();

		if (pointIntersectsRect(x, y, rect)) {
			return el;
		}
	}

	return null;
}

/**
 * Find an Element that represents an annotation at a given point
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {Element} The annotation element or null if one can't be found
 */
export function findAnnotationAtPoint(x, y) {
	// First, find the parent svg container
	let svg = findSVGAtPoint(x, y);
	if (!svg) {
		return; // bail
	}

	// TEST method
	/* const elm = document.elementFromPoint(x, y);
	console.log('test elm: ', elm);

	if (elm) {
		return elm;
	}

	return null; */

	// Second, get a list of all the child svgs within that parent svg container
	let elements = Array.from(svg.querySelectorAll('[data-pdf-annotate-type]'));

	// Third, loop thru these child svgs to find the 1st one whose extrapolated 4-sided rect contains (i.e., 'intersects') the clicked point (x, y)
	for (let i = 0, l = elements.length; i < l; i++) {
		let el = elements[i];

		// this is the key function call -- to get the bounding client rect for each child svg element in the parent svg container -- see below
		let rect = getOffsetAnnotationRect(el, svg); //*****************

		if (pointIntersectsRect(x, y, rect)) {
			return el;
		}
	}

	return null;
}

/**
 * Determine if a point intersects a rect
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Object} rect The points of a rect (likely from getBoundingClientRect)
 * @return {Boolean} True if a collision occurs, otherwise false
 */
export function pointIntersectsRect(x, y, rect) {
	return y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right;
}


// MINE
export function getScrolledOffsetAnnotationRect(el, svg) {
	let rect = getAnnotationRect(el, svg);

	let {
		offsetLeft,
		offsetTop
	} = getOffset(el);

	let {
		scrollTop,
		scrollLeft
	} = getScroll(el);

	console.log('OFFSET_left: ', offsetLeft);
	console.log('SCROLL_left: ', scrollLeft);
	console.log('window.pageXOffset: ', window.pageXOffset);
	console.log('___OFFSET_top: ', offsetTop);
	console.log('___SCROLL_top: ', scrollTop);
	console.log('___window.pageYOffset: ', window.pageYOffset);


	return {
		/* top: rect.top + offsetTop - scrollTop,
		left: rect.left + offsetLeft - scrollLeft,
		right: rect.right + offsetLeft - scrollLeft,
		bottom: rect.bottom + offsetTop - scrollTop */

		top: rect.top + offsetTop - scrollTop,
		left: rect.left + offsetLeft - scrollLeft,
		right: rect.right + offsetLeft - scrollLeft,
		bottom: rect.bottom + offsetTop - scrollTop
	};
}



/**
 * Get the rect of an annotation element accounting for parent svg's offset.
 *
 * @param {Element} el The element to get the rect of
 * @return {Object} The dimensions of the element
 */
export function getOffsetAnnotationRect(el, svg) {
	let rect = getAnnotationRect(el, svg);

	let {
		offsetLeft,
		offsetTop
	} = getOffset(el);

	const h = rect.height;
	const w = rect.width;
	const x = rect.left + offsetLeft;
	const y = rect.top + offsetTop;

	console.log('offset x1_x2: ', x, x+w);
	console.log('offset y1_y2: ', y, y+h);

	return {
		left: x,
		width: w,
		right: x + w,
		top: y,
		height: h,
		bottom: y + h
	};
}

/**
 * Get the rect of an annotation element.
 *
 * @param {Element} el The element to get the rect of
 * @param {Element} svg The element's parent svg container
 * @return {Object} The dimensions of the element
 */
export function getAnnotationRect(el, svg) {
	let h = 0,
		w = 0,
		x = 0,
		y = 0;

	let rect = el.getBoundingClientRect();
	let elNodeName = el.nodeName.toLowerCase();

	// TODO these should be calculated somehow
	// These 2 constants come into play when dealing with a zero height or zero width svg line element
	const LINE_HEIGHT_ADJUSTED = 16;
	const LINE_WIDTH_ADJUSTED = 8;

	switch (elNodeName) {
	case 'path': // applicable to freehand pen draws
		let minX,
			maxX,
			minY,
			maxY;

		el.getAttribute('d').replace(/Z/, '').split('M').splice(1).forEach((p) => {
			var s = p.split(' ').map(i => parseInt(i, 10));

			if (typeof minX === 'undefined' || s[0] < minX) {
				minX = s[0];
			}
			if (typeof maxX === 'undefined' || s[2] > maxX) {
				maxX = s[2];
			}
			if (typeof minY === 'undefined' || s[1] < minY) {
				minY = s[1];
			}
			if (typeof maxY === 'undefined' || s[3] > maxY) {
				maxY = s[3];
			}
		});

		h = maxY - minY;
		w = maxX - minX;
		x = minX;
		y = minY;
		break;

	// I revamped this block so that it also covers all possible straight lines, NOT just the ones that are horizontal
	case 'line': // applicable to straight lines
		const _x1 = parseInt(el.getAttribute('x1'), 10);
		const _y1 = parseInt(el.getAttribute('y1'), 10);
		const _x2 = parseInt(el.getAttribute('x2'), 10);
		const _y2 = parseInt(el.getAttribute('y2'), 10);

		y = Math.min(_y1, _y2);
		x = Math.min(_x1, _x2);
		h = Math.abs(_y1 - _y2);
		w = Math.abs(_x1 - _x2);
		/* console.log('x y w h: ', x, y, w, h); */

		if (h === 0) {
			h += LINE_HEIGHT_ADJUSTED;
			y -= (LINE_HEIGHT_ADJUSTED / 2);
		}
		if (w === 0) {
			w += LINE_WIDTH_ADJUSTED;
			x -= (LINE_WIDTH_ADJUSTED / 2);
		}
		break;

	case 'text':
		h = rect.height;
		w = rect.width;
		x = parseInt(el.getAttribute('x'), 10);
		y = parseInt(el.getAttribute('y'), 10) - h;
		break;

	case 'g':
		let {
			offsetLeft,
			offsetTop
		} = getOffset(el);

		h = rect.height;
		w = rect.width;
		x = rect.left - offsetLeft;
		y = rect.top - offsetTop;

		if (el.getAttribute('data-pdf-annotate-type') === 'strikeout') {
			h += LINE_HEIGHT_ADJUSTED;
			y -= (LINE_HEIGHT_ADJUSTED / 2);
		}
		break;

	case 'rect': // applicable to red and blue rectangles
	case 'svg':
		h = parseInt(el.getAttribute('height'), 10);
		w = parseInt(el.getAttribute('width'), 10);
		x = parseInt(el.getAttribute('x'), 10);
		y = parseInt(el.getAttribute('y'), 10);
		break;
	}

	// Result provides same properties as getBoundingClientRect
	let result = {
		left: x,
		width: w,
		right: x + w,
		top: y,
		height: h,
		bottom: y + h
	};

	// For the case of nested SVG (point annotations) and grouped
	// lines or rects no adjustment needs to be made for scale.
	// I assume that the scale is already being handled
	// natively by virtue of the `transform` attribute.
	/* console.log('svg: ', svg);
	console.log('elNodeName: ', elNodeName); */
	if (!/^(svg|g)$/.test(elNodeName)) {
		result = scaleUp(svg, result);
	}

	console.log('pureScaledUp x1_x2: ', result.left, result.right);
	console.log('pureScaledUp y1_y2: ', result.top, result.bottom);

	return result;
}

/**
 * Adjust scale from normalized scale (100%) to rendered scale.
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled up
 */
export function scaleUp(svg, rect) {
	let result = {};
	let { viewport } = getMetadata(svg);
	console.log('svg: ', svg);
	console.log('typeof viewport.scale: ', typeof viewport.scale);

	Object.keys(rect).forEach((key) => {
		result[key] = rect[key] * viewport.scale;
	});

	return result;
}

/**
 * Adjust scale from rendered scale to a normalized scale (100%).
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled down
 */
export function scaleDown(svg, rect) {
	let result = {};
	let { viewport } = getMetadata(svg);

	Object.keys(rect).forEach((key) => {
		result[key] = rect[key] / viewport.scale;
	});

	return result;
}

/**
 * Get the scroll position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the scroll position for
 * @return {Object} The scrollTop and scrollLeft position
 */
export function getScroll(el) {
	let scrollTop = 0;
	let scrollLeft = 0;
	let parentNode = el;

	while ((parentNode = parentNode.parentNode) &&
			parentNode !== document
	) {
		scrollTop += parentNode.scrollTop;
		scrollLeft += parentNode.scrollLeft;
	}

	return {
		scrollTop,
		scrollLeft
	};
}

/**
 * Get the offset position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the offset position for
 * @return {Object} The offsetTop and offsetLeft position
 */
export function getOffset(el) {
	let parentNode = el.closest('svg.annotationLayer');

	/* while ((parentNode = parentNode.parentNode) &&
			parentNode !== document
	) {
		if (parentNode.nodeName.toUpperCase() === 'SVG') {
			break;
		}
	} */

	let rect = parentNode.getBoundingClientRect();

	return {
		offsetLeft: Math.max(0, rect.left),
		offsetTop: Math.max(0, rect.top)
	};
}

/**
 * Disable user ability to select text on page
 */
export function disableUserSelect() {
	if (!userSelectStyleSheet.parentNode) {
		document.head.appendChild(userSelectStyleSheet);
	}
}

/**
 * Enable user ability to select text on page
 */
export function enableUserSelect() {
	if (userSelectStyleSheet.parentNode) {
		userSelectStyleSheet.parentNode.removeChild(userSelectStyleSheet);
	}
}

/**
 * Get the metadata for a SVG container
 *
 * @param {SVGElement} svg The SVG container to get metadata for
 */
export function getMetadata(svg) {
	return {
		documentId: svg.getAttribute('data-pdf-annotate-document'),
		pageNumber: parseInt(svg.getAttribute('data-pdf-annotate-page'), 10),
		viewport: JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'))
	};
}
