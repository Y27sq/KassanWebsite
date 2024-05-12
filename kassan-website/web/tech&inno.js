// This is a failed attempt at making the circle animation works on various screen sizes
var circle_node_index = 0
$(document).ready(function() {
    goto_next_node()
    setInterval(goto_next_node, 1000);
})

function goto_next_node() {
    circle_node_index += 1;
    if (circle_node_index > 4) {
        circle_node_index = 0;
    }
    let next_node = $(".loop" + (circle_node_index));
    let offset = next_node.offset()
    $(".circle").offset({
        top: offset.top,
        left: offset.left
    })
}
