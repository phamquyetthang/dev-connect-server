export interface IEditPreferenceReq{
    userId: string;
    theme?: string;
    language?: string;
}
export interface IAddSnippetReq{
    userId: string;
    snippet: string;
    
}
export interface IEditSnippetReq{
    userId: string;
    snippetId: string;
    snippet: string;
}