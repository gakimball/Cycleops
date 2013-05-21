# Cycleops.js

Cycleops is a tiny (<2KB) jQuery (and Zepto!) plugin which gives you a no-frills, CSS-based solution to sliding image galleries. The plugin simply adds and removes CSS classes as the user clicks through the gallery. You handle everything with CSS transitions.

## Why use CSS transitions?

- You can keep the presentation logic of your slider in your CSS.
- CSS transitions, although not supported in older browsers, are hardware-accelerated, unlike jQuery animations.

## Usage

Cycleops is compatible with both jQuery and Zepto. You can also enable touch events by including Zepto's touch library, or the touch event library of your choice (more on that later).

### Markup

Your image slider should be a container element (likely a div or unordered list) with the `data-cycleops` attribute, containing a series of images or list items, like so:

	<div data-cycleops>
		<img src="/img/kitten1.jpg">
		<img src="/img/kitten2.jpg">
		<img src="/img/kitten3.jpg">
		<img src="/img/kitten4.jpg">
	</div>

After being initialized, each slider will have some markup and classes added to it automatically. Generated classes have the `cycle-` prefix attached to them.

	<div class="cycle-enabled" data-cycleops>
		<img src="/img/kitten1.jpg">
		<img src="/img/kitten2.jpg">
		<img src="/img/kitten3.jpg">
		<img src="/img/kitten4.jpg">

		<a class="cycle-next">Next</a>
		<a class="cycle-prev">Prev</a>
	</div>

You'll need to add your own unique class/ID to the slider container (i.e., `image-slider`) for styling. Having two separate classes allows you to fall back to a series of stacked panes if your Javascript doesn't load, or perhaps even do the same thing inside a mobile media query.

### Javascript

Initialize your image slider(s) by calling `.cycleops()` on the document, or another container element (just not an image slider itself):

	$(function(){
		$(document).cycleops();
	});

You can optionally pass in an object of custom settings when you initialize your sliders. These options can only be set on initialization.

	{
		// Text used for the next and previous buttons
		nextText: 'Next',
		prevText: 'Prev',

		// Enable or disable the next/previous buttons if touch support is available
		useButtonsWithTouch: false,

		// If you're using a library other than zepto.touch, you can change the events Cycleops will listen for if need be
		swipeLeftEvent: 'swipeLeft',
		swipeRightEvent: 'swipeRight',
	}

### CSS

The basic premise of a Cycleops slider is that images ahead of the current one are tagged with a "forward" class, and likely placed to the right of the visible frame of the container. Similarly, images behind the current one are given a "backward" class, and placed to the left of the visible image.

When the user clicks "next", the next image in line loses its "forward" class, and transitions back into the view of the slider. When the previous button is clicked, that same image will transition back to where it was before. The specifics of that transition, whether it includes translation, rotation, or an opacity change, is up to you.

This is the styling that would be common to every image slider:

	.cycle-slider {
		position: relative;
		overflow: hidden;
	}
	.cycle-slider img {
		position: absolute;
		width: 100%;
		height: 100%
	}

A basic sliding transition would look like this:

	.cycle-slider img {
		left: 0;
		transition: left 0.5s linear;
	}
	.cycle-slider .cycle-forward {
		left: 100%;
	}