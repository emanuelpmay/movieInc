
export interface TokenResponse {
    success:       boolean;
    expires_at:    string;
    request_token: string;
}

export interface SessionResponse {
    success:          boolean;
    guest_session_id: string;
    expires_at:       string;
    status_message?:       string;
}
