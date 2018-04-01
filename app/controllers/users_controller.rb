class UsersController < ApplicationController
  def index
    @searched_users = User.where("name like(?)", "#{params[:searched_name]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.json
    end
  end
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
