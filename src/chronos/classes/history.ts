import { isEquivalent } from './../utils/functions';
import { Status } from './status';

interface Histories {
  enable() : void;
  disable() : void;

  historize(object: any) : void;

  goBack(current: any): any;
  goForward(): any;

  cacheHistory(): void;
  restoreHistory(): void;
}

export class History implements Histories {
  private history: Map<string, any> = new Map();
  private historyCache: Map<string, any>;

  private pointer: number;

  private status: Status;

  private undoBuffer: any[] = [];

  constructor(enabled: boolean) {
    this.status = new Status(enabled);
  }

  /**
   * enable - enables storing of history and navigating through it
   * @function
   * @return {void} void
   * @example enable()
   */
  public enable() {
    this.status.manage(true);
  }

  /**
   * disable - disables storing of history and navigating through it
   * @function
   * @return {void} void
   * @example disable()
   */
  public disable() {
    this.status.manage(false);
    this.undoBuffer = [];

    if (this.historyCache) {
      this.historyCache.clear();
    }

    if (this.history) {
      this.history.clear();
    }
  }

  /**
   * historize - stores object in history before changing it's values
   * @function
   * @property {any} object - Object to be historized
   * @return {void} void
   * @example historize({ a: 1, b: 2, chronos: {} })
   */
  public historize(object: any) {
    if (this.status.get()) {
      if (!this.history.size) {
        this.history.set('0', {});
      }

      const state = Object.keys(object)
      .filter(key => key !== 'chronos')
      .map(property => {
        return {
          [property]: object[property],
        };
      })
      .reduce((result, current) => Object.assign(result, current), {});
      if (Object.keys(state).length && !isEquivalent(this.history.get((this.history.size).toString(10)), {...state})) {
        this.history.set((this.history.size).toString(10), state);
      }
    }
  }

  /**
   * goBack - moves object one step back in history
   * @function
   * @property {any} current - Current object state
   * @return {any} Previous state if available
   * @example goBack({ a: 1, b: 2 })
   */
  public goBack(current: any) {
    if (!this.status.get()) {
      throw new Error('Can\'t undo as Chronos is not enabled!');
    }

    if (typeof this.pointer === 'undefined') {
      this.pointer = this.history.size;
    }

    if (this.pointer < 0) {
      return null;
    }

    this.undoBuffer.push(current);
    return this.history.get((--this.pointer).toString(10));
  }

  /**
   * goForward - gets last state from undo buffer
   * @function
   * @return {any} State from undo buffer
   * @example goForward()
   */
  public goForward() {
    if (!this.status.get()) {
      throw new Error('Can\'t redo as Chronos is not enabled!');
    }

    if (this.undoBuffer.length) {
      ++this.pointer;
      return this.undoBuffer.pop();
    }

    return null;
  }

  /**
   * cacheHistory - caches history to be restored later
   * @function
   * @return {void} void
   * @example cacheHistory()
   */
  public cacheHistory() {
    this.historyCache = new Map(this.history);
  }

  /**
   * restoreHistory - restores history from cache if history is cached
   * @function
   * @return {void} void
   * @example restoreHistory()
   */
  public restoreHistory() {
    if (this.historyCache) {
      this.history = new Map(this.historyCache);
    }
  }

}