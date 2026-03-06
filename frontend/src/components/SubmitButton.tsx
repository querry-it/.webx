import Loader from './loader/loader';
import { useEffect } from 'react';

interface SubmitButtonProps {
  text?: string;
  disabled: boolean;
  btnRef?: React.Ref<HTMLButtonElement>;
}

function SubmitButton({ text, btnRef, disabled }: SubmitButtonProps) {
  return (
    <div className="w-full flex items-center justify-center h-[45px] bg-blue-600 mt-10 rounded-[5px] font-semibold">
      <button
        type="submit"
        ref={btnRef}
        disabled={disabled}
        className="text-white text-[15px]"
      >
        {text !== undefined ? text : <Loader />}
      </button>
    </div>
  );
}

export default SubmitButton;
