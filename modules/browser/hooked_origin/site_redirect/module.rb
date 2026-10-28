#
# Copyright (c) 2006-2026 Wade Alcorn - wade@bindshell.net
# Browser Exploitation Framework (BeEF) - https://beefproject.com
# See the file 'doc/COPYING' for copying permission
#
class Site_redirect < BeEF::Core::Command
  def self.options
    [
      { 'ui_label' => 'Redirect URL', 'name' => 'redirect_url', 'description' => 'The URL the target will be redirected to.', 'value' => 'https://beefproject.com/',
        'width' => '200px' },
      { 'name' => 'open_new_tab', 'ui_label' => 'Open in a new tab', 'type' => 'checkbox', 'checked' => false,
        'description' => 'Open the redirect destination in a new browser tab instead of replacing the current tab.' }
    ]
  end

  def post_execute
    save({ 'result' => @datastore['result'] })
  end
end
