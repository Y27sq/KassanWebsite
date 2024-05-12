$(document).ready(function() {
    $('#top-bar').load('./html/top-bar.html');
    $('#bottom-bar').load('./html/bottom-bar.html');

    let comlink = $('#common-links')
    comlink.load('./html/common-links.html', function(){
      for (let i=0; i < comlink.children().length; i++) {
        $('head').prepend($(comlink.children()[i]).detach());
      }
    });
});
