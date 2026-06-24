export interface ApiResponse<T> {
    isSuccess: boolean;
    statusCode: number;
    message: string;
    errors: string[];
    data: T;
}