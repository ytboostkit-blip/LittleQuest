/* =========================================
   LittleQuest v1.0
   Class Page Controller
========================================= */

(function () {
    "use strict";


    /* =====================================
       Get Current Language
    ===================================== */

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


    /* =====================================
       Get Class ID From URL
    ===================================== */

    function getClassId() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        return (
            params.get("class") ||
            ""
        );
    }


    /* =====================================
       Find Class
    ===================================== */

    async function getClassData(classId) {

        const data =
            await window.LittleQuestData.get(
                "classes"
            );

        if (
            !data ||
            !Array.isArray(data.classes)
        ) {
            return null;
        }

        return (
            data.classes.find(
                function (item) {
                    return item.id === classId;
                }
            ) || null
        );
    }


    /* =====================================
       Update SEO
    ===================================== */

    function updateSEO(classId, className) {

        const title =
            "LittleQuest — " +
            className +
            " Subjects";

        const description =
            "LittleQuest — " +
            className +
            " এর জন্য সহজ, সুন্দর ও শিক্ষামূলক ডিজিটাল বিষয়বস্তু।";


        const canonicalUrl =
            "https://littlequest.ytboostkit.workers.dev/" +
            "class.html?class=" +
            encodeURIComponent(classId);


        document.title = title;


        const metaDescription =
            document.getElementById(
                "lqMetaDescription"
            );

        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                description
            );
        }


        const canonical =
            document.getElementById(
                "lqCanonical"
            );

        if (canonical) {
            canonical.setAttribute(
                "href",
                canonicalUrl
            );
        }


        const ogTitle =
            document.getElementById(
                "lqOgTitle"
            );

        if (ogTitle) {
            ogTitle.setAttribute(
                "content",
                title
            );
        }


        const ogDescription =
            document.getElementById(
                "lqOgDescription"
            );

        if (ogDescription) {
            ogDescription.setAttribute(
                "content",
                description
            );
        }


        const ogUrl =
            document.getElementById(
                "lqOgUrl"
            );

        if (ogUrl) {
            ogUrl.setAttribute(
                "content",
                canonicalUrl
            );
        }


        const twitterTitle =
            document.getElementById(
                "lqTwitterTitle"
            );

        if (twitterTitle) {
            twitterTitle.setAttribute(
                "content",
                title
            );
        }


        const twitterDescription =
            document.getElementById(
                "lqTwitterDescription"
            );

        if (twitterDescription) {
            twitterDescription.setAttribute(
                "content",
                description
            );
        }


        const twitterUrl =
            document.getElementById(
                "lqTwitterUrl"
            );

        if (twitterUrl) {
            twitterUrl.setAttribute(
                "content",
                canonicalUrl
            );
        }
    }


    /* =====================================
       Update Breadcrumb
    ===================================== */

    function updateBreadcrumb(classItem) {

        const host =
            document.querySelector(
                "[data-breadcrumbs]"
            );

        if (!host) {
            return;
        }


        const language =
            getCurrentLanguage();

        const homeText =
            language === "bn"
                ? "হোম"
                : language === "hi"
                    ? "होम"
                    : "Home";


        const className =
            classItem.name[language] ||
            classItem.name.en ||
            classItem.id;


        host.innerHTML = "";


        const homeLink =
            document.createElement("a");

        homeLink.href =
            "index.html";

        homeLink.textContent =
            homeText;


        const separator =
            document.createElement("span");

        separator.setAttribute(
            "aria-hidden",
            "true"
        );

        separator.textContent =
            "/";


        const current =
            document.createElement("span");

        current.className =
            "lq-breadcrumb-current";

        current.setAttribute(
            "aria-current",
            "page"
        );

        current.textContent =
            className;


        host.appendChild(homeLink);
        host.appendChild(separator);
        host.appendChild(current);
    }


    /* =====================================
       Update Page Text
    ===================================== */

    function updatePageText(classItem) {

        const language =
            getCurrentLanguage();

        const className =
            classItem.name[language] ||
            classItem.name.en ||
            classItem.id;


        const title =
            document.getElementById(
                "lqClassTitle"
            );

        if (title) {
            title.textContent =
                className;
        }


        const description =
            document.getElementById(
                "lqClassDescription"
            );

        const subjectIntro =
            document.getElementById(
                "lqSubjectIntro"
            );


        if (language === "bn") {

            if (description) {
                description.textContent =
                    className +
                    " থেকে শেখার সুন্দর যাত্রা শুরু করো।";
            }

            if (subjectIntro) {
                subjectIntro.textContent =
                    className +
                    "-এর বিষয়গুলি বেছে নাও।";
            }

        } else if (language === "hi") {

            if (description) {
                description.textContent =
                    className +
                    " से सीखने की सुंदर यात्रा शुरू करो।";
            }

            if (subjectIntro) {
                subjectIntro.textContent =
                    className +
                    " के विषय चुनो।";
            }

        } else {

            if (description) {
                description.textContent =
                    "Start your learning journey with " +
                    className +
                    ".";
            }

            if (subjectIntro) {
                subjectIntro.textContent =
                    "Choose a subject for " +
                    className +
                    ".";
            }
        }
    }


    /* =====================================
       Subject Icons
    ===================================== */

    const subjectIcons = {

        english: "🔤",

        bengali: "📖",

        mathematics: "🔢",

        "general-awareness": "🌍",

        "environmental-studies": "🌱",

        science: "🔬",

        "social-studies": "🌏"

    };


    /* =====================================
       Load Subjects For Class
    ===================================== */

    async function loadSubjects(
        classId,
        language
    ) {

        const grid =
            document.getElementById(
                "lqClassSubjectGrid"
            );

        if (!grid) {
            return;
        }


        try {

            const data =
                await window.LittleQuestData.get(
                    "subjects"
                );


            if (
                !data ||
                !data.subjects
            ) {

                console.error(
                    "LittleQuest: Subjects data not found."
                );

                return;
            }


            const subjects =
                Array.isArray(
                    data.subjects[classId]
                )
                    ? [...data.subjects[classId]]
                    : [];


            subjects.sort(
                function (a, b) {

                    return (
                        (a.displayOrder || 0) -
                        (b.displayOrder || 0)
                    );

                }
            );


            grid.innerHTML = "";


            if (subjects.length === 0) {

                const empty =
                    document.createElement(
                        "p"
                    );

                empty.textContent =
                    language === "bn"
                        ? "এই শ্রেণির জন্য এখনো কোনো বিষয় যোগ করা হয়নি।"
                        : language === "hi"
                            ? "इस कक्षा के लिए अभी कोई विषय उपलब्ध नहीं है।"
                            : "No subjects are available for this class yet.";

                grid.appendChild(empty);

                return;
            }


            subjects.forEach(
                function (item) {

                    const card =
                        document.createElement(
                            "article"
                        );

                    card.className =
                        "lq-card lq-subject-card";

                    card.setAttribute(
                        "tabindex",
                        "0"
                    );

                    card.setAttribute(
                        "role",
                        "button"
                    );


                    const icon =
                        document.createElement(
                            "div"
                        );

                    icon.className =
                        "lq-subject-card-icon";

                    icon.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    icon.textContent =
                        subjectIcons[item.id] ||
                        "📚";


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


                    function openSubject() {

                        const url =
                            "subject.html?class=" +
                            encodeURIComponent(
                                classId
                            ) +
                            "&subject=" +
                            encodeURIComponent(
                                item.id
                            );

                        window.location.href =
                            url;
                    }


                    card.addEventListener(
                        "click",
                        openSubject
                    );


                    card.addEventListener(
                        "keydown",
                        function (event) {

                            if (
                                event.key ===
                                    "Enter" ||
                                event.key ===
                                    " "
                            ) {

                                event.preventDefault();

                                openSubject();
                            }

                        }
                    );


                    grid.appendChild(card);

                }
            );

        } catch (error) {

            console.error(
                "LittleQuest class page error:",
                error
            );

        }
    }


    /* =====================================
       Initialize Page
    ===================================== */

	function showClassNotFound() {

    const title =
        document.getElementById(
            "lqClassTitle"
        );

    const description =
        document.getElementById(
            "lqClassDescription"
        );

    const intro =
        document.getElementById(
            "lqSubjectIntro"
        );

    const grid =
        document.getElementById(
            "lqClassSubjectGrid"
        );


    if (title) {
        title.textContent =
            "Class Not Found";
    }


    if (description) {
        description.textContent =
            "দুঃখিত, এই শ্রেণিটি পাওয়া যায়নি।";
    }


    if (intro) {
        intro.textContent =
            "অনুগ্রহ করে একটি সঠিক Class নির্বাচন করো।";
    }


    if (grid) {

        grid.innerHTML = "";

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.style.textAlign =
            "center";

        wrapper.style.gridColumn =
            "1 / -1";


        const button =
            document.createElement(
                "a"
            );

        button.href =
            "index.html";

        button.className =
            "lq-button";

        button.textContent =
            "← Back to Home";


        wrapper.appendChild(
            button
        );

        grid.appendChild(
            wrapper
        );
    }
	
	
	
	const breadcrumb =
    document.querySelector(
        "[data-breadcrumbs]"
    );

if (breadcrumb) {

    breadcrumb.innerHTML = "";

    const home =
        document.createElement("a");

    home.href =
        "index.html";

    home.textContent =
        "Home";


    const separator =
        document.createElement("span");

    separator.setAttribute(
        "aria-hidden",
        "true"
    );

    separator.textContent =
        "/";


    const current =
        document.createElement("span");

    current.className =
        "lq-breadcrumb-current";

    current.setAttribute(
        "aria-current",
        "page"
    );

    current.textContent =
        "Class Not Found";


    breadcrumb.appendChild(home);
    breadcrumb.appendChild(separator);
    breadcrumb.appendChild(current);
}
}




   async function init() {
		
		
		const languageSelect =
			document.getElementById("lqLanguageSelect");

		const currentLanguage =
			getCurrentLanguage();

		if (languageSelect) {
			languageSelect.value = currentLanguage;
		}
        const classId =
            getClassId();


        if (!classId) {

            console.error(
                "LittleQuest: No class ID found in URL."
            );

            return;
        }


        try {

            const classItem =
                await getClassData(
                    classId
                );


            if (!classItem) {

				console.error(
					"LittleQuest: Class not found:",
					classId
				);

				showClassNotFound();

				return;
			}


            const language =
                getCurrentLanguage();


            const className =
                classItem.name[language] ||
                classItem.name.en ||
                classItem.id;


            updatePageText(
                classItem
            );

            updateSEO(
                classId,
                className
            );

            updateBreadcrumb(
                classItem
            );

            await loadSubjects(
                classId,
                language
            );


        } catch (error) {

            console.error(
                "LittleQuest class page initialization error:",
                error
            );

        }
    }


    /* =====================================
       Initial Load
    ===================================== */

    document.addEventListener(
        "littlequest:componentsLoaded",
        init
    );


    /* =====================================
       Language Change
    ===================================== */

    document.addEventListener(
        "littlequest:languageChanged",
        init
    );


    /* =====================================
       Public API
    ===================================== */

    window.LittleQuestClass = {

        init: init,

        getClassId: getClassId,

        loadSubjects: loadSubjects

    };

})();