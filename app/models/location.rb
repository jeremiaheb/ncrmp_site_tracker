class Location < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :site, :level, :need, :color, :is_reserved, :region_id, :fish_complete_date, :fish_complete_agency, :demo_complete_agency, :demo_complete_date, :depth

  scope :region,          lambda { |reg| where("region_id = ?", reg).load }
  scope :alternate,       lambda { where(level: 2).load }
  scope :primary,         lambda { where(level: 1).load }

  def getIconCode
    "#{self.need}#{self.color}"
  end
  
  def self.WhereAmI(region)
    case region
    when 1
      :Florida_Keys
    when 2
      :DRTO
    when 3
      :SEFCRI
    when 4
      :Puerto_Rico
    when 5
      :STX
    when 6
      :STT_STJ
    end
  end

  def DropDownMenu
    if self.need == 2
      [[1,"not started"], [2,"all complete"], [3,"fish complete"], [4,"demo complete"]]
    else 
      [[1,"not started"], [2,"all complete"]]
    end
  end

  def self.search(search)
    if !search.blank?
      find(:all, :conditions => ( search ? {:site => search.split( /, */ )} : []))
    else
      all
    end
  end

end

