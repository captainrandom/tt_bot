export interface Bot {
    pm(message: string): undefined;
    speak(message: string): undefined;
}

export interface CommandArgs {
    pm: boolean;
    userid: string;
    arg: string;
}
