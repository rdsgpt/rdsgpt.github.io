const defaultCodes = {
    "html-css-js": `<!DOCTYPE html>
<html>

<head>
\t<title>My Web Site</title>
</head>

<body>
\t<h1>My First HTML, CSS, and JS Page</h1>
\t<p>Hello, world!</p>

\t<!--
\tThis below script adds a badge, to show that you are using the DrRcraft Code Editor.
\tYou can modify the "data-drrcraft-theme" attribute of the script to change the color theme to dark, light, red, orange, yellow, lime, green, teal, blue, blurple, purple, magenta, or pink!
\tYou can also change the "data-drrcraft-position" attribute to change where the badge will show, "top-left", "top-right", "bottom-left", or "bottom-right".
\t-->
\t<script src="${location.origin}/code-editor/scripts/editor-badge-v2.js" defer="true" data-drrcraft-theme="dark" data-drrcraft-position="bottom-right"></script>
</body>

</html>
`.replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit")),
    "javascript": `console.log("Hello, world!");

// This below script adds a badge, to show that you are using the DrRcraft Code Editor.
// You can modify the "data-drrcraft-theme" attribute of the script to change the color theme to dark, light, red, orange, yellow, lime, green, teal, blue, blurple, purple, magenta, or pink!
// You can also change the "data-drrcraft-position" attribute to change where the badge will show, "top-left", "top-right", "bottom-left", or "bottom-right".
const badgeScript = document.createElement("script");
badgeScript.src = "${location.origin}/code-editor/scripts/editor-badge-v2.js";
badgeScript.defer = true;
badgeScript.setAttribute("data-drrcraft-theme", "dark");
badgeScript.setAttribute("data-drrcraft-position", "bottom-right");
document.body.appendChild(badgeScript);
`.replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit")),
    "kaboom": `import kaboom from "kaboom";
kaboom();

loadSprite("bean", "sprites/bean.png");

add([
\tsprite("bean"),
\tpos(80, 40),
\tarea()
]);

onClick(() => {
\taddKaboom(mousePos());
});

onKeyPress(burp);
`.replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit")),
    "p5js": `<!DOCTYPE html>
<html>

<head>
\t<title>My p5.js Project</title>
</head>

<body>
\t<script src="https://unpkg.com/p5"></script>
\t<script>
\t\tconst colorList = ["red", "blue", "green", "yellow"];

\t\tfunction setup() {
\t\t\tcreateCanvas(windowWidth, windowHeight);
\t\t\tbackground(255);
\t\t}

\t\tfunction draw() {
\t\t\tnoStroke();
\t\t\tfill(random(colorList));
\t\t\tellipse(mouseX, mouseY, 25, 25);
\t\t}
\t</script>

\t<!--
\tThis below script adds a badge, to show that you are using the DrRcraft Code Editor.
\tYou can modify the "data-drrcraft-theme" attribute of the script to change the color theme to dark, light, red, orange, yellow, lime, green, teal, blue, blurple, purple, magenta, or pink!
\tYou can also change the "data-drrcraft-position" attribute to change where the badge will show, "top-left", "top-right", "bottom-left", or "bottom-right".
\t-->
\t<script src="${location.origin}/code-editor/scripts/editor-badge-v2.js" defer="true" data-drrcraft-theme="dark" data-drrcraft-position="bottom-right"></script>
</body>

</html>
`.replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit")),
    "python": `print("Hello, world!")
`.replace(/\t/g, localStorage.getItem("code-editor-editor-indentUnit"))
};

export default defaultCodes;
