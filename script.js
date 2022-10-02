AOS.init();

const doc = document;
const section_4 = doc.getElementById('section_4');
const earth = doc.getElementById('earth');
const header_lines = doc.getElementById('header_lines');
const white_fade = doc.getElementById('white_fade');
const changing_text = doc.getElementById('changing_text');
const preloader = document.getElementById('preloader');
const body = document.getElementById('body');
const preloader_background = document.getElementById('preloader_background');

let header_lines_rect = header_lines.getBoundingClientRect();

let add_width_earth = 1;
let div_top_earth = 0.5;
let startEarthWidth = 60;
let currentEarthWidth = startEarthWidth;
let currentEarthTop = 15;

let start_transparent_index = 0;
let current_transparent_index = start_transparent_index;
let start_black_index = 255;
let current_black_index = start_black_index;
let add_black = 17;
let add_transparent = 0.0666666;

let add_width = 0.5;
let add_height = 1.25;
let startBackWidth = 80;
let startBackHeight = 50;
let condition = false;

let direction;

setTimeout(function () {
    body.style.overflowY = 'auto';
    condition = true;
}, 1500);

window.addEventListener('resize', function() {
    earth.style.width = `${startEarthWidth}vw`;
    currentEarthWidth = startEarthWidth;
    currentEarthTop = 0;
    earth.style.top = currentEarthTop;
});

window.addEventListener('scroll', function () {
    direction = this.oldScroll > this.scrollY ? 'Up' : 'Down';
    this.oldScroll = this.scrollY;

    header_lines_rect = header_lines.getBoundingClientRect();
    let sec4_rect = section_4.getBoundingClientRect();
    let earth_rect = earth.getBoundingClientRect();

    if (direction == 'Down') {  
        if (preloader_background.offsetHeight < preloader.offsetHeight && condition) {
            startBackWidth += add_width;
            startBackHeight += add_height;
            preloader_background.style.width = `${startBackWidth}vw`;
            preloader_background.style.height = `${startBackHeight}vh`; 
        }
        if (header_lines_rect.y < -100 && current_black_index > 0) {
            current_black_index -= add_black;
            current_transparent_index += add_transparent;
            white_fade.style.background = `linear-gradient(to top, rgba(${current_black_index}, ${current_black_index}, ${current_black_index}, ${current_transparent_index}), 
                                            rgb(${current_black_index}, ${current_black_index}, ${current_black_index}))`;
            changing_text.style.color = `rgba(${start_black_index - current_black_index}, ${start_black_index - current_black_index}, ${start_black_index - current_black_index})`;
            body.style.backgroundColor = 'black';
        }          
        if (sec4_rect.y <= preloader.clientHeight / 2 && earth_rect.width < sec4_rect.width * 1.2) {
            currentEarthWidth += add_width_earth;
            currentEarthTop -= div_top_earth;
            earth.style.width = `${currentEarthWidth}vw`;
            earth.style.top = `${currentEarthTop}vw`;
        }
    }
    else if (direction == 'Up'){
        if (preloader_background.offsetHeight > preloader.offsetHeight * 0.5 && condition) {
            startBackWidth -= add_width;
            startBackHeight -= add_height;
            preloader_background.style.width = `${startBackWidth}vw`;
            preloader_background.style.height = `${startBackHeight}vh`;
        }
        if (sec4_rect.y > preloader.offsetHeight && current_black_index < 255) {
            current_black_index += add_black;
            current_transparent_index -= add_transparent;
            white_fade.style.background = `linear-gradient(to top, rgba(${current_black_index}, ${current_black_index}, ${current_black_index}, ${current_transparent_index}), 
                                            rgb(${current_black_index}, ${current_black_index}, ${current_black_index}))`;
            changing_text.style.color = `rgba(${start_black_index - current_black_index}, ${start_black_index - current_black_index}, ${start_black_index - current_black_index})`;
            body.style.backgroundColor = 'white';
        }
        if (currentEarthWidth > startEarthWidth) {
            currentEarthWidth -= add_width_earth;
            currentEarthTop += div_top_earth;
            earth.style.width = `${currentEarthWidth}vw`;
            earth.style.top = `${currentEarthTop}vw`;
        }
    }
});
