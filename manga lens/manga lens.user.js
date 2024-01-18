// ==UserScript==
// @name         manga lens
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a dark theme, resizes the image translation screen to fit the entire width of the image, and some QOL stuff
// @author       GunBuilderGuy
// @match        *://lens.google.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    var steps = 0;
    var matches = 0;
    darkmode();
    customScroll();

    var loaded = false;
    document.addEventListener("DOMContentLoaded", (event) => {
        loaded = true;
        doer();
    });

    setTimeout(function(){
        if(!loaded){
            console.log("timeout happenned");
            doer();
        }
    }, 1500);


    function doer(){
        darkmode();
        //element for the translated text
        var rightElement = document.querySelector(".b57KQc");
        rightElement.style.flexBasis = '20%';
        rightElement.style.maxWidth = '250px';
        rightElement.style.height = 'max-content';

        //image: jsname: cOxAN class: HqtXSc
        var image = document.querySelector(".HqtXSc");
        // if(image !== null && image !== undefined){
        //     console.log("found it!");
        // }
        var width = parseFloat(image.clientWidth);
        var height = parseFloat(image.clientWidth);
        var ratio = image.height/image.width;
        // if(image){
        //     console.log("w: " + width + ", h: " + height);
        // }

        //root: "HfwiM b8O0vc"

        var leftElement = document.querySelector(".HfwiM");
        var newWidth = parseFloat(getComputedStyle(leftElement).getPropertyValue("width"));
        if(leftElement !== null && leftElement !== undefined){
            // console.log("found it!: w=" + newWidth);
        }
        // console.log("hello? ratio:"+ratio);

        image.parentElement.parentElement.style.height = ((newWidth * ratio) + 'px');
        var w = image.parentNode.style.width;
        var h = image.parentNode.style.height;
        image.parentNode.style.left = ((newWidth - parseFloat(image.parentNode.parentNode.style.width))*-0.5) + "px";
        image.parentNode.style.width = newWidth + "px";
        image.parentNode.style.height = parseFloat(newWidth * ratio) + "px";
        // image.parentNode.style.width = "500px"
        // image.parentNode.style.height = "800px"

        //top selector: "z3qvzf"
        //bottom selector: "SAvApe"
        //image container: "J3xyEe"

        var topElement = document.querySelector(".z3qvzf");
        topElement.style.left = "24px";
        var bottomElement = document.querySelector(".SAvApe");
        bottomElement.style.bottom = "unset";
        bottomElement.style.top = "24px";
        bottomElement.style.right = "24px";
        var imageContainerElement = document.querySelector(".J3xyEe");
        // console.log("hello?? " + bottomElement + " " + imageContainerElement);
        // bottomElement.parentNode.insertBefore(bottomElement, imageContainerElement);
        // console.log("hello!!");

        // console.log("parentdata: w=" + image.parentElement.parentElement.style.width);
        // image.parentElement.parentElement.style.width = (newWidth + 'px');
        //if(image.style.width !== null && image.style.width !== undefined){
        //    console.log("it exists!: w=" + w + ", h=" + h );
        //}

        //translated div class: dl5bDe
        var divs = document.querySelectorAll(".dl5bDe"); // Replace "classnamehere" with your class name

        // Loop through each div element
        divs.forEach(function(div) {
            // Find all <span> elements within the current div
            var spans = div.querySelectorAll("span");

            // Set contentEditable to true for each <span> element
            spans.forEach(function(span) {
                span.contentEditable = true;
            });
        });

        //"did you find these results useful" chunk: "BgmNhe  KUcdrd"
        var annoying = document.querySelector('.BgmNhe');
        if(annoying) annoying.remove();

        setTimeout(function(){
            doer();
        }, 500);
    }

    function findElementByText(rootElement, searchText) {
        if (rootElement.textContent.includes(searchText)) {
            return rootElement;
        }

        for (var i = 0; i < rootElement.childNodes.length; i++) {
            var child = rootElement.childNodes[i];

            var foundElement = findElementByText(child, searchText);

            if (foundElement) {
                return foundElement;
            }
        }
        return null;
    }

    function darkmode(){
        document.documentElement.style.setProperty('--lens-language-picker-background-color', 'rgb(57 60 64)');
        document.documentElement.style.setProperty('--lens-background-color-primary', 'rgb(57 60 64)');
        document.documentElement.style.setProperty('--lens-background-text-panel-fill-color', 'rgb(0 0 0 / 50%)');
        document.documentElement.style.setProperty('--lens-language-picker-chip-background-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-language-picker-background-color', '#393c40');
        document.documentElement.style.setProperty('--lens-border-color-primary', 'rgb(44 40 42)');
        document.documentElement.style.setProperty('--lens-background-color-secondary', 'rgb(44 40 42)');
        document.documentElement.style.setProperty('--lens-chip-text-color-assistive', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-background-text-panel-text-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-inline-toggle-icon-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-label-text-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-title-text-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--gm-neutraltextbutton-ink-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-failure-card-header-color', 'rgb(213 213 213)');
        document.documentElement.style.setProperty('--lens-failure-info-text-color', 'rgb(173 173 173)');
        document.querySelector('header').style.backgroundColor = 'rgb(57 60 64)';
        document.querySelector('.aNrIN').style.borderTopStyle = 'groove';
        document.querySelector('.aNrIN').style.borderTopWidth = '1px';
        document.querySelector('.aNrIN').style.borderTopColor = 'rgb(44 40 42)';
        // document.querySelector('.VfPpkd-rOvkhd-v1cqY VfPpkd-rOvkhd-v1cqY-OWXEXe-ssJRIf').style.backgroundColor = 'rgb(213 213 213)';
        document.querySelector('c-wiz').style.backgroundColor = 'rgb(57 60 64)';
        document.querySelector('.NMm5M').style.color = 'rgb(213 213 213)';
        document.querySelector('.gb_i').style.color = 'rgb(213 213 213)';


    }

    function customScroll(){
        var style = document.createElement('style');
        style.type = 'text/css';

        // Define your CSS rules
        var css = `
  ::-webkit-scrollbar {
    background-color: rgb(47 50 54);
    border-radius:4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(68 70 76);
    border-radius:6px;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    max-height: 40px;
  }`;


        // Set the CSS rules
        style.appendChild(document.createTextNode(css));

        // Append the <style> element to the <head> of the document
        document.head.appendChild(style);
    }

})();