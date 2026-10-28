class Safe_page_preview < BeEF::Core::Command
  def self.options
    []
  end

  def post_execute
    save(
      'Audit' => 'Same-origin allowlist and sanitized preview only; forms, credentials, cookies, scripts, and hook injection are excluded.'
    )
  end
end
