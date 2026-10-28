beef.execute(function() {
  var title = 'Safe Lab: consent to inspect current-page cookies';
  var consent = window.confirm(title + '\nOnly cookie names and masked values will be reported. No token values are sent.');
  if (!consent) {
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=declined', beef.status.error());
    return;
  }

  var masked = document.cookie.split(';').filter(Boolean).map(function(entry) {
    var name = entry.split('=')[0].trim();
    return name + '=********';
  }).join('; ');

  beef.net.send('<%= @command_url %>', <%= @command_id %>,
    'origin=' + encodeURIComponent(window.location.origin) +
    '&masked_cookies=' + encodeURIComponent(masked) +
    '&audit=consented_current_origin', beef.status.success());
});
