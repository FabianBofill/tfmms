// navItems selector
const navItems = document.querySelectorAll('.nav-item');

// Load selected navItem from localstorage
const selectedNavItemIndex = localStorage.getItem('selectedNavItemIndex') || 0;
navItems[selectedNavItemIndex].classList.add('selected');

// navItems event onclick listener
navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // remove current selected class
        navItems.forEach(item => {
            item.classList.remove('selected');
        });

        console.log("click navItem");

        // add selected class to the item selected
        item.classList.add('selected');

        // save selected item in localstorage
        localStorage.setItem('selectedNavItemIndex', index.toString());
    });
});