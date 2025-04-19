let pdfDocument = null;

function loadPDF(path) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-5.1.91-dist/build/pdf.worker.mjs';
  pdfjsLib.GlobalWorkerOptions.cMapUrl = 'pdfjs-5.1.91-dist/web/cmaps/';
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
  }).catch((err) => {
    console.error(err);
  });
}

function previous() {}

function next() {}

function zoomOut() {}

function zoomIn() {}
