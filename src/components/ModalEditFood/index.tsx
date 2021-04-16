import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { useFoods } from '../../hooks/useFoods';

interface IUpdateFoodContent {
  id: number;
  name: string,
  description: string;
  available: boolean;
  price: string,
  image: string;
}

interface IModalUpdateFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalEditFood({ isOpen, onRequestClose }: IModalUpdateFoodProps) {
  const formRef = useRef<FormHandles>(null);
  const { updateFood, editingFood } = useFoods();

  async function handleUpdateFoodSubmit(food: IUpdateFoodContent) {
    updateFood(food);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form ref={formRef} onSubmit={handleUpdateFoodSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
    );
  };

