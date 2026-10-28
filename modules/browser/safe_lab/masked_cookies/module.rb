class Masked_cookies < BeEF::Core::Command
  def self.options
    []
  end

  def post_execute
    save(
      'Audit' => 'Visible consent granted; current document origin only; cookie values masked client-side.'
    )
  end
end
