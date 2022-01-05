class Api::PhotosController < ApplicationController
  before_action :set_photo, only: [:update, :destroy]

  # returns current user's photos
  def index
    render json: current_user.photos
  end

  # uploads a new photo and returns all user's photos
  def create
    if photo = current_user.photos.create(photo_params)
      render json: current_user.photos
    else
      render json: photo.errors.messages, status: :bad_request
    end
  end

  # edits an existing photo and returns it
  def update
    if @photo.update(user_params)
      render json: @photo
    else
      render json: @photo.errors.messages, status: :bad_request
    end
  end

  # deletes a photo and returns all user's photos
  def destroy
    if @photo.destroy
      render json: current_user.photos
    else
      head :bad_request
    end
  end

  private
  
  def set_photo
    @photo = current_user.find(params[:id])
  end
  
  def photo_params
    params.permit(:caption, :file)
  end
  
end
