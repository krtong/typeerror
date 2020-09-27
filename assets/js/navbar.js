const navbar = document.getElementById('navbar');
// const navLinkArr = document.getElementsByClassName('nav-link');

const navItemArr = document.getElementsByClassName('nav-item');
const logo = document.getElementById('logo');

const distance = document.getElementById('animatedTextBackground').offsetHeight - 20;

[navbar, logo].forEach(({style}) => {
    // style.transition = '1s'
})


const scrollFunction = () => {
    let scrolldist = document.documentElement.scrollTop.toFixed(0);
    // transparency = transparency > 100 ? 100 : transparency;
    // navbar.style.background = `rgba(0,0,0,${transparency})`;
    // let a = scrolldist > 1000 ? 1000 : scrolldist
    // navbar.style.backgroundColor = `rgba(0,0,100,${(a/1000).toFixed(2)})`;

    navbar.style.transition = `600ms`;
    if (document.documentElement.scrollTop > distance * 2 /3) {
 
        for (let nav_item of navItemArr) {
            nav_item.style.transition = '1s';
            
            nav_item.style.paddingTop = '0';
            nav_item.style.paddingBottom = '0';

            let text = nav_item.children[0]
            text.style.transition = '1s'
            text.style.color = 'rgba(154,132,132,1)'
            text.style.fontWeight = ''
        }

    } else {

        for (let nav_item of navItemArr) {
            nav_item.style.padding = '2vh 1vw 1vw 1vw';

            let text = nav_item.children[0]
            text.style.color = 'black'
            text.style.fontWeight = ''
        }
    }

    if (document.body.scrollTop > distance || document.documentElement.scrollTop > distance) {
        
        navbar.style.backgroundColor = `rgba(0,0,10,1)`;
    } else {

        navbar.style.background = "transparent";
    }
}

const workInProgress = () =>  {
    const wipDiv = document.createElement('div');
    wipDiv.style.display = 'none';

    
}
window.onscroll = scrollFunction;