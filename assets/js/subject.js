/* =========================================
   LittleQuest v1.0
   Subject Page Controller
========================================= */

(function () {
    "use strict";


    /* =====================================
       Current Language
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
       URL Parameters
    ===================================== */

    function getParams() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        return {
            classId:
                params.get("class") || "",

            subjectId:
                params.get("subject") || ""
        };
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
       Find Subject
    ===================================== */

    async function getSubjectData(
        classId,
        subjectId
    ) {

        const data =
            await window.LittleQuestData.get(
                "subjects"
            );

        if (
            !data ||
            !data.subjects ||
            !Array.isArray(
                data.subjects[classId]
            )
        ) {
            return null;
        }

        return (
            data.subjects[classId].find(
                function (item) {
                    return item.id === subjectId;
                }
            ) || null
        );
    }


    /* =====================================
       Update Breadcrumb
    ===================================== */

    function updateBreadcrumb(
        classItem,
        subjectItem
    ) {

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

        const subjectName =
            subjectItem.name[language] ||
            subjectItem.name.en ||
            subjectItem.id;


        host.innerHTML = "";


        const home =
            document.createElement("a");

        home.href =
            "index.html";

        home.textContent =
            homeText;


        const separator1 =
            document.createElement("span");

        separator1.setAttribute(
            "aria-hidden",
            "true"
        );

        separator1.textContent =
            "/";


        const classLink =
            document.createElement("a");

        classLink.href =
            "class.html?class=" +
            encodeURIComponent(
                classItem.id
            );

        classLink.textContent =
            className;


        const separator2 =
            document.createElement("span");

        separator2.setAttribute(
            "aria-hidden",
            "true"
        );

        separator2.textContent =
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
            subjectName;


        host.appendChild(home);
        host.appendChild(separator1);
        host.appendChild(classLink);
        host.appendChild(separator2);
        host.appendChild(current);
    }


    /* =====================================
       Update Page Content
    ===================================== */

    function updatePage(
        classItem,
        subjectItem
    ) {

        const language =
            getCurrentLanguage();

        const className =
            classItem.name[language] ||
            classItem.name.en ||
            classItem.id;

        const subjectName =
            subjectItem.name[language] ||
            subjectItem.name.en ||
            subjectItem.id;


        const title =
            document.getElementById(
                "lqSubjectTitle"
            );

        const description =
            document.getElementById(
                "lqSubjectDescription"
            );

        const badge =
            document.getElementById(
                "lqSubjectClassBadge"
            );

        const chaptersHeading =
            document.getElementById(
                "lqChaptersHeading"
            );

        const chaptersIntro =
            document.getElementById(
                "lqChaptersIntro"
            );


        if (title) {
            title.textContent =
                subjectName;
        }


        if (badge) {

            badge.textContent =
                language === "bn"
                    ? "📚 " + className
                    : language === "hi"
                        ? "📚 " + className
                        : "📚 " + className;
        }


        if (language === "bn") {

            if (description) {
                description.textContent =
                    className +
                    " -এর " +
                    subjectName +
                    " থেকে শেখার যাত্রা শুরু করো।";
            }

            if (chaptersHeading) {
                chaptersHeading.textContent =
                    "অধ্যায়";
            }

            if (chaptersIntro) {
                chaptersIntro.textContent =
                    subjectName +
                    " -এর অধ্যায়গুলি বেছে নাও।";
            }

        } else if (language === "hi") {

            if (description) {
                description.textContent =
                    className +
                    " के " +
                    subjectName +
                    " से सीखने की यात्रा शुरू करो।";
            }

            if (chaptersHeading) {
                chaptersHeading.textContent =
                    "अध्याय";
            }

            if (chaptersIntro) {
                chaptersIntro.textContent =
                    subjectName +
                    " के अध्याय चुनो।";
            }

        } else {

            if (description) {
                description.textContent =
                    "Start learning " +
                    subjectName +
                    " for " +
                    className +
                    ".";
            }

            if (chaptersHeading) {
                chaptersHeading.textContent =
                    "Chapters";
            }

            if (chaptersIntro) {
                chaptersIntro.textContent =
                    "Choose a chapter from " +
                    subjectName +
                    ".";
            }
        }
    }


    /* =====================================
       Update SEO
    ===================================== */
function updateSEO(
    classId,
    subjectId,
    className,
    subjectName
) {

    const title =
        subjectName +
        " — " +
        className +
        " | LittleQuest";

    const description =
        "LittleQuest — " +
        className +
        " এর " +
        subjectName +
        " শেখার জন্য সহজ, সুন্দর ও শিশুবান্ধব ডিজিটাল শিক্ষা বিষয়বস্তু।";


    document.title =
        title;


    const meta =
        document.getElementById(
            "lqMetaDescription"
        );

    if (meta) {
        meta.setAttribute(
            "content",
            description
        );
    }


    /*
       Production SEO URL
       Keep Class + Subject context
    */

    const canonicalUrl =
        "https://littlequest.ytboostkit.workers.dev/" +
        "subject.html?class=" +
        encodeURIComponent(classId) +
        "&subject=" +
        encodeURIComponent(subjectId);


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
       Load Chapters
    ===================================== */

    async function loadChapters(
        classId,
        subjectId
    ) {

        const grid =
            document.getElementById(
                "lqChapterGrid"
            );

        if (!grid) {
            return;
        }


        const language =
            getCurrentLanguage();


        try {

            const data =
                await window.LittleQuestData.get(
                    "chapters"
                );


            let chapters = [];


            if (
                data &&
                data.chapters
            ) {

                const classData =
                    data.chapters[classId];


                if (
                    classData &&
                    classData[subjectId] &&
                    Array.isArray(
                        classData[subjectId]
                    )
                ) {

                    chapters =
                        [...classData[subjectId]];
                }
            }


            chapters.sort(
                function (a, b) {

                    return (
                        (a.displayOrder || a.order || 0) -
                        (b.displayOrder || b.order || 0)
                    );

                }
            );


            grid.innerHTML = "";


            if (
                chapters.length === 0
            ) {

                const message =
                    document.createElement(
                        "p"
                    );

                message.style.gridColumn =
                    "1 / -1";

                message.style.textAlign =
                    "center";

                message.style.padding =
                    "24px";


                message.textContent =
                    language === "bn"
                        ? "এই বিষয়ের অধ্যায় এখনও যোগ করা হয়নি।"
                        : language === "hi"
                            ? "इस विषय के अध्याय अभी जोड़े नहीं गए हैं।"
                            : "Chapters for this subject have not been added yet.";


                grid.appendChild(
                    message
                );

                return;
            }


            chapters.forEach(
                function (chapter) {

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

                    icon.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    icon.textContent =
                        "📖";


                    const title =
                        document.createElement(
                            "h3"
                        );

                    title.textContent =
                        chapter.name &&
                        (
                            chapter.name[language] ||
                            chapter.name.en
                        )
                            ? (
                                chapter.name[language] ||
                                chapter.name.en
                            )
                            : chapter.id;


                    card.appendChild(icon);
                    card.appendChild(title);

                    grid.appendChild(card);

                }
            );

        } catch (error) {

            console.error(
                "LittleQuest subject page error:",
                error
            );

        }
    }


    /* =====================================
       Subject Not Found
    ===================================== */

    function showSubjectNotFound() {

        const title =
            document.getElementById(
                "lqSubjectTitle"
            );

        const description =
            document.getElementById(
                "lqSubjectDescription"
            );

        const badge =
            document.getElementById(
                "lqSubjectClassBadge"
            );

        const intro =
            document.getElementById(
                "lqChaptersIntro"
            );

        const grid =
            document.getElementById(
                "lqChapterGrid"
            );


        if (badge) {
            badge.textContent =
                "📚 LittleQuest";
        }

        if (title) {
            title.textContent =
                "Subject Not Found";
        }

        if (description) {
            description.textContent =
                "দুঃখিত, এই বিষয়টি পাওয়া যায়নি।";
        }

        if (intro) {
            intro.textContent =
                "অনুগ্রহ করে একটি সঠিক Subject নির্বাচন করো।";
        }


        if (grid) {

            grid.innerHTML = "";

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.style.gridColumn =
                "1 / -1";

            wrapper.style.textAlign =
                "center";


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
                "Subject Not Found";


            breadcrumb.appendChild(home);
            breadcrumb.appendChild(separator);
            breadcrumb.appendChild(current);
        }
    }


    /* =====================================
       Initialize
    ===================================== */

    async function init() {

        const params =
            getParams();


        if (
            !params.classId ||
            !params.subjectId
        ) {

            showSubjectNotFound();

            return;
        }


        try {

            const classItem =
                await getClassData(
                    params.classId
                );


            if (!classItem) {

                showSubjectNotFound();

                return;
            }


            const subjectItem =
                await getSubjectData(
                    params.classId,
                    params.subjectId
                );


            if (!subjectItem) {

                showSubjectNotFound();

                return;
            }


            const language =
                getCurrentLanguage();


            const className =
                classItem.name[language] ||
                classItem.name.en ||
                classItem.id;

            const subjectName =
                subjectItem.name[language] ||
                subjectItem.name.en ||
                subjectItem.id;


            updatePage(
                classItem,
                subjectItem
            );

            updateSEO(
                className,
                subjectName
            );

            updateBreadcrumb(
                classItem,
                subjectItem
            );

            await loadChapters(
                params.classId,
                params.subjectId
            );

        } catch (error) {

            console.error(
                "LittleQuest subject initialization error:",
                error
            );

        }
    }


    /* =====================================
       Page Initialization
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

    window.LittleQuestSubject = {

        init: init,

        getParams: getParams,

        loadChapters: loadChapters

    };

})();