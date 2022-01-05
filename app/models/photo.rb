class Photo < ApplicationRecord
  belongs_to :user

  default_scope { order(created_at: :desc) }

  has_one_attached :file

  validates :file, presence: { message: "No photo selected" }
end
