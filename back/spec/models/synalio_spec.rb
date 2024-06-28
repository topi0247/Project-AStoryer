require 'rails_helper'

RSpec.describe Synalio, type: :model do
  describe 'nameのバリデーション' do
    it 'nameが空欄で登録できないか' do
      synalio = Synalio.create(name: '')
      synalio.valid?
      expect(synalio.errors.full_messages).to include('Name シナリオ名を入力してください')
    end

    it 'nameが重複して登録できないか' do
      synalio = Synalio.create(name: 'test')
      synalio = Synalio.create(name: 'test')
      expect(synalio.errors.full_messages).to include('Name シナリオ名が既に使用されています')
    end

    it 'nameが登録できるか' do
      synalio = Synalio.create(name: 'test')
      expect(synalio).to be_valid
      expect(synalio.errors.full_messages).to be_empty
    end
  end
end
