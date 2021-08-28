export interface Bot {
    pm(message: string);
    speak(message: string);
}

export interface CommandArgs {
    pm: boolean;
    userid: string;
    arg: string;
}
