const urlMyProgramQuery = /[?&]prog=([^&]+)/.exec(parent.location.search);
let database = {
    isConnected: false
};

if (!localStorage.getItem("code-editor-databases")) {
    localStorage.setItem("code-editor-databases", "{}");
}

if (urlMyProgramQuery && JSON.parse(localStorage.getItem("code-editor-databases")).hasOwnProperty(decodeURIComponent(urlMyProgramQuery[1]))) {
    database = {
        isConnected: true,
        clear() {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])] = {};
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        get(key, fallback = null) {
            return new Promise(resolve => {
                resolve(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])][key] ?? fallback);
            });
        },
        set(key, value) {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])][key] = value;
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        delete(key) {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            delete databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])][key];
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        get items() {
            return JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])];
        },
        get keys() {
            return Object.keys(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]);
        },
        get values() {
            return Object.values(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]);
        },
        prefix(prefix) {
            return Object.keys(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]).filter(i => i.startsWith(prefix));
        }
    };
} else if (urlMyProgramQuery && JSON.parse(localStorage.getItem("code-editor-my-programs")).hasOwnProperty(decodeURIComponent(urlMyProgramQuery[1]))) {
    const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
    databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])] = {};
    localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
    console.warn("Warning: This program does not have a database. One is being created for you.");
    database = {
        isConnected: true,
        clear() {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])] = {};
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        get(key, fallback = null) {
            return JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])][key] || fallback;
        },
        set(key, value) {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])][key] = value;
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        delete(key) {
            const databasesOfPrograms = JSON.parse(localStorage.getItem("code-editor-databases"));
            delete databasesOfPrograms[decodeURIComponent(urlMyProgramQuery[1])][key];
            localStorage.setItem("code-editor-databases", JSON.stringify(databasesOfPrograms));
        },
        get items() {
            return JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])];
        },
        get keys() {
            return Object.keys(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]);
        },
        get values() {
            return Object.values(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]);
        },
        prefix(prefix) {
            return Object.keys(JSON.parse(localStorage.getItem("code-editor-databases"))[decodeURIComponent(urlMyProgramQuery[1])]).filter(i => i.startsWith(prefix));
        }
    };
}
Object.freeze(database);

export default database;
