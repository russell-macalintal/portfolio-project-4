class ScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :difficulty
  # belongs_to :user
  # belongs_to :difficulty
end
