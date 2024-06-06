class Api::V1::ProfilesController < Api::V1::BasesController
  def update
    begin
      user = current_api_v1_user
      user.build_profile if user.profile.nil?

      # ヘッダー画像の保存
      user.profile.save_header_image(profile_params[:header_image])
      # アバター画像の保存
      user.profile.save_avatar(profile_params[:avatar])
      # プロフィール文の保存
      user.profile.update!(text: profile_params[:text])

      # リンクの保存
      links = profile_params[:links]
      Link.set_links(user.uuid, links) if links.present?

      avater = user.profile.avatar.attached? ? url_for(user.profile.avatar) : nil
      render json: {avater: avater}, status: :ok
    rescue => e
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: :bad_request
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:header_image, :avatar, :text, links: [:twitter, :pixiv, :fusetter, :privatter, :other])
  end
end