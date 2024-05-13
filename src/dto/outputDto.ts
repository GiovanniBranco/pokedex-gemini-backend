interface IOutputDto {
  name: string;
  type: string;
  description: string;
  evolutions: IPokemonData[];
}

interface IPokemonData {
  name: string;
  type: string;
}
