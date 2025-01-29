import { useEffect, useRef, useState } from "react";
import { CartItem } from "../pages/Desserts/Interface";
import Button from "./Button";

interface OrderModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  cartTotal: number;
}

const OrderModal = ({
  isModalOpen,
  onClose,
  cartItems,
  cartTotal,
}: OrderModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);

    const delay = window.innerWidth <= 640 ? 500 : 0;

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, delay);
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen && !isClosing) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";

      if (window.innerWidth <= 640) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (modalElement) {
          modalElement.scrollTop = 0;
        }
      }

      if (modalElement) {
        modalElement.classList.remove("translate-y-full");
        modalElement.classList.add("translate-y-0");
      }
    } else {
      if (modalElement) {
        modalElement.classList.remove("translate-y-0");
        modalElement.classList.add("translate-y-full");

        setTimeout(() => {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }, 500);
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen, isClosing]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-28 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-t-lg sm:rounded-lg px-6 py-10 sm:p-8 sm:max-w-[600px] w-full h-full sm:h-auto 
          transform transition-transform duration-500 ease-in-out translate-y-full sm:translate-y-0 sm:duration-0 max-h-[calc(100vh-32px)] flex flex-col"
      >
        <div>
          <img
            className="mb-6"
            src="src/assets/images/icon-order-confirmed.svg"
            alt="order confirmed"
          />
        </div>
        <h2 className="text-4xl font-bold text-rose-900 mb-4 pr-10">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-8">We hope you enjoy your food!</p>
        <ul className="bg-rose-50 p-6 flex flex-col gap-4 rounded-lg overflow-y-auto max-h-[400px] scrollbar-custom">
          {cartItems?.map((item) => (
            <>
              <div
                className="flex justify-between items-center"
                key={item.name}
              >
                <li className="flex gap-4">
                  <img
                    className="rounded-lg max-w-[60px]"
                    src={item.image.thumbnail}
                    alt="dessert thumbnail"
                  />
                  <div className="flex flex-col justify-center gap-2 w-24 truncate sm:w-auto">
                    <span className="text-rose-900 font-semibold truncate">
                      {item.name}
                    </span>
                    <div className="flex gap-4">
                      <span className="text-red font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
                <span className="text-rose-900 font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              <hr className="border-rose-100" />
            </>
          ))}
          <div className="flex justify-between items-center py-2">
            <p className="text-rose-900 text-lg">Order Total</p>
            <span className="text-3xl font-bold text-rose-900">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
        </ul>

        <Button
          title="Start New Order"
          onClick={handleClose}
          className="mt-7"
        />
      </div>
    </div>
  );
};

export default OrderModal;
