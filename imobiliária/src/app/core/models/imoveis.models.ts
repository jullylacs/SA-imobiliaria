//& arquivo responsável pela modelagem de dados para imóveis

export class Imovel {
  //* atributos:
  //? private _id: number;
  //? private _titulo: string;
  //? private _corretorId: number;
  //? private _tipo: string;
  //? private _cidade: string;
  //? private _preco: number;
  //? private _descricao: string;
  //? private _imagemUrl: string;

  //* construtor
  constructor(
    public id: number,
    public titulo: string,
    public corretorId: number,
    public tipo: string,
    public cidade: string,
    public preco: number,
    public descricao: string,
    public imagemUrl: string
  ) {}

  //& Métodos de conversão de objetos
  //* Obj => Json
  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      titulo: this.titulo,
      corretorId: this.corretorId,
      tipo: this.tipo,
      cidade: this.cidade,
      preco: this.preco,
      descricao: this.descricao,
      imagemUrl: this.imagemUrl,
    };
  }

  //* Json => Obj
  static fromMap(map: any): Imovel {
    return new Imovel(
      map.id,
      map.titulo,
      map.corretorId,
      map.tipo,
      map.cidade,
      map.preco,
      map.descricao,
      map.imagemUrl
    );
  }
}
