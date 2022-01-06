class Api::PhotosController < ApplicationController
  before_action :set_photo, only: [:destroy]

  # returns current user's photos
  def index
    render json: current_user.photos
  end

  # uploads a new photo and returns all user's photos
  def create
    photo = current_user.photos.new(photo_params)
    if photo.save
      render json: current_user.photos
    else
      render json: photo.errors.messages, status: :bad_request
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
    @photo = current_user.photos.find(params[:id])
  end
  
  def photo_params
    params.permit(:caption, :file)
  end
  
end
