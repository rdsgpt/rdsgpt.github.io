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
Add the site theme and seasonal extras attributes to the body element.
*/
document.body.setAttribute("theme", localStorage.getItem("code-editor-site-theme"));
document.body.setAttribute("seasonal-extras", localStorage.getItem("code-editor-site-seasonalExtras"));

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

function search(query) {
    document.getElementById("searchbox").querySelector(".results").textContent = "";
    if (query.trim() === "") {
        return;
    }
    let counter = 0;
    let queryRegExp = new RegExp(query.toLowerCase(), "gi");
    for (const paragraph of document.querySelectorAll("p")) {
        let paragraphSentences = `${paragraph.textContent} `.split(". ");
        for (const sentence of paragraphSentences) {
            if (sentence.search(queryRegExp) > -1) {
                const listItem = document.createElement("li");
                listItem.textContent = `${sentence}.`;
                listItem.innerHTML = listItem.innerHTML.replace(sentence.slice(sentence.search(queryRegExp), sentence.search(queryRegExp) + query.length), `<mark>${sentence.slice(sentence.search(queryRegExp), sentence.search(queryRegExp) + query.length)}</mark>`);
                listItem.addEventListener("click", () => {
                    scrollTo({
                        top: paragraph.getBoundingClientRect().y
                    });
                });
                document.getElementById("searchbox").querySelector(".results").appendChild(listItem);
                counter++;
                if (counter === 10) {
                    return;
                }
            }
        }
    };
}

document.getElementById("searchbox").querySelector("input").addEventListener("input", () => {
    search(document.getElementById("searchbox").querySelector("input").value);
});
