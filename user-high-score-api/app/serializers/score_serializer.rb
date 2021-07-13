class ScoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :user
  belongs_to :difficulty
end
