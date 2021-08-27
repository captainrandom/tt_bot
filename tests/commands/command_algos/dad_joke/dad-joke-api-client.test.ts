import axios from "axios";
import { DadJokeApiClient } from '../../../../src/commands/command_algos/dad_joke/dad-joke-api-client'
import MockAdapter from 'axios-mock-adapter'

describe('test chuck noris joke', () => {
  let axiosMock;
  beforeAll(() => {
    axiosMock = new MockAdapter(axios)
  })

  afterEach(() => {
    axiosMock.reset()
  })

  let subject: DadJokeApiClient
  beforeEach(async () => {
    subject = new DadJokeApiClient()
  })

  it('test get random joke', async () => {
    const jokeResult = {
      id: 'm3E69pbhaFd',
      joke: 'I gave all my dead batteries away today, free of charge.',
      status: 200
    }
    axiosMock.onGet('https://icanhazdadjoke.com/').reply(200, jokeResult);

    const result = await subject.getRandomJoke()

    expect(axiosMock.history.get[0].url).toEqual('https://icanhazdadjoke.com/');
    expect(axiosMock.history.get[0].headers).toEqual({
      'User-Agent': 'TT_bot_mark',
      Accept: 'application/json'
    })
    expect(result).toEqual(jokeResult.joke)
  })
})
