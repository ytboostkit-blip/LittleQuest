/* =========================================
   LittleQuest v1.0
   Navigation System
========================================= */

(function () {
    "use strict";

    const LittleQuestNavigation = {

        sidebar: null,
        toggleButton: null,


        /* =====================================
           Initialize
        ===================================== */

        init: function () {

            this.sidebar =
                document.getElementById("lqSidebar");

            this.toggleButton =
                document.getElementById("lqMenuToggle");

            if (
                !this.sidebar ||
                !this.toggleButton
            ) {
                return;
            }

            this.bindEvents();
        },


        /* =====================================
           Bind Events
        ===================================== */

        bindEvents: function () {

            /* Menu toggle */

            this.toggleButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    LittleQuestNavigation.toggle();

                }
            );


            /* Close after navigation link click */

            const links =
                this.sidebar.querySelectorAll(
                    ".lq-sidebar-link"
                );

            links.forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        LittleQuestNavigation.close();

                    }
                );

            });


            /* Close when clicking outside */

            document.addEventListener(
                "click",
                function (event) {

                    if (
                        !LittleQuestNavigation.sidebar ||
                        !LittleQuestNavigation.sidebar.classList.contains(
                            "is-open"
                        )
                    ) {
                        return;
                    }

                    const clickedInsideSidebar =
                        LittleQuestNavigation.sidebar.contains(
                            event.target
                        );

                    const clickedToggle =
                        LittleQuestNavigation.toggleButton.contains(
                            event.target
                        );

                    if (
                        !clickedInsideSidebar &&
                        !clickedToggle
                    ) {

                        LittleQuestNavigation.close();

                    }

                }
            );

        },


        /* =====================================
           Toggle Sidebar
        ===================================== */

        toggle: function () {

            const isOpen =
                this.sidebar.classList.contains(
                    "is-open"
                );

            if (isOpen) {

                this.close();

            } else {

                this.open();

            }

        },


        /* =====================================
           Open Sidebar
        ===================================== */

        open: function () {

            this.sidebar.classList.add(
                "is-open"
            );

            this.toggleButton.setAttribute(
                "aria-expanded",
                "true"
            );

            this.toggleButton.setAttribute(
                "aria-label",
                "Close navigation"
            );
			
			this.toggleButton.style.left =
				window.innerWidth <= 600
					? "274px"
					: "308px";

        },


        /* =====================================
           Close Sidebar
        ===================================== */

        close: function () {

            this.sidebar.classList.remove(
                "is-open"
            );

            this.toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

            this.toggleButton.setAttribute(
                "aria-label",
                "Open navigation"
            );
			
			this.toggleButton.style.left =
				window.innerWidth <= 600
					? "12px"
					: "18px";

        }

    };


    /* =====================================
       Initialize After Components Load
    ===================================== */

    document.addEventListener(
        "littlequest:componentsLoaded",
        function () {

            LittleQuestNavigation.init();

        }
    );


    /* =====================================
       Public API
    ===================================== */

    window.LittleQuestNavigation =
        LittleQuestNavigation;

})();