import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';

import { api } from '../../services/api';

interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}


interface IFoodProps {
  food: IFood;
  handleUpdateFood: (food: IFood) => void;
  handleDelete: (id: number) => void;
}

export function Food({ 
  food,  
  handleDelete, 
  handleUpdateFood }: IFoodProps) {
  const [isAvailable, setIsAvailable] = useState(food.available)
  
  const toggleAvailable = async (food: IFood) => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  const updatingFood = () => {
    handleUpdateFood(food);
  };

  const deleteFood = () => {
    handleDelete(food.id);
  };

  const foodAvailable = () => {
    toggleAvailable(food);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price"> R$ <b>{food.price}</b></p>
      </section>

      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={updatingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={deleteFood}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{ isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={foodAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
              <span className="slider" />
            </label>
        </div>
      </section>
    </Container>
  )}

