/**
*	Copyright (C) 2011 by DDM Marketing & Communications
*
*	Permission is hereby granted, free of charge, to any person obtaining a copy
*	of this software and associated documentation files (the "Software"), to deal
*	in the Software without restriction, including without limitation the rights
*	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*	copies of the Software, and to permit persons to whom the Software is
*	furnished to do so, subject to the following conditions:
*
*	The above copyright notice and this permission notice shall be included in
*	all copies or substantial portions of the Software.
*
*	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*	THE SOFTWARE.
*/

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
*	$("div").jScroll({ remove : true });  //Removes iScroll from all elements in this set.
*
* It's not 100% fool-proof though.  It still relies on you knowing how to use iScroll.  If
* you have questions about that, or about possible options, check out: http://cubiq.org/iscroll-4
*
* @author Jack Slingerland (jacks@teamddm.com)
* @link http://www.teamddm.com
* @version 0.2.2
*/
var iScrollers = [];
(function($) {
	$.fn.jScroll = function(customOptions) {
		var options = $.extend({}, $.fn.jScroll.defaultOptions, customOptions);
		return this.each(function() {
			
			//Determine the id.  If one exists, use that.  Otherwise, create one.
			var id = $(this).attr("id");
			if(id === undefined || id === "") {
				id = guid();
				$(this).attr("id", id);
			}

			//Check to see if we should be removing iScroll instances.
			if(options.remove === true) {
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