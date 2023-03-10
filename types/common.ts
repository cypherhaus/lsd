export interface ModalProps {
  title: string;
  message: string;
  onCancel: () => void;
  onSubmit: () => void;
  cancelText: string;
  submitText: string;
  buttonReverse: boolean;
}

export interface Day {
  label: string;
  fullLabel: string;
  number: number;
  shifts?: string[][];
}
