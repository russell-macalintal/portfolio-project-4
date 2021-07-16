class AddBoardSizeToDifficulty < ActiveRecord::Migration[6.1]
  def change
    add_column :difficulties, :grid_col, :integer
    add_column :difficulties, :grid_row, :integer
  end
end
