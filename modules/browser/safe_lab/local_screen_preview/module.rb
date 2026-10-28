class Local_screen_preview < BeEF::Core::Command
  def self.options
    []
  end

  def post_execute
    save(
      'Audit' => 'Native getDisplayMedia prompt required; preview is local-only and no stream upload is implemented.'
    )
  end
end
