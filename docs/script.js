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

  pdfjsLib.getDocument({
    url: path,
    cMapUrl: pdfjsLib.GlobalWorkerOptions.cMapUrl,
    cMapPacked: pdfjsLib.GlobalWorkerOptions.cMapPacked,
    useWorkerFetch: true
  }).promise.then((pdf) => {
    pdfDocument = pdf;
    pageNumber = 1;
    renderPage();
  }).catch((err) => {
    console.error('Error loading PDF:', err);
  });
}

function renderPage() {
  const canvas = document.getElementById('canvas-pdf');
  const ctx = canvas.getContext('2d');

  pdfDocument.getPage(pageNumber).then((page) => {
    const viewport = page.getViewport({ scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);

    document.getElementById('page-num').textContent = pageNumber.toLocaleString();
    document.getElementById('page-count').textContent = pdfDocument.numPages.toLocaleString();
    document.getElementById('zoom-level').textContent = `${Math.round(scale * 100)}`;
  });
}

function previous() {
  if (pageNumber > 1) {
    pageNumber--;
    renderPage();
  }
}

function next() {
  if (pageNumber < pdfDocument.numPages) {
    pageNumber++;
    renderPage();
  }
}

function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.25;
    renderPage();
  }
}

function zoomIn() {
  scale += 0.25;
  renderPage();
}

window.addEventListener('load', () => {
  const path = 'pdfs/gakumonno_susume.pdf';
  loadPDF(path);
});
