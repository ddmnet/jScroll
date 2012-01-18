# jScroll - An iScroll plugin for jQuery

jScroll is an iScroll plugin for jQuery.  It works by attaching id's to any elements in the wrapper set that don't have
them, and then attaches iScroll.  It also keeps track of the iScroll instances in a global array, so that they can be unset
easily in single-page applications (think PhoneGap apps).  By default, it also uses native iOS 5+ scrolling if it's available.

### How to use jScroll

### Include iScroll in the header (or footer).

```html
<script type='text/javascript' src='iscroll.js'></script>
```

### Include jScroll in the header (or footer).

```html
<script type='text/javascript' src='jScroll.js'></script>
```

### Attach to elements.
```js
$(".myelement").jScroll();  //Uses the default options.

$("p").jScroll({	 	    //With overidden options
	lockDirection : false,
	fadeScrollbar : true
});

$("#aDiv").jScroll("remove");  //Removes iScroll from all elements in this set.

$("div").jScroll({ //Adds pinch to zoom functionality on this div.
	zoom : true
});
```

### Available Options and their defaults
```js
hScroll : true
vScroll : true
hScrollbar : true
vScrollbar : true
fixedScrollbar : false
fadeScrollbar : true
hideScrollbar : true
bounce : true
momentum : true
lockDirection : false
forceIscroll : false
zoom : false
useTransition : false  //Performance mode!
```