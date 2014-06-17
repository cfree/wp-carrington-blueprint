(function($) {

	window.Site = {
		challengeElement: null,
		context: null,
		mainNav: '#nav-main',

		init: function() {
			/**
			 * Requires jquery.placeholder.min.js
			 * Add support for placeholder attribute in older browsers.
			 */
			$('input[placeholder]').placeholder();

			/**
			 * Set the initial breakpoint context
			 */
			this.challengeElement = '.breakpoint-context';
			this.challengeContext();

			/**
			 * Check breakpoint context on window resizing
			 * Throttled/debounced for better performance
			 */
			$(window).on('resize', this.debounce(function() {
				Site.challengeContext();
			}), 250);

			$('#masthead').on('click', '#toggle-menu', function() {
				Site.toggleMenu(this);
			});
		},
		/**
		 * Device targeting should be based on media queries in CSS,
		 * we do not define this in scripts
		 * Modified from http://davidwalsh.name/device-state-detection-css-media-queries-javascript
		 * NOTE: If your site requires IE8 support, this method requires 
		 */
		challengeContext: function() {
			var index = parseInt($(this.challengeElement).attr('zIndex'), 10),
				states = {
					1: 'mobile',
					2: 'tablet'
				};

			this.context = states[index] || 'desktop';
		},
		/**
		 * Throttle/debounce helper
		 * Modified from http://remysharp.com/2010/07/21/throttling-function-calls/
		 */
		debounce: function(fn, delay) {
			var timer = null;

			return function() {
				var context = this,
					args = arguments;

				clearTimeout(timer);
				
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		},
		/**
		 * Open/Close Mobile Main Menu
		 */
		toggleMenu: function(that) {
			$(Site.mainNav).add(that).toggleClass('active');
		}
	};

	$(document).ready(function() {
		Site.init();
	});

})(jQuery);
