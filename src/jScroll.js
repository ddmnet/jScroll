/**
* jScroll - A jQuery iScroll plugin.
*
* So what makes jScroll different?  Basically you don't need to have an
* id on your element.  If one is there, jScroll will use it.  If there isn't
* one there, jScroll will create an id (uuid) for it and use that.
*
* It works like this:
*
*	$("div").jScroll();  //Done like this, it uses the default options.
*	$("div").jScroll({	 //Done like this, only those options are overridden.
*		lockDirection : false,
*		fadeScrollbar : true
*	});
*	$("div").jScroll("remove");  //Removes iScroll from all elements in this set.
*
* It's not 100% fool-proof though.  It still relies on you knowing how to use iScroll.  If
* you have questions about that, or about possible options, check out: http://cubiq.org/iscroll-4
*
* @author Jack Slingerland (jacks@teamddm.com)
* @link http://www.teamddm.com
* @version 1.1
*/
var iScrollers = [];
(function($) {
	$.fn.jScroll = function() {
		var customOptions = {},
			action = "scroll";

		//Determine what action we should be taking.
		if(typeof arguments[0] == "string") {
			action = arguments[0];
			customOptions = arguments[1];
		} else {
			customOptions = arguments[0];
		}

		var options = $.extend({}, $.fn.jScroll.defaultOptions, customOptions);
		return this.each(function() {
			
			//Determine the id.  If one exists, use that.  Otherwise, create one.
			var id = $(this).attr("id");
			if(id === undefined || id === "") {
				id = guid();
				$(this).attr("id", id);
			}

			//Check to see if we should be removing iScroll instances.
			if(action === "remove" || options.remove === true) {  //options.remove is here for backwards compatibility
				remove_scroller(id);
			} else {
				//Create the iScroll objects, but first make sure it doesn't already exist.
				var iScrollersCount = iScrollers.length;
				var found = false;
				for(var i = 0; i < iScrollersCount; i++) {
					if(iScrollers[i].id == id) {
						remove_scroller(id);
						break;
					}
				}
				add_scroller(id, options);
			}

		});
	};

	/* Default options - The same as creating an iScroll object with no parameters */
	$.fn.jScroll.defaultOptions = {
		hScroll : true,
		vScroll : true,
		hScrollbar : true,
		vScrollbar : true,
		fixedScrollbar : false,
		fadeScrollbar : true,
		hideScrollbar : true,
		bounce : true,
		momentum : true,
		lockDirection : false,
		useTransition : false,  //Performance mode!
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
		},
		remove : false
	};

	/* Private functions */

	function add_scroller(id, options) {
		setTimeout(function() {
			var scroller = {
				'id' : id,
				instance : new iScroll(id, options)	
			};
			iScrollers.push(scroller);
		},100);
	}

	function guid() {
		var S4 = function() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	function remove_scroller(id) {
		for(var i = 0; i < iScrollers.length; i++) {
			if(iScrollers[i].id == id) {
				if(iScrollers[i].instance !== null) {
					iScrollers[i].instance.destroy();
					iScrollers[i].instance = null;
					break;
				}
			}
		}
	}

})(jQuery);