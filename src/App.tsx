import React, { useState, FormEvent } from 'react';
import './App.css';
import Item from './components/Item';
import Modal from './components/Modal';

interface ItemQuantity {
  [title: string]: number;
}

const App: React.FC = () => {
  const items = [
    { title: 'Pastel' },
    { title: 'Enroladinho' },
    { title: 'Batata' },
    { title: 'Pinhão' },
    { title: 'Quentão' },
    { title: 'Bolo' },
    { title: 'Pé de moleque' },
    { title: 'Cachorro-quente' },
    { title: 'Chocolate-quente' },
    { title: 'Canjica' },
    { title: 'Pipoca' },
    { title: 'Pescaria' },
    { title: 'Argolas' },
    { title: 'Cadeia' },
    { title: 'Água' },
    { title: 'Refri' },
    { title: 'Pizza' },
  ];

  const [itemQuantities, setItemQuantities] = useState<ItemQuantity>(
    items.reduce((acc, item) => ({ ...acc, [item.title]: 0 }), {})
  );
  const [paymentMethod, setPaymentMethod] = useState<string>('Dinheiro');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleItemQuantityChange = (title: string, quantity: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [title]: quantity === 0 ? 0 : quantity, // Update state with 0 quantity
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value); // Update paymentMethod state
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(itemQuantities); // Get the quantity of each item here
    console.log(paymentMethod);
    setItemQuantities(
      items.reduce((acc, item) => ({ ...acc, [item.title]: 0 }), {})
    );
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <Item
            key={index}
            title={item.title}
            onChange={handleItemQuantityChange}
          />
        ))}
        <select
          name="payment"
          id="payment"
          value={paymentMethod}
          onChange={handlePaymentChange}
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="PIX">PIX</option>
        </select>
        <button type="submit">Revisar e Salvar</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleEdit}
        onConfirm={handleConfirm}
      >
        <h2>Resumo do pedido</h2>
        <ul>
          {Object.entries(itemQuantities).map(([title, quantity]) => (
            <li key={title}>
              {title}: {quantity}
            </li>
          ))}
        </ul>
        <p>Forma de pagamento: {paymentMethod}</p>
      </Modal>
    </>
  );
};

export default App;
