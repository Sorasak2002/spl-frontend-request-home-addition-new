"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import CustomAlert from "./custom-alert";

// Alert types
export type AlertType = "success" | "error" | "warning" | "info" | "confirm";

// Alert options interface
export interface AlertOptions {
  type?: AlertType;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  buttonClassName?: string;
  timer?: number;
  showConfirmButton?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setAlertOptions(null), 300); // Wait for animation
  }, []);

  const handleConfirm = useCallback(async () => {
    if (alertOptions?.onConfirm) {
      await alertOptions.onConfirm();
    }
    handleClose();
  }, [alertOptions, handleClose]);

  const handleCancel = useCallback(() => {
    if (alertOptions?.onCancel) {
      alertOptions.onCancel();
    }
    handleClose();
  }, [alertOptions, handleClose]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertOptions && (
        <CustomAlert
          open={isOpen}
          type={alertOptions.type || "info"}
          title={alertOptions.title}
          message={alertOptions.message}
          confirmText={alertOptions.confirmText}
          cancelText={alertOptions.cancelText}
          showCancelButton={alertOptions.showCancelButton}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          className={alertOptions.className}
          iconClassName={alertOptions.iconClassName}
          titleClassName={alertOptions.titleClassName}
          messageClassName={alertOptions.messageClassName}
          buttonClassName={alertOptions.buttonClassName}
          timer={alertOptions.timer}
          showConfirmButton={alertOptions.showConfirmButton}
        />
      )}
    </AlertContext.Provider>
  );
};

// Custom hook to use alert
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};
