class Consented_location < BeEF::Core::Command
  def self.options
    []
  end

  def post_execute
    save(
      'Audit' => 'Visible opt-in required; maximum duration 60 seconds; revoke and expiry are supported.'
    )
  end
end
