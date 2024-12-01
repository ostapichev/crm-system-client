export interface IPagination {
    page: number;
    totalPages: number;
    limit?: number;
    siblings?: number;
    pageChanger: (value: string) => void;
}
