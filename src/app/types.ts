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

export type { User, Ingredient };
