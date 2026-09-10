/* =========================================
   LittleQuest v1.0
   Language System
========================================= */

(function () {
    "use strict";

    const STORAGE_KEY = "littlequest-language";

    const SUPPORTED_LANGUAGES = [
        "bn",
        "hi",
        "en"
    ];

    function isSupported(language) {
        return SUPPORTED_LANGUAGES.includes(language);
    }

    function getSavedLanguage() {
        try {
            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (isSupported(saved)) {
                return saved;
            }
        } catch (error) {
            console.warn(
                "LittleQuest: Could not read saved language."
            );
        }

        return "bn";
    }

    function applyLanguage(language) {
        if (!isSupported(language)) {
            language = "bn";
        }

        document.documentElement.setAttribute(
            "lang",
            language
        );

        document.documentElement.setAttribute(
            "data-language",
            language
        );

        return language;
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                language
            );
        } catch (error) {
            console.warn(
                "LittleQuest: Could not save language."
            );
        }
    }

    function updateSelector(language) {
        const selector =
            document.getElementById(
                "lqLanguageSelect"
            );

        if (!selector) {
            return;
        }

        selector.value = language;
    }

    function setLanguage(language) {
        if (!isSupported(language)) {
            language = "bn";
        }

        applyLanguage(language);
        saveLanguage(language);
        updateSelector(language);

        document.dispatchEvent(
            new CustomEvent(
                "littlequest:languageChanged",
                {
                    detail: {
                        language: language
                    }
                }
            )
        );
    }

    function connectSelector() {
        const selector =
            document.getElementById(
                "lqLanguageSelect"
            );

        if (!selector) {
            return;
        }

        updateSelector(
            getSavedLanguage()
        );

        if (
            selector.dataset.languageConnected ===
            "true"
        ) {
            return;
        }

        selector.dataset.languageConnected =
            "true";

        selector.addEventListener(
            "change",
            function () {
                setLanguage(this.value);
            }
        );
    }

    /* =====================================
       Initialize
    ===================================== */

    applyLanguage(
        getSavedLanguage()
    );

    /* =====================================
       Connect After Components Load
    ===================================== */

    document.addEventListener(
        "littlequest:componentsLoaded",
        function () {

            const currentLanguage =
                getSavedLanguage();

            applyLanguage(
                currentLanguage
            );

            connectSelector();

            document.dispatchEvent(
                new CustomEvent(
                    "littlequest:languageReady",
                    {
                        detail: {
                            language:
                                currentLanguage
                        }
                    }
                )
            );
        }
    );

    /* =====================================
       Public API
    ===================================== */

    window.LittleQuestLanguage = {

        set: setLanguage,

        get: function () {
            return (
                document.documentElement
                    .getAttribute(
                        "data-language"
                    ) || "bn"
            );
        },

        supported:
            SUPPORTED_LANGUAGES.slice()

    };

})();