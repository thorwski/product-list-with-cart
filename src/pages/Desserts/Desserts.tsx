import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import OrderModal from "../../components/OrderModal";
import { CartItem, DessertItem } from "./Interface";
import Cart from "../../components/Cart";
import { scrollToTop } from "../../utils/Functions";

const Desserts = () => {
  const [data, setData] = useState<DessertItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetch = useCallback(async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
      console.log(isLoading, error);
    }
  }, []);

  useEffect(() => {
    handleFetch();

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCurrentScreen("mobile");
      } else if (width <= 768) {
        setCurrentScreen("tablet");
      } else {
        setCurrentScreen("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleFetch]);

  const handleAddItem = (itemName: string) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 0) + 1,
    }));

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === itemName
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      const item = data.find((item) => item.name === itemName);

      if (!item) {
        console.error(`Item with name "${itemName}" not found in data.`);
        return prevCart;
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (itemName: string) => {
    setItemQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[itemName] > 1) {
        newQuantities[itemName] -= 1;
      } else {
        delete newQuantities[itemName];
      }
      return newQuantities;
    });

    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const handleRemoveAllFromCart = (itemName: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.name !== itemName)
    );
    setItemQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemName];
      return newQuantities;
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    scrollToTop();
    setIsModalOpen(false);

    cart.map((item) => handleRemoveAllFromCart(item.name));
  };

  return (
    <>
      <div className="grid xl:grid-cols-[1fr_450px] 2xl:grid-cols-[1fr_600px] gap-8 px-4 py-6 xl:p-20">
        <div>
          <h1 className="text-5xl text-rose-900 font-bold mb-10">Desserts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 place-items-center gap-6">
            {data.map((item) => (
              <div key={item.name}>
                <Card
                  image={item.image[currentScreen]}
                  category={item.category}
                  name={item.name}
                  price={item.price}
                  onAddToCart={() => handleAddItem(item.name)}
                  onRemoveFromCart={() => handleRemoveItem(item.name)}
                  quantity={itemQuantities[item.name] || 0}
                />
              </div>
            ))}
          </div>
        </div>
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          onRemoveAll={handleRemoveAllFromCart}
          onConfirmOrder={handleConfirmOrder}
        />
      </div>
      <OrderModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        cartItems={cart}
        cartTotal={cartTotal}
      />
    </>
  );
};

export default Desserts;
