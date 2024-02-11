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
