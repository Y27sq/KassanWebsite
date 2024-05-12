$(document).ready(function() {
    initFlipElements()
    reveal()
})

function initFlipElements() {
    let flip_containers = $(".flip-container")
    for (let i = 0; i < flip_containers.length; i++) {
        let flip_container = $(flip_containers[i])
        flip_container.hover(hoverIn, hoverOut);

        let hide_backface = {
            "transform-style": "preserve-3d",
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }

        let back = flip_container.find(".back");
        let front = flip_container.find(".front");
        back.css(Object.assign({}, {
            "left": "-" + back.css("width"),
            "transform": "rotateY(180deg)"
        }, hide_backface));
        front.css(hide_backface);
    }
}

function hoverIn() {
    $(this).find(".front").css("transform", "rotateY(180deg)");
    $(this).find(".back").css("transform", "rotateY(0deg)");
}

function hoverOut() {
    $(this).find(".front").css("transform", "rotateY(0deg)");
    $(this).find(".back").css("transform", "rotateY(180deg)");
}


$(document).scroll(onScroll);

function onScroll() {
    reveal()
}

function reveal() {
    var reveals = $(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        let element = reveals[i];
        let elementTop = element.getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            // Start typeout animation if it has the typeout class
            if ($(element).hasClass("typeout") && !$(element).hasClass("active")) {
                typeout($(element))
            }
            $(element).addClass("active");
        } else {
            $(element).removeClass("active");
        }
    }
}

function typeout(element) {
    let text = element.data("typeout-text")
    let delay = element.data("typeout-delay")
    let current_text_length = element.text().length
    let target_text_length = element.data("typeout-text").length
    // Return if all the characters are typed
    if (current_text_length >= target_text_length) {
        return
    }
    // Otherwise, append the data
    element.text(element.text() + text.charAt(current_text_length))
    setTimeout(typeout, delay, element)
}
