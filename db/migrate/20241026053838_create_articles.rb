class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.string :author
      t.datetime :published_at
      t.string :status
      t.boolean :featured

      t.timestamps
    end
  end
end
