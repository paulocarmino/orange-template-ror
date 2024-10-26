class ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /articles
  def index
    @articles = Article.all
    render inertia: 'article/index', props: {
      articles: @articles.map do |article|
        serialize_article(article)
      end
    }
  end

  # GET /articles/1
  def show
    render inertia: 'article/show', props: {
      article: serialize_article(@article)
    }
  end

  # GET /articles/new
  def new
    @article = Article.new
    render inertia: 'article/new', props: {
      article: serialize_article(@article)
    }
  end

  # GET /articles/1/edit
  def edit
    render inertia: 'article/edit', props: {
      article: serialize_article(@article)
    }
  end

  # POST /articles
  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article, notice: "Article was successfully created."
    else
      redirect_to new_article_url, inertia: { errors: @article.errors }
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      redirect_to @article, notice: "Article was successfully updated."
    else
      redirect_to edit_article_url(@article), inertia: { errors: @article.errors }
    end
  end

  # DELETE /articles/1
  def destroy
    @article.destroy!
    redirect_to articles_url, notice: "Article was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:title, :body, :author, :published_at, :status, :featured)
    end

    def serialize_article(article)
      article.as_json(only: [
        :id, :title, :body, :author, :published_at, :status, :featured
      ])
    end
end
