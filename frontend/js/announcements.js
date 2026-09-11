/* =====================================================
   CAMPUSPLUS ADMIN ANNOUNCEMENTS
===================================================== */


/* =====================================================
   DEFAULT ANNOUNCEMENTS
===================================================== */

let announcements = [

    {
        id: 1,
        title: "Complaint Resolution Update",
        category: "important",
        date: "2026-09-10",
        description:
            "Students are requested to check the status of their submitted complaints. Recently resolved complaints have been updated in the complaint system."
    },

    {
        id: 2,
        title: "Water Cooler Maintenance Update",
        category: "maintenance",
        date: "2026-09-08",
        description:
            "Maintenance work is currently in progress for water cooler facilities reported in the campus. Updates will be provided after the issue is resolved."
    },

    {
        id: 3,
        title: "Complaint Processing Time",
        category: "complaint-update",
        date: "2026-09-05",
        description:
            "Students are informed that some complaints may require additional processing time depending on the type of issue and availability of maintenance staff."
    },

    {
        id: 4,
        title: "Classroom Facility Complaints Resolved",
        category: "complaint-update",
        date: "2026-09-02",
        description:
            "Reported classroom facility complaints have been reviewed and the necessary maintenance work has been completed."
    }

];



/* =====================================================
   ELEMENTS
===================================================== */

const announcementList =
    document.getElementById("announcementsList");

const announcementCount =
    document.getElementById("announcementCount");

const searchInput =
    document.getElementById("announcementSearch");

const clearSearch =
    document.getElementById("clearAnnouncementSearch");

const noAnnouncements =
    document.getElementById("noAnnouncements");

const filterButtons =
    document.querySelectorAll(".announcement-filter");

const modal =
    document.getElementById("announcementModal");

const openAddModal =
    document.getElementById("openAddModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const announcementForm =
    document.getElementById("announcementForm");

const modalTitle =
    document.getElementById("modalTitle");

const announcementId =
    document.getElementById("announcementId");

const announcementTitle =
    document.getElementById("announcementTitle");

const announcementCategory =
    document.getElementById("announcementCategory");

const announcementDate =
    document.getElementById("announcementDate");

const announcementDescription =
    document.getElementById("announcementDescription");



/* =====================================================
   CURRENT FILTER
===================================================== */

let currentFilter = "all";



/* =====================================================
   CATEGORY NAME
===================================================== */

function getCategoryName(category) {

    if (category === "important") {

        return "Important";

    }

    if (category === "maintenance") {

        return "Maintenance";

    }

    if (category === "complaint-update") {

        return "Complaint Update";

    }

    return "Announcement";

}



/* =====================================================
   CATEGORY ICON
===================================================== */

function getCategoryIcon(category) {

    if (category === "important") {

        return "fa-circle-exclamation";

    }

    if (category === "maintenance") {

        return "fa-screwdriver-wrench";

    }

    return "fa-rotate";

}



/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}



/* =====================================================
   RENDER ANNOUNCEMENTS
===================================================== */

function renderAnnouncements() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    let filteredAnnouncements =
        announcements.filter(function (announcement) {


            const matchesFilter =
                currentFilter === "all" ||
                announcement.category === currentFilter;


            const matchesSearch =
                announcement.title
                    .toLowerCase()
                    .includes(searchText) ||

                announcement.description
                    .toLowerCase()
                    .includes(searchText);


            return matchesFilter && matchesSearch;

        });



    announcementList.innerHTML = "";



    /* NO RESULTS */

    if (filteredAnnouncements.length === 0) {

        noAnnouncements.style.display = "block";

    }

    else {

        noAnnouncements.style.display = "none";

    }



    /* CREATE CARDS */

    filteredAnnouncements.forEach(function (announcement) {


        const card =
            document.createElement("article");


        card.className = "announcement-card";


        let iconClass =
            "update-icon";


        if (announcement.category === "important") {

            iconClass = "important-icon";

        }

        else if (announcement.category === "maintenance") {

            iconClass = "maintenance-icon";

        }



        let categoryClass =
            announcement.category === "complaint-update"
                ? "update"
                : announcement.category;



        card.innerHTML = `

            <div class="announcement-card-icon ${iconClass}">

                <i class="fa-solid ${getCategoryIcon(announcement.category)}"></i>

            </div>


            <div class="announcement-content">

                <div class="announcement-top">

                    <div>

                        <span class="announcement-category ${categoryClass}">

                            <i class="fa-solid ${getCategoryIcon(announcement.category)}"></i>

                            ${getCategoryName(announcement.category)}

                        </span>


                        <h3>
                            ${announcement.title}
                        </h3>

                    </div>


                    <span class="announcement-date">

                        <i class="fa-regular fa-calendar"></i>

                        ${formatDate(announcement.date)}

                    </span>

                </div>


                <p>
                    ${announcement.description}
                </p>


                <div class="announcement-actions">

                    <button
                        type="button"
                        class="edit-announcement-btn"
                        data-id="${announcement.id}">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>


                    <button
                        type="button"
                        class="delete-announcement-btn"
                        data-id="${announcement.id}">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        `;


        announcementList.appendChild(card);

    });



    /* UPDATE COUNT */

    announcementCount.textContent =
        `${announcements.length} Updates`;

}



/* =====================================================
   OPEN ADD MODAL
===================================================== */

openAddModal.addEventListener("click", function () {

    modalTitle.textContent =
        "Add Announcement";


    announcementForm.reset();


    announcementId.value = "";


    modal.classList.add("show");

});



/* =====================================================
   CLOSE MODAL
===================================================== */

function closeAnnouncementModal() {

    modal.classList.remove("show");

}



closeModal.addEventListener(
    "click",
    closeAnnouncementModal
);


cancelModal.addEventListener(
    "click",
    closeAnnouncementModal
);



/* =====================================================
   CLOSE WHEN CLICKING OUTSIDE
===================================================== */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeAnnouncementModal();

    }

});



/* =====================================================
   ADD / EDIT ANNOUNCEMENT
===================================================== */

announcementForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const id =
        announcementId.value;


    const title =
        announcementTitle.value.trim();


    const category =
        announcementCategory.value;


    const date =
        announcementDate.value;


    const description =
        announcementDescription.value.trim();



    /* EDIT */

    if (id) {

        const announcement =
            announcements.find(function (item) {

                return item.id === Number(id);

            });


        if (announcement) {

            announcement.title =
                title;

            announcement.category =
                category;

            announcement.date =
                date;

            announcement.description =
                description;

        }

    }


    /* ADD */

    else {

        const newAnnouncement = {

            id: Date.now(),

            title: title,

            category: category,

            date: date,

            description: description

        };


        announcements.unshift(
            newAnnouncement
        );

    }



    renderAnnouncements();

    closeAnnouncementModal();

});



/* =====================================================
   EDIT / DELETE BUTTONS
===================================================== */

announcementList.addEventListener(
    "click",
    function (event) {


        const editButton =
            event.target.closest(
                ".edit-announcement-btn"
            );


        const deleteButton =
            event.target.closest(
                ".delete-announcement-btn"
            );



        /* EDIT */

        if (editButton) {

            const id =
                Number(editButton.dataset.id);


            const announcement =
                announcements.find(function (item) {

                    return item.id === id;

                });


            if (!announcement) {

                return;

            }


            modalTitle.textContent =
                "Edit Announcement";


            announcementId.value =
                announcement.id;


            announcementTitle.value =
                announcement.title;


            announcementCategory.value =
                announcement.category;


            announcementDate.value =
                announcement.date;


            announcementDescription.value =
                announcement.description;


            modal.classList.add("show");

        }



        /* DELETE */

        if (deleteButton) {

            const id =
                Number(deleteButton.dataset.id);


            const announcement =
                announcements.find(function (item) {

                    return item.id === id;

                });


            if (!announcement) {

                return;

            }


            const confirmDelete =
                confirm(
                    `Are you sure you want to delete "${announcement.title}"?`
                );


            if (confirmDelete) {

                announcements =
                    announcements.filter(function (item) {

                        return item.id !== id;

                    });


                renderAnnouncements();

            }

        }

    }
);



/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    renderAnnouncements
);



/* =====================================================
   CLEAR SEARCH
===================================================== */

clearSearch.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        renderAnnouncements();

    }
);



/* =====================================================
   FILTERS
===================================================== */

filterButtons.forEach(function (button) {


    button.addEventListener(
        "click",
        function () {


            filterButtons.forEach(
                function (item) {

                    item.classList.remove("active");

                }
            );


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            renderAnnouncements();

        }
    );

});



/* =====================================================
   INITIAL LOAD
===================================================== */

renderAnnouncements();