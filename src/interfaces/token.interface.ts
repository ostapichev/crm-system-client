export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IActivateLink {
    token?: string;
    msg?: string;
}