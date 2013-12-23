(function($){

	var CYCLEOPS = {

		// Selectors
		$slides: null,
		$nextButton: null,
		$prevButton: null,

		// Internal settings
		touch: false, // Is touch enabled and supported?
		count: 0,     // Number of images in the slider
		counter: 1,   // Active image
		nextClass: 'cycle-forward',
		prevClass: 'cycle-backward',

		// User settings
		options: {
			nextText: 'Next',
			prevText: 'Prev',
			useButtonsWithTouch: false,
			swipeLeftEvent: 'swipeLeft',
			swipeRightEvent: 'swipeRight',
		},

		/*
			The initializer function sets internal variables for the slider and merges custom
			settings into the object. It also checks for touch support and makes appropriate adjustments
			if a touch device is detected, and a set of appropriate touch events exist.
		*/
		init: function(element, options) {
			// Cache selector for images and count number of images
			this.$slides = $(element).children('img, li');
			this.count = this.$slides.length;

			// Apply options
			if (typeof options === 'object') { 
				this.options = $.extend(this.options, options);
			}

			// Add enabled class to slider
			element.addClass('cycle-enabled');

			// Add "hidden" class to every image except the first one
			this.$slides.slice(1).addClass(this.nextClass);

			// Insert the next/prev buttons
			this.$nextButton = $('<a />', {class: 'cycle-button cycle-next', text: this.options.nextText}).appendTo(element);
			this.$prevButton = $('<a />', {class: 'cycle-button cycle-prev', text: this.options.prevText}).appendTo(element).hide();

			// Check for touch support
			if (typeof window.ontouchstart !== 'undefined' && typeof $.fn.swipeLeft !== 'undefined') {
				this.$nextButton.hide();
				this.$prevButton.hide();
			}

			// Set context for next/prev methods
			this.nextImage = $.proxy(this.nextImage, this);
			this.prevImage = $.proxy(this.prevImage, this);

			// Add event listeners
			this.events();
		},

		/*
			Events added are click handlers for the next and previous buttons,
			and swipe left/right events if touch is enabled.
		*/
		events: function() {
			// Regular click listeners
			this.$nextButton.click(this.nextImage);
			this.$prevButton.click(this.prevImage);

			// Special touch listeners
			if (this.touch === true) {
				this.$slides.on(this.options.swipeLeftEvent, this.nextImage);
				this.$slides.on(this.options.swipeRightEvent, this.prevImage);
			}

		},

		/*
			Advances the slider by pulling the next image in line out of its "hidden" state.
		*/
		nextImage: function() {
			if (this.touch !== true) this.$prevButton.show();

			if (this.counter !== this.count) {
				this.counter++;
				this.$slides.eq(this.counter - 1).removeClass(this.nextClass);

				if (this.counter === this.count) {
					this.$nextButton.hide();
				}
			}
		},

		/*
			Reverses the slider by giving the current image a "hidden" state.
		*/
		prevImage: function() {
			if (this.touch !== true) this.$nextButton.show();

			if (this.counter > 1) {
				this.$slides.eq(this.counter - 1).addClass(this.nextClass);
				this.counter--;

				if (this.counter === 1) {
					this.$prevButton.hide();
				}
			}
		}
	};

	$.fn.cycleops = function(options) {
		this.find('[data-cycleops]').each(function() {
			var cycleops = $.extend({}, CYCLEOPS);
			cycleops.init($(this), options);
		});

		return this;
	};

})(this.jQuery || this.Zepto);