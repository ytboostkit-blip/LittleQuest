/* =========================================
   LittleQuest v1.0
   Homepage Controller
========================================= */

(function () {
    "use strict";


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


    async function loadClasses() {

        const grid =
            document.getElementById("lqClassGrid");

        if (!grid) {
            return;
        }

        try {

            const data =
                await window.LittleQuestData.get("classes");

            if (
                !data ||
                !Array.isArray(data.classes)
            ) {
                console.error(
                    "LittleQuest: Classes data not found."
                );
                return;
            }

            const language =
                getCurrentLanguage();

            grid.innerHTML = "";

            data.classes.forEach(function (item) {

                const card =
                    document.createElement("article");

                card.className =
                    "lq-card lq-class-card";


                const icon =
                    document.createElement("div");

                icon.className =
                    "lq-class-card-icon";

                icon.textContent = "📚";


                const title =
                    document.createElement("h3");

                title.textContent =
                    item.name[language] ||
                    item.name.en ||
                    item.id;


                card.appendChild(icon);
                card.appendChild(title);

                grid.appendChild(card);

            });

        } catch (error) {

            console.error(
                "LittleQuest homepage error:",
                error
            );

        }
    }


    async function loadSubjects() {

        const grid =
            document.getElementById("lqSubjectGrid");

        if (!grid) {
            return;
        }

        try {

            const data =
                await window.LittleQuestData.get("subjects");

            if (
                !data ||
                !data.subjects
            ) {
                console.error(
                    "LittleQuest: Subjects data not found."
                );
                return;
            }

            const language =
                getCurrentLanguage();

            const subjectMap = {};

            Object.keys(data.subjects).forEach(
                function (classId) {

                    data.subjects[classId].forEach(
                        function (subject) {

                            if (
                                !subjectMap[
                                    subject.id
                                ]
                            ) {
                                subjectMap[
                                    subject.id
                                ] = subject;
                            }

                        }
                    );

                }
            );

            const subjects =
                Object.values(subjectMap);

            subjects.sort(
                function (a, b) {
                    return (
                        a.displayOrder -
                        b.displayOrder
                    );
                }
            );

            grid.innerHTML = "";

            subjects.forEach(
                function (item) {

                    const card =
                        document.createElement(
                            "article"
                        );

                    card.className =
                        "lq-card lq-subject-card";


                    const icon =
                        document.createElement(
                            "div"
                        );

                    icon.className =
                        "lq-subject-card-icon";

                    const subjectIcons = {
						english: "🔤",
						bengali: "📝",
						mathematics: "🔢",
						"general-awareness": "🌍",
						"environmental-studies": "🌱",
						science: "🔬",
						"social-studies": "🌏"
					};

					icon.textContent =
						subjectIcons[item.id] || "📚";


                    const title =
                        document.createElement(
                            "h3"
                        );

                    title.textContent =
                        item.name[language] ||
                        item.name.en ||
                        item.id;


                    card.appendChild(icon);
                    card.appendChild(title);

                    grid.appendChild(card);

                }
            );

        } catch (error) {

            console.error(
                "LittleQuest subjects error:",
                error
            );

        }
    }


    function init() {
        loadClasses();
        loadSubjects();
    }


    document.addEventListener(
        "littlequest:componentsLoaded",
        init
    );


    document.addEventListener(
        "littlequest:languageChanged",
        function () {
            loadClasses();
            loadSubjects();
        }
    );


    window.LittleQuestHome = {
        loadClasses: loadClasses,
        loadSubjects: loadSubjects
    };

})();