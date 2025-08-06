import NewsRepository from "../repository/newsRepository";

class NewsService {
  async getAllNews() {
    return await NewsRepository.find({});
  }

  async getNewsById(_id: string) {
    return await NewsRepository.findById(_id);
  }

  async createNews(newsData: any) {
    const news = new NewsRepository(newsData);
    return await news.save();
  }

  async updateNews(_id: string, newsData: any) {
    return await NewsRepository.findByIdAndUpdate(_id, newsData, { new: true });
  }

  async deleteNews(_id: string) {
    return await NewsRepository.findByIdAndDelete(_id);
  }
}

export default new NewsService();
