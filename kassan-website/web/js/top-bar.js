// Problem: How to shrink the top bar when the user scrolls?
// Solution: https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp
// Date: 13 FEB 2023 12:37
// When the user scrolls down 50px from the top of the document, resize the header's font size
const heights = {
    "#top-bar": {
        min: "96px",
        max: "128px"
    },
    "#top-bar-logo": {
        min: "100%",
        max: "100%"
    },
    "\.top-bar-mid-text": {
        min: "100%",
        max: "100%"
    }
}


const search_box = $(".top-bar-search-box")

$(document).ready(function() {
    update_top_bar()
    search_box.css("width", "150px")
});

$(document).scroll(function() {
    update_top_bar()
});

search_box.focus(function() {
    search_box.css("width", "200px")
    // .css("background-color", "#00000066")
})

search_box.focusout(function() {
    search_box.css("width", "150px")
    // .css("background-color", "#00000033")
})

function is_scrolled() {
    return (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
}

function update_top_bar() {
    for (const key of Object.keys(heights)) {
        if (is_scrolled()) {
            set_height(key, "min");
        } else {
            set_height(key, "max");
        }
    };
}

function set_height(element, state) {
    $(element).css("height", heights[element][state]);
}
