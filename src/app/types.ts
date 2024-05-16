export type ProductChangeHandler = (product: string, model: string) => void;
export type CloseHandler = () => void;
export type ModalProps = {
  onProductChange: (product: string, model: string) => void;
  onClose: () => void;
};