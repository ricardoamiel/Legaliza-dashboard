import { useState, ChangeEvent, useEffect, useMemo, useRef } from "react";
import Input from "@/Components/ui/input/index";
import Option, { OptionProps } from "./Option";
import isEmpty from "@/libs/is-empty";
import cx from "@/libs/cx";
import OutsideContainer from "@/hooks/OutsideClick";
import { Iconchevrondown } from "@/assets/icons/Iconchevrondown";

interface Data {
  value: string;
  label: string;
}

interface InnerData {
  value: string;
  label: string | null;
}

interface Props<T> {
  options?: T[];
  label?: string;
  error?: string;
  withFilter?: boolean;
  value?: string | number;
  dataExtractor?: { value: keyof T; label: keyof T };
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: (data: Data) => void;
  className?: string;
}

const Select = <T extends object>({
  label,
  options,
  onBlur,
  onChange,
  withFilter,
  dataExtractor,
  disabled,
  ...props
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [innerData, setInnerData] = useState<InnerData>({
    value: "",
    label: null,
  });

  const keyValue = dataExtractor ? dataExtractor.value : "value";
  const keyLabel = dataExtractor ? dataExtractor.label : "label";

  const innerValue = innerData.label ? innerData.label : innerData.value;

  useEffect(() => {
    if (Array.isArray(options)) {
      const i = options?.findIndex((o: any) => o[keyValue] === props.value);
      setInnerData({
        label: i === -1 ? "" : (options as any)[i][keyLabel],
        value: i === -1 ? "" : (options as any)[i][keyValue],
      });
    }
  }, [options?.length && options, props.value]);

  const filterOptions = useMemo(() => {
    if (withFilter) {
      const _label =
        typeof innerData.value === "string"
          ? innerData.value.toLowerCase()
          : "";
      return options?.filter((option) => {
        return (option as any)[keyLabel].toLowerCase().includes(_label);
      });
    }

    return options;
  }, [innerValue, options, withFilter]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (innerData.label !== null) {
      onChange?.({ label: "", value: "" });
    }
    setInnerData({ label: null, value });
    setIsOpen(!isEmpty(value));
    setIsFiltering(true);
  };

  const handleSelect = (data: OptionProps) => {
    onChange?.(data);
    setInnerData(data);
    setIsOpen(false);
    setIsFiltering(false);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <OutsideContainer setIsOpen={setIsOpen}>
          <>
            <Input
              ref={inputRef}
              label={label}
              value={innerValue || ""} // Proporciona un valor predeterminado si innerValue es null
              error={props.error}
              onBlur={onBlur}
              onChange={handleChange}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              disabled={disabled}
              rightElement={
                <button
                  type="button"
                  className="btn-icon btn-ghost-primary"
                  onClick={() => {
                    inputRef.current?.focus();
                    setIsFiltering(false);
                    setIsOpen((prev) => !prev);
                  }}
                >
                  <Iconchevrondown
                    className={cx(
                      isOpen ? "rotate-180" : "rotate-0",
                      "h-[25px] w-[25px] transition-transform",
                    )}
                  />
                </button>
              }
            />

            <div
              className={cx(
                isOpen ? "max-h-[200px]" : "max-h-0",
                "absolute top-[85%] z-40 w-full overflow-y-auto rounded bg-primary-800 shadow",
              )}
            >
              <div className="flex w-full flex-col">
                {isOpen &&
                  isFiltering &&
                  filterOptions?.map((data) => {
                    const value = (data as any)[keyValue];
                    const label = (data as any)[keyLabel];
                    return (
                      <Option
                        key={value}
                        label={label}
                        value={value}
                        onClick={() => handleSelect({ value, label })}
                      />
                    );
                  })}

                {isOpen &&
                  !isFiltering &&
                  options?.map((data) => {
                    const value = (data as any)[keyValue];
                    const label = (data as any)[keyLabel];
                    return (
                      <Option
                        key={value}
                        label={label}
                        value={value}
                        onClick={() => handleSelect({ value, label })}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        </OutsideContainer>
      </div>
    </div>
  );
};

export default Select;