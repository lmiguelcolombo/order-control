import { useState, FormEvent } from 'react';
import './App.css';
import Item from './components/Item';

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
    console.log(itemQuantities); // Get the quantity of each item here
    console.log(paymentMethod); // Get the selected payment method here
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              title={item.title}
              onChange={handleItemQuantityChange}
            />
          );
        })}
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
    </>
  );
};

export default App;
