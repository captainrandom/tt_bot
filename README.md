# tt_bot
a bot for tt

## Install

###Prerequisites:
- yarn
- node

To install run the following:
```shell
npm install -g ts-node yarn
yarn install
```

###Setup a New Bot

Go here to setup the bookmark in order to get the user_id, room_id, & auth_id:
https://alaingilbert.github.io/Turntable-API/bookmarklet.html

## Run

TODO: need to add the setup for the api keys and such

Upon an update need to rebuild:
```shell
npm run build
```
TODO need to make this build only to a certain dir and clean out prev js artifact files!!

To start the bot run:
```shell
# TODO: there are some env vars missing here!!
make run-bot
```

## How to add a new module

Under `src/commands/command_algos` create a new directory for the new module. Then create a class that implements the
`CommandAlgo` class like so:

```typescript
export class MyClass implements CommandAlgo {
    async executeCommand (options: CommandArgs): Promise<void> {
        // do stuff here
    }

    getHelp (commandName: string): string {
        return `return helpful string on how to use the command`
    }
}
```

create a new module file to wire the bot's handler to call your new command class (above) in the `modules` directory.
Below is an example of what one should look like:

```typescript
const messageWriter = new SameLocationMessageWriter()
const commandAlgo = new ChuckNorisApiAlgo(new ChuckNorrisClient(), messageWriter)

const commandFactory = new DefaultCommandFactory()
exports.customCommands = commandFactory.getCustomCommands('chuckfacts', commandAlgo)
```

## TODOS

This is the new bot api url docs: https://www.npmjs.com/package/ttapi

- need to have a better deployment setup!
- fix tests
- cleanup some of the high level bot apis
- work with the new bot
- add 500 ms reply wait time when speaking
- Fix todos on new bot

New Features:
- For the new bot need to create a help message somehow
- add jokes
- add a chatbot option
- recommend songs (privately; maybe)
- backfill song list
- Need to fix help messages!!
