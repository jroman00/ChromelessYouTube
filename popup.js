var url;
var $button = $("#watch-video"),
	youtube_regex = /\byoutube\.com\b/;

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(url);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function popupVideo(video_id) {
	var defaults = {
			width: 512,
			height: 288
		},
		href = "http://www.youtube.com/embed/" + video_id,
		options = $.extend(defaults, $button.data()),
		top = (screen.height / 2) - (options.height / 2),
		left = (screen.width / 2) - (options.width / 2);

	window.open(href, "", "scrollbars=0,toolbar=no,location=no,width=" + options.width + ",height=" + options.height + ",top=" + top + ",left=" + left);
}

$button.on("click", function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();

	if (!$button.hasClass("cta-button--disabled")) {
		popupVideo(getParameterByName("v"));
	}
});

chrome.tabs.getSelected(null, function (tab) {
	url = tab.url;
	if (youtube_regex.test(tab.url)) {
		$button.removeClass("cta-button--disabled");
	}
});
