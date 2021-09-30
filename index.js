
// this file must be a webpack thing -- i.e., this index.js here at the ROOT seems to be used as an aggregator for webpack to compile the exports from all the .js files in the SRC directory and putting the resulting build into the DIST directory
// N.B.: the compiled, built version that is put into the DIST directory is just of the PDFJSAnnotate library alone -- it does NOT include the code in the docs/main.js file


import PDFJSAnnotate from './src/PDFJSAnnotate';

export default PDFJSAnnotate;
