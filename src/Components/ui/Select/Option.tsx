export interface OptionProps {
  label: string;
  value: string;
  onClick?: () => void;
}

const Option = ({ label, onClick }: OptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full cursor-pointer rounded-t border-gray-100 text-left transition-colors delay-75 ease-in hover:bg-primary-900"
    >
      <div className="relative flex w-full items-center border-l-4 border-transparent p-[15px] font-semibold bg-blue-950">
        <div className="flex w-full items-center">
          <div className="mx-2 -mt-1">{label}</div>
        </div>
      </div>
    </button>
  );
};

export default Option;
