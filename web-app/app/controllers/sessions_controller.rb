class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def requester
    requester = Requester.find_by(requester_params)

    if requester
      render json: { token: requester.id }
    else
      render json: { error: 'Invalid requester' }, status: :unauthorized
    end
  end

  def assignee
    assignee = Assignment.find_by(assignee_params)

    if assignee
      render json: { token: assignee.id }
    else
     render json: { error: 'Invalid assignee' }, status: :unauthorized
    end
  end

  private

  def requester_params
    params.require(:requester).permit(:name)
  end

  def assignee_params
    params.require(:assignee).permit(:name)
  end

end
