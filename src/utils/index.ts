export default class Utils {
  static async sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
