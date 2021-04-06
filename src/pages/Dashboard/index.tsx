import { useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalCreateFood } from '../../components/ModalCreateFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const { foods, deleteFood, updateFood } = useFoods();

  const [isNewCreateFoodModalOpen, setIsNewCreateFoodModalOpen] = useState(false);

  function handleOpenNewCreateFoodModal() {
    setIsNewCreateFoodModalOpen(true)
  }

  function handleCloseNewCreateFoodModal() {
    setIsNewCreateFoodModalOpen(false)
  }

    return (
      <>
        <Header onOpenNewCreateFoodModal={handleOpenNewCreateFoodModal}/>
        <ModalCreateFood 
          isOpen={isNewCreateFoodModalOpen} 
          onRequestClose={handleCloseNewCreateFoodModal}
        />
        <FoodsContainer data-testid="foods-list">
          {foods.map(food => (
              <Food 
                food={food} 
                handleDelete={deleteFood} 
                handleUpdateFood={updateFood}
              />
            ))}          
        </FoodsContainer>
      </>
    );
  };

