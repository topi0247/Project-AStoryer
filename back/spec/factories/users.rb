FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user_#{n}" }
    sequence(:email) { |n| "test_#{n}@test.com" }
    sequence(:uid) { |n| "test_#{n}@test.com" }
    password { "password" }
    provider { "email" }

    trait :general do
      role { User.roles[:general] }
    end

    trait :admin do
      role { User.roles[:admin] }
    end
  end
end
