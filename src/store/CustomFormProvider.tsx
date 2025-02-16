import { createContext, useContext, ReactNode } from "react";

type CustomFormProviderProps = { formName: string };

const CustomFormContext = createContext<CustomFormProviderProps | null>(null);

export const CustomFormProvider = ({
  children,
  formName,
}: {
  children: ReactNode;
  formName: string;
}) => {
  return (
    <CustomFormContext.Provider value={{ formName }}>
      {children}
    </CustomFormContext.Provider>
  );
};

export const useCustomFormContext = () => {
  const context = useContext(CustomFormContext);
  if (!context)
    throw new Error(
      "useCustomFormProvider must be used within CustomFormProvider"
    );
  return context;
};
