class UserSerializer < ApplicationSerializer

  attributes :id, :email, :first_name, :last_name, :profile_picture

  def profile_picture
    object.picture.attached? ? rails_blob_path(object.picture, only_path: true) : nil
  end
end
