const chars = document.querySelectorAll('.char');

function toggleAnimation() {
    chars.forEach(char => char.classList.remove('is-active'));
    void document.body.offsetWidth;
    setTimeout(() => {
        chars.forEach(char => char.classList.add('is-active'));
    }, 1000);
}

chars.forEach(char => char.classList.add('is-active'));

setInterval(toggleAnimation, 2000);