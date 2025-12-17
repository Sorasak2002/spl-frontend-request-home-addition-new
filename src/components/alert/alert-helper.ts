import type { AlertOptions } from "./alert-context";

interface CreateAlertOptions {
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  buttonClassName?: string;
  timer?: number;
  showConfirmButton?: boolean;
}

// Helper functions for common alert types
export const createAlert = {
  success: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    classNames?: CreateAlertOptions
  ): AlertOptions => ({
    type: "success",
    title,
    message,
    confirmText: "Great!",
    onConfirm,
    ...classNames,
  }),

  error: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    classNames?: CreateAlertOptions
  ): AlertOptions => ({
    type: "error",
    title,
    message,
    confirmText: "OK",
    onConfirm,
    ...classNames,
  }),

  warning: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    classNames?: CreateAlertOptions
  ): AlertOptions => ({
    type: "warning",
    title,
    message,
    confirmText: "OK",
    onConfirm,
    ...classNames,
  }),

  info: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    classNames?: CreateAlertOptions
  ): AlertOptions => ({
    type: "info",
    title,
    message,
    confirmText: "Got it",
    onConfirm,
    ...classNames,
  }),

  confirm: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    classNames?: CreateAlertOptions
  ): AlertOptions => ({
    type: "confirm",
    title,
    message,
    confirmText: "Confirm",
    cancelText: "Cancel",
    showCancelButton: true,
    onConfirm,
    onCancel,
    ...classNames,
  }),
};
