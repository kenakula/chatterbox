export interface IMenuItem {
  label: string;
  className?: string;
  onClick?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
}
