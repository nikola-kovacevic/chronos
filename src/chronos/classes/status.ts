interface Statuses {
  manage(setTo: boolean): void;
  get(): boolean;
}

export class Status implements Statuses {
  private enabled: boolean = false;

  constructor(enabled: boolean) {
    this.enabled = Boolean(enabled);
  }

  /**
   * manage - enables or disables Chronos
   * @function
   * @property {boolean} setTo - enable or disable
   * @return {void} void
   * @example manage(true)
   */
  public manage(setTo: boolean) {
    if (this.enabled !== setTo) {
      return this.enabled = !this.enabled;
    } else {
      const action = setTo ? 'enable' : 'disable';
      throw new Error(`Can't ${action}! Current state is already ${action}d!`);
    }
  }

  /**
   * get - returns if Chronos is enabled or disabled
   * @function
   * @return {boolean} true | false
   * @example get()
   */
  public get() {
    return this.enabled;
  }
}