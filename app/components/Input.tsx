// components/InputField.tsx
import { useState } from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  inputName: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  inputName,
  type = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label className="mb-1.5 block text-[15px]">{label}</label>
      {/* <input
        type="text"
        className={`border py-2.5 px-3 rounded w-full placeholder:text-sm transition-all duration-300 focus:outline-none focus:border-blue-500 ${
          isFocused ? 'shadow-lg' : ''
        }`}
        placeholder={isFocused ? '' : placeholder}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
      /> */}
      <input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name={inputName}
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg transition-all duration-300 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;
