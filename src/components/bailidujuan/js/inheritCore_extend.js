import { Core, Arr, _this } from "js/inheritCore.js"
class Arr_extend extends Arr {
  constructor(data, other, test) {
    super(data, other)
    test.test()
  }
}
export {
  Arr_extend as Arr,
  _this
}