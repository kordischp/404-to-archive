// ==UserScript==
// @name         404 to Archive Redirecter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Detects 404/Not Found pages and redirects to the archived version on archive.org
// @author       Patryk Kordisch
// @match        *://*/*
// @run-at       document-end
// @exclude      *://web.archive.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Function to determine if the page appears to be a 404/Not Found page.
    function is404Page() {
        // Look at the page title and common phrases in the body text.
        const title = document.title.toLowerCase();
        const bodyText = document.body ? document.body.innerText.toLowerCase() : "";

        // Common indicators
        if (title.includes("404") || title.includes("not found")) {
            return true;
        }
        if (bodyText.includes("404 not found") || bodyText.includes("404 error")) {
            return true;
        }
        return false;
    }


    // Confirmation dialog
    function offerRedirect(archiveUrl) {
        if (confirm(`This appears to be a missing page.\n\nWould you like to view an archived version?`)) {
            window.location.href = archiveUrl;
        }
    }

    
    // If the current page qualifies as a 404 and user confirms it, he gets redirected to the archive
    setTimeout(() => {
        if (is404Page()) {
            // Get URL
            const currentUrl = window.location.href;
            const archiveUrl = "https://web.archive.org/web/" + currentUrl;

            setTimeout(() => offerRedirect(archiveUrl), 500);
        }
    }, 2000);




})();