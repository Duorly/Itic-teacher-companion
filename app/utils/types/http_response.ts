export interface HttpErrorResponse {
    timestamp: string
    status: number
    code: string
    message: string
    details: string | null
}