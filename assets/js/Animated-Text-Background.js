const c = document.createElement("canvas");
const ctx = c.getContext("2d");
const destination = document.getElementById('animatedTextHeading');

const max_font_size = 10;
const min_font_size = 6;
const scroll_speed = 1;
const [canvas_width, canvas_height] = [.7, 1.1]
const frames_per_second = 17;
const coin_flip = Math.random();

let mouseXPos, mouseYPos, font_size = max_font_size;

const reportWindowSize = () => {
    c.height = destination.clientHeight * canvas_height;
    c.width = destination.clientWidth * canvas_width;
    font_size = parseInt(destination.clientWidth / 50);
    font_size = font_size > max_font_size ? max_font_size : font_size;
    font_size = font_size < min_font_size ? min_font_size : font_size;
}

reportWindowSize()
window.onresize = reportWindowSize;

let blue = "rgba(0, 0, 30, 0)"
ctx.fillStyle = blue;

ctx.fillRect(0, 0, c.width, c.height);
const chars = "абвгдеёжзийклмнопрстуфхцчщъыэюя   ".split('');
const columns = c.width / font_size;
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}


let [r, g, b] = [0, 0, 0];
let arr = [r, g, b]
arr[Math.floor(Math.random() * 3)] = 255;
arr[Math.floor(Math.random() * 3)] = 255;
[r, g, b] = arr;
const draw = () => {
    let darken = 10;
    let darkenMore = 5
    const color = (a, b) => parseInt((a - b) / darken) - darkenMore;
    ctx.fillStyle = `rgba(${color(g, r)}, ${color(b, g)}, ${color(r, b)}, 0.05)`;
    ctx.fillRect(0, 0, c.width, c.height);
    const colorShift = (speed, min = 0, max = 255) => {
        if (r < max && g <= min) r += speed;
        if (g < max && b <= min) g += speed;
        if (b < max && r <= min) b += speed;
        if (g >= max && r > min) r -= speed;
        if (b >= max && g > min) g -= speed;
        if (r >= max && b > min) b -= speed;
    }
    colorShift(1, 40);

    let fill = `rgb(${r}, ${g}, ${b})`
    
    const rn2 = (min = -160, max = 160) => parseInt(Math.random() * (max - min) + min);

    const colorNoise = (frequency = 1, min = -255, max = 255, a = r, b = g, c = g) => {
        if (Math.random() < frequency) {
            let [R, G, B] = [a, b, c].map(a => Math.abs(a + rn2(min, max)));
            fill = `rgb(${R}, ${G}, ${B})`;
        }
    };

    coin_flip > .5 ? colorNoise(.3, -60, 60) : colorNoise(1, 0, 255, 0, 0, 0);
    ctx.fillStyle = fill;

    ctx.font = font_size + "px sans-serif";
    for (let i = 0; i < drops.length; i++) {
        let text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    };

    const bgImage = `url(${c.toDataURL('jpeg/image')}`;
    destination.style.background = bgImage;
    destination.style.backgroundPosition = `${mouseXPos / scroll_speed}% ${mouseYPos / scroll_speed}%`;
}


setInterval(draw, 1 / frames_per_second * 1000);


const moveBackground = (e) => {
    mouseXPos = (e.x / window.innerWidth) * 100;
    mouseYPos = (e.y / window.innerHeight) * 100;
    destination.style.backgroundPosition = `${mouseXPos / scroll_speed}% ${mouseYPos / scroll_speed}%`;

}

document.body.addEventListener('mousemove', moveBackground);