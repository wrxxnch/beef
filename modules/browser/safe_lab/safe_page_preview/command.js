beef.execute(function() {
  var allowed = ['/lab/', '/safe-lab/'];
  var path = window.location.pathname;
  var isAllowed = allowed.some(function(prefix) { return path.indexOf(prefix) === 0; });
  if (window.location.origin !== window.top.location.origin || !isAllowed) {
    beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=blocked_origin_or_path', beef.status.error());
    return;
  }
  var preview = document.createElement('iframe');
  preview.title = 'Safe same-origin page preview';
  preview.sandbox = 'allow-same-origin';
  preview.style.cssText = 'position:fixed;z-index:2147483646;inset:5%;width:90%;height:90%;background:#fff;border:2px solid #2563eb';
  preview.srcdoc = new XMLSerializer().serializeToString(document.documentElement)
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/\s(?:value|action|src|href)=(['"]).*?\1/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');
  document.body.appendChild(preview);
  beef.net.send('<%= @command_url %>', <%= @command_id %>, 'audit=allowlisted_sanitized_preview_no_hook', beef.status.success());
});
