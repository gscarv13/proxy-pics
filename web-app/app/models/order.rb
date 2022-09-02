class Order < ApplicationRecord
  has_one :address, dependent: :destroy
  has_one :assignee
  has_one :requester

  has_many_attached :images
end
