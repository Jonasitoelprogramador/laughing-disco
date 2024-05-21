

export interface Sentence {
    text: string;
    fragments: string[];
    keywords: Keyword[]; 
}

export interface Keyword {
    form: string;
    verb: boolean;
    contrastives: string[]
}

export interface GrammarInfo {
    item: string;
    point: string;
}

export interface Language {
    language: string;
    grammarPoints: GrammarPoint[];
}

export interface GrammarPoint {
    id: number;
    point: string;
}

export interface ReceivedData {
    1: Sentence[];
}


export interface InputWithIndex {
    input: string;
    fragmentIndex: number;
    result?: boolean;
}