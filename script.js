function isBreakpoint(alias) {
	var isBreakpoint = $(".device-" + alias).is(":visible");
	console.log("is screen " + alias + "? " + isBreakpoint + "....")
	return isBreakpoint;
}
function forXS() {
	if (isBreakpoint("xs")) {
		$(".navbar-toggle").click(function() {
			if ($("#collapseWrapper").hasClass("coverScreen")) {
				$("#collapseWrapper").removeClass("coverScreen");
			} else {
				$("#collapseWrapper").addClass("coverScreen");
			}
		});
	}
}
var screenshotHeight;
var waitForFinalEvent = (function() {
	var b = {};
	return function(c, d, a) {
		a || (a = "I am a banana!");
		b[a] && clearTimeout(b[a]);
		b[a] = setTimeout(c, d);
	};
})();
var fullDateString = new Date();
function setPageHeight() {
	var heightAvailable = $(window).height() - $(".navbar").outerHeight();
	$("#about, #portfolio, #contact").each(
			function() {
				if (heightAvailable > $(this).outerHeight()) {
					var heightValue = heightAvailable
							- parseInt($(this).css("margin-top"));
					$(this).innerHeight(heightValue);
					$(this).css("min-height", heightValue + "px");
				}
			})
}

$(document).ready(
		function() {
			forXS();

			$(".navbar a").click(
					function() {
						if (isBreakpoint("xs")
								&& $(".navbar-collapse").hasClass("in")) {
							$(".navbar-toggle").click();
						}
						var linkText = $(this).attr("href");
						var newTop = $(linkText).position().top + 2;
						$("html, body").animate({
							scrollTop : newTop
						}, 1000);
					});
			$("body").css(
					"top",
					$(".navbar").position().top + $(".navbar").outerHeight()
							+ "px");
			if (!isBreakpoint("xs")) {
				var remainingHeight = $("#about img").outerHeight()
						- $("#info p").height();
				$("#info").css("padding-top", remainingHeight / 2 + "px");
			}
			;

			$("#about img").css("border-radius",
					$("#about img").height() / 2 + "px");
			console.log("calc " + $(window).height()
					- $(".navbar").outerHeight());
			setPageHeight();
		});
$(window).load(function() {
	$(".placeholder").height($("#screenshot").height());
	// console.log(screenshotHeight);
});
$(window).resize(function() {
	waitForFinalEvent(function() {
		forXS();
		setPageHeight();
	}, 300, fullDateString.getTime());
});