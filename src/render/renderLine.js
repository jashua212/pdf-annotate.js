import setAttributes from '../utils/setAttributes';
import normalizeColor from '../utils/normalizeColor';

function renderRectLine(a) {
	let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	setAttributes(group, {
		stroke: normalizeColor(a.color || '#f00'),
		strokeWidth: a.width || 1
	});

	a.rectangles.forEach((r) => {
		let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

		setAttributes(line, {
			x1: r.x,
			y1: r.y,
			x2: r.x + r.width,
			y2: r.y,
		});

		group.appendChild(line);
	});

	return group;
}

function renderPureLine(a) {
	let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	console.log('a: ', a);

	setAttributes(line, {
		stroke: normalizeColor(a.color || '#f00'),
		strokeWidth: a.width || 1,
		x1: a.lines[0][0],
		y1: a.lines[0][1],
		x2: a.lines[1][0],
		y2: a.lines[1][1]
	});

	return line;
}


/**
 * Create SVGLineElements from an annotation definition.
 * This is used for annotations of type `strikeout` or `line`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement} A group of all lines to be rendered
 */
export default function renderLine(a) {
	if (a.rectangles) {
		return renderRectLine(a);
	} else {
		return renderPureLine(a);
	}
}
