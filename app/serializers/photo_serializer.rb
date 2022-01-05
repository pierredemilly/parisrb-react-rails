class PhotoSerializer < ApplicationSerializer

  attributes :id, :caption, :user_id, :url

  def url
    object.file.attached? ? rails_blob_path(object.file, only_path: true) : nil
  end
end
