import React, { MouseEvent } from 'react';

interface ItemProps {
  title: string;
  price: number;
  quantity: number;
  onChange: (title: string, quantity: number) => void;
}

const Item: React.FC<ItemProps> = ({ title, price, quantity, onChange }) => {
  const handleQuantityChange = (newQuantity: number) => {
    onChange(title, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-gray-600">Preço: R${price.toFixed(2)}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            handleQuantityChange(quantity - 1);
          }}
          disabled={quantity <= 0}
          className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-sm mr-2"
        >
          -
        </button>
        <p className="px-3 py-1 bg-gray-100 rounded-md shadow-sm">{quantity}</p>
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            handleQuantityChange(quantity + 1);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-sm ml-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
