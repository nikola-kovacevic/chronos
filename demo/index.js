const Chronos = require('../src/dist');
const object = new Chronos();

object.enable();

object.test = 'TEST';
object.test = 'NEW TEST';

console.log(object.test);
object.undo();
console.log(object.test);
object.redo();
console.log(object.test);
object.undo();
console.log(object.test);

object.disable();
console.log(object.test);
