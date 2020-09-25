// const c = document.getElementById("screen");
// const ctx = c.getContext("2d");

// c.height = window.innerHeight;
// c.width = window.innerWidth;

// ctx.fillStyle = "rgb(0, 0, 30)";
// ctx.fillRect(0, 0, c.width, c.height);

// const chars = "абвгдеёжзийклмнопрстуфхцчщъыэюя   ".split('');

// const font_size = 10;
// const columns = c.width / font_size;
// const drops = [];
// for (let x = 0; x < columns; x++) {
//     drops[x] = 1;
// }

// const draw = () => {
//     ctx.fillStyle = "rgba(0, 0, 20, 0.05)";
//     ctx.fillRect(0, 0, c.width, c.height);
//     const rn = Math.floor(Math.random() * 255);
//     ctx.fillStyle = `rgb(0, ${rn}20, ${rn}90)`;

//     ctx.font = font_size + "px sans-serif";
//     for (let i = 0; i < drops.length; i++) {
//         let text = chars[Math.floor(Math.random() * chars.length)];
//         ctx.fillText(text, i * font_size, drops[i] * font_size);
//         if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
//         drops[i]++;
//     }
// }

// setInterval(draw, 60);


// $(window).on("resize", () => {
//     size()
// })
