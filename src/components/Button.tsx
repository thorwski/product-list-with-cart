interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ title, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red w-full py-4 font-semibold text-white rounded-full hover:brightness-90 ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
