import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { FoodsContainer } from './styles';
import { useState } from 'react';

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
        <Food />
      </FoodsContainer>
    );
  };

