class Api::UsersController < ApplicationController

  # returns current user
  def show
    render json: current_user
  end

  # updates user
  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: current_user.errors.messages, status: :bad_request
    end
  end

  private

  def user_params
    params.permit(:email, :first_name, :last_name, :picture)
  end
  
end
