export class ProductUnit {
  id: string;
  name: string;
  unit: string;
  multiple: number;
  isActive: boolean;
  readOnly: boolean;
  multipleWith: string;

  withId(id: string): ProductUnit {
    this.id = id;
    return this;
  }

  withName(name: string): ProductUnit {
    this.name = name;
    return this;
  }

  withUnit(unit: string): ProductUnit {
    this.unit = unit;
    return this;
  }

  withMultiple(multiple: number): ProductUnit {
    this.multiple = multiple;
    return this;
  }

  withIsActive(isActive: boolean): ProductUnit {
    this.isActive = isActive;
    return this;
  }

  withReadOnly(readOnly: boolean): ProductUnit {
    this.readOnly = readOnly;
    return this;
  }

  withMultipleWith(multipleWith: string): ProductUnit {
    this.multipleWith = multipleWith;
    return this;
  }
}
