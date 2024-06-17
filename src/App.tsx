import React, { useState, FormEvent } from 'react';
import Item from './components/Item';
import Modal from './components/Modal';

interface ItemQuantity {
  [title: string]: number;
}

interface ItemType {
  title: string;
  price: number;
}

const App: React.FC = () => {
  const items: ItemType[] = [
    { title: 'Pastel', price: 5 },
    { title: 'Enroladinho', price: 3 },
    { title: 'Batata', price: 4 },
    { title: 'Pinhão', price: 6 },
    { title: 'Quentão', price: 2 },
    { title: 'Bolo', price: 7 },
    { title: 'Pé de moleque', price: 4 },
    { title: 'Cachorro-quente', price: 5 },
    { title: 'Chocolate-quente', price: 3 },
    { title: 'Canjica', price: 6 },
    { title: 'Pipoca', price: 2 },
    { title: 'Pescaria', price: 10 },
    { title: 'Argolas', price: 8 },
    { title: 'Cadeia', price: 5 },
    { title: 'Água', price: 1 },
    { title: 'Refri', price: 2 },
    { title: 'Pizza', price: 10 },
  ];

  const [formData, setFormData] = useState({
    itemQuantities: items.reduce(
      (acc, item) => ({ ...acc, [item.title]: 0 }),
      {} as ItemQuantity
    ),
    paymentMethod: 'Dinheiro',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.price * formData.itemQuantities[item.title],
      0
    );
  };

  const handleItemQuantityChange = (title: string, quantity: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemQuantities: {
        ...prevFormData.itemQuantities,
        [title]: Math.max(0, quantity),
      },
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentMethod: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(formData.itemQuantities);
    console.log(formData.paymentMethod);
    console.log('Total Price:', calculateTotalPrice());
    setFormData({
      itemQuantities: items.reduce(
        (acc, item) => ({ ...acc, [item.title]: 0 }),
        {} as ItemQuantity
      ),
      paymentMethod: 'Dinheiro',
    });
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          {items.map((item, index) => (
            <Item
              key={index}
              title={item.title}
              price={item.price}
              quantity={formData.itemQuantities[item.title]}
              onChange={handleItemQuantityChange}
            />
          ))}
          <div className="w-full mt-4">
            <select
              name="payment"
              id="payment"
              value={formData.paymentMethod}
              onChange={handlePaymentChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="PIX">PIX</option>
            </select>
          </div>
        </form>
      </div>
      <div className="sticky bottom-0 p-4 bg-blue-200">
        <div className="max-w-screen-md mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">
            Total: R${calculateTotalPrice()}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
            onClick={() => handleSubmit}
          >
            Revisar e Salvar
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleEdit}
        onConfirm={handleConfirm}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Resumo do pedido</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.title}: {formData.itemQuantities[item.title]}
              </li>
            ))}
          </ul>
          <p className="mt-4">Forma de pagamento: {formData.paymentMethod}</p>
          <p className="mt-2 text-lg font-bold">
            Total: R${calculateTotalPrice()}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
