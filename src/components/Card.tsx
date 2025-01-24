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
    <div className="">
      <div className="relative">
        <img src={image} alt={name} className="rounded-lg" />
        {quantity === 0 ? (
          <button
            onClick={onAddToCart}
            className="bg-white font-semibold absolute -bottom-5 left-1/2 transform -translate-x-1/2 min-w-[175px] flex items-center justify-center gap-2 px-6 py-3 border border-rose-950 rounded-full text-rose-900 hover:text-red hover:border-red"
          >
            <img src="src/assets/images/icon-add-to-cart.svg" alt="" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <button className="bg-red text-white font-semibold absolute -bottom-5 left-1/2 transform -translate-x-1/2 min-w-[175px] flex items-center justify-between gap-2 px-4 py-3 border border-red rounded-full max-h-[50px]">
            <span
              onClick={onRemoveFromCart}
              className="w-[20px] h-[20px] flex items-center justify-center border rounded-full"
            >
              <img src="src/assets/images/icon-decrement-quantity.svg" alt="" />
            </span>
            <span className="text-lg">{quantity}</span>
            <span
              onClick={onAddToCart}
              className="w-[20px] h-[20px] flex items-center justify-center border rounded-full"
            >
              <img src="src/assets/images/icon-increment-quantity.svg" alt="" />
            </span>
          </button>
        )}
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
