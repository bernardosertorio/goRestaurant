import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Food {
  id: number,
  name: string,
  description: string;
  price: string,
  available: boolean;
  image: string;
}

type FoodInput = Omit<Food, 'id'>;

interface ProviderFoodsProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: Food[];
  createFood: (food: FoodInput) => void;
}

export const FoodsContext = createContext<FoodsContextData>(
  {} as FoodsContextData
);

export function FoodsProvider({ children }: ProviderFoodsProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data.foods))
  }, []);

  async function createFood(food: FoodInput) {
   await api.post('/foods', food)
  }

  return (
    <FoodsContext.Provider value={{ foods, createFood }}>
      {children} 
    </FoodsContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}