import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalCreateFood } from '../../components/ModalCreateFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const { 
    foods,  
    deleteFood,
    createFood, 
    updateFood, 
    editingFood,
    editModalOpen,
    modalOpen,
    toggleModal,
    toggleEditModal,
    handleEditFood, 
  } = useFoods();

    return (
      <>
        <Header openModal={toggleModal}/>
        <ModalCreateFood 
          isOpen={modalOpen} 
          setIsOpen={toggleModal}
          createFood={createFood}
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
                food={food} 
                handleDelete={deleteFood} 
                handleUpdateFood={handleEditFood}
              />
            ))}         
        </FoodsContainer>
      </>
    );
  };

