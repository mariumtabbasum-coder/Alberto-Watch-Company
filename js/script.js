document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
                       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const dropdownParent =
        document.querySelector(".dropdown-menu-custom");

    const productsNav =
        document.querySelector(
            ".dropdown-menu-custom>.nav-link"
        );


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {

                item.classList.remove("active");

            });


            link.classList.add("active");


            if (menuToggle) {

                menuToggle.checked = false;

            }

        });

    });


    /* MOBILE PRODUCTS DROPDOWN */

    if (productsNav && dropdownParent) {

        productsNav.addEventListener(
            "click",
            function (event) {

                if (window.innerWidth <= 991) {

                    event.preventDefault();

                    dropdownParent.classList.toggle(
                        "open-dropdown"
                    );

                }

            }
        );

    }



    /* =====================================================
                     FILTER LINK HANDLER
    ===================================================== */

    const filterLinks =
        document.querySelectorAll(
            "[data-filter-link]"
        );


    filterLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const selectedFilter =
                    link.getAttribute(
                        "data-filter-link"
                    );


                if (menuToggle) {

                    menuToggle.checked = false;

                }


                if (dropdownParent) {

                    dropdownParent.classList.remove(
                        "open-dropdown"
                    );

                }


                setProductFilter(selectedFilter);

            }
        );

    });



    /* =====================================================
                     VISITOR COUNTER
    ===================================================== */

    const visitor =
        document.getElementById(
            "visitorCount"
        );


    if (visitor) {

        // Start a fresh counter at zero. On every later refresh in this
        // browser, increase the saved value by one. A new key intentionally
        // avoids restoring the old 1250 demo value.
        const visitorStorageKey = "albertoVisitorCountV2";
        const savedCount = Number.parseInt(
            localStorage.getItem(visitorStorageKey),
            10
        );
        const count = Number.isNaN(savedCount)
            ? 0
            : savedCount + 1;

        localStorage.setItem(visitorStorageKey, String(count));
        visitor.textContent = String(count);

    }



    /* =====================================================
                       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    const dots =
        document.querySelectorAll(
            ".hero-dot"
        );


    const next =
        document.getElementById(
            "heroNext"
        );


    const prev =
        document.getElementById(
            "heroPrev"
        );


    const slider =
        document.getElementById(
            "heroSlider"
        );


    let current = 0;

    let timer;


    function showSlide(index) {


        if (index >= slides.length) {

            current = 0;

        }

        else if (index < 0) {

            current =
                slides.length - 1;

        }

        else {

            current = index;

        }


        slides.forEach(function (slide) {

            slide.classList.remove(
                "active-slide"
            );

        });


        dots.forEach(function (dot) {

            dot.classList.remove(
                "active-dot"
            );

        });


        if (slides[current]) {

            slides[current]
                .classList.add(
                    "active-slide"
                );

        }


        if (dots[current]) {

            dots[current]
                .classList.add(
                    "active-dot"
                );

        }

    }


    function start() {

        timer = setInterval(
            function () {

                showSlide(
                    current + 1
                );

            },
            5000
        );

    }


    function restart() {

        clearInterval(timer);

        start();

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {

                showSlide(
                    current + 1
                );

                restart();

            }
        );

    }


    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                showSlide(
                    current - 1
                );

                restart();

            }
        );

    }


    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showSlide(index);

                restart();

            }
        );

    });


    /* TOUCH SWIPE */

    let startX = 0;


    if (slider) {

        slider.addEventListener(
            "touchstart",
            function (event) {

                startX =
                    event.changedTouches[0]
                    .screenX;

            }
        );


        slider.addEventListener(
            "touchend",
            function (event) {

                const endX =
                    event.changedTouches[0]
                    .screenX;


                const distance =
                    endX - startX;


                if (distance < -50) {

                    showSlide(
                        current + 1
                    );

                    restart();

                }


                if (distance > 50) {

                    showSlide(
                        current - 1
                    );

                    restart();

                }

            }
        );

    }


    if (slides.length > 0) {

        showSlide(0);

        start();

    }



    /* =====================================================
                     PRODUCT FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const products =
        document.querySelectorAll(
            ".product-item"
        );


    function setProductFilter(category) {


        filterButtons.forEach(
            function (button) {

                button.classList.toggle(
                    "active-filter",
                    button.dataset.category ===
                    category
                );

            }
        );


        products.forEach(
            function (product) {

                product.style.display =
                    (
                        category === "all" ||
                        product.dataset.category
                            .includes(category)
                    )
                    ? ""
                    : "none";

            }
        );


        const productsSection =
            document.getElementById(
                "products"
            );


        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    setProductFilter(
                        button.dataset.category
                    );

                }
            );

        }
    );



    /* =====================================================
                    PRODUCT MODAL
    ===================================================== */

    const productButtons =
        document.querySelectorAll(
            ".view-details-btn"
        );


    productButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    const product =
                        button.closest(
                            ".product-item"
                        );


                    if (!product) {

                        return;

                    }


                    document.getElementById(
                        "modalName"
                    ).textContent =
                        product.dataset.name;


                    document.getElementById(
                        "modalType"
                    ).textContent =
                        product.dataset.type;


                    document.getElementById(
                        "modalDescription"
                    ).textContent =
                        product.dataset.description;


                    document.getElementById(
                        "modalBrand"
                    ).textContent =
                        product.dataset.brand;


                    let category =
                        "Classic";


                    if (
                        product.dataset.category
                            .includes("luxury")
                    ) {

                        category = "Luxury";

                    }

                    else if (
                        product.dataset.category
                            .includes("vintage")
                    ) {

                        category = "Vintage";

                    }

                    else if (
                        product.dataset.category
                            .includes("smart")
                    ) {

                        category = "Smart";

                    }


                    document.getElementById(
                        "modalCategory"
                    ).textContent =
                        category;


                    document.getElementById(
                        "modalMovement"
                    ).textContent =
                        product.dataset.movement;


                    document.getElementById(
                        "modalWater"
                    ).textContent =
                        product.dataset.water;


                    document.getElementById(
                        "modalMaterial"
                    ).textContent =
                        product.dataset.material;


                    document.getElementById(
                        "modalPrice"
                    ).textContent =
                        product.dataset.price;


                    const modalImage =
                        document.getElementById(
                            "modalImage"
                        );


                    modalImage.src =
                        product.dataset.image;


                    modalImage.alt =
                        product.dataset.name;


                }
            );

        }
    );



    /* =====================================================
                       STORE FILTER
    ===================================================== */

    const storeTabs =
        document.querySelectorAll(
            ".store-tab"
        );


    const storeItems =
        document.querySelectorAll(
            ".store-item"
        );


    const search =
        document.getElementById(
            "storeSearch"
        );


    let storeType = "all";


    function filterStores() {


        const q =
            search
                ? search.value
                    .toLowerCase()
                    .trim()
                : "";


        storeItems.forEach(
            function (item) {


                const matchType =
                    storeType === "all" ||
                    item.dataset.storeType ===
                    storeType;


                const matchSearch =
                    q === "" ||
                    item.dataset.city.includes(q) ||
                    item.textContent
                        .toLowerCase()
                        .includes(q);


                item.style.display =
                    matchType && matchSearch
                        ? "grid"
                        : "none";


            }
        );

    }


    storeTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {


                    storeTabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active-store-tab"
                            );

                        }
                    );


                    tab.classList.add(
                        "active-store-tab"
                    );


                    storeType =
                        tab.dataset.storeType;


                    filterStores();


                }
            );

        }
    );


    if (search) {

        search.addEventListener(
            "input",
            filterStores
        );

    }


    storeItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {


                    storeItems.forEach(
                        function (x) {

                            x.classList.remove(
                                "active-store-item"
                            );

                        }
                    );


                    item.classList.add(
                        "active-store-item"
                    );


                    const title =
                        item.querySelector("h4");


                    const address =
                        item.querySelectorAll(
                            "p"
                        )[0];


                    const mapTitle =
                        document.querySelector(
                            ".map-card strong"
                        );


                    const mapAddress =
                        document.querySelector(
                            ".map-card small"
                        );


                    if (mapTitle) {

                        mapTitle.textContent =
                            title.textContent;

                    }


                    if (mapAddress) {

                        mapAddress.textContent =
                            address.textContent;

                    }


                }
            );

        }
    );



    /* =====================================================
                         GALLERY
    ===================================================== */

    const galleryFilters =
        document.querySelectorAll(
            ".gallery-filter"
        );


    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    galleryFilters.forEach(
                        function (item) {

                            item.classList.remove(
                                "active-gallery-filter"
                            );

                        }
                    );


                    button.classList.add(
                        "active-gallery-filter"
                    );


                    const category =
                        button.dataset
                            .galleryCategory;


                    galleryItems.forEach(
                        function (item) {

                            item.style.display =
                                (
                                    category === "all" ||
                                    item.dataset.gallery ===
                                    category
                                )
                                ? ""
                                : "none";

                        }
                    );


                }
            );

        }
    );



    /* =====================================================
                    GALLERY LIGHTBOX
    ===================================================== */

    const galleryModalElement =
        document.getElementById(
            "galleryModal"
        );


    const galleryImages =
        document.querySelectorAll(
            "[data-gallery-image]"
        );


    if (galleryModalElement) {


        const galleryModal =
            new bootstrap.Modal(
                galleryModalElement
            );


        galleryImages.forEach(
            function (image) {

                image.addEventListener(
                    "click",
                    function () {


                        document.getElementById(
                            "galleryModalImage"
                        ).src =
                            image.src;


                        document.getElementById(
                            "galleryModalImage"
                        ).alt =
                            image.alt;


                        document.getElementById(
                            "galleryModalTitle"
                        ).textContent =
                            image.dataset
                                .galleryTitle;


                        galleryModal.show();


                    }
                );

            }
        );

    }



    /* =====================================================
                    CONTACT VALIDATION
    ===================================================== */

    const contactForm = document.getElementById("contactForm");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userSubject = document.getElementById("subject");
    const userMessage = document.getElementById("message");
    const nameMessage = document.getElementById("nameMessage");
    const emailMessage = document.getElementById("emailMessage");
    const subjectMessage = document.getElementById("subjectMessage");
    const messageMessage = document.getElementById("messageMessage");
    const formMessage = document.getElementById("formMessage");

    function setFieldState(field, messageElement, message) {
        messageElement.textContent = message;
        field.classList.toggle("invalid", Boolean(message));
        field.setAttribute("aria-invalid", String(Boolean(message)));
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let valid = true;


    formMessage.textContent = "";

    // Only required fields are checked. Names, subjects and messages can
    // contain normal punctuation, numbers or other languages.
    if (userName.value.trim() === "") {

        setFieldState(userName, nameMessage, "Please fill out your name.");
        valid = false;

    } else if (/\d/.test(userName.value)) {

        setFieldState(userName, nameMessage, "Name cannot contain numbers.");
            valid = false;

    } else {

        setFieldState(userName, nameMessage, "");
    }


    // EMAIL
    if (userEmail.value.trim() === "") {

        setFieldState(userEmail, emailMessage, "Please fill out your email.");
        valid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.value.trim())) {

        setFieldState(userEmail, emailMessage, "Please enter a valid email address.");
        valid = false;

    } else {

        setFieldState(userEmail, emailMessage, "");
    }


    // SUBJECT
    if (userSubject.value.trim() === "") {

        setFieldState(userSubject, subjectMessage, "Please fill out the subject.");
        valid = false;

    } else {

        setFieldState(userSubject, subjectMessage, "");
    }


    // MESSAGE
    if (userMessage.value.trim() === "") {

        setFieldState(userMessage, messageMessage, "Please fill out the message.");
        valid = false;

    } else {

        setFieldState(userMessage, messageMessage, "");
    }


    // FORM SUBMIT
    if (valid) {

        contactForm.reset();
        formMessage.textContent = "Your message has been submitted successfully!";
    }

        });
    }

    /* =====================================================
                    DATE & TIME
    ===================================================== */

    const dateEl =
        document.getElementById(
            "tickerDate"
        );


    const timeEl =
        document.getElementById(
            "tickerTime"
        );


    const locEl =
        document.getElementById(
            "tickerLocation"
        );


    function updateClock() {


        const now =
            new Date();


        dateEl.textContent =
            now.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        timeEl.textContent =
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );



    /* =====================================================
                    LOCATION
    ===================================================== */

    // Keep the selected default location. Requesting geolocation as soon as
    // the page loads produces a browser permission warning when it is denied.
    if (locEl) {
        locEl.textContent = "Karachi, Pakistan";
    }


    // Move focus out before Bootstrap hides a modal. This prevents the
    // browser's aria-hidden warning when a focused close button is hidden.
    document.querySelectorAll(".modal").forEach(function (modal) {
        modal.addEventListener("hide.bs.modal", function () {
            if (modal.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        });
    });



    /* =====================================================
                    FADE REVEAL
    ===================================================== */

    const observer =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(
                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "show-reveal"
                                );

                        }

                    }
                );


            },

            {
                threshold: .08
            }

        );


    document.querySelectorAll(
        ".reveal"
    ).forEach(
        function (element) {

            observer.observe(element);

        }
    );



    /* =====================================================
                  ACTIVE MENU ON SCROLL
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navObserver =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(
                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                function (link) {


                                    link.classList.toggle(

                                        "active",

                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        "#" + id

                                    );


                                }
                            );

                        }

                    }
                );


            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    sections.forEach(
        function (section) {

            navObserver.observe(section);

        }
    );


});
