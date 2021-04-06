import { useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalCreateFood } from '../../components/ModalCreateFood';
import { FoodsContainer } from './styles';

export function Dashboard() {
  const [isNewCreateFoodModalOpen, setIsNewCreateFoodModalOpen] = useState(false);

  function handleOpenNewCreateFoodModal() {
    setIsNewCreateFoodModalOpen(true)
  }

  function handleCloseNewCreateFoodModal() {
    setIsNewCreateFoodModalOpen(false)
  }

    return (
      <FoodsContainer>
        <Header onOpenNewCreateFoodModal={handleOpenNewCreateFoodModal}/>
        <ModalCreateFood/>
        <Food />
      </FoodsContainer>
    );
  };

