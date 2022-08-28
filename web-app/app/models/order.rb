class Order < ApplicationRecord
  has_one :address, dependent: :destroy
end
