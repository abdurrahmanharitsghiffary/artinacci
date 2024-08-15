export class QueryKeyFactory {
  static list(key: string) {
    return [key, "list"];
  }

  static basic(key: string) {
    return [key];
  }

  static item(id: any, key: string) {
    return [id, key];
  }
}
