// ==UserScript==
// @name            Joyn.de Adblocker
// @name:de         Joyn.de Adblocker
// @version         1.0.1
// @description     Adblocker for Joyn.de, because the common adblockers are blocked
// @description:de  Adblocker für Joyn.de, da die gängigen Adblocker blockiert werden
// @author          TalkLounge (https://github.com/TalkLounge)
// @namespace       https://github.com/TalkLounge/joyn.de-adblocker
// @license         MIT
// @match           https://www.joyn.de/*
// @grant           none
// ==/UserScript==

(function () {
    'use strict';
    var video, volume;

    function init() {
        if (!video || !video.src) {
            video = document.querySelector("video");
        }

        if (volume && !document.querySelector("footer")) { // Reset volume when ad section is over
            video.volume = volume;
            volume = undefined;

            document.getElementById("black").remove();
            return;
        }

        if (!document.querySelector("footer") || // Is ad section
            !video ||
            video.duration > 60 || // Probably not an ad
            video.readyState <= 0 || // Video not ready
            video.playbackRate == 100) {
            return;
        }

        if (!volume) { // Mute video and set loading screen
            volume = video.volume;
            video.volume = 0;

            var black = document.createElement("div");
            black.setAttribute("id", "black");
            black.style.position = "absolute";
            black.style.width = "100%";
            black.style.height = "100%";
            black.style.backgroundColor = "black";
            black.style.display = "flex";
            black.style.justifyContent = "center";
            black.style.alignItems = "center";

            var inner = document.createElement("div");

            var loading = document.createElement("img");
            loading.setAttribute("src", "https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif");
            loading.setAttribute("height", "75");
            loading.style.display = "flex";
            loading.style.margin = "auto";
            inner.appendChild(loading);

            var text = document.createElement("h1");
            text.innerHTML = "Überspringe Werbung";
            text.style.marginTop = "25%";
            inner.appendChild(text);

            black.appendChild(inner);

            video.parentNode.append(black);
        }

        video.playbackRate = 100;
    }

    window.setInterval(init, 500);
})();
