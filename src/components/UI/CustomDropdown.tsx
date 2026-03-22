import { type ReactNode, useState, useRef, useEffect } from "react";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  icon?: ReactNode;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  fullWidth = false,
  label,
  icon,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  const dropdownItemClass =
    "px-4 py-2 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeItemClass = "bg-gray-100 dark:bg-gray-700 font-medium";

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? "w-full" : "w-auto"}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
          transition-colors duration-200 flex items-center justify-between gap-2
          text-gray-900 dark:text-white bg-white dark:bg-gray-800
          hover:border-gray-400 dark:hover:border-gray-500
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "border-gray-400 dark:border-gray-500" : ""}
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span
            className={`truncate ${
              selectedOption
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {displayValue}
          </span>
        </div>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gray-600 dark:text-gray-400 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md z-50 overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0
                    ${dropdownItemClass}
                    ${value === option.value ? activeItemClass : ""}
                  `}
                >
                  {value === option.value && (
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{option.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
