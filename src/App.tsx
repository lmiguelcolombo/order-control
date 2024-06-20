import React, { useState, useEffect, MouseEvent } from 'react';
import Item from './components/Item';
import Modal from './components/Modal';
import axios from 'axios';

interface ItemQuantity {
  [title: string]: number;
}

interface ItemType {
  title: string;
  price: number;
}

interface FormDataInterface {
  itemQuantities: ItemQuantity;
  paymentMethod: string;
  totalPrice: number;
  sender: string;
}

const App: React.FC = () => {
  const items: ItemType[] = [
    { title: 'Pastel', price: 3 },
    { title: 'Enroladinho', price: 2 },
    { title: 'Batata', price: 5 },
    { title: 'Pinhão', price: 4 },
    { title: 'Quentão', price: 5 },
    { title: 'Bolo', price: 2 },
    { title: 'Pé de moleque', price: 1 },
    { title: 'Cachorro quente', price: 3 },
    { title: 'Chocolate quente', price: 7 },
    { title: 'Canjica', price: 2 },
    { title: 'Pipoca', price: 2 },
    { title: 'Pescaria', price: 2 },
    { title: 'Argolas', price: 2 },
    { title: 'Cadeia', price: 2 },
    { title: 'Água', price: 2 },
    { title: 'Refri', price: 3 },
    { title: 'Pizza', price: 5 },
  ];

  // Retrieve the stored sender value from local storage
  const getStoredSender = () => {
    return localStorage.getItem('sender') || 'Caixa 1';
  };

  const [formData, setFormData] = useState<FormDataInterface>({
    itemQuantities: items.reduce(
      (acc, item) => ({ ...acc, [item.title]: 0 }),
      {} as ItemQuantity
    ),
    paymentMethod: 'Dinheiro',
    totalPrice: 0,
    sender: getStoredSender(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save sender to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('sender', formData.sender);
  }, [formData.sender]);

  const handleItemQuantityChange = (title: string, quantity: number) => {
    const updatedQuantities = {
      ...formData.itemQuantities,
      [title]: Math.max(0, quantity),
    };
    const totalPrice = items.reduce(
      (total, item) => total + item.price * updatedQuantities[item.title],
      0
    );
    setFormData({
      ...formData,
      itemQuantities: updatedQuantities,
      totalPrice: totalPrice,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      sender: e.target.value,
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.totalPrice > 0) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    const data: { [key: string]: any } = {
      paymentMethod: formData.paymentMethod,
      totalPrice: formData.totalPrice,
      sender: formData.sender,
    };

    Object.entries(formData.itemQuantities).forEach(([key, value]) => {
      data[key] = value;
    });

    console.log(data);

    const url2 =
      'https://sheet.best/api/sheets/0bba196a-ceff-4a73-a51f-968ca6023b6d';

    await axios
      .post(url2, data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    setFormData({
      itemQuantities: items.reduce(
        (acc, item) => ({ ...acc, [item.title]: 0 }),
        {} as ItemQuantity
      ),
      paymentMethod: 'Dinheiro',
      totalPrice: 0,
      sender: getStoredSender(),
    });
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(false);
  };

  const displayedItems = items.filter(
    (item) => formData.itemQuantities[item.title] > 0
  );

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <div className="flex-1 p-4">
        <form className="flex flex-wrap gap-4">
          <div className="w-full mt-4">
            <select
              name="sender"
              id="sender"
              value={formData.sender}
              onChange={handleSenderChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Caixa 1">Caixa 1</option>
              <option value="Caixa 2">Caixa 2</option>
            </select>
          </div>
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
            Total: R${formData.totalPrice}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
            onClick={handleSubmit}
            disabled={formData.totalPrice === 0}
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
            {displayedItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.title}: {formData.itemQuantities[item.title]}
              </li>
            ))}
          </ul>
          <p className="mt-4">Forma de pagamento: {formData.paymentMethod}</p>
          <p className="mt-2">Enviado por: {formData.sender}</p>
          <p className="mt-2 text-lg font-bold">
            Total: R${formData.totalPrice}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
