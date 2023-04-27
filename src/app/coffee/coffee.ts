type TipoCafe = 'Blend' | 'Café de Origen';

export class Coffee {
  constructor(
    public id: number,
    public nombre: string,
    public tipo: TipoCafe,
    public region: string,
    public sabor: string,
    public altura: number,
    public imagen: string
  ) {}
}
