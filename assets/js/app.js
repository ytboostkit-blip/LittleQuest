/* =========================================
   LittleQuest v1.0
   Global Application
========================================= */

(function () {
    "use strict";


    /* =====================================
       LittleQuest Application
    ===================================== */

    const LittleQuestApp = {

        version: "1.0",

        init: function () {

            this.setFooterYear();

            console.info(
                "LittleQuest v1.0 initialized."
            );

        },


        /* =================================
           Footer Year
        ================================= */

        setFooterYear: function () {

            const yearElement =
                document.getElementById(
                    "lqFooterYear"
                );

            if (!yearElement) {
                return;
            }

            yearElement.textContent =
                new Date().getFullYear();

        }

    };


    /* =====================================
       Initialize After Components Load
    ===================================== */

    document.addEventListener(
        "littlequest:componentsLoaded",
        function () {

            LittleQuestApp.init();

        }
    );


    /* =====================================
       Public Application Object
    ===================================== */

    window.LittleQuestApp =
        LittleQuestApp;

})();