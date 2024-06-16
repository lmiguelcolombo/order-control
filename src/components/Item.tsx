import { useState, MouseEvent } from 'react';

interface ItemProps {
  title: string;
  description?: string;
  onChange: (title: string, quantity: number) => void;
}

const Item: React.FC<ItemProps> = ({ title, description, onChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onChange(title, newQuantity);
  };

  return (
    <div className="item">
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            handleQuantityChange(quantity - 1);
          }}
        >
          -
        </button>
        {quantity}
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            handleQuantityChange(quantity + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
