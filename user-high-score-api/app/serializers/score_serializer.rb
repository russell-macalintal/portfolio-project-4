class ScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :score, :user, :difficulty
  # belongs_to :user
  # belongs_to :difficulty
end
