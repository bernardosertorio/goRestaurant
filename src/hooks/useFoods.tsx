import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface IFood {
  id: number,
  name: string,
  description: string;
  price: string,
  available: boolean;
  image: string;
}

type IFoodInput = Omit<IFood, 'id' | 'available'>;

interface ProviderFoodsProps {
  children: ReactNode;
}

interface IFoodsContextData {
  foods: IFood[];
  createFood: (food: IFoodInput) => void;
  updateFood: (food: IFood) => void;
  deleteFood: (id: number) => void;
}

export const FoodsContext = createContext<IFoodsContextData>(
  {} as IFoodsContextData
);

export function FoodsProvider({ children }: ProviderFoodsProps) {
  const [foods, setFoods] = useState<IFood[]>([]);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data.foods))
  }, []);

  async function createFood(food: IFoodInput): Promise<void> {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFood(food: IFood):Promise<void> {
    try {
      const foodUpdated = await api.put(`/foods/${food.id}`, 
        {...food, ...food },
      );

      const foodsUpdated = foods.map(
        f => f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

  return (
    <FoodsContext.Provider value={{ foods, createFood, updateFood, deleteFood }}>
      {children} 
    </FoodsContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}