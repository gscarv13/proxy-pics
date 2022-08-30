class ApplicationController < ActionController::Base
  private

  def authenticate_requester
    requester_id = request.headers["Authorization"].split(' ').last
    @requester = Requester.find(requester_id)
    
    return render json: { error: "Invalid user token" }, status: :unauthorized unless @requester
  end

  def authenticate_assignee
    assignee_id = request.headers["Authorization"].split(' ').last
    @assignee = Assignee.find(assignee_id)
    
    return render json: { error: "Invalid user token" }, status: :unauthorized unless @assignee
  end
end
