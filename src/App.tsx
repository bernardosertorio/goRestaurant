import GlobalStyle from './styles/global';
import Modal from 'react-modal';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { useState } from 'react';

Modal.setAppElement('#root');

export function App() {
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
      <Dashboard />
      <Modal
        isOpen={isNewCreateFoodModalOpen}
        onRequestClose={handleCloseNewCreateFoodModal}
      >
        <h2>Criar novo prato</h2>
      </Modal>
      
      <GlobalStyle />
    </>
  );
}

