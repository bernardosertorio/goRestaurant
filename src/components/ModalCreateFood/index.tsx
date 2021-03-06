import { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ICreateFoodData {
  id: string;
  name: string,
  description: string;
  price: string,
  image: string;
}

interface IModalCreateFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  createFood: (food: Omit<ICreateFoodData, 'id'>) => void;
}

export function ModalCreateFood({ isOpen, setIsOpen, createFood }: IModalCreateFoodProps) {
  const formRef = useRef<FormHandles>(null)

  const handleCreateNewFoodSubmit = useCallback( 
    async (data: ICreateFoodData) => {
    createFood(data);
    setIsOpen();
  }, [createFood, setIsOpen]);

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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

