/**
 * @class CustomError is an error throwed from the server
 * developers due to checked error happen 
 */
export class CustomError {
    _code: string;
    message: string;
    status: Number

    constructor({ _code, message, status = 400 }: CustomError) {
        this._code = _code;
        this.message = message;
        this.status = status
    }
}

/**
 * @class Meta is an set of info returned in case of pagenated request 
 */
export class Meta {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
}

export class GetListResponse<T>{
    data: T[];
    count: number;
    meta: Meta;

    constructor([data, count]: [data: T[], count: number], offset: number, limit: number) {
        this.data = data;
        this.meta = {
            currentPage: Math.ceil(offset / limit) + 1,
            lastPage: Math.ceil((count || 1) / limit),
            perPage: Number(limit),
            total: Number(count)
        };
    }
}