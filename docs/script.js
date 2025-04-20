let pdfDocument = null;
let pageNumber = 1;
let scale = 1.5;

function loadPDF(path) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-5.1.91-dist/build/pdf.worker.mjs';
  pdfjsLib.GlobalWorkerOptions.cMapUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/pdfjs-5.1.91-dist/web/cmaps/'
      : 'https://wasabina67.github.io/pdf.js-example/pdfjs-5.1.91-dist/web/cmaps/';
  pdfjsLib.GlobalWorkerOptions.cMapPacked = true;

  const canvas = document.getElementById('canvas-pdf');
  const ctx = canvas.getContext('2d');

  pdfjsLib.getDocument({
    url: path,
    cMapUrl: pdfjsLib.GlobalWorkerOptions.cMapUrl,
    cMapPacked: pdfjsLib.GlobalWorkerOptions.cMapPacked,
    useWorkerFetch: true
  }).promise.then((pdf) => {
    pdfDocument = pdf;
    renderPage(pageNumber, canvas, ctx);
  }).catch((err) => {
    console.error('Error loading PDF:', err);
  });
}

function renderPage(num, canvas, ctx) {
  pdfDocument.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);

    // Update display
  });
}

function previous() {}

function next() {}

function zoomOut() {}

function zoomIn() {}
