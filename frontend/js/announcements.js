/* =========================================
   ANNOUNCEMENTS - CAMPUSPLUS
   Shared JavaScript for Student and Admin
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS - COMMON
    ========================================== */

    const announcementsList =
        document.getElementById("announcementsList");

    const announcementSearch =
        document.getElementById("announcementSearch");

    const clearSearchButton =
        document.getElementById("clearAnnouncementSearch");

    const filterButtons =
        document.querySelectorAll(".announcement-filter");

    const noAnnouncements =
        document.getElementById("noAnnouncements");

    const announcementCount =
        document.getElementById("announcementCount");


    /* =========================================
       ELEMENTS - ADMIN SUMMARY
    ========================================== */

    const totalAnnouncements =
        document.getElementById("totalAnnouncements");

    const importantAnnouncements =
        document.getElementById("importantAnnouncements");

    const maintenanceAnnouncements =
        document.getElementById("maintenanceAnnouncements");


    /* =========================================
       ELEMENTS - ADMIN MODAL
    ========================================== */

    const openAddAnnouncement =
        document.getElementById("openAddAnnouncement");

    const announcementModal =
        document.getElementById("announcementModal");

    const closeModal =
        document.getElementById("closeModal");

    const closeModalBtn =
        document.getElementById("closeModalBtn");

    const cancelAnnouncement =
        document.getElementById("cancelAnnouncement");

    const announcementForm =
        document.getElementById("announcementForm");

    const announcementTitle =
        document.getElementById("announcementTitle");

    const announcementCategory =
        document.getElementById("announcementCategory");

    const announcementMessage =
        document.getElementById("announcementMessage");


    /* =========================================
       PAGE TYPE
    ========================================== */

    const isAdminPage =
        document.body.classList.contains("admin-page");


    /* =========================================
       STORAGE
    ========================================== */

    const STORAGE_KEY =
        "campusPlusAnnouncements";


    /* =========================================
       STATE
    ========================================== */

    let announcements = [];

    let currentFilter = "all";

    let editingAnnouncementId = null;


    /* =========================================
       CATEGORY INFORMATION
    ========================================== */

    function getCategoryLabel(category) {

        const labels = {

            important:
                "Important",

            maintenance:
                "Maintenance",

            "complaint-update":
                "Complaint Update"

        };


        return labels[category] ||
            "Complaint Update";

    }


    function getCategoryIcon(category) {

        const icons = {

            important:
                "fa-triangle-exclamation",

            maintenance:
                "fa-screwdriver-wrench",

            "complaint-update":
                "fa-bullhorn"

        };


        return icons[category] ||
            "fa-bullhorn";

    }


    function getCategoryIconClass(category) {

        if (category === "important") {
            return "important-icon";
        }


        if (category === "maintenance") {
            return "maintenance-icon";
        }


        return "update-icon";

    }


    /* =========================================
       GENERATE UNIQUE ID
    ========================================== */

    function generateAnnouncementId() {

        return (
            "announcement-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 9)
        );

    }


    /* =========================================
       FORMAT DATE
    ========================================== */

    function getCurrentDate() {

        return new Date().toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    /* =========================================
       GET INITIAL ANNOUNCEMENTS FROM HTML

       Used only when localStorage does not
       already contain announcements.
    ========================================== */

    function getInitialAnnouncements() {

        if (!announcementsList) {
            return [];
        }


        const cards =
            announcementsList.querySelectorAll(
                ".announcement-card"
            );


        const initialAnnouncements = [];


        cards.forEach(function (card, index) {

            const title =
                card.querySelector("h3")
                    ?.textContent
                    .trim() || "";


            const message =
                card.querySelector(
                    ".announcement-content > p"
                )
                    ?.textContent
                    .trim() || "";


            const category =
                card.dataset.category ||
                "complaint-update";


            const date =
                card.querySelector(
                    ".announcement-date"
                )
                    ?.textContent
                    .trim() || "";


            if (title && message) {

                initialAnnouncements.push({

                    id:
                        card.dataset.id ||
                        "initial-" + index,

                    title:
                        title,

                    message:
                        message,

                    category:
                        category,

                    categoryLabel:
                        getCategoryLabel(category),

                    date:
                        date || getCurrentDate()

                });

            }

        });


        return initialAnnouncements;

    }


    /* =========================================
       LOAD ANNOUNCEMENTS
    ========================================== */

    function loadAnnouncements() {

        const savedData =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (savedData) {

            try {

                const parsedData =
                    JSON.parse(savedData);


                if (Array.isArray(parsedData)) {
                    return parsedData;
                }

            }
            catch (error) {

                console.error(
                    "Unable to load announcements:",
                    error
                );

            }

        }


        const initialData =
            getInitialAnnouncements();


        if (initialData.length > 0) {

            saveAnnouncements(
                initialData
            );

        }


        return initialData;

    }


    /* =========================================
       SAVE ANNOUNCEMENTS
    ========================================== */

    function saveAnnouncements(data) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    }


    /* =========================================
       UPDATE ALL COUNTS
    ========================================== */

    function updateCounts() {

        const total =
            announcements.length;


        const important =
            announcements.filter(
                function (announcement) {

                    return (
                        announcement.category ===
                        "important"
                    );

                }
            ).length;


        const maintenance =
            announcements.filter(
                function (announcement) {

                    return (
                        announcement.category ===
                        "maintenance"
                    );

                }
            ).length;


        /* STUDENT HEADER COUNT */

        if (announcementCount) {

            announcementCount.textContent =
                total +
                (
                    total === 1
                        ? " Update"
                        : " Updates"
                );

        }


        /* ADMIN SUMMARY COUNTS */

        if (totalAnnouncements) {

            totalAnnouncements.textContent =
                total;

        }


        if (importantAnnouncements) {

            importantAnnouncements.textContent =
                important;

        }


        if (maintenanceAnnouncements) {

            maintenanceAnnouncements.textContent =
                maintenance;

        }

    }


    /* =========================================
       CREATE ANNOUNCEMENT CARD
    ========================================== */

    function createAnnouncementCard(
        announcement
    ) {

        const article =
            document.createElement("article");


        article.className =
            "announcement-card";


        article.dataset.id =
            announcement.id;


        article.dataset.category =
            announcement.category;


        if (isAdminPage) {

            article.classList.add(
                "admin-announcement-card"
            );

        }


        /* ICON */

        const iconContainer =
            document.createElement("div");


        iconContainer.className =
            "announcement-card-icon " +
            getCategoryIconClass(
                announcement.category
            );


        const icon =
            document.createElement("i");


        icon.className =
            "fa-solid " +
            getCategoryIcon(
                announcement.category
            );


        iconContainer.appendChild(
            icon
        );


        /* CONTENT */

        const content =
            document.createElement("div");


        content.className =
            "announcement-content";


        /* TOP SECTION */

        const top =
            document.createElement("div");


        top.className =
            "announcement-top";


        const titleSection =
            document.createElement("div");


        const categoryBadge =
            document.createElement("span");


        categoryBadge.className =
            "announcement-category " +
            announcement.category;


        const badgeIcon =
            document.createElement("i");


        badgeIcon.className =
            "fa-solid " +
            getCategoryIcon(
                announcement.category
            );


        const badgeText =
            document.createTextNode(
                " " +
                getCategoryLabel(
                    announcement.category
                )
            );


        categoryBadge.appendChild(
            badgeIcon
        );


        categoryBadge.appendChild(
            badgeText
        );


        const title =
            document.createElement("h3");


        title.textContent =
            announcement.title;


        titleSection.appendChild(
            categoryBadge
        );


        titleSection.appendChild(
            title
        );


        /* DATE */

        const date =
            document.createElement("span");


        date.className =
            "announcement-date";


        const dateIcon =
            document.createElement("i");


        dateIcon.className =
            "fa-regular fa-calendar";


        date.appendChild(
            dateIcon
        );


        date.appendChild(
            document.createTextNode(
                " " +
                announcement.date
            )
        );


        top.appendChild(
            titleSection
        );


        top.appendChild(
            date
        );


        /* MESSAGE */

        const message =
            document.createElement("p");


        message.textContent =
            announcement.message;


        content.appendChild(
            top
        );


        content.appendChild(
            message
        );


        /* =====================================
           ADMIN ACTION BUTTONS
        ===================================== */

        if (isAdminPage) {

            const actions =
                document.createElement("div");


            actions.className =
                "announcement-actions";


            /* EDIT BUTTON */

            const editButton =
                document.createElement("button");


            editButton.type =
                "button";


            editButton.className =
                "action-btn edit-btn";


            editButton.dataset.id =
                announcement.id;


            editButton.innerHTML =
                '<i class="fa-solid fa-pen"></i> Edit';


            /* DELETE BUTTON */

            const deleteButton =
                document.createElement("button");


            deleteButton.type =
                "button";


            deleteButton.className =
                "action-btn delete-btn";


            deleteButton.dataset.id =
                announcement.id;


            deleteButton.innerHTML =
                '<i class="fa-solid fa-trash"></i> Delete';


            actions.appendChild(
                editButton
            );


            actions.appendChild(
                deleteButton
            );


            content.appendChild(
                actions
            );

        }


        article.appendChild(
            iconContainer
        );


        article.appendChild(
            content
        );


        return article;

    }


    /* =========================================
       FILTER ANNOUNCEMENTS
    ========================================== */

    function getFilteredAnnouncements() {

        const searchValue =
            announcementSearch
                ? announcementSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        return announcements.filter(
            function (announcement) {

                const title =
                    announcement.title
                        .toLowerCase();


                const message =
                    announcement.message
                        .toLowerCase();


                const category =
                    getCategoryLabel(
                        announcement.category
                    ).toLowerCase();


                const matchesSearch =

                    title.includes(searchValue) ||

                    message.includes(searchValue) ||

                    category.includes(searchValue);


                const matchesFilter =

                    currentFilter === "all" ||

                    announcement.category ===
                    currentFilter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );

    }


    /* =========================================
       RENDER ANNOUNCEMENTS
    ========================================== */

    function renderAnnouncements() {

        if (!announcementsList) {
            return;
        }


        announcementsList.innerHTML = "";


        const filteredAnnouncements =
            getFilteredAnnouncements();


        if (
            filteredAnnouncements.length === 0
        ) {

            if (noAnnouncements) {

                noAnnouncements.style.display =
                    "block";

            }

        }
        else {

            if (noAnnouncements) {

                noAnnouncements.style.display =
                    "none";

            }


            filteredAnnouncements.forEach(
                function (announcement) {

                    const card =
                        createAnnouncementCard(
                            announcement
                        );


                    announcementsList.appendChild(
                        card
                    );

                }
            );

        }


        updateCounts();

    }


    /* =========================================
       SEARCH
    ========================================== */

    if (announcementSearch) {

        announcementSearch.addEventListener(
            "input",
            function () {

                renderAnnouncements();

            }
        );

    }


    /* =========================================
       CLEAR SEARCH
    ========================================== */

    if (clearSearchButton) {

        clearSearchButton.addEventListener(
            "click",
            function () {

                if (!announcementSearch) {
                    return;
                }


                announcementSearch.value =
                    "";


                announcementSearch.focus();


                renderAnnouncements();

            }
        );

    }


    /* =========================================
       FILTERS
    ========================================== */

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter ||
                        "all";


                    renderAnnouncements();

                }
            );

        }
    );


    /* =========================================
       MODAL FUNCTIONS
    ========================================== */

    function openAnnouncementModal() {

        if (!announcementModal) {
            return;
        }


        announcementModal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeAnnouncementModal() {

        if (!announcementModal) {
            return;
        }


        announcementModal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";


        resetAnnouncementForm();

    }


    /* =========================================
       RESET FORM
    ========================================== */

    function resetAnnouncementForm() {

        if (announcementForm) {

            announcementForm.reset();

        }


        editingAnnouncementId =
            null;

    }


    /* =========================================
       SET MODAL MODE
    ========================================== */

    function setModalMode(mode) {

        if (!announcementModal) {
            return;
        }


        const modalHeading =
            announcementModal.querySelector(
                ".modal-header h2"
            );


        const modalParagraph =
            announcementModal.querySelector(
                ".modal-header p"
            );


        const submitButton =
            announcementForm?.querySelector(
                ".save-announcement-btn"
            );


        if (mode === "edit") {

            if (modalHeading) {

                modalHeading.innerHTML =
                    '<i class="fa-solid fa-pen"></i> Edit Announcement';

            }


            if (modalParagraph) {

                modalParagraph.textContent =
                    "Update the announcement details.";

            }


            if (submitButton) {

                submitButton.innerHTML =
                    '<i class="fa-solid fa-floppy-disk"></i> Save Changes';

            }

        }
        else {

            if (modalHeading) {

                modalHeading.innerHTML =
                    '<i class="fa-solid fa-bullhorn"></i> Add Announcement';

            }


            if (modalParagraph) {

                modalParagraph.textContent =
                    "Create a complaint-related announcement.";

            }


            if (submitButton) {

                submitButton.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Publish Announcement';

            }

        }

    }


    /* =========================================
       OPEN ADD ANNOUNCEMENT
    ========================================== */

    if (openAddAnnouncement) {

        openAddAnnouncement.addEventListener(
            "click",
            function () {

                resetAnnouncementForm();


                setModalMode(
                    "add"
                );


                openAnnouncementModal();

            }
        );

    }


    /* =========================================
       CLOSE MODAL EVENTS
    ========================================== */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeAnnouncementModal
        );

    }


    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeAnnouncementModal
        );

    }


    if (cancelAnnouncement) {

        cancelAnnouncement.addEventListener(
            "click",
            closeAnnouncementModal
        );

    }


    /* =========================================
       ESC KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                announcementModal &&
                announcementModal.classList.contains(
                    "active"
                )
            ) {

                closeAnnouncementModal();

            }

        }
    );


    /* =========================================
       FORM SUBMIT
    ========================================== */

    if (announcementForm) {

        announcementForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const title =
                    announcementTitle
                        ?.value
                        .trim();


                const category =
                    announcementCategory
                        ?.value;


                const message =
                    announcementMessage
                        ?.value
                        .trim();


                /* VALIDATION */

                if (
                    !title ||
                    !category ||
                    !message
                ) {

                    alert(
                        "Please fill in all announcement fields."
                    );


                    return;

                }


                /*
                   IMPORTANT FIX:

                   Store whether this is an edit
                   BEFORE closeAnnouncementModal()
                   resets editingAnnouncementId.
                */

                const isEditing =
                    editingAnnouncementId !== null;


                /* =================================
                   EDIT ANNOUNCEMENT
                ================================= */

                if (isEditing) {

                    const index =
                        announcements.findIndex(
                            function (item) {

                                return (
                                    item.id ===
                                    editingAnnouncementId
                                );

                            }
                        );


                    if (index !== -1) {

                        announcements[index].title =
                            title;


                        announcements[index].category =
                            category;


                        announcements[index].categoryLabel =
                            getCategoryLabel(
                                category
                            );


                        announcements[index].message =
                            message;

                    }

                }


                /* =================================
                   ADD ANNOUNCEMENT
                ================================= */

                else {

                    const newAnnouncement = {

                        id:
                            generateAnnouncementId(),

                        title:
                            title,

                        message:
                            message,

                        category:
                            category,

                        categoryLabel:
                            getCategoryLabel(
                                category
                            ),

                        date:
                            getCurrentDate()

                    };


                    /*
                       New announcements appear
                       at the top.
                    */

                    announcements.unshift(
                        newAnnouncement
                    );

                }


                /* SAVE DATA */

                saveAnnouncements(
                    announcements
                );


                /* CLOSE MODAL */

                closeAnnouncementModal();


                /* UPDATE UI */

                renderAnnouncements();


                /* SUCCESS MESSAGE */

                if (isEditing) {

                    alert(
                        "Announcement updated successfully."
                    );

                }
                else {

                    alert(
                        "Announcement published successfully."
                    );

                }

            }
        );

    }


    /* =========================================
       EDIT AND DELETE

       Event delegation is required because
       cards are created dynamically.
    ========================================== */

    if (announcementsList) {

        announcementsList.addEventListener(
            "click",
            function (event) {

                const editButton =
                    event.target.closest(
                        ".edit-btn"
                    );


                const deleteButton =
                    event.target.closest(
                        ".delete-btn"
                    );


                /* =================================
                   EDIT
                ================================= */

                if (editButton) {

                    const id =
                        editButton.dataset.id;


                    const announcement =
                        announcements.find(
                            function (item) {

                                return (
                                    item.id === id
                                );

                            }
                        );


                    if (!announcement) {
                        return;
                    }


                    editingAnnouncementId =
                        announcement.id;


                    if (announcementTitle) {

                        announcementTitle.value =
                            announcement.title;

                    }


                    if (announcementCategory) {

                        announcementCategory.value =
                            announcement.category;

                    }


                    if (announcementMessage) {

                        announcementMessage.value =
                            announcement.message;

                    }


                    setModalMode(
                        "edit"
                    );


                    openAnnouncementModal();


                    return;

                }


                /* =================================
                   DELETE
                ================================= */

                if (deleteButton) {

                    const id =
                        deleteButton.dataset.id;


                    const announcement =
                        announcements.find(
                            function (item) {

                                return (
                                    item.id === id
                                );

                            }
                        );


                    if (!announcement) {
                        return;
                    }


                    const confirmed =
                        confirm(
                            'Are you sure you want to delete "' +
                            announcement.title +
                            '"?'
                        );


                    if (!confirmed) {
                        return;
                    }


                    announcements =
                        announcements.filter(
                            function (item) {

                                return (
                                    item.id !== id
                                );

                            }
                        );


                    saveAnnouncements(
                        announcements
                    );


                    renderAnnouncements();

                }

            }
        );

    }


    /* =========================================
       SYNCHRONIZE BETWEEN TABS

       Example:

       Admin tab:
       Add announcement
             ↓
       localStorage updates
             ↓
       Student tab updates
    ========================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === STORAGE_KEY
            ) {

                announcements =
                    loadAnnouncements();


                renderAnnouncements();

            }

        }
    );


    /* =========================================
       INITIAL LOAD
    ========================================== */

    announcements =
        loadAnnouncements();


    renderAnnouncements();

});