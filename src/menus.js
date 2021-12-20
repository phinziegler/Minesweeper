const menu = document.getElementById("about");
const toggleButton = document.getElementById("aboutIndicator");

toggleButton.addEventListener("click", () => {
    toggleMenu(menu, toggleButton);
});

function toggleMenu(menu, button) {
    menu.classList.toggle("open");
    button.classList.toggle("fa-times");
}

function highlightButton(button) {
    button.classList.toggle("highlighted");
}