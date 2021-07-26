class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    # Customize User.create method to find_or_create_by username
    def create
        user = User.find_or_create_by(username: params[:u_name])
        difficulty = Difficulty.find_by(level: params[:u_diff])
        Score.create(score: params[:u_score], user_id: user.id, difficulty_id: difficulty.id)

        render json: UserSerializer.new(user)
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end

    def destroy
        User.find(params[:u_id]).destroy

        render json: {'Alert': 'Successfully Deleted User'}
    end
end
