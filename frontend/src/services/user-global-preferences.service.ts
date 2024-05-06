import { Injectable } from '@angular/core';

const defaultChangeOption: ChangeOptionDTO = {
  name: "Peso Chileno",
  symbol: "$",
  abbreviation: "CLP"
}

@Injectable({
  providedIn: 'root'
})
export class UserGlobalPreferencesService {
  private _currentChangeOption: ChangeOptionDTO = defaultChangeOption


  private availableChangeOptions: ChangeOptionDTO[] = [
    {
      name: "Peso Chileno",
      abbreviation: "CLP",
      symbol: "$"
    },
    {
      name: "Peso Mexicano",
      abbreviation: "MXN",
      symbol: "$"
    },
    {
      name: "Dólar Estadounidense",
      abbreviation: "USD",
      symbol: "$"
    },
    {
      name: "Dólar de HongKong",
      abbreviation: "HKN",
      symbol: "$"
    },
  ]


  public getAllLanguages(): ChangeOptionDTO[] {
    return this.availableChangeOptions

  }
  constructor() { }
}

export interface ChangeOptionDTO {
  name: string
  symbol: string
  abbreviation: string
}
