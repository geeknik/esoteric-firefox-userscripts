// ==UserScript==
// @name         HTTP Status Checker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Check the HTTP status codes of all the links on a webpage and display them next to the links
// @author       geeknik
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Array to store all detected links on a webpage
    var links = Array.from(document.getElementsByTagName('a'));

    // Function to fetch the URL and display the HTTP status code next to the link
    function checkLinkStatus(link) {
        fetch(link.href)
        .then(response => {
            const statusCode = response.status;
            const statusText = document.createElement('sub');
            statusText.textContent = `(${statusCode})`;

            if (statusCode >= 200 && statusCode < 300) {
                statusText.style.color = 'green';
            } else if (statusCode >= 400) {
                statusText.style.color = 'red';
            } else {
                statusText.style.color = 'yellow';
            }

            link.insertAdjacentElement('afterend', statusText);
        })
        .catch(error => {
            console.log(`Error fetching ${link.href}: ${error}`);
        });
    }

    // Iterate over all links and check their status
    links.forEach(link => {
        checkLinkStatus(link);
    });
})();
