class OrderSerializer < ActiveModel::Serializer
  attributes :id, :address, :status, :created_at, :images

  def address
    address = object.address

    "#{address.street_address}, #{address.city}, #{address.state}, #{address.zip_code}."
  end

  def created_at
    object.created_at.to_date
  end

  def images
    return [] unless object.images.attached?
    
    object.images.map {|image| { id:image.id, url: image.url} }
  end

end
