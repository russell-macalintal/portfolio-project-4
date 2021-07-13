class ScoresController < ApplicationController
    def index
        scores = Score.all
        render json: ScoreSerializer.new(scores)
    end
end
