require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'nameのバリデーション' do
    it 'nameが空欄で登録できないか' do
      tag = Tag.create(name: '')
      tag.valid?
      expect(tag.errors.full_messages).to include('Name タグ名を入力してください')
    end

    it 'nameが重複して登録できないか' do
      tag1 = Tag.create(name: 'test')
      tag2 = Tag.create(name: 'test')
      expect(tag2.errors.full_messages).to include('Name タグ名が既に使用されています')
    end

    it 'nameが登録できるか' do
      tag = Tag.create(name: 'test')
      expect(tag).to be_valid
      expect(tag.errors.full_messages).to be_empty
    end
  end
end
