class AddAssigneeAndRequesterReferenceToOrders < ActiveRecord::Migration[7.0]
  def change
    add_reference :orders, :assignee, null: false, foreign_key: true
    add_reference :orders, :requester, null: false, foreign_key: true
  end
end
