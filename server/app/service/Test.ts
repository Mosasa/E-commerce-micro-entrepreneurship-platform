import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @params name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
