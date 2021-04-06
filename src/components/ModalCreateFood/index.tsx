import { createRef as formRef, FormEvent, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { useFoods } from '../../hooks/useFoods';

interface FoodContent {
  name: string,
  description: string;
  price: string,
  available: boolean;
  image: string;
}

export function ModalCreateFood() {
  const { createFood } = useFoods();

  const handleCreateNewFood = useCallback(async(event: FormEvent, data: FoodContent) => {
    event.preventDefault();

    createFood(data)
  }, [])

    return (
      <Modal>
        <Form ref={formRef} onSubmit={handleCreateNewFood}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  };

