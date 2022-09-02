class AssigneesController < ApplicationController
  before_action :authenticate_requester

  def index
    render json: Assignee.all
  end
end
