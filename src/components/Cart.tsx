import React from "react";
import Button from "./Button";
import { CartItem } from "../pages/Desserts/Interface";
import RemoveIcon from "./icons/RemoveIcon";
import { IMAGES_PATH } from "../config";

interface CartProps {
  cart: CartItem[];
  cartTotal: number;
  onRemoveAll: (itemName: string) => void;
  onConfirmOrder: () => void;
}

const treeIcon = `${IMAGES_PATH}/icon-carbon-neutral.svg`;
const emptyCartImg = `${IMAGES_PATH}/illustration-empty-cart.svg`;

const Cart = ({ cart, cartTotal, onRemoveAll, onConfirmOrder }: CartProps) => {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white self-start px-6 py-6 rounded-lg">
      <h2 className="text-3xl text-red font-bold mb-6">
        Your Cart ({cartCount})
      </h2>
      {cart.length === 0 ? (
        <>
          <img
            className="max-w-[128px] mx-auto"
            src={emptyCartImg}
            alt=""
          />
          <p className="text-center text-rose-500 font-semibold mb-4">
            Your added items will appear here
          </p>
        </>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <React.Fragment key={item.name}>
                <li className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-rose-900 font-semibold">
                      {item.name}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-red font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-400">
                        @ ${item.price.toFixed(2)}
                      </span>
                      <span className="text-rose-500 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-[20px] h-[20px] border-2 border-rose-500 flex items-center justify-center rounded-full text-rose-500 hover:border-rose-900 hover:text-rose-900"
                    onClick={() => onRemoveAll(item.name)}
                  >
                    <RemoveIcon />
                  </button>
                </li>
                <hr className="border-rose-100" />
              </React.Fragment>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-4 mb-6">
            <p className="text-rose-900 text-lg">Order Total</p>
            <span className="text-3xl font-bold text-rose-900">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <div className="bg-rose-50 flex justify-center rounded-lg gap-2 p-4 mb-6">
            <img src={treeIcon} />
            <p className="text-rose-900 text-md">
              This is a <span className="font-semibold">carbon-neutral </span>
              delivery
            </p>
          </div>
          <Button title="Confirm Order" onClick={onConfirmOrder} />
        </>
      )}
    </div>
  );
};

export default Cart;
