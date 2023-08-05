// ==UserScript==
// @name             melonHusk
// @description      This userscript will replace all instances of "Elon Musk" and "Elon Reeve Musk" with a pre-defined anagram in web pages loaded by Firefox.
// @match            *://*/*
// @version          0.3
// @author           geeknik
// @grant            none
// ==/UserScript==

(function() {
    const replaceRegex = /(Elon Reeve Musk|Elon Musk)/gi;
    
    const anagramsElonMusk = [
        "Lemon Kus", 
        "Monk Lues", 
        "Sulk Mone", 
        "Some Knull", 
        "Lumen Sok",
        "Solemn UK",
        "Sunk Mole",
        "Mules Kon",
        "Klue Mons",
        "Soul Menk",
        "Lone Skum",
        "Keno Slum",
        "Mule Noks",
        "Sunk Mole",
        "Lose Munk"
    ];

    const anagramsElonReeveMusk = [
        "Universe Mole K", 
        "Eleven Smoke Ru", 
        "Revokes Menu El", 
        "Venue Elk Mores", 
        "Keen Slum Rover",
        "Sneer Vole Muk",
        "Revoke Lens Ume",
        "Levers Muen Ok",
        "Kevens Rule Mo",
        "Serve Mule Nok",
        "Sleek Oven Rum",
        "Reek Lumen Sov",
        "Levee Rusk Mon",
        "Evoke Lens Rum",
        "Serve Lumen Ok"
    ];

    function getRandomAnagram(match) {
        let anagramList;
        
        if (match.toLowerCase() === "elon musk") {
            anagramList = anagramsElonMusk;
        } else if (match.toLowerCase() === "elon reeve musk") {
            anagramList = anagramsElonReeveMusk;
        }

        return anagramList[Math.floor(Math.random() * anagramList.length)];
    }
    
    function replaceTextInNode(node) {
        let child, next;
        switch ( node.nodeType ) {
            case 3: // Text node
                node.data = node.data.replace(replaceRegex, getRandomAnagram);
                break;
            case 1: // Element node
            case 9: // Document node
            case 11: // Document fragment node
                child = node.firstChild;
                while ( child ) {
                    next = child.nextSibling;
                    replaceTextInNode(child);
                    child = next;
                }
                break;
        }
    }

    replaceTextInNode(document.body);
})();
