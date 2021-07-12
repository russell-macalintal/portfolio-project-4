class User < ApplicationRecord
    has_many :scores
    has_many :difficulties, through: :scores

    validates :username, uniqueness: true
end
