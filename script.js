/**
Import all required CodeMirror and Lezer modules.
*/
import {lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap} from "https://codemirror.net/try/mods/@codemirror-view.js";
import {EditorView} from "https://codemirror.net/try/mods/@codemirror-view.js";
import {EditorState} from "https://codemirror.net/try/mods/@codemirror-state.js";
import {foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, HighlightStyle, indentUnit} from "https://codemirror.net/try/mods/@codemirror-language.js";
import {history, defaultKeymap, historyKeymap} from "https://codemirror.net/try/mods/@codemirror-commands.js";
import {highlightSelectionMatches} from "https://codemirror.net/try/mods/@codemirror-search.js";
import {closeBrackets, closeBracketsKeymap, completionKeymap} from "https://codemirror.net/try/mods/@codemirror-autocomplete.js";
import {lintKeymap} from "https://codemirror.net/try/mods/@codemirror-lint.js";
import {html} from "https://codemirror.net/try/mods/@codemirror-lang-html.js";
import {tags} from "https://codemirror.net/try/mods/@lezer-highlight.js";
import indentWithTab from "./scripts/indent-with-tab.js";
import {colorPicker} from "./languages/node-modules/@replit/codemirror-css-color-picker/dist/index.js";
import {indentationMarkers} from "./languages/node-modules/@replit/codemirror-indentation-markers/dist/index.js";

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
Set the explorer role by default to false, for new users.
*/
if (!localStorage.getItem("code-editor-role-explorer")) {
    localStorage.setItem("code-editor-role-explorer", false);
}

/**
Add the site theme and seasonal extras attributes to the body element.
*/
document.body.setAttribute("theme", localStorage.getItem("code-editor-site-theme"));
document.body.setAttribute("seasonal-extras", localStorage.getItem("code-editor-site-seasonalExtras"));

/**
If the explorer role is active, show the explorer languages.
*/
if (localStorage.getItem("code-editor-role-explorer") !== "false") {
    document.querySelectorAll(".explorer-language").forEach(languageElement => {
        languageElement.style.display = "block";
    });
}

/**
Create the editor.
*/
const editor = new EditorView({
    state: EditorState.create({
        doc: `<!DOCTYPE html>
<html>

<title>My Page</title>

<body>
    <h1>My First Page</h1>
    <p>Hello, world!</p>
</body>

</html>
`,
        extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            history(),
            foldGutter({
                markerDOM(open) {
                    const foldGutterElement = document.createElement("span");
                    foldGutterElement.classList.add("fold-gutter-marker");
                    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgElement.setAttribute("width", "12");
                    svgElement.setAttribute("height", "12");
                    svgElement.setAttribute("fill", "currentColor");
                    svgElement.setAttribute("viewBox", "0 0 24 24");
                    svgElement.setAttribute("preserveAspectRatio", "xMidYMin");
                    svgElement.setAttribute("xmlns", "http:\/\/www.w3.org\/2000\/svg");
                    svgElement.setAttribute("aria-hidden", "true");
                    svgElement.style.width = "0.75rem";
                    svgElement.style.height = "0.75rem";
                    svgElement.style.display = "inline-block";
                    svgElement.style.verticalAlign = "middle";
                    if (open) {
                        foldGutterElement.title = "Fold line";
                        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d", "M12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303Z");
                        pathElement.setAttribute("fillRule", "evenodd");
                        pathElement.setAttribute("clipRule", "evenodd");
                        svgElement.appendChild(pathElement);
                    } else {
                        foldGutterElement.title = "Unfold line";
                        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d", "M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303C8.17678 18.2374 8.17678 17.7626 8.46967 17.4697L13.9393 12L8.46967 6.53033C8.17678 6.23744 8.17678 5.76256 8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L15.5303 11.4697Z");
                        pathElement.setAttribute("fillRule", "evenodd");
                        pathElement.setAttribute("clipRule", "evenodd");
                        svgElement.appendChild(pathElement);
                    }
                    foldGutterElement.appendChild(svgElement);
                    return foldGutterElement;
                }
            }),
            drawSelection(),
            dropCursor(),
            EditorState.allowMultipleSelections.of(true),
            indentOnInput(),
            syntaxHighlighting(defaultHighlightStyle, {
                fallback: true
            }),
            syntaxHighlighting(HighlightStyle.define([
                {tag: tags.link, class: "tok-link"},
                {tag: tags.heading, class: "tok-heading"},
                {tag: tags.emphasis, class: "tok-emphasis"},
                {tag: tags.strong, class: "tok-strong"},
                {tag: tags.keyword, class: "tok-keyword"},
                {tag: tags.atom, class: "tok-atom" },
                {tag: tags.bool, class: "tok-bool"},
                {tag: tags.url, class: "tok-url"},
                {tag: tags.labelName, class: "tok-labelName"},
                {tag: tags.inserted, class: "tok-inserted"},
                {tag: tags.deleted, class: "tok-deleted"},
                {tag: tags.literal, class: "tok-literal"},
                {tag: [tags.string, tags.special(tags.string)], class: "tok-string"},
                {tag: tags.number, class: "tok-number"},
                {tag: [tags.regexp, tags.escape], class: "tok-string2"},
                {tag: tags.variableName, class: "tok-variableName"},
                {tag: tags.local(tags.variableName), class: "tok-variableName tok-local"},
                {tag: tags.special(tags.variableName), class: "tok-variableName2"},
                {tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], class: "tok-function"},
                {tag: tags.typeName, class: "tok-typeName"},
                {tag: tags.namespace, class: "tok-namespace"},
                {tag: tags.className, class: "tok-className"},
                {tag: tags.macroName, class: "tok-macroName"},
                {tag: tags.propertyName, class: "tok-propertyName"},
                {tag: tags.operator, class: "tok-operator"},
                {tag: tags.comment, class: "tok-comment"},
                {tag: tags.meta, class: "tok-meta"},
                {tag: tags.invalid, class: "tok-invalid"},
                {tag: tags.angleBracket, class: "tok-angleBracket"}
            ])),
            bracketMatching(),
            closeBrackets(),
            rectangularSelection(),
            crosshairCursor(),
            highlightActiveLine(),
            highlightSelectionMatches(),
            keymap.of([
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap,
                indentWithTab
            ]),
            html(),
            EditorState.tabSize.of(4),
            indentUnit.of("    "),
            EditorView.lineWrapping,
            indentationMarkers(),
            colorPicker
        ]
    }),
    parent: document.getElementById("editor")
});

/**
When the code is changed, update the output.
*/
editor.contentDOM.addEventListener("keyup", () => {
    document.getElementById("output").textContent = "";
    const frame = document.createElement("iframe");
    document.getElementById("output").appendChild(frame);
    const frameDoc = frame.contentDocument || frame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(editor.state.doc.toString());
    frameDoc.close();
});

/**
Show the output automatically.
*/
const frame = document.createElement("iframe");
document.getElementById("output").appendChild(frame);
const frameDoc = frame.contentDocument || frame.contentWindow.document;
frameDoc.open();
frameDoc.write(`<!DOCTYPE html>
<html>

<title>My Page</title>

<body>
    <h1>My First Page</h1>
    <p>Hello, world!</p>
</body>

</html>
`);
frameDoc.close();

/**
When the "Play Catch the Code" button is clicked, start the game.
*/
document.getElementById("catch-the-code-play").addEventListener("click", () => {
    setInterval(() => {
        const codeElement = document.createElement("div");
        codeElement.classList.add("code");
        codeElement.textContent = `function hello() {
    console.log("You can't catch me!");
}`;
        codeElement.style = `left: ${Math.random() * innerWidth}px; top: ${Math.random() * innerHeight}px; --background-color: rgb(${Math.random() * 128}, ${Math.random() * 128}, ${Math.random() * 128}); color: rgb(${(Math.random() * 128) + 127}, ${(Math.random() * 128) + 127}, ${(Math.random() * 128) + 127})`;
        document.body.appendChild(codeElement);
        codeElement.addEventListener("mousemove", () => {
            codeElement.remove();
        });
    }, 1500);
    document.getElementById("catch-the-code-play").innerHTML = `<h4>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -0.125em;" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V18C20.75 19.5188 19.5188 20.75 18 20.75H6C4.48122 20.75 3.25 19.5188 3.25 18V6Z"></path>
    </svg>
    Catch the Code
</h4>
<p>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -0.25em;" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V18C20.75 19.5188 19.5188 20.75 18 20.75H6C4.48122 20.75 3.25 19.5188 3.25 18V6Z"></path>
    </svg>
    Stop
</p>
`;
    document.getElementById("catch-the-code-play").addEventListener("click", () => {
        document.location.reload();
    });
});

document.querySelectorAll(".holo-attribute-wrapper").forEach(element => {
    element.addEventListener("mousemove", e => {
        const w = element.clientWidth;
        const h = element.clientHeight;
        const b = element.getBoundingClientRect();
        const mX = (e.clientX - b.left) / w;
        const mY = (e.clientY - b.top) / h;
        const rX = -(mX - 0.5) * 12;
        const rY = (mY - 0.5) * 12;
        const bgX = 40 + 20 * mX;
        const bgY = 40 + 20 * mY;
        element.style.setProperty("--m-x", `${100 * mX}%`);
        element.style.setProperty("--m-y", `${100 * mY}%`);
        element.style.setProperty("--bg-x", `${bgX}%`);
        element.style.setProperty("--bg-y", `${bgY}%`);
        element.style.setProperty("--r-x", `${rX}deg`);
        element.style.setProperty("--r-y", `${rY}deg`);
    });
    element.addEventListener("mouseenter", () => {
        element.style.setProperty("--opacity", "0.6");
        const id = setTimeout(() => {
            element.style.setProperty("--duration", "0ms");
        }, 300);
        return () => {
            clearTimeout(id);
        };
    });
    element.addEventListener("mouseleave", () => {
        element.style.setProperty("--duration", "300ms");
        element.style.setProperty("--opacity", "0");
        element.style.setProperty("--m-x", "50%");
        element.style.setProperty("--m-y", "50%");
        element.style.setProperty("--bg-x", "50%");
        element.style.setProperty("--bg-y", "50%");
        element.style.setProperty("--r-x", "0deg");
        element.style.setProperty("--r-y", "0deg");
    });
});
