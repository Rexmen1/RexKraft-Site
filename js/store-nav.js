document.addEventListener('DOMContentLoaded', () => {
    const storeNavItems = document.querySelectorAll('.store-nav ul li');
    const storeCategories = document.querySelectorAll('.store-content .store-category');

    storeNavItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            // Remove active class from all nav items and categories
            storeNavItems.forEach(item => item.classList.remove('active'));
            storeCategories.forEach(category => category.classList.remove('active'));

            // Add active class to clicked nav item
            navItem.classList.add('active');

            // Show corresponding category
            const categoryToShow = document.getElementById(`${navItem.dataset.category}-category`);
            if (categoryToShow) {
                categoryToShow.classList.add('active');
            }
        });
    });
});
