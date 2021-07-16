class DifficultySerializer
  include FastJsonapi::ObjectSerializer
  attributes :level, :grid_col, :grid_row
end
