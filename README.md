# tt_bot
a bot for tt

## Install

###Prerequisites:
- yarn
- node

To install run the following:
```shell
yarn install
```


## Run

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

- need to have a better deployment setup!