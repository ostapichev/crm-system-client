export interface IPagination {
    page: number;
    totalPages: number;
    limit?: number;
    siblings?: number;
    isOpenComments?: boolean;
    pageChanger: (value: string) => void;
}
