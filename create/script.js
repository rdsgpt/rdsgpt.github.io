/**
Import default code templates and user's saved programs.
*/
import myPrograms from "./scripts/my-programs.js";
import defaultCodes from "./scripts/default-codes.js";

/**
Set the site theme by default to light, for new users.
*/
if (!localStorage.getItem("code-editor-site-theme")) {
    localStorage.setItem("code-editor-site-theme", "light");
}

/**
Set the seasonal extras preference by default to false, for new users.
*/
if (!localStorage.getItem("code-editor-site-seasonalExtras")) {
    localStorage.setItem("code-editor-site-seasonalExtras", false);
}

/**
Set the databases to an empty object by default for new users.
*/
if (!localStorage.getItem("code-editor-databases")) {
    localStorage.setItem("code-editor-databases", "{}");
}

/**
Add the site theme and seasonal extras attributes to the body element.
*/
document.body.setAttribute("theme", localStorage.getItem("code-editor-site-theme"));
document.body.setAttribute("seasonal-extras", localStorage.getItem("code-editor-site-seasonalExtras"));

/**
When the language selection menu is changed, change the name of the program as well. 
*/
document.getElementById("languages").addEventListener("change", () => {
    if (document.getElementById("languages").selectedIndex !== 0) {
        const adjectives = [
            "Gangly",
            "Stupifying",
            "Jawdropping",
            "Mindblowing",
            "Deceiving",
            "Ungainly",
            "Unexpected",
            "Traumatizing",
            "Entertaining",
            "Horrifying",
            "Breathtaking",
            "Terrifying",
            "Lethal",
            "Unusual",
            "Mollifying",
            "Dirty",
            "Smelly",
            "Slippery",
            "Shiny",
            "Lumpy",
            "Sentient",
            "Overcooked",
            "Undercooked",
            "Melted",
            "Holy",
            "Cursed",
            "Traumatized",
            "Petrified",
            "Petrifying",
            "Beautiful",
            "Sunburnt"
        ];
        const plurals = [
            "Toasters",
            "Peanutbutter",
            "Apples",
            "Bellybuttonlint",
            "Toejam",
            "Breadtags",
            "Farts",
            "Dangleberries",
            "Catfur",
            "Elephants",
            "Blackheadremovers",
            "Toiletbrushes",
            "Bananas",
            "Monkeys",
            "Eyeballs",
            "Earwax",
            "Earwigs",
            "Bogans",
            "Armhairs",
            "Fingernails",
            "Trees",
            "Frogs",
            "Water",
            "Leaves",
            "Humans",
            "Onezies",
            "Snails",
            "Lightsabers",
            "Simpsons",
            "Coconuts",
            "Suitcases",
            "Dogs",
            "Cats",
            "Fish",
            "Umbrellas",
            "Animegirls",
            "Hammocks",
            "Printers",
            "Stormtroopers",
            "Snakes",
            "Snacks",
            "Bats",
            "Athletes",
            "Shoes",
            "Batarangs",
            "Gorillas"
        ];
        const adjective1 = adjectives[Math.floor(Math.random() * adjectives.length)];
        adjectives.splice(adjectives.indexOf(adjective1), 1);
        const adjective2 = adjectives[Math.floor(Math.random() * adjectives.length)];
        const plural = plurals[Math.floor(Math.random() * plurals.length)];
        document.getElementById("program-name").value = `${adjective1}${adjective2}${plural}`;
        document.getElementById("program-name").disabled = false;
    } else {
        document.getElementById("program-name").value = "";
        document.getElementById("program-name").disabled = true;
    }
});

/**
Helper function that displays a notification, and removes it after a specified time.
*/
function displayNotification(relativeElement, messageText, notificationTime) {
    var notificationElement = document.createElement("div");
    notificationElement.classList.add("notification");
    notificationElement.textContent = messageText;
    var notificationCoords = relativeElement.getBoundingClientRect();
    notificationElement.style.left = `${notificationCoords.left}px`;
    notificationElement.style.top = `${notificationCoords.bottom + 3}px`;
    document.body.appendChild(notificationElement);
    setTimeout(() => {
        notificationElement.remove();
    }, notificationTime);
}

/**
When the 'Create' button is clicked, save the program, and then open it.
*/
document.getElementById("create").addEventListener("click", e => {
    if (document.getElementById("languages").selectedIndex !== 0) {
        const languageData = {
            "html-css-js": {
                name: "HTML, CSS, JS",
                editorPage: "html-css-js"
            },
            javascript: {
                name: "Plain JavaScript",
                editorPage: "javascript"
            },
            kaboom: {
                name: "Kaboom",
                editorPage: "javascript"
            },
            p5js: {
                name: "p5.js",
                editorPage: "html-css-js"
            },
            python: {
                name: "Python",
                editorPage: "python"
            }
        };
        const originalProgramName = document.getElementById("program-name").value || languageData[document.getElementById("languages").value].name;
        let programName = originalProgramName;
        let programNumber = 1;
        while (myPrograms.hasOwnProperty(programName)) {
            programName = `${originalProgramName} (${programNumber})`;
            programNumber++;
        }
        myPrograms[programName] = {};
        myPrograms[programName]["language"] = document.getElementById("languages").value;
        myPrograms[programName]["program"] = defaultCodes[document.getElementById("languages").value].replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit"));
        myPrograms[programName]["verified"] = true;
        if (["kaboom", "javascript"].includes(document.getElementById("languages").value)) {
            const databases = JSON.parse(localStorage.getItem("code-editor-databases"));
            databases[programName] = {};
            localStorage.setItem("code-editor-databases", JSON.stringify(databases));
        }
        displayNotification(e.target, "Program successfully created!", 2000);
        localStorage.setItem("code-editor-my-programs", JSON.stringify(myPrograms));
        location.assign(`../languages/${languageData[document.getElementById("languages").value].editorPage}/?prog=${programName}`);
    } else {
        displayNotification(e.target, "You did not select a language.", 2000);
    }
});
