/* =========================================
   LittleQuest v1.0
   Translation Loader
========================================= */

(function () {
    "use strict";

    const TRANSLATION_FILE =
        "data/translations.json";

    let translations = {};
    let isLoaded = false;

    function getCurrentLanguage() {

        if (
            window.LittleQuestLanguage &&
            typeof window.LittleQuestLanguage.get ===
                "function"
        ) {
            return window.LittleQuestLanguage.get();
        }

        return "bn";
    }

    function get(key, language) {

        language =
            language ||
            getCurrentLanguage();

        if (!translations[language]) {
            language = "bn";
        }

        if (
            !translations[language] ||
            !translations[language][key]
        ) {
            return key;
        }

        return translations[language][key];
    }

    function apply(language) {

        if (!isLoaded) {
            return;
        }

        language =
            language ||
            getCurrentLanguage();

        document
            .querySelectorAll("[data-i18n]")
            .forEach(function (element) {

                const key =
                    element.getAttribute("data-i18n");

                if (key) {
                    element.textContent =
                        get(key, language);
                }
            });


        document
            .querySelectorAll(
                "[data-i18n-placeholder]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n-placeholder"
                    );

                if (key) {
                    element.setAttribute(
                        "placeholder",
                        get(key, language)
                    );
                }
            });


        document
            .querySelectorAll(
                "[data-i18n-aria-label]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n-aria-label"
                    );

                if (key) {
                    element.setAttribute(
                        "aria-label",
                        get(key, language)
                    );
                }
            });
    }


    /* =====================================
       Language Changed
    ===================================== */

    document.addEventListener(
        "littlequest:languageChanged",
        function (event) {

            const language =
                event.detail &&
                event.detail.language
                    ? event.detail.language
                    : getCurrentLanguage();

            apply(language);
        }
    );


    /* =====================================
       Components Loaded
    ===================================== */

    document.addEventListener(
        "littlequest:componentsLoaded",
        function () {

            apply(
                getCurrentLanguage()
            );
        }
    );


    /* =====================================
       Load Translations
    ===================================== */

    async function load() {

        try {

            const response =
                await fetch(
                    TRANSLATION_FILE
                );

            if (!response.ok) {
                throw new Error(
                    "Unable to load translations.json"
                );
            }

            translations =
                await response.json();

            isLoaded = true;

            apply(
                getCurrentLanguage()
            );

            return translations;

        } catch (error) {

            console.error(
                "LittleQuest translation error:",
                error
            );

            return null;
        }
    }


    /* =====================================
       Public API
    ===================================== */

    window.LittleQuestTranslations = {
        load: load,
        get: get,
        apply: apply
    };


    /* =====================================
       Initialize
    ===================================== */

    load();

})();