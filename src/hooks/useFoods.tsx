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
  isAvailable: boolean;
  createFood: (food: IFoodInput) => void;
  updateFood: (food: IFood) => void;
  deleteFood: (id: number) => void;
  toggleAvailable: (food: IFood) => void; 
}

export const FoodsContext = createContext<IFoodsContextData>(
  {} as IFoodsContextData
);

export function FoodsProvider({ children }: ProviderFoodsProps) {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data.foods))
  }, []);

  async function createFood(data: IFoodInput): Promise<void> {
    try {
      const response = await api.post('/foods', {
        ...data,
        available: true,
      });

      setFoods([...foods, response.data.food]);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFood(food: IFoodInput):Promise<void> {
    try {
      const foodUpdated = await api.put(`/foods/${food}`, 
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

  async function toggleAvailable(food: IFood) {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable)
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

  return (
    <FoodsContext.Provider value={{ 
      foods, isAvailable, createFood, updateFood, deleteFood, toggleAvailable 
    }}>
      {children} 
    </FoodsContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}