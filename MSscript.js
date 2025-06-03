const toggleBtn = () => {
    const btn = document.getElementById("toggle-mode");

    if (document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "<span class='material-symbols-outlined'>dark_mode</span>";
        document.body.classList.remove("dark-mode");
    } else {
        btn.innerHTML = "<span class='material-symbols-outlined'>light_mode</span>";
        document.body.classList.add("dark-mode");
    }
};

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.filter = "brightness(0.4)";
    document.querySelector("header").style.filter = "brightness(0.4)";
    document.querySelector(".openbtn").style.visibility = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.filter = "brightness(1)";
    document.querySelector("header").style.filter = "brightness(1)";
    document.querySelector(".openbtn").style.visibility = "visible";
}