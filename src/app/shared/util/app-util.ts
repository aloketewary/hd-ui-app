export class AppUtil {

    static isNullOrUndefined(value: any): value is null | undefined {
        return value === null || value === undefined;
    }
}
