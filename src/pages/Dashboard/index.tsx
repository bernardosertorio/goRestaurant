import { useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalCreateFood } from '../../components/ModalCreateFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const { 
    foods, 
    isAvailable, 
    deleteFood, 
    updateFood, 
    editingFood,
    editModalOpen,
    toggleEditModal,
    handleEditFood, 
  } = useFoods();

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
        <ModalEditFood  
          isOpen={editModalOpen} 
          setIsOpen={toggleEditModal}
          handleUpdateFood={updateFood}
          editingFood={editingFood}
        /> 
        <FoodsContainer data-testid="foods-list">
          {foods.map(food => (
              <Food
                key={food.id}
                isAvailable={isAvailable} 
                food={food} 
                handleDelete={deleteFood} 
                handleUpdateFood={handleEditFood}
              />
            ))}         
        </FoodsContainer>
      </>
    );
  };

