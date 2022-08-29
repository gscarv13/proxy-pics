class Order < ApplicationRecord
  has_one :address, dependent: :destroy
  has_many_attached :images
end
