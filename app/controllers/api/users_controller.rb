class Api::UsersController < ApplicationController

  # returns current user
  def show
    render json: {
      first_name: "Pierre",
      last_name: "de Milly",
      birthdate: Date.new(1990, 12, 8),
      email: "pierre.de.milly@gmail.com",
    }
  end
  
end
