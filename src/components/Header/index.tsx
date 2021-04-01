import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';
import logoImg from '../../assets/logo.svg';

export function Header() {
    return (
      <Container>
        <header>
          <img src={logoImg} alt="GoRestaurant" />
          <nav>
            <div>
              <button
                type="button"
              >
                <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
        </header>
      </Container>
    )
  };
