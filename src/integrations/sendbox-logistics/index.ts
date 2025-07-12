import Quote from './quote';

// SENDBOX APIs --- https://developer.quidax.com/

export default class Sendbox {
  public Quote: Quote;

  public constructor() {
    this.Quote = new Quote();
  }
}
