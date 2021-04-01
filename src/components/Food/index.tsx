import { useEffect } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { api } from '../../services/api';
import { Container } from './styles';

export function Food() {
  useEffect(() => {
    api.get('/transactions').then(response => console.log(response.data))
  }, []);

  return (
    <Container>
      <header>
        <img src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png" alt="" />
      </header>
      <section className="body">
        <h2>Macarrão</h2>
        <p>com carne</p>
        <p className="price">
          R$ <b>200,00</b>
        </p>
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

          <label className="switch">
            <input
              type="checkbox"
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

