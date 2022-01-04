class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :picture

  validates :first_name, presence: { message: "First name required." }
  validates :last_name, presence: { message: "Last name required." }
  validates :email, presence: { message: "Email required." }
end
