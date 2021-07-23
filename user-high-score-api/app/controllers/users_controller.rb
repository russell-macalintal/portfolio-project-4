class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    # Customize User.create method to find_or_create_by user
    def create
        user = User.find_or_create_by(username: params[:u_name])

        render json: UserSerializer.new(user)
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end
end
