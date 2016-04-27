# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#


#Location.delete_all("region_id = 1")
#open("db/SeedData/fk14_samplist.csv") do |samples|
  #samples.read.each_line do |sample|
    #id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    #Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  #end
#end

#Location.delete_all("region_id = 2")
#open("db/SeedData/drto.csv") do |samples|
  #samples.read.each_line do |sample|
    #id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    #Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  #end
#end

Location.delete_all("region_id = 3")
#open("db/SeedData/SEFCRI_2015.csv") do |samples|
  #samples.read.each_line do |sample|
    #id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    #Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  #end
#end

Location.delete_all("region_id = 4")
open("db/SeedData/PR_Sites_2016.csv") do |samples|
  samples.read.each_line do |sample|
    id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  end
end

#Location.delete_all("region_id = 5")
#open("db/SeedData/STX_2015.csv") do |samples|
  #samples.read.each_line do |sample|
    #id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    #Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  #end
#end


#Location.delete_all("region_id = 6")
#open("db/SeedData/STJSTX_2015.csv") do |samples|
  #samples.read.each_line do |sample|
    #id, lat, lon, reg, level, need, color, reserve, depth = sample.chomp.split(",")
    #Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve, :depth => depth)
  #end
#end
