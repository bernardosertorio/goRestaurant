import { useEffect, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { api } from '../../services/api';
import { Container } from './styles';

interface FoodProps {
  id: number,
  name: string,
  description: string;
  price: string,
  available: boolean;
  image: string;
}

export function Food() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data.foods))
  }, []);

  return (
    <>
      {foods.map(food => ( 
        <Container key={food.id}>
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
              >
                <FiEdit3 size={20} />
              </button>

              <button
                type="button"
                className="icon"
              >
                <FiTrash size={20} />
              </button>
            </div>

            <div className="availability-container">
              <p>{'Disponível' || 'Indisponível'}</p>

              <label htmlFor={`available-switch-${food.id}`} className="switch">
                <input
                  id={`available-switch-${food.id}`}
                  type="checkbox"
                  data-testid={`change-status-food-${food.id}`}
                />
                  <span className="slider" />
                </label>
            </div>
          </section>
        </Container>
      ))}
    </>
  );
};

