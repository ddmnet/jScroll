/**
* jScroll - A jQuery iScroll plugin.
*
* So what makes jScroll different?  If you have iOS5, it will use native scrolling.  That, and
* you don't need to have an id on your element.  If one is there, jScroll will use it.  If there
* isn't one there, jScroll will create an id (uuid) for it and use that.
*
* It works like this:
*
*	$("div").jScroll();  //Done like this, it uses the default options.
*	$("div").jScroll({	 //Done like this, only those options are overridden.
*		lockDirection : false,
*		fadeScrollbar : true,
*		forceIscroll : false
*	});
*	$("div").jScroll("refresh");  //Refresh the scroller
*	$("div").jScroll({ //Adds pinch to zoom functionality on this div.
*		zoom : true
*	});
*
* Note:  If you're using iOS5, the only valid options are vScroll & hScroll.
*
* It's not 100% fool-proof though.  It still relies on you knowing how to use iScroll.  If
* you have questions about that, or about possible options, check out: http://cubiq.org/iscroll-4
*
* @author Jack Slingerland (jacks@teamddm.com)
* @link http://www.teamddm.com
* @version 1.3.0
*/
var iScrollers = [];
(function($) {

	$.fn.jScroll = function() {
		var
      options = null,
			action = null,
      args = null;

		//Determine what action we should be taking.
		if(typeof arguments[0] === "string") {
			action = arguments[0];
      args = $.makeArray(arguments).slice(1)
		} else {
			options = $.extend({}, $.fn.jScroll.defaultOptions, arguments[0]);
		}

		return this.each(function(index, element) {
      if(action) {
        var scroller = getScroller(element);
        scroller[action].apply(scroller, args);
      } else {
        addScroller(element, options);
      }
		});
	};

	/* Default options - The same as creating an iScroll object with no parameters */
	$.fn.jScroll.defaultOptions = {
		hScroll : false,
		vScroll : true,
		hScrollbar : false,
		vScrollbar : false,
		fixedScrollbar : false,
		fadeScrollbar : true,
		hideScrollbar : true,
		bounce : true,
		momentum : true,
		lockDirection : false,
		forceIscroll : false,
		zoom : false, //Pinch to zoom.
		useTransition : false,  //Performance mode!
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType !== 1) {
				target = target.parentNode;
			}

			if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
				e.preventDefault();
			}
		},
		remove : false
	};

	function addScroller(element, options) {
		setTimeout(function() {
      removeScroller(element);
      setScroller(element, new iScroll(element, options))
		},100);
	}

  function getScroller(element) {
    return $(element).data('scroller');
  }

  function setScroller(element, scroller) {
    $(element).data('scroller', scroller);
  }

	function removeScroller(element) {
    if (getScroller(element)) {
      getScroller(element).destroy()
      setScroller(element, null)
    }
	}

})(jQuery);
