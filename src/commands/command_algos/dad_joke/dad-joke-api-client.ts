import axios from 'axios'

export class DadJokeApiClient {
  private readonly baseUrl: string = 'https://icanhazdadjoke.com/'
  private readonly userAgent: string = 'TT_bot_mark'

  async getRandomJoke (): Promise<string> {
    const result = await axios.get(this.baseUrl, {
      headers: {
        'User-Agent': this.userAgent,
        Accept: 'application/json'
      }
    })

    return result.data?.joke
  }
}
