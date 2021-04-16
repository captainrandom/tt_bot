import axios from 'axios'

export class ChuckNorrisClient {
    private readonly randomFactEndpoint = '/jokes/random';
    private readonly categoriesEndpoint = '/jokes/categories';
    private readonly endpoint = 'https://api.chucknorris.io';
    readonly categories: Set<string>;

    constructor () {
      this.categories = new Set()
    }

    async getFact (category?: string): Promise<string> {
      await this.updateCategories()
      const params = category ? { category: category } : {}
      const response = await axios.get(this.endpoint + this.randomFactEndpoint, { params })
      return response.data.value
    }

    async updateCategories (): Promise<void> {
      if (this.categories.size === 0) {
        const categoriesList = await this.getCategories()
        categoriesList.forEach((category) => {
          this.categories.add(category)
        })
      }
    }

    private async getCategories (): Promise<[string]> {
      const response = await axios.get(this.endpoint + this.categoriesEndpoint)
      return response.data
    }
}
