/* =========================================
   LittleQuest v1.0
   Global Component Loader
========================================= */

(function () {
    "use strict";


    /* =====================================
       Load One Component
    ===================================== */

    async function loadComponent(
        selector,
        file
    ) {

        const container =
            document.querySelector(selector);

        if (!container) {
            return;
        }

        try {

            const response =
                await fetch(file);

            if (!response.ok) {
                throw new Error(
                    `Unable to load ${file}`
                );
            }

            const html =
                await response.text();

            container.innerHTML = html;

        } catch (error) {

            console.error(
                "LittleQuest component error:",
                error
            );

        }
    }


    /* =====================================
       Load All Global Components
    ===================================== */

    async function loadComponents() {

        await Promise.all([

            loadComponent(
                "[data-component='header']",
                "components/header.html"
            ),

            loadComponent(
                "[data-component='mobile-menu']",
                "components/mobile-menu.html"
            ),
			
			loadComponent(
				"[data-component='sidebar']",
				"components/sidebar.html"
			),

            loadComponent(
                "[data-component='breadcrumbs']",
                "components/breadcrumbs.html"
            ),

            loadComponent(
                "[data-component='footer']",
                "components/footer.html"
            )

        ]);


        /* Tell the rest of the application
           that components are ready. */

        document.dispatchEvent(
            new CustomEvent(
                "littlequest:componentsLoaded"
            )
        );

    }


    /* =====================================
       Public API
    ===================================== */

    window.LittleQuestComponents = {

        load: loadComponents

    };

})();