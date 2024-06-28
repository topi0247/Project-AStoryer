FactoryBot.define do
  factory :synalio do
    sequence(:name) { |n| "synalio_#{n}" }
  end
end
