class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    def create
        user = User.find_by(username: params[:u_name])
        if user
            render json: UserSerializer.new(user)
        else
            render json: {'message': 'User Not Found'}
        end
    end
end
