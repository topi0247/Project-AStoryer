class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  wrap_parameters false
  def create
    return render_create_error_missing_email unless resource_params[:email]

    @email = get_case_insensitive_field_from_resource_params(:email)
    @resource = User.find_by(email: @email) if @email

    if @resource
      yield @resource if block_given?
      @resource.send_reset_password_instructions(
        email: @email,
        provider: 'email',
        redirect_url: @redirect_url,
        client_config: params[:config_name]
      )

      if @resource.errors.empty?
        return render_create_success
      else
        render_create_error @resource.errors
      end
    else
      render_not_found_error
    end
  end

   def edit
    @resource = resource_class.with_reset_password_token(resource_params[:reset_password_token])

    if @resource && @resource.reset_password_period_valid?
      token = @resource.create_token unless require_client_password_reset_token?

      @resource.skip_confirmation! if confirmable_enabled? && !@resource.confirmed_at
      @resource.allow_password_change = true if recoverable_enabled?

      @resource.save!

      yield @resource if block_given?

      if require_client_password_reset_token?
        redirect_to DeviseTokenAuth::Url.generate(@redirect_url, reset_password_token: resource_params[:reset_password_token]),
        redirect_options, allow_other_host: true
      else
        if DeviseTokenAuth.cookie_enabled
          set_token_in_cookie(@resource, token)
        end

        redirect_header_options = { reset_password: true }
        redirect_headers = build_redirect_headers(token.token,
                                                  token.client,
                                                  redirect_header_options)
        redirect_to(@resource.build_auth_url(@redirect_url,
                                             redirect_headers),
                                             redirect_options, allow_other_host: true)
      end
    else
      render_edit_error
    end
  end

  def update
    if require_client_password_reset_token? && resource_params[:reset_password_token]
      @resource = resource_class.with_reset_password_token(resource_params[:reset_password_token])
      return render_update_error_unauthorized unless @resource

      @token = @resource.create_token
    else
      @resource = set_user_by_token
    end

    return render_update_error_unauthorized unless @resource

    # メール認証していない場合は認証テーブルを確認
    unless @resource.provider == 'email'
      email_auth = @resource.authentications.find_by(provider: 'email')
      unless email_auth.present?
        # メールプロバイダーがなければ作る
        @resource.authentications.create!(provider: 'email', uid: @resource.email)
      end
      @resource.provider = 'email'
    end

    unless password_resource_params[:password] && password_resource_params[:password_confirmation]
      return render_update_error_missing_password
    end

    if @resource.send(resource_update_method, password_resource_params)
      @resource.allow_password_change = false if recoverable_enabled?
      @resource.save!

      yield @resource if block_given?
      return render_update_success
    else
      return render_update_error
    end
  end

  private

  def render_update_success

    sign_in(@resource)

    # トークンを生成
    client_id   = SecureRandom.urlsafe_base64(nil, false)
    token       = SecureRandom.urlsafe_base64(nil, false)
    token_hash  = BCrypt::Password.create(token)
    expiry      = (Time.now + DeviseTokenAuth.token_lifespan).to_i

    @resource.tokens[client_id] = {
      token:  token_hash,
      expiry: expiry
    }

    @resource.save!

    response.headers['Uid'] = @resource.uid
    response.headers['Client'] = client_id
    response.headers['Expiry'] = expiry
    response.headers['Access-Token'] = token

    render json: {
      success: true,
      message: I18n.t('devise_token_auth.passwords.successfully_updated')
    }
  end
end
