
document.addEventListener('DOMContentLoaded', function () {
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const nav = document.querySelector('nav ul');

// Open menu
menuOpen.addEventListener('click', () => {
    nav.classList.add('open');
    menuOpen.style.display = 'none'; // Hide the open (bars) icon
    menuClose.style.display = 'block'; // Show the close (x) icon
});

// Close menu
menuClose.addEventListener('click', () => {
    nav.classList.remove('open');
    menuOpen.style.display = 'block'; // Show the open (bars) icon
    menuClose.style.display = 'none'; // Hide the close (x) icon
});

// To prevent issues: Add event listener to window resize to show/hide correctly
window.addEventListener('resize', () => {
    if (window.innerWidth > 1110) {
        // Reset both icons when resizing beyond mobile/tablet
        menuOpen.style.display = 'none';
        menuClose.style.display = 'none';
    } else if (!nav.classList.contains('open')) {
        menuOpen.style.display = 'block'; // Show bars icon on small screens if the menu isn't open
        menuClose.style.display = 'none'; // Ensure the close icon is hidden
    }
});
});
