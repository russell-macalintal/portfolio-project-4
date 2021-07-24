class User < ApplicationRecord
    has_many :scores, dependent: :destroy
    has_many :difficulties, through: :scores

    validates :username, uniqueness: true
end
