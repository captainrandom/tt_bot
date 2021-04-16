export interface Bot {
    pm(message: string): undefined;

    speak(message: string): undefined;
}

export interface CMBot {
    bot: Bot
}

export interface CommandArgs {
    cmbot: CMBot;
    pm: boolean;
    userid: string;
    arg: string;
}
