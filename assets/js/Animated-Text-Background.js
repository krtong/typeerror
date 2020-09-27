const c = document.createElement("canvas");
const ctx = c.getContext("2d");
const destination = document.getElementById('animatedTextHeading');
const div = document.getElementById('animatedTextBackground')

const max_font_size = 10;
const min_font_size = 6;
const scroll_speed = 10;
const [canvas_width, canvas_height] = [.5, 1] //if dropping frame rates, make the canvas smaller
destination.style.backgroundRepeat = 'no-repeat';
destination.style.backgroundSize = 'cover'
const frames_per_second = 20;
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

let overButton = false;

const draw = () => {

    const darken = 10;
    const darkenMore = 5
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

    overButton ? colorNoise(.1, -60, 60) : colorNoise(1, 0, 255, 0, 0, 0);
    // colorNoise(1, 0, 255, 0, 0, 0);
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

const checkIfOnScreen = () => {
    const scrolldist = document.documentElement.scrollTop.toFixed(0);
    const divHeight = document.getElementById('animatedTextBackground').offsetHeight;
    if (divHeight - 120 > scrolldist) draw();
}


setInterval(checkIfOnScreen, 1 / frames_per_second * 1000);


const moveBackground = (e) => {
    // mouseXPos = (e.x / window.innerWidth) * 100;
    // mouseYPos = (e.y / window.innerHeight) * 100;
    // destination.style.backgroundPosition = `${mouseXPos / scroll_speed}% ${mouseYPos / scroll_speed}%`;
    // destination.style.backgroundPosition = `${mouseXPos / scroll_speed}% ${mouseYPos / scroll_speed}%`;

    mouseXPos = (window.innerWidth - e.x)/5
    mouseYPos =  ( e.y  / window.innerHeight) * 1000
    destination.style.backgroundPosition = `${mouseXPos / scroll_speed}% ${mouseYPos / scroll_speed}%`;

}
let nav_info = document.getElementById('nav-info');
let nav_work = document.getElementById('nav-work');
let nav_portfolio = document.getElementById('nav-portfolio');
let nav_skills = document.getElementById('nav-skills');
let nav_moto = document.getElementById('nav-moto');

let oldColor;

const changeColor = (button) => {
    overButton = true;
    if (button === 'nav-info'){
        [r, g, b] = [0, 255, 157];
        nav_info.style.transition = '.5s'
        oldColor = nav_info.style.color
        nav_info.style.color = `rgb(${r}, ${g}, ${b})`
    }
    if (button === 'nav-work'){
        [r, g, b] = [255, 187, 0];
        nav_work.style.transition = '.5s'
        oldColor = nav_work.style.color
        nav_work.style.color = `rgb(${r}, ${g}, ${b})`
    }
    if (button === 'nav-portfolio'){
        [r, g, b] = [255, 0, 205];
        nav_portfolio.style.transition = '.5s'
        oldColor = nav_portfolio.style.color
        nav_portfolio.style.color = `rgb(${r}, ${g}, ${b})`
    }
    if (button === 'nav-skills'){
        [r, g, b] = [0, 104, 255];
        nav_skills.style.transition = '.5s'
        oldColor = nav_skills.style.color
        nav_skills.style.color = `rgb(${r}, ${g}, ${b})`
    }
    if (button === 'nav-moto'){
        [r, g, b] = [0, 255, 50];
        nav_moto.style.transition = '.5s'
        oldColor = nav_moto.style.color
        nav_moto.style.color = `rgb(${r}, ${g}, ${b})`
    }
};

const endchangeColor = (button) => {
    overButton = false;
    if (button === 'nav-info'){
        nav_info.style.color = oldColor;
    }
    
    if (button === 'nav-work'){
        nav_work.style.color = oldColor;
    }
    
    if (button === 'nav-portfolio'){
        nav_portfolio.style.color = oldColor;
    }
    
    if (button === 'nav-skills'){
        nav_skills.style.color = oldColor;
    }
    
    if (button === 'nav-moto'){
        nav_moto.style.color = oldColor;
    }

}

nav_info.addEventListener('mouseover', () => changeColor('nav-info'))
nav_info.addEventListener('mouseleave', () => endchangeColor('nav-info'))


nav_work.addEventListener('mouseover', () => changeColor('nav-work'))
nav_work.addEventListener('mouseleave', () => endchangeColor('nav-work'))


nav_portfolio.addEventListener('mouseover', () => changeColor('nav-portfolio'))
nav_portfolio.addEventListener('mouseleave', () => endchangeColor('nav-portfolio'))

nav_skills.addEventListener('mouseover', () => changeColor('nav-skills'))
nav_skills.addEventListener('mouseleave', () => endchangeColor('nav-skills'))


nav_moto.addEventListener('mouseover', () => changeColor('nav-moto'))
nav_moto.addEventListener('mouseleave', () => endchangeColor('nav-moto'))

// document.body.addEventListener('mousemove', moveBackground);