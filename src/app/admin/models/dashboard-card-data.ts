export class DashboardCardData {
  id: number;
  imageUrl: string;
  icon: string;
  processName: string;
  name: string;
  link: string;
  flip: 'inactive' | 'active';
  info: string;
  isEnable: boolean;
  private constructor() {
  }

  public static build(): DashboardCardData {
    return new DashboardCardData();
  }

  public withId(id: number): DashboardCardData {
    this.id = id;
    return this;
  }

  public withImageUrl(imageUrl: string): DashboardCardData {
    this.imageUrl = `custom/${imageUrl}`;
    return this;
  }

  public withIcon(icon: string): DashboardCardData {
    this.icon = icon;
    return this;
  }

  public withProcessName(processName: string): DashboardCardData {
    this.processName = processName;
    return this;
  }

  public withName(name: string): DashboardCardData {
    this.name = name;
    return this;
  }

  public withLink(link: string): DashboardCardData {
    this.link = link;
    return this;
  }

  public withFlip(flip: 'inactive' | 'active'): DashboardCardData {
    this.flip = flip;
    return this;
  }

  public withInfo(info: string): DashboardCardData {
    this.info = info;
    return this;
  }

  public withIsEnable(isEnable: boolean): DashboardCardData {
    this.isEnable = isEnable;
    return this;
  }
}
