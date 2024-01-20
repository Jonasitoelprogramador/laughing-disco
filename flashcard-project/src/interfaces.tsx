

export interface Sentence {
    fragments: string[];
    keywords: string[]; 
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

export interface DisplayedContent {
    sentences: Sentence[];
    buttonValues: string[];
}

export interface SentencesResponse {
    1: { [key: string]: any[] };
    2: string[];
}