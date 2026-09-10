/* =========================================
   LittleQuest v1.0
   Google Analytics 4
========================================= */

(function () {
    "use strict";

    function loadGoogleAnalytics() {

        /* Make sure config.js loaded first */
        if (
            typeof LITTLEQUEST_CONFIG === "undefined"
        ) {
            console.warn(
                "LittleQuest: Configuration not found."
            );
            return;
        }

        const measurementId =
            LITTLEQUEST_CONFIG.googleAnalyticsId;

        /* Ignore placeholder ID */
        if (
            !measurementId ||
            measurementId === "G-XXXXXXXXXX"
        ) {
            console.info(
                "LittleQuest: GA4 is waiting for the real Measurement ID."
            );
            return;
        }

        /* Prevent duplicate GA loading */
        if (
            document.querySelector(
                'script[data-littlequest-ga="true"]'
            )
        ) {
            return;
        }

        /* Google Analytics script */
        const script =
            document.createElement("script");

        script.async = true;

        script.src =
            "https://www.googletagmanager.com/gtag/js?id=" +
            encodeURIComponent(measurementId);

        script.setAttribute(
            "data-littlequest-ga",
            "true"
        );

        document.head.appendChild(script);

        /* Google Analytics data layer */
        window.dataLayer =
            window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments);
        }

        window.gtag = gtag;

        gtag(
            "js",
            new Date()
        );

        gtag(
            "config",
            measurementId
        );

    }


    /* Load after the page is ready */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            loadGoogleAnalytics
        );

    } else {

        loadGoogleAnalytics();

    }

})();