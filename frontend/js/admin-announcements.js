/* =====================================================
   CAMPUSPLUS - ADMIN ANNOUNCEMENTS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("announcementSearch");

    const clearButton =
        document.getElementById("clearAnnouncementSearch");

    const filterButtons =
        document.querySelectorAll(".announcement-filter");

    const list =
        document.getElementById("announcementsList");

    const noAnnouncements =
        document.getElementById("noAnnouncements");

    let currentFilter = "all";


    /* ================= FILTER + SEARCH ================= */

    function updateAnnouncements() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const cards =
            document.querySelectorAll(".announcement-card");

        let visibleCount = 0;


        cards.forEach(function (card) {

            const category =
                card.dataset.category;

            const content =
                card.textContent.toLowerCase();


            const matchesSearch =
                content.includes(searchText);

            const matchesFilter =
                currentFilter === "all" ||
                category === currentFilter;


            if (matchesSearch && matchesFilter) {

                card.style.display = "flex";
                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            noAnnouncements.style.display = "block";

        } else {

            noAnnouncements.style.display = "none";

        }

    }


    /* ================= SEARCH ================= */

    searchInput.addEventListener(
        "input",
        updateAnnouncements
    );


    /* ================= CLEAR ================= */

    clearButton.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            updateAnnouncements();

            searchInput.focus();

        }
    );


    /* ================= FILTER ================= */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });

                button.classList.add("active");

                currentFilter =
                    button.dataset.filter;

                updateAnnouncements();

            }
        );

    });


    /* ================= ADD ================= */

    const addButton =
        document.getElementById("addAnnouncementBtn");


    addButton.addEventListener(
        "click",
        function () {

            alert(
                "Add Announcement form will be connected to the backend later."
            );

        }
    );


    /* ================= INITIAL ================= */

    updateAnnouncements();

});


/* =====================================================
   EDIT ANNOUNCEMENT
   ===================================================== */

function editAnnouncement(button) {

    const card =
        button.closest(".announcement-card");

    const title =
        card.querySelector("h3").textContent.trim();

    alert(
        'Edit announcement: "' + title + '"'
    );

}


/* =====================================================
   DELETE ANNOUNCEMENT
   ===================================================== */

function deleteAnnouncement(button) {

    const card =
        button.closest(".announcement-card");

    const title =
        card.querySelector("h3").textContent.trim();


    const confirmation =
        confirm(
            'Are you sure you want to delete "' +
            title +
            '"?'
        );


    if (confirmation) {

        card.remove();

    }

}