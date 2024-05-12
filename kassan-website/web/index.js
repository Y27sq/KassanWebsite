/*
  TODO: SPLIT SLIDES INTO ITS OWN CLASS
*/
var autoScrollSlideInterval

var slide_index = 0
var slides_amount = 0
var slide_images
var slide_images_directory = "/assets/main-slides/"

$(document).ready(onload);

function onload() {
    initSlides();
    resetAutoSlideTimer()
}


function initSlides() {
    // Get the images from assets/main-slides
    // And add them to slide-images div
    $.get(slide_images_directory, // get images from the directory
        function(data) {
            loadSlideImages(data)
        });
    // Bind the buttons to the functions
    $(".slide-button-left").parent().click(function() {
        resetAutoSlideTimer()
        moveSlideLeft()
    });
    $(".slide-button-right").parent().click(function(data) {
        resetAutoSlideTimer()
        moveSlideRight()
    });
}


function loadSlideImages(data) {
    // Get the div
    slide_images = $("#slide-images")

    images_as_a = $(data).find("a")
    let first_image_source
    // Add the images
    images_as_a.each(function(index) {
        let source = slide_images_directory + $(this).attr('href')

        let image_element = $("<img>", {
            class: "slide-image",
            src: source
        })
        let image_container = $("<div>", {
            class: "slide-image-container"
        })

        if (index == 0) {
            first_image_element = image_element.clone()
        }

        slide_images.append(image_container.clone().append(image_element))
        // Add an extra first image and last image for seamless warp-around
        if (index == images_as_a.length - 1) {
            slide_images.prepend(image_container.clone().append($("<img>", {
                class: "slide-image",
                src: source
            })))
            slide_images.append(image_container.clone().append(first_image_element))
        }
    });

    // Set the amount of slides automatically
    slides_amount = slide_images.children().length - 1;

    // Calculate the width based on how many images there are and default to the second image
    slide_images.css("width", (slides_amount + 1) * 100 + "%")

    slide_index = 1
    moveSlide("0")
}

function moveSlideLeft() {
    // Warp-around
    slide_index -= 1;
    if (slide_index <= 0) {
        slide_index = slides_amount
        moveSlide("0.0000001s");
        slide_index -= 1;
        warpSlide();
        return
    }
    moveSlide("0.4s");
}

function moveSlideRight() {
    // Warp-around
    slide_index += 1;
    if (slide_index >= slides_amount) {
        slide_index = 0
        moveSlide("0.0000001s");
        slide_index = 1;
        warpSlide();
        return
    }
    moveSlide("0.4s");
}

// reset the timer
function resetAutoSlideTimer() {
    // clear the current timer
    clearInterval(autoScrollSlideInterval)
    // assign a new timer that runs for longer
    autoScrollSlideInterval = setInterval(function() {
        // when the longer timer is up return to using the short timer
        clearInterval(autoScrollSlideInterval)
        autoScrollSlideInterval = setInterval(function() {
            moveSlideRight()
        }, 3000);
        moveSlideRight();
    }, 6000);
}

function warpSlide() {
    slide_images.one("transitionend", function() {
        moveSlide("0.4s");
    });
}

function moveSlide(transition_time) {
    // set css to match the position based on the index
    slide_images.css("transform", "translateX(" + slide_index * -100 + "vw)").css("transition", transition_time);
}
