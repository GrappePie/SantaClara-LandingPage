import { useEffect } from 'react';

function PDFViewer({ src, width = "100%", height = "100%" }) {
    // get full height of window and subtract 64px for the header
    useEffect(() => {
        height = window.innerHeight - 64;
        document.querySelector("iframe").style.height = `${height}px`;
    }, []);
    return (
        <iframe
            src={src}
            width={width}
            height={height}
            style={{ border: "none" }}
            allowFullScreen
        ></iframe>
    );
}

export default PDFViewer;