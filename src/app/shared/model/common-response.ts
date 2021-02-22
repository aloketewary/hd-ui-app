export class CommonResponse<T> {
    desc!: string;
    result: T | T[] | null | undefined;
    success!: boolean;
    status!: CommonHttpStatus;
    error!: {
      message: string;
    };
}

export enum CommonHttpStatus {
    'CREATED' = 201,
    'OK' = 200
}
