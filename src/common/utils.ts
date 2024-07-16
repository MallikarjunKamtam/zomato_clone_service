export class globalUtils {
  public static convertToSubCurrency(amount: number, factor = 100): number {
    return Math.round(+amount * factor);
  }
}
