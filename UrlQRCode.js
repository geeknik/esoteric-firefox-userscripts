// ==UserScript==
// @name         URL QR Code Overlay
// @namespace    https://github.com/geeknik/esoteric-firefox-userscripts
// @version      0.1
// @description  Display a QR code for the current page in a small overlay. Press Ctrl+Shift+Q to toggle.
// @author       geeknik
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let modal;

    function createModal() {
        const url = encodeURIComponent(window.location.href);
        const imgSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=200x200`;

        modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.bottom = '10px';
        modal.style.right = '10px';
        modal.style.zIndex = '10000';
        modal.style.backgroundColor = '#fff';
        modal.style.border = '1px solid #000';
        modal.style.padding = '10px';
        modal.style.borderRadius = '5px';
        modal.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '2px';
        closeBtn.style.right = '4px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'transparent';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '16px';
        closeBtn.addEventListener('click', hideModal);

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'QR code for this URL';
        img.width = 200;
        img.height = 200;

        modal.appendChild(closeBtn);
        modal.appendChild(img);
        document.body.appendChild(modal);
    }

    function showModal() {
        if (!modal) {
            createModal();
        } else {
            modal.style.display = 'block';
        }
    }

    function hideModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
            if (!modal || modal.style.display === 'none') {
                showModal();
            } else {
                hideModal();
            }
        }
    });
})();
