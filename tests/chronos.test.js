const Chronos = require('../src/dist');

describe('Chronos - create new Chronos', () => {
  it('should instantiate new Chronos', () => {
    const chronos = new Chronos();
    expect(chronos).toBeInstanceOf(Chronos);
  });
});

describe('Chronos - add new property', () => {
  it('should add new property to Chronos object', () => {
    const chronos = new Chronos();
    chronos.property = 1;
    expect(chronos.property).toBe(1);
  });
});

describe('Chronos - delete property', () => {
  it('should add delete property from Chronos object', () => {
    const chronos = new Chronos();
    chronos.property = 1;
    delete chronos.property;
    expect(chronos.property).toBeUndefined();
  });
});

describe('Chronos - undo', () => {
  it('shouldn\'t undo if not enabled', () => {
    const chronos = new Chronos();
    chronos.property = 1;
    let exception;
    try {
      chronos.undo();
    } catch (ex) {
      exception = ex;
    }
    expect(exception).toBeDefined();
  });
});

describe('Chronos - undo', () => {
  it('should undo reassign action', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    chronos.property = 2;
    chronos.undo();
    expect(chronos.property).toBe(1);
  });
});

describe('Chronos - undo', () => {
  it('should undo to inital state', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    chronos.undo();
    expect(chronos.property).toBeUndefined();
  });
});

describe('Chronos - undo', () => {
  it('should undo delete property from Chronos object', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    delete chronos.property;
    chronos.undo();
    expect(chronos.property).toBe(1);
  });
});

describe('Chronos - redo', () => {
  it('shouldn\'t redo if not enabled', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    chronos.undo();
    chronos.disable();
    let exception;
    try {
      chronos.redo();
    } catch (ex) {
      exception = ex;
    }
    expect(exception).toBeDefined();
  });
});

describe('Chronos - redo', () => {
  it('should redo reassign action', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    chronos.property = 2;
    chronos.undo();
    chronos.redo();
    expect(chronos.property).toBe(2);
  });
});

describe('Chronos - redo', () => {
  it('should redo delete property from Chronos object', () => {
    const chronos = new Chronos();
    chronos.enable();
    chronos.property = 1;
    delete chronos.property;
    chronos.undo();
    chronos.redo();
    expect(chronos.property).toBeUndefined();
  });
});
