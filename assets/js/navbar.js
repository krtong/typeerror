const navbar = document.getElementById('navbar');
// const navLinkArr = document.getElementsByClassName('nav-link');

const menu_item_array = document.getElementsByClassName('nav-item');
const logo = document.getElementById('logo');

let distance = document.getElementById('animatedTextBackground').offsetHeight - 20;

const bottom_of_header = document.getElementById('home').offsetHeight;

[navbar, logo].forEach(({
    style
}) => {
    // style.transition = '1s'
})


const scrollFunction = () => {

    const scroll_top = document.documentElement.scrollTop.toFixed(0);
    const scroll_top_II = document.body.scrollTop.toFixed(0);


    navbar.style.transition = `600ms`;

    const scrollHeight = (fraction = 1) => scroll_top > bottom_of_header * fraction || scroll_top_II > bottom_of_header * fraction;

    if (scrollHeight(2 / 5)) {

        for (let nav_item of menu_item_array) {
            nav_item.style.transition = '1s';

            nav_item.style.paddingTop = '0';
            nav_item.style.paddingBottom = '0';

            let text = nav_item.children[0]
            text.style.transition = '1s'
            text.style.color = 'rgba(154,132,132,1)'
            text.style.fontWeight = ''
        }

    } else {

        for (let nav_item of menu_item_array) {
            nav_item.style.padding = '2vh 1vw 1vw 1vw';

            let text = nav_item.children[0]
            text.style.color = 'black'
            text.style.fontWeight = ''
        }
    }

    if (scrollHeight(7/8)) {
        navbar.style.backgroundColor = `rgba(0,0,10,1)`;
    } else {

        navbar.style.background = "transparent";
    }
}

window.onscroll = scrollFunction;