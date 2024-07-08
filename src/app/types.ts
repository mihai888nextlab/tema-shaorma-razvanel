interface User {
  _id: string;
  type: string;
  name: string;
  secret: string;
}

interface Ingredient {
  _id: string;
  name: string;
  price: number;
}

interface Shaworma {
  _id: string;
  name: string;
  ingredients: string[];
}

export type { User, Ingredient, Shaworma };
