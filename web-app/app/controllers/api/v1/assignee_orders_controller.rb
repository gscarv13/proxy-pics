module Api
  module V1
    class AssigneeOrdersController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_assignee

      def index
        orders = Order.includes(:address).where(assignee_id: @assignee.id)
    
        render json: orders
      end
    
      def update
        order = Order.find(params[:id])
        images_params = update_params[:images]

        if images_params.present?
          images_params.each { |image| order.images.attach(image) }
          order.update!(status: "Completed")

          render json: order
        else
          render json: order.errors, status: :unprocessable_entity
        end
      end
    
      private

      def attached_images
        Order.first.images.map {|im| { id:im.id, url: url_for(im) } }
      end

      def address_params
        params.require(:address).permit(:street_address, :city, :state, :zip_code)
      end

      def update_params
        params.require(:order).permit(images: [])
      end
    end    
  end
end