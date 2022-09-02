class RequesterOrdersController < ApplicationController
  before_action :authenticate_requester

  def index
    orders = Order.includes(:address).all

    render json: orders
  end

  def create
    assignee = Assignee.find(params[:assignee_id])
    address = Address.new(address_params)
    order = address.build_order(status: 'Pending', requester_id: @requester.id, assignee_id: assignee.id)

    if order.save
      render json: order
    else
      render json: order.errors, status: :unprocessable_entity
    end
  end

  def show
    order = Order.find(params[:id])

    if order
      render json: order
    else
      render json: { error: 'Order not found' }, status: :not_found
    end
  end

  private

  def address_params
    params.require(:address).permit(:street_address, :city, :state, :zip_code)
  end
end
