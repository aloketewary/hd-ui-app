export class AppUtil {

    static isNullOrUndefined(value: any): value is null | undefined {
        return value === null || value === undefined;
    }
}

// create a new type HTMLElementEvent that has a target of type you pass
// type T must be a HTMLElement (e.g. HTMLTextAreaElement extends HTMLElement)
export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  currentTarget: T;
};

export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function isEqualsIgnoreCase(data: string, data2: string): boolean {
  return !isNullOrUndefined(data) ? data.toLowerCase() === data2.toLowerCase() : false;
}

export function isNullOrUndefinedOrBlank(value: any): value is null | undefined | '' {
  return value === null || value === undefined || value === '';
}
