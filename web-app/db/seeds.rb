# Requester
puts  "Creating Requester..."
requester  = Requester.create({ name: 'admin' })

# Assignees
puts  "Creating Assignee..."
assignee_one = Assignee.create({ name: 'user1' })
assignee_two = Assignee.create({ name: 'user2' })
assignee_three = Assignee.create({ name: 'user3' })

# Addresses
puts "Creating addresses..."
address_one = FactoryBot.build(:address)
address_two = FactoryBot.build(:address)
address_three = FactoryBot.build(:address)
address_four = FactoryBot.build(:address)
address_five = FactoryBot.build(:address)
address_six = FactoryBot.build(:address)
address_seven = FactoryBot.build(:address)

# Orders
puts "Creating orders..."
address_one.build_order(status: "Pending", assignee_id: assignee_one.id, requester_id: requester.id).save
address_two.build_order(status: "Pending", assignee_id: assignee_two.id, requester_id: requester.id).save
address_three.build_order(status: "Pending", assignee_id: assignee_three.id, requester_id: requester.id).save
address_four.build_order(status: "Pending", assignee_id: assignee_three.id, requester_id: requester.id).save
address_five.build_order(status: "Pending", assignee_id: assignee_three.id, requester_id: requester.id).save
address_six.build_order(status: "Pending", assignee_id: assignee_one.id, requester_id: requester.id).save
address_seven.build_order(status: "Pending", assignee_id: assignee_one.id, requester_id: requester.id).save

# Completed Order
order_1 = Order.first
order_2 = Order.last

order_1.images.attach(io: File.open("dummy-images/office1.jpg"), filename: "office1.jpg", content_type: "image/jpg")
order_1.images.attach(io: File.open("dummy-images/office2.jpg"), filename: "office2.jpg", content_type: "image/jpg")
order_1.images.attach(io: File.open("dummy-images/office3.jpg"), filename: "office3.jpg", content_type: "image/jpg")
order_1.update(status: "Completed")

order_2.images.attach(io: File.open("dummy-images/office2.jpg"), filename: "office2.jpg", content_type: "image/jpg")
order_2.images.attach(io: File.open("dummy-images/office1.jpg"), filename: "office1.jpg", content_type: "image/jpg")
order_2.images.attach(io: File.open("dummy-images/office3.jpg"), filename: "office3.jpg", content_type: "image/jpg")
order_2.update(status: "Completed")

puts 'Done'
