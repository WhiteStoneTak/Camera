let slideIndex = 1;
let plusSlidesCallCount = 0;
let infoButtonClickCount = 0;
let expandButtonClickCount = 0;
let urbanClickCouter = 0;
let isExpanded = false;
let tourEnded = true;
let loggedInUser = null;
let allSlides = [];
let typewriterTimeouts = [];
let categories = ["natureContainer", "urbanContainer", "architectureContainer", "nightContainer", "animalsContainer"];
let userdata = [
    { name: "administrator", email: "Administrator@example.com", password: "Administrator" }
];


const infoBox = document.getElementById("infoBox");
const typewriterText = document.querySelector(".js-typewrite");
const overlay = document.getElementById("overlay");
const description = document.getElementById("description");
const infoButton = document.getElementById("infoButton");
const expandButton = document.getElementById("expandButton");
const testImage = document.querySelector(".fade-in-image");


// show slides by category
function showCategory(categoryId) {
    categories.forEach(id => {
        document.getElementById(id).style.display = (id === categoryId) ? "block" : "none";
    });

    slideIndex = 1;
    updateSlideList();
    showSlides(slideIndex);
}

// all slides
function gallery() {
    const item = document.getElementById("item");
    
    description.style.setProperty("bottom", "460px", "important");
    description.style.setProperty("right", "400px", "important");
    
    overlay.style.clipPath = "polygon(0 0, 0 100%, 60% 100%, 60% 53.5%, 62% 53.5%, 62% 56.7%, 59% 56.7%, 59% 100%, 100% 100%, 100% 0)";


    if (item.classList.contains("show")) {
        item.classList.remove("show");
        return;
    } else {
        item.classList.add("show");
    }

    categories.forEach(id => {
        document.getElementById(id).style.display = "block";
    });

    slideIndex = 1;
    updateSlideList(true);
    showSlides(slideIndex);


    setTimeout(() => {
        runTypewriter("← Click here to see the next photo.");
    }, 1000);

}

function nature() {
    showCategory("natureContainer");
}


function urban() {
    showCategory("urbanContainer");

    urbanClickCouter++;

    if (urbanClickCouter === 1) {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"
        description.style.backgroundColor = "rgba(0, 0, 0, 0)"
        typewriterText.style.backgroundColor = "rgba(0, 0, 0, 0)";
        typewriterText.style.opacity = "0";
        setTimeout(() => { 
            function undisplayDescription() {
                description.style.display = "none";
            }

            undisplayDescription();
        }, 1200);
    }

    menuAudio();
    window.tourEnded = true;
}

function architecture() {
    showCategory("architectureContainer");
    menuAudio();
}

function night() {
    showCategory("nightContainer");
    menuAudio();
}

function animals() {
    showCategory("animalsContainer");
    menuAudio();
}

// Update Slide
function updateSlideList(allCategories = false) {
    allSlides = [];

    if (allCategories) {
        categories.forEach(id => {
            let container = document.getElementById(id);
            if (container.style.display !== "none") {
                allSlides.push(...container.getElementsByClassName("mySlides"));
            }
        });
    } else {
        let activeContainer = document.querySelector('div[id$="Container"]:not([style*="display: none"])');
        if (!activeContainer) return;
        allSlides = Array.from(activeContainer.getElementsByClassName("mySlides"));
    }
}



function plusSlides(n) {
    const overlay = document.getElementById("overlay");

    showSlides(slideIndex += n);
    document.getElementById('btn_click').currentTime = 0;
    document.getElementById('btn_click').play();

    plusSlidesCallCount++;

    if (plusSlidesCallCount === 1) {
        description.style.setProperty("bottom", "460px", "important");
        description.style.setProperty("right", "470px", "important");
        
        overlay.style.clipPath = "polygon(0 0, 0 100%, 55.5% 100%, 55.5% 53.5%, 57.5% 53.5%, 57.5% 56.7%, 54.5% 56.7%, 54.5% 100%, 100% 100%, 100% 0)";

        setTimeout(() => {
            runTypewriter("← Click here to see the previous photo.");
        }, 1000);

    } else if (plusSlidesCallCount === 2) {
        description.style.setProperty("bottom", "549px", "important");
        description.style.setProperty("right", "465px", "important");
        overlay.style.clipPath = "polygon(0 0, 0 100%, 56% 100%, 56% 45.5%, 57.8% 45.5%, 57.8% 48.3%, 54.5% 48.3%, 54.5% 100%, 100% 100%, 100% 0)";
        

        setTimeout(() => {
            runTypewriter("← Click here to see the information of photo.");
        }, 1000);
    } else {
        
    }
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (allSlides.length === 0) updateSlideList();

    if (n > allSlides.length) slideIndex = 1;
    if (n < 1) slideIndex = allSlides.length;

    allSlides.forEach(slide => {
        slide.style.display = "none";
    });

    const fadeInImage = document.querySelector(".fade-in-image");
    if (fadeInImage) {
        fadeInImage.style.display = "none";
    }

    if (allSlides.length > 0) {
        allSlides[slideIndex - 1].style.display = "block";
        adjustSlideSize();
        updateSlideNumbers();
    }

    if (!infoBox.classList.contains("hidden")) {
        updateInfoBox();
    }
    
}

function updateSlideNumbers() {
    allSlides.forEach((slide, i) => {
        let numberText = slide.querySelector(".numbertext");
        if (numberText) {
            numberText.textContent = `${i + 1} / ${allSlides.length}`;
        }
    });
}

function loginContainer() {
    document.getElementById("container").style.display = "block";
}

function loginClose() {
    document.getElementById("container").style.display = "none";
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("pass").value;
    let user = userdata.find(u => u.name === username && u.password === password);

    if (user) {
        loggedInUser = user.name;
        alert(`Welcome back, ${username}`);

        if (user.name === "administrator") {
            document.getElementById("adminUpload").style.display = "block";
        }

        document.getElementById("container").style.display = "none";
        loadGallery();
    } else {
        alert("Login failed.");
    }
}

// show or hide password
function showOrHide() {
    let passField = document.getElementById("pass");
    passField.type = passField.type === "password" ? "text" : "password";
}

function showRegister() {
    alert("Contact your administrator to sign up.");
}

// Administrator Upload
function adminUpload() {
    let fileInput = document.getElementById("adminImage");
    let category = document.getElementById("adminCategory").value;
    let file = fileInput.files[0];
    let reader = new FileReader();

    if (loggedInUser !== "administrator") {
        alert("Only the administrator can upload images.");
        return;
    }


    if (!fileInput.files.length) {
        alert("Please select an image.");
        return;
    }


    reader.onload = function(e) {
        let imgData = e.target.result;

        let galleryData = JSON.parse(localStorage.getItem("gallery")) || [];
        galleryData.push({ user: loggedInUser, src: imgData, category });
        localStorage.setItem("gallery", JSON.stringify(galleryData));

        alert("Image uploaded successfully!");
        loadGallery();
    };

    reader.readAsDataURL(file);
}

// Loading Gallery
function loadGallery() {
    let gallery = document.getElementById("slideShow");
    gallery.innerHTML = "";

    let galleryData = JSON.parse(localStorage.getItem("gallery")) || [];
    let categories = {};

    galleryData.forEach(image => {
        if (!categories[image.category]) {
            categories[image.category] = [];
        }
        categories[image.category].push(image);
    });

    for (let category in categories) {
        let categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        gallery.appendChild(categoryTitle);

        categories[category].forEach((image, index) => {
            let slide = document.createElement("div");
            slide.className = "mySlides";
            slide.innerHTML = `
                <div class="numbertext">${index + 1} / ${categories[category].length}</div>
                <img src="${image.src}">
                <div class="caption">Uploaded by ${image.user}</div>
            `;
            gallery.appendChild(slide);
        });
    }

    slideIndex = 1;
    updateSlideList();
    showSlides(slideIndex);
}

// Align size with test.JPG
function adjustSlideSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 1710×1070 as refferrence
    const baseWidth = 1710;
    const baseHeight = 1070;

    // Caluculate ratio of viewport
    const widthRatio = viewportWidth / baseWidth;
    const heightRatio = viewportHeight / baseHeight;

    // Use average ratio
    const scale = (widthRatio + heightRatio) / 2;

    let referenceImg = document.querySelector(".fade-in-image");
    if (!referenceImg) return;
    
    let slides = document.querySelectorAll(".mySlides img");
    slides.forEach(slide => {
        slide.style.width = `${450 * scale}px`;
        slide.style.height = `${300.97 * scale}px`;
    });
}

// slide arrows
document.querySelectorAll(".prev, .next").forEach(button => {
    button.style.fontSize = "24px";
    button.style.color = "white";
    button.style.background = "rgba(0, 0, 0, 0.5)";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.cursor = "pointer";
});

infoButton.addEventListener("click", () => {
    const audio = document.getElementById('btn_click');
    audio.currentTime = 0;
    audio.play().catch((e) => {
        console.warn("Audio playback failed:", e);
    });
    
    infoBox.classList.toggle("hidden");

    infoButtonClickCount++;

    if (!infoBox.classList.contains("hidden")) {
        updateInfoBox();
    }

    if (infoButtonClickCount === 1) {
        setTimeout(() => {
            runTypewriter("← Click again to close information.");
        }, 500);
    }

    if (infoButtonClickCount === 2) {
        description.style.setProperty("bottom", "373px", "important");
        description.style.setProperty("right", "465px", "important");
        
        overlay.style.clipPath = "polygon(0px 0px, 0px 100%, 55.8% 100%, 55.8% 61.6%, 57.8% 61.6%, 57.8% 64.9%, 54.6% 64.9%, 54.6% 100%, 100% 100%, 100% 0px)";

        setTimeout(() => {
            runTypewriter("← Click here to enlarge the photo.");
        }, 1000);
    }
});

function updateInfoBox() {
    if (allSlides.length === 0) updateSlideList();

    const currentSlide = allSlides[slideIndex - 1]?.querySelector("img");

    if (currentSlide) {
        const camera = currentSlide.getAttribute("data-camera") || "Unknown";
        const lens = currentSlide.getAttribute("data-lens") || "Unknown";
        const shutter = currentSlide.getAttribute("data-shutter") || "Unknown";
        const aperture = currentSlide.getAttribute("data-aperture") || "Unknown";
        const iso = currentSlide.getAttribute("data-iso") || "Unknown";
        const focal = currentSlide.getAttribute("data-focal") || "Unknown";
        const location = currentSlide.getAttribute("data-location") || "Unknown";
        const date = currentSlide.getAttribute("data-date") || "Unknown";

        infoBox.innerHTML = `
            <p>Camera: ${camera}<br>
            Lens: ${lens}<br>
            Shutter Speed: ${shutter}<br>
            Aperture: ${aperture}<br>
            ISO: ${iso}<br>
            Focal Length: ${focal}<br>
            Location: ${location}<br>
            ${date}</p>
        `;
    }
}

expandButton.addEventListener("click", () => {
    if (allSlides.length === 0) updateSlideList();

    const currentSlide = allSlides[slideIndex - 1]?.querySelector("img");
    
    const audio = document.getElementById('btn_click');
    audio.currentTime = 0;
    audio.play().catch((e) => {
        console.warn("Audio playback failed:", e);
    });

    expandButtonClickCount++;
    shrinkButtonClickCount = 0;

    if (expandButtonClickCount === 1) {
        description.style.setProperty("bottom", "80px", "important");
        description.style.setProperty("right", "1395px", "important");
        
        overlay.style.clipPath = "polygon(0px 0px, 0px 100%, 3.55% 100%, 3.55% 8.7%, 78.35% 8.7%, 78.35% 88.4%, 3.55% 88.4%, 3.55% 100%, 100% 100%, 100% 0px)";
        

        setTimeout(() => {
            runTypewriter("Click image to return the photo to original size.");
        }, 1000);

    }

    if (currentSlide && !isExpanded) {
        currentSlide.style.position = "fixed";
        currentSlide.style.setProperty('top', '519px', 'important');
        currentSlide.style.setProperty('left', '700px', 'important');
        currentSlide.style.width = "1280px";
        currentSlide.style.height = "auto";
        currentSlide.style.objectFit = "cover";
        currentSlide.style.zIndex = "9999";

        isExpanded = true;

        currentSlide.addEventListener("click", shrinkImageOnce, { once: true });
    }
});

function shrinkImageOnce(event) {
    const img = event.currentTarget;

    img.style.position = "fixed";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "";
    img.style.height = "";
    img.style.objectFit = "";
    img.style.zIndex = "";

    isExpanded = false;

    shrinkButtonClickCount++;

    console.log("shrinkButtonClickCount = " + shrinkButtonClickCount);

    if (shrinkButtonClickCount === 1) {
        overlay.style.clipPath = "polygon(0 0, 0 100%, 84.6% 100%,84.6% 40.8%,98.5% 40.8%, 98.5% 44.3%, 84% 44.3%, 84% 100%, 100% 100%,100% 0)";

        description.style.setProperty("bottom", "640px", "important");
        description.style.setProperty("right", "9px", "important");

        setTimeout(() => {
            runTypewriter("Click to see different category.");
        }, 1000);
    }

    img.removeEventListener("click", shrinkImageOnce); 
}

function buttonAudio() {
    const audio = document.getElementById('btn_click');
    audio.currentTime = 0;
    audio.play().catch((e) => {
        console.warn("Audio playback failed:", e);
    });
}

function runTypewriter(text, delay = 65) {
    typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
    typewriterTimeouts = [];

    typewriterText.textContent = "";

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            const timeoutId = setTimeout(typeWriter, delay);
            typewriterTimeouts.push(timeoutId);
            i++;
        }
    }

    typeWriter();
}

function endTour() {
    tourEnded = true;
    overlay.style.backgroundColor = "transparent";
    overlay.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
    typewriterText.style.visibility = "hidden";
    typewriterText.style.backgroundColor = "transparent";
    typewriterText.style.opacity = "0";
}