import DecrementIcon from "../icons/DecrementIcon";
import IncrementIcon from "../icons/IncrementIcon";
import { IMAGES_PATH } from "../../config";

interface ActionButtonProps {
  quantity: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

const addToCartIcon = `${IMAGES_PATH}/icon-add-to-cart.svg`;

const ActionButton = ({
  quantity,
  onAddToCart,
  onRemoveFromCart,
}: ActionButtonProps) => {
  return (
    <>
      {quantity === 0 ? (
        <button
          onClick={onAddToCart}
          className="bg-white font-semibold absolute -bottom-5 left-1/2 transform -translate-x-1/2 min-w-[175px] flex items-center justify-center gap-2 px-6 py-3 border border-rose-950 rounded-full text-rose-900 hover:text-red hover:border-red"
        >
          <img src={addToCartIcon} alt="add to cart" />
          <span>Add to Cart</span>
        </button>
      ) : (
        <button className="bg-red text-white font-semibold absolute -bottom-5 left-1/2 transform -translate-x-1/2 min-w-[175px] flex items-center justify-between gap-2 px-4 py-3 border border-red rounded-full max-h-[50px]">
          <span
            onClick={onRemoveFromCart}
            className="w-[20px] h-[20px] flex items-center justify-center border rounded-full text-white hover:bg-white hover:text-red"
          >
            <DecrementIcon />
          </span>
          <span className="text-lg">{quantity}</span>
          <span
            onClick={onAddToCart}
            className="w-[20px] h-[20px] flex items-center justify-center border rounded-full text-white hover:bg-white hover:text-red"
          >
            <IncrementIcon />
          </span>
        </button>
      )}
    </>
  );
};

export default ActionButton;
