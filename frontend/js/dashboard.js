/* ========================================
   CampusPlus - Dashboard JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* Highlight active navigation item */

    const currentPage = window.location.pathname.split("/").pop();

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

        const linkPage = item.getAttribute("href");

        if (linkPage === currentPage) {
            item.classList.add("active");
        }

    });


    /* Dashboard statistic cards */

    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach(function (card) {

        card.addEventListener("click", function () {

            card.classList.add("selected");

            setTimeout(function () {
                card.classList.remove("selected");
            }, 200);

        });

    });

});