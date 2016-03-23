class AddFieldsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :site, :string
    add_column :locations, :latitude, :float
    add_column :locations, :longitude, :float
    add_column :locations, :region_id, :integer
    add_column :locations, :level, :integer
    add_column :locations, :need, :integer
    add_column :locations, :color, :integer
    add_column :locations, :depth, :integer
    add_column :locations, :is_reserved, :boolean
    add_column :locations, :fish_complete_agency, :string
    add_column :locations, :fish_complete_date, :date
    add_column :locations, :demo_complete_agency, :string
    add_column :locations, :demo_complete_date, :date
  end
end
