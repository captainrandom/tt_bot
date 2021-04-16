import { BotConfigs } from '../src/bot-configs'
import * as path from 'path'

describe('bla', () => {
  let subject: BotConfigs
  const botDir = path.join(__dirname, 'bot_dir/test_bot')
  beforeEach(() => {
    subject = new BotConfigs(botDir)
  })

  it('bot auth loads', () => {
    const results = subject.botAuth()
    expect(results).toEqual({
      auth: 'auth-id',
      userid: 'user-id',
      roomid: 'room-id'
    })
  })

  it('when bot dir does not exist', () => {
    // eslint-disable-next-line no-new
    expect(() => { new BotConfigs('bla') }).toThrow('bla does not exist!')
  })

  it('gets settings file location', () => {
    const results = subject.getSettingsFilePath()
    const settingsFilePath = path.join(botDir, 'settings.json')
    expect(results).toBe(settingsFilePath)
  })

  it('gets djs.json file location', () => {
    const results = subject.getDjFilePath()
    const djsFilePath = path.join(botDir, 'djs.json')
    expect(results).toBe(djsFilePath)
  })

  it('get bot db file', () => {
    const results = subject.getBotDbFilePath()
    const botDbFilePath = path.join(botDir, 'mybot.db')
    expect(results).toBe(botDbFilePath)
  })

  it('get master user ids', () => {
    const results = subject.getMasterUserIds()
    expect(results).toEqual(['x', 'y', 'z'])
  })
})
