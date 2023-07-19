// ==UserScript==
// @name     Same-Origin Policy Bypass Detector
// @version  0.2
// @grant    none
// @author   geeknik
// @description Detects potential same-origin policy bypass vulnerabilities
// @include  http://*
// @include  https://*
// ==/UserScript==

(function() {
    'use strict';

    // Create a banner to display warnings
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = '#ff0000';
    banner.style.color = '#ffffff';
    banner.style.zIndex = '10000';
    banner.style.padding = '10px';
    banner.style.boxSizing = 'border-box';
    document.body.appendChild(banner);

    // Function to add a warning to the banner
    const addWarning = text => {
        const warning = document.createElement('p');
        warning.textContent = `WARNING: ${text}`;
        banner.appendChild(warning);
    };

    // Check for potential document.domain vulnerabilities
    if (document.domain !== location.hostname) {
        addWarning('Potential document.domain vulnerability detected. document.domain does not match location.hostname.');
    }

    // Listen for postMessage events
    window.addEventListener('message', event => {
        if (event.origin !== window.location.origin) {
            addWarning(`Potential postMessage vulnerability detected. Received message from different origin: ${event.origin}`);
        }
    });

    // Check for potential window.name vulnerabilities
    if (window.name) {
        addWarning(`Potential window.name vulnerability detected. window.name is set to: ${window.name}`);
    }

    // Check for potential misconfigured CORS headers
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.href, true);

    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
            var headers = xhr.getAllResponseHeaders().toLowerCase();
            if (headers.includes('access-control-allow-origin: *')) {
                addWarning('Potential misconfigured CORS header detected. Access-Control-Allow-Origin is set to *.');
            }
        }
    }

    xhr.send(null);

    // Check for potential vulnerable localStorage or sessionStorage data
    if (window.localStorage.length > 0 || window.sessionStorage.length > 0) {
        addWarning('Potential vulnerable localStorage or sessionStorage data detected.');
    }
})();
