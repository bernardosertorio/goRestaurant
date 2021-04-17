import { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface IUpdateFoodContent {
  id: number;
  name: string,
  description: string;
  available: boolean;
  price: string,
  image: string;
}

interface IEditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalUpdateFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: IUpdateFoodContent) => void;
  editingFood: IUpdateFoodContent;
}

export function ModalEditFood({ 
  isOpen, 
  editingFood, 
  handleUpdateFood, 
  setIsOpen 
}: IModalUpdateFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IUpdateFoodContent) => {
      setIsOpen();
      handleUpdateFood(data);
    },
    [handleUpdateFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
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

