/**
This script adds a "Made with DrRcraft Code Editor" badge to your website.
*/
function makeDrRcraftCodeEditorBadge(theme = "dark", position = "bottom-right") {
    const offset = "1.5rem";
    const positions = {
        "top-left": `top: ${offset}; left: ${offset};`,
        "top-right": `top: ${offset}; right: ${offset};`,
        "bottom-left": `bottom: ${offset}; left: ${offset};`,
        "bottom-right": `bottom: ${offset}; right: ${offset};`
    };
    const themes = {
        dark: {foreground: "#f5f9fc", background: "#101724", logo: "colored"},
        light: {foreground: "#0e1525", background: "#f5f9fc", logo: "colored"},
        red: {foreground: "#f5f9fc", background: "#fa4b4b", logo: "grayscale"},
        orange: {foreground: "#f5f9fc", background: "#d96d00", logo: "grayscale"},
        yellow: {foreground: "#f5f9fc", background: "#a68a00", logo: "grayscale"},
        lime: {foreground: "#f5f9fc", background: "#639400", logo: "grayscale"},
        green: {foreground: "#f5f9fc", background: "#00a11b", logo: "grayscale"},
        teal: {foreground: "#f5f9fc", background: "#0093b0", logo: "grayscale"},
        blue: {foreground: "#f5f9fc", background: "#0f87ff", logo: "grayscale"},
        blurple: {foreground: "#f5f9fc", background: "#8e78ff", logo: "grayscale"},
        purple: {foreground: "#f5f9fc", background: "#b266ff", logo: "grayscale"},
        magenta: {foreground: "#f5f9fc", background: "#eb3beb", logo: "grayscale"},
        pink: {foreground: "#f5f9fc", background: "#f545ba", logo: "grayscale"}
    }
    if (!positions.hasOwnProperty(position)) {
        console.warn(`The specified position "${position}" is invalid. The position has thus been reset to the default, "bottom-right".`);
        position = "bottom-right";
    }
    if (!themes.hasOwnProperty(theme)) {
        console.warn(`The specified theme "${theme}" is invalid. The position has thus been reset to the default, "dark".`);
        theme = "dark";
    }

    const badgeElement = document.createElement("a");
    badgeElement.href = "https://drrman25.github.io/code-editor/";
    badgeElement.target = "_blank";
    // This SVG is just a test, will be changed later
    badgeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="265" height="35" viewBox="0 0 265 35" fill="none" id="drrcraft-code-editor-badge" style="${positions[position]}">
    <rect width="265" height="35" rx="8" fill="${themes[theme].background}"></rect>
    ${(themes[theme].logo === "colored") ? `<circle cx="21" cy="12" r="3" fill="lime" stroke-width="0.5" stroke="#080"></circle>
    <circle cx="29" cy="17.5" r="3" fill="cyan" stroke-width="0.5" stroke="#088"></circle>
    <circle cx="21" cy="23" r="3" fill="#0af" stroke-width="0.5" stroke="#058"></circle>` : `<circle cx="21" cy="12" r="3" fill="white" stroke-width="0.5" stroke="white"></circle>
    <circle cx="29" cy="17.5" r="3" fill="white" stroke-width="0.5" stroke="white"></circle>
    <circle cx="21" cy="23" r="3" fill="white" stroke-width="0.5" stroke="white"></circle>`}
    <text x="39" y="23" font-family="Inter" font-size="14" fill="${themes[theme].foreground}">Made with DrRcraft Code Editor</text>
</svg>`;
    document.head.insertAdjacentHTML("beforeend", `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap" />
<style>
    #drrcraft-code-editor-badge {
        position: fixed;
        cursor: pointer;
        z-index: 2147483647;
        transition: transform 0.1s ease-in-out;
    }

    #drrcraft-code-editor-badge:hover {
        transform: scale(1.05);
    }
</style>`);
    document.body.appendChild(badgeElement);
}

makeDrRcraftCodeEditorBadge(document.currentScript.getAttribute("data-drrcraft-theme"), document.currentScript.getAttribute("data-drrcraft-position"));
