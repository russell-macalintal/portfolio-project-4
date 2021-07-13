class ScoresController < ApplicationController
    def index
        scores = Score.all
        render json: scores.to_json
    end
end
