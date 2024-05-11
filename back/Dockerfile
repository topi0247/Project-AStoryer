FROM --platform=linux/amd64 ruby:3.2.2
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client libvips

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app

COPY ./bin/docker-entrypoint /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint
ENTRYPOINT ["docker-entrypoint"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]