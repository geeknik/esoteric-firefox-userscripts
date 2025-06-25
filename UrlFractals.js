// ==UserScript==
// @name URL Fractals
// @version 0.3
// @description Draws a unique Mandelbrot fractal based upon the full URL
// @author geeknik
// @match *://*/*
// @grant none
// ==/UserScript==

(function() {
    function hashCode(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    const url = window.location.href;
    const hash = hashCode(url);
    const offset = {
        x: ((hash & 0xFFFF) / 0xFFFF) * 1 - 0.5, // Adjust range for x-offset (-0.5 to 0.5)
        y: ((hash >> 16 & 0xFFFF) / 0xFFFF) * 1 - 0.5 // Adjust range for y-offset (-0.5 to 0.5)
    };
    // Bitwise operations in JavaScript operate on 32bit signed integers. The
    // previous code attempted to use the upper 32 bits of `hash` which always
    // resulted in zero. Use the absolute value of the hash instead so each URL
    // generates a different zoom factor.
    const zoom = 0.1 + (Math.abs(hash % 0x7fffffff) / 0x7fffffff) * 0.1;

    function drawFractal(canvas, color, iterations) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const scale = 4 / Math.min(w, h) * zoom;

        for(var row = 0; row < h; row++) {
            for(var col = 0; col < w; col++) {
                var c_re = (col - w / 2) * scale + offset.x;
                var c_im = (row - h / 2) * scale + offset.y;
                var x = 0, y = 0;
                var iteration = 0;

                while (x*x + y*y <= (1 << 16) && iteration < iterations) {
                    var x_new = x*x - y*y + c_re;
                    y = 2*x*y + c_im;
                    x = x_new;
                    iteration++;
                }

                var pixelIndex = (col + row * w) * 4;
                data[pixelIndex] = Math.round(iteration % 256 || color[0]);
                data[pixelIndex + 1] = Math.round(iteration % 256 || color[1]);
                data[pixelIndex + 2] = Math.round(iteration % 256 || color[2]);
                data[pixelIndex + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    function showModal(colors) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '10px';
        modal.style.right = '10px';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';

        const canvas = document.createElement('canvas');
        canvas.width = 400; // Increase the resolution
        canvas.height = 400; // Increase the resolution

        modal.appendChild(canvas);
        document.body.appendChild(modal);

        drawFractal(canvas, colors, 10000); // Increase the maximum iteration count

        const downloadLink = document.createElement('a');
        downloadLink.download = `${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.textContent = 'Download Image';
        downloadLink.style.marginTop = '10px';
        modal.appendChild(downloadLink);
    }

    if (window.location.href) {
        const colorCode = [Math.abs(hash % 256), Math.abs((hash >> 8) % 256), Math.abs((hash >> 16) % 256)]; // Create RGB colors using parts of the hash
        showModal(colorCode);
    }
})();
