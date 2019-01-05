import { History } from './classes/history';

import { chronicle } from './utils/constants';

class Chronos {
  private chronos: History;

  constructor(enabled: boolean) {
    this.chronos = new History(enabled);
    return new Proxy(this, chronicle);
  }

  /**
   * undo - goes one step back in history
   * @function
   * @return {void} void
   * @example undo()
   */
  public undo() {
    const current = Object.assign({}, this);
    delete current.chronos;

    const state = this.chronos.goBack(current);
    if (state) {
      this.setState(state);
    }

    return state;
  }

  /**
   * redo - reverts undo action
   * @function
   * @return {void} void
   * @example redo()
   */
  public redo() {
    const state = this.chronos.goForward();
    if (state) {
      this.setState(state);
    }

    return state;
  }

  /**
   * enable - enables Chronos
   * @function
   * @return {void} void
   * @example enable()
   */
  public enable() {
    this.chronos.enable();
  }

  /**
   * disable - disables Chronos
   * @function
   * @return {void} void
   * @example disable()
   */
  public disable() {
    this.chronos.disable();
  }

  /**
   * setState - sets state into Chronos
   * @function
   * @property {any} state - state you want to set
   * @return {void} void
   * @example setState({a: 1, b: 2})
   */
  private setState(state: any) {
    this.chronos.cacheHistory();

    Object.keys(this)
      .forEach(key => (!(key in state) && key !== 'chronos') ? delete this[key] : null);
    Object.assign(this, state);

    this.chronos.restoreHistory();
  }
}

export = Chronos;