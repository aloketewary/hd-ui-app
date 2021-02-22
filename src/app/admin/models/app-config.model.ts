export class AppConfigModel {
  id: string;
  key: string;
  value: any;
  usedFor: string;
  isActive: boolean;

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withKey(key: string): this {
    this.key = key;
    return this;
  }

  withValue(value: any): this {
    this.value = value;
    return this;
  }

  withUsedFor(usedFor: string): this {
    this.usedFor = usedFor;
    return this;
  }

  withIsActive(isActive: boolean): this {
    this.isActive = isActive;
    return this;
  }


}
