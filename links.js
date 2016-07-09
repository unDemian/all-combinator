
var Links = (function () {

  var selectorTable = '#hnmain';
  var selectorButton = 'open-all-links';
  var selectorMenu = 'tr:first td:nth-child(3) span';
  var selectorSubmenu = 'td span';
  var selectorStory = 'a.storylink';

  var buttonHtml = '<a href="#" id="' + selectorButton + '">Open All</a> | ';

  /**
  * Button click listener
  */
  var _openLinks = function() {
    $.each($(selectorStory), function( key, link ) {
      window.open(link.href, '_blank');
    });
  };

  /**
  * Initialize links module
  */
  var init = function() {
    var menu;
    var table = $(selectorTable);

    // Check if table and button is present
    if(table) {
      menu = $(selectorMenu, table);

      if(menu) {

        // Add button to html
        menu.html(buttonHtml + menu.html())

        // Add listener
        document.getElementById(selectorButton).addEventListener('click', _openLinks);
      }
    }
  }

  return {
    init: init
  };

})();

Links.init();
