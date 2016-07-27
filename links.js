
var Links = (function () {

  var selectorTable = '#hnmain';
  var selectorButton = 'open-all-links';
  var selectorMenu = 'tr:first td:nth-child(3) span';
  var selectorSubmenu = 'td span';
  var selectorStory = 'a.storylink';

  var buttonHtml = '<a href="#" id="' + selectorButton + '">Open All</a> | ';

  /**
  * Extension storage wrapper
  */
  var storage = {
    items: {},
    limit: 300,
    key: 'savedLinks',

    _initSet: function(items) {
      if(Object.keys(items).length === 0) {
        items[this.key] = [];
        this.items = items;
        chrome.storage.local.set(this.items);
      } else {
        this.items = items;
      }
    },

    limitSet: function() {
      var itemsCount = this.items[this.key].length;

      if(itemsCount > this.limit) {
        this.items[this.key] = this.items[this.key].slice(itemsCount - this.limit, this.limit);
        chrome.storage.local.set(this.items);
      }
    }
  };

  var _openLink = function(link) {
    window.open(link, '_blank');
  };

  /**
  * Button click listener
  */
  var _buttonHandler = function() {
    var i = 0;
    var initialCount = storage.items[storage.key].length;

    $.each($(selectorStory), function( key, link ) {
      if(storage.items[storage.key].indexOf(link.href) === -1) {
        storage.items[storage.key].push(link.href);
        _openLink(link.href);
      }
    });

    if(storage.items[storage.key].length > initialCount) {
      chrome.storage.local.set(storage.items);
    }
  };

  /**
  * Add Open All button
  */
  var _addButton = function() {
    var menu;
    var table = $(selectorTable);

    // Check if table and button is present
    if(table) {
      menu = $(selectorMenu, table);

      if(menu) {

        // Add button to html
        menu.html(buttonHtml + menu.html())

        // Add listener
        document.getElementById(selectorButton).addEventListener('click', _buttonHandler);
      }
    }
  }

  /**
  * Initialize links module
  */
  var init = function() {
    _addButton();

    chrome.storage.local.get(storage.key, function(items) {
      storage._initSet(items);
      storage.limitSet(300);
    });
  }

  return {
    init: init
  };

})();

Links.init();
