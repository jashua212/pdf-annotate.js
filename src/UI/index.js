
// this file must be a webpack thing -- i.e., this index.js file seems to be used as an aggregator for importing and then exporting all the exports from the other .js files in this 'UI' submodule

import {
    addEventListener,
    removeEventListener,
    fireEvent
}
from './event';

import {
    disableEdit,
    enableEdit
}
from './edit';

import {
    disablePen,
    enablePen,
    setPen
}
from './pen';

import {
    disablePoint,
    enablePoint
}
from './point';

import {
    disableRect,
    enableRect
}
from './rect';

import {
    disableText,
    enableText,
    setText
}
from './text';

import {
    createPage,
    renderPage
}
from './page';

export default {
    addEventListener,
    removeEventListener,
    fireEvent,
    disableEdit,
    enableEdit,
    disablePen,
    enablePen,
    setPen,
    disablePoint,
    enablePoint,
    disableRect,
    enableRect,
    disableText,
    enableText,
    setText,
    createPage,
    renderPage
};
