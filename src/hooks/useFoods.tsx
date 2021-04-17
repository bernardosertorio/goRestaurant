import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface IFood {
  id: number,
  name: string,
  description: string;
  price: string,
  available: boolean;
  image: string;
};

type IFoodInput = Omit<IFood, 'id' | 'available'>;

interface ProviderFoodsProps {
  children: ReactNode;
};

interface IFoodsContextData {
  foods: IFood[];
  isAvailable: boolean;
  editModalOpen: boolean;
  editingFood: IFood;
  createFood: (food: IFoodInput) => void;
  updateFood: (food: IFood) => void;
  deleteFood: (id: number) => void;
  toggleEditModal(): void;
  toggleAvailable: (food: IFood) => void;
  handleEditFood(food: IFood): void;
};

export const FoodsContext = createContext<IFoodsContextData>(
  {} as IFoodsContextData
);

export function FoodsProvider({ children }: ProviderFoodsProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [isAvailable, setIsAvailable] = useState(true);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [foods, setFoods] = useState<IFood[]>([]);

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
  };

  async function updateFood(food: IFoodInput): Promise<void> {
    try {
      const listFood = foods.map(currentFood => {
        if (currentFood.id !== editingFood.id) {
          return currentFood;
        }
        return {
          ...food,
          id: editingFood.id,
          available: editingFood.available,
        };
      });
      setFoods(listFood);

      await api.put(`/foods/${editingFood.id}`, {
        ...food,
        id: editingFood.id,
        available: editingFood.available,
      });

    } catch (err) {
      console.log(err);
    }
  };

  async function deleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  };

  async function toggleAvailable(food: IFood) {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFood): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <FoodsContext.Provider value={{ 
      foods, 
      isAvailable, 
      editingFood,
      editModalOpen, 
      createFood, 
      updateFood, 
      deleteFood, 
      toggleAvailable,
      toggleEditModal,
      handleEditFood, 
    }}>
      {children} 
    </FoodsContext.Provider>
  )
};

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
};