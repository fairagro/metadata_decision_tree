const stack = document.querySelector('.stack');
const navLinks = document.querySelector('.navLinks');
let menuOpen = false;

stack.addEventListener('click', () => {
    if (!menuOpen) {
        navLinks.style.display = "block";
        menuOpen = true;
    }else if (menuOpen) {
        navLinks.style.display = "none";
        menuOpen = false;
    }
});