beef.execute(function() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=unsupported', beef.status.error());
    return;
  }
  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;z-index:2147483647;inset:16px;background:#111;color:#fff;padding:16px;font:14px sans-serif;border:2px solid #22c55e;border-radius:8px';
  box.innerHTML = '<strong>Local screen preview</strong><p>The browser will show its native screen picker. Nothing is uploaded.</p><button id="safe-screen-stop">Stop preview</button><br><video autoplay muted playsinline style="max-width:100%;max-height:80%;margin-top:12px;background:#000"></video>';
  document.body.appendChild(box);
  var video = box.querySelector('video');
  var stop = function() {
    if (video.srcObject) video.srcObject.getTracks().forEach(function(track) { track.stop(); });
    box.remove();
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=stopped_local_preview', beef.status.success());
  };
  box.querySelector('#safe-screen-stop').onclick = stop;
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: false }).then(function(stream) {
    video.srcObject = stream;
    stream.getVideoTracks()[0].addEventListener('ended', stop);
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=consented_local_preview', beef.status.success());
  }).catch(function() {
    box.remove();
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=screen_selection_cancelled', beef.status.error());
  });
});
