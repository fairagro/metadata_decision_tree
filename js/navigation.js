const stack = document.querySelector('.stack'); //Div with the stack
const navLinks = document.querySelector('.navLinks'); //Div with all the navigation links
let menuOpen = false;

//Adds an interaction to the stack block that opens and closes the navigation menu
stack.addEventListener('click', () => {
    if (!menuOpen) {
        navLinks.style.display = "block";
        menuOpen = true;
    }else if (menuOpen) {
        navLinks.style.display = "";
        menuOpen = false;
    }
});