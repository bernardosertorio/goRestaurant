import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { useFoods } from '../../hooks/useFoods';

interface ICreateFoodContent {
  name: string,
  description: string;
  price: string,
  image: string;
}

interface ModalCreateFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalCreateFood({ isOpen, onRequestClose }: ModalCreateFoodProps) {
  const formRef = useRef<FormHandles>(null)
  const { createFood } = useFoods();

  async function handleCreateNewFoodSubmit(data: ICreateFoodContent) {
    createFood(data);
    onRequestClose();
  }

    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <Form ref={formRef} onSubmit={handleCreateNewFoodSubmit}>
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

