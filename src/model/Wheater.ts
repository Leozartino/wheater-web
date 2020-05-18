export default class Wheater {
  private data: string;

  private erros: Array<string>;

  constructor(data: string) {
    this.data = data;
    this.erros = [];
  }

  validateUserInput(): void {
    if (!this.data) {
      this.erros.push('Please enter the name of the city.');
    }
  }

  public getErros(): Array<string> {
    return this.erros;
  }
}
