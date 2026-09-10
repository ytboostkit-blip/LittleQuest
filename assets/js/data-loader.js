/* =========================================
   LittleQuest v1.0
   Central Data Loader
========================================= */

(function () {
    "use strict";

    const DATA_PATHS = {
        site: "data/site.json",
        classes: "data/classes.json",
        subjects: "data/subjects.json",
        chapters: "data/chapters.json",
        topics: "data/topics.json",
        content: "data/content.json"
    };

    const cache = {};


    async function load(name) {

        if (cache[name]) {
            return cache[name];
        }

        const path = DATA_PATHS[name];

        if (!path) {
            throw new Error(
                "Unknown data file: " + name
            );
        }

        const response =
            await fetch(
                path + "?v=" + Date.now()
            );

        if (!response.ok) {
            throw new Error(
                "Unable to load: " + path
            );
        }

        const data =
            await response.json();

        cache[name] = data;

        return data;
    }


    async function get(name) {
        return await load(name);
    }


    function clearCache() {

        Object.keys(cache).forEach(
            function (key) {
                delete cache[key];
            }
        );

    }


    window.LittleQuestData = {
        load: load,
        get: get,
        clearCache: clearCache
    };

})();