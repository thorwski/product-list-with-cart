import ActionButton from "./ActionButton";

interface CardProps {
  image: string;
  category: string;
  name: string;
  price: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  quantity: number;
}

const Card = ({
  image,
  category,
  name,
  price,
  onAddToCart,
  onRemoveFromCart,
  quantity,
}: CardProps) => {
  return (
    <div>
      <div className="relative">
        <img
          src={image}
          alt={name}
          className={`rounded-lg ${
            quantity > 0
              ? "outline outline-2 outline-red outline-offset-[-2px]"
              : ""
          }`}
        />
        <ActionButton
          quantity={quantity}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      </div>
      <div className="mt-8 flex flex-col">
        <p className="text-gray-500 ">{category}</p>
        <p className="text-rose-900 font-semibold">{name}</p>
        <p className="text-red font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
