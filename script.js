// Function to copy the content of the textarea to the clipboard
function copyToClipboard(selector) {
    const code = document.querySelector(selector).value;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
}

// Function to download the code as a file
function downloadCode(selector, filename) {
    const code = document.querySelector(selector).value;
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Function to update the iframe output in real-time
function updateOutput() {
    const htmlCode = document.querySelector('.html-input').value;
    const cssCode = `<style>${document.querySelector('.css-input').value}</style>`;
    const jsCode = document.querySelector('.js-input').value;

    const iframe = document.getElementById('output');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(htmlCode + cssCode);
    iframeDoc.close();

    // Adding JavaScript dynamically
    const script = iframeDoc.createElement('script');
    script.textContent = jsCode;
    iframeDoc.body.appendChild(script);
}

// Attach event listeners for real-time updates
document.querySelector('.html-input').addEventListener('input', updateOutput);
document.querySelector('.css-input').addEventListener('input', updateOutput);
document.querySelector('.js-input').addEventListener('input', updateOutput);

// Initial call to update the output when the page loads
updateOutput();
