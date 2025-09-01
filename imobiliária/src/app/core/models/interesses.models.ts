//& arquivo responsável pela modelagem de dados para interesses

export class Interesse {
  //* atributos:
  //? private _id: number;
  //? private _clienteId: number;
  //? private _imovelId: number;

  //* construtor
  constructor(
    public id: number,
    public clienteId: number,
    public imovelId: number
  ) {}

  //& Métodos de conversão de objetos
  //* Obj => Json
  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      clienteId: this.clienteId,
      imovelId: this.imovelId,
    };
  }

  //* Json => Obj
  static fromMap(map: any): Interesse {
    return new Interesse(map.id, map.clienteId, map.imovelId);
  }
}
