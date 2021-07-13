# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'securerandom'

# Populate database with random users
users = ['Ethan', 'Sarah', 'Stephanie', 'Peter', 'Eric', 'Brian', 'Andy', 'Marissa', 'Steve', 'David']
users.each do |user|
    User.create(username: user)
end

# Add 3 difficulty levels
Difficulty.create(level: "Easy")
Difficulty.create(level: "Medium")
Difficulty.create(level: "Hard")

# Populate database with random scores for users and difficulty levels
(1..50).each do |score|
    u_id = (SecureRandom.random_number(users.size) + 1).floor
    d_id = (SecureRandom.random_number(3) + 1).floor
    s = (SecureRandom.random_number(1800) + 1).floor
    Score.create(score: s, user_id: u_id, difficulty_id: d_id)
end