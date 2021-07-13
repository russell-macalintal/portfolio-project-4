class DifficultiesController < ApplicationController
    def index
        difficulties = Difficulty.all
        render json: difficulties.to_json
    end
end
