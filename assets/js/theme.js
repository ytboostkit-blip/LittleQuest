/* =========================================
   LittleQuest v1.0
   Theme System
========================================= */

(function () {
    "use strict";

    const STORAGE_KEY = "littlequest-theme";

    const THEMES = {
        light: "light",
        dark: "dark"
    };

    function getSavedTheme() {
        const savedTheme =
            localStorage.getItem(STORAGE_KEY);

        if (
            savedTheme === THEMES.light ||
            savedTheme === THEMES.dark
        ) {
            return savedTheme;
        }

        return THEMES.light;
    }

    function applyTheme(theme) {
        if (
            theme !== THEMES.light &&
            theme !== THEMES.dark
        ) {
            theme = THEMES.light;
        }

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

        updateButton(theme);
    }

    function updateButton(theme) {
        const button =
            document.getElementById(
                "lqThemeToggle"
            );

        const icon =
            document.getElementById(
                "lqThemeIcon"
            );

        if (!button || !icon) {
            return;
        }

        if (theme === THEMES.dark) {
            icon.textContent = "☀️";

            button.setAttribute(
                "aria-label",
                "Switch to light theme"
            );
        } else {
            icon.textContent = "🌙";

            button.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );
        }
    }

    function toggle() {
        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            ) || THEMES.light;

        const nextTheme =
            currentTheme === THEMES.dark
                ? THEMES.light
                : THEMES.dark;

        applyTheme(nextTheme);
    }

    function connectButton() {
        const button =
            document.getElementById(
                "lqThemeToggle"
            );

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            toggle
        );

        updateButton(
            document.documentElement.getAttribute(
                "data-theme"
            ) || THEMES.light
        );
    }

    function init() {
        applyTheme(getSavedTheme());

        document.addEventListener(
            "littlequest:componentsLoaded",
            function () {
                connectButton();
            }
        );

        if (
            document.getElementById(
                "lqThemeToggle"
            )
        ) {
            connectButton();
        }
    }

    window.LittleQuestTheme = {
        get: function () {
            return (
                document.documentElement.getAttribute(
                    "data-theme"
                ) || THEMES.light
            );
        },

        set: applyTheme,
        toggle: toggle
    };

    init();

})();