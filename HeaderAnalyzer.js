// ==UserScript==
// @name         Header Analyzer
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Analyze HTTP headers for potential security issues and display results in a floating overlay window
// @author       geeknik
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function createModal(content) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '10px';
        modal.style.right = '10px';
        modal.style.zIndex = '9999';
        modal.style.padding = '10px';
        modal.style.backgroundColor = 'white';
        modal.style.border = '1px solid black';
        modal.style.borderRadius = '5px';
        modal.style.fontFamily = 'Arial, sans-serif';
        modal.style.fontSize = '14px';
        modal.style.lineHeight = '1.5';
        modal.style.color = 'black';
        modal.innerHTML = content;

        document.body.appendChild(modal);
    }

    function analyzeHeaders() {
        GM_xmlhttpRequest({
            method: "HEAD",
            url: window.location.href,
            onload: function(response) {
                const headers = response.responseHeaders.split('\n').reduce((acc, headerLine) => {
                    const [name, value] = headerLine.split(': ');
                    if (name) {
                        acc[name.toLowerCase()] = value;
                    }
                    return acc;
                }, {});

                let analysisResults = '';
                if (!headers['strict-transport-security']) {
                    analysisResults += 'Missing Strict-Transport-Security header.<br>';
                }
                if (!headers['content-security-policy']) {
                    analysisResults += 'Missing Content-Security-Policy header.<br>';
                }
                if (!headers['x-content-type-options']) {
                    analysisResults += 'Missing X-Content-Type-Options header.<br>';
                }
                if (!headers['x-frame-options']) {
                    analysisResults += 'Missing X-Frame-Options header.<br>';
                }
                if (!headers['x-xss-protection']) {
                    analysisResults += 'Missing X-XSS-Protection header.<br>';
                }
                if (!headers['feature-policy']) {
                    analysisResults += 'Missing Feature-Policy header.<br>';
                }
                if (!headers['referrer-policy']) {
                    analysisResults += 'Missing Referrer-Policy header.<br>';
                }
                if (!headers['permissions-policy']) {
                    analysisResults += 'Missing Permissions-Policy header.<br>';
                }
                if (!headers['expect-ct']) {
                    analysisResults += 'Missing Expect-CT header.<br>';
                }
                if (!headers['content-type']) {
                    analysisResults += 'Missing Content-Type header.<br>';
                }
                if (!headers['content-encoding']) {
                    analysisResults += 'Missing Content-Encoding header.<br>';
                }

                if (analysisResults) {
                    createModal(`<strong>Header analysis results:</strong><br>${analysisResults}`);
                }
            }
        });
    }

    // Call the function when the script runs
    analyzeHeaders();
})();
