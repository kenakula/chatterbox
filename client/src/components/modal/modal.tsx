import { PropsWithChildren, ReactElement, useMemo } from 'react';
import { RxCross2 } from 'react-icons/rx';
import CModal, { Styles } from 'react-modal';

import { Button } from '@components/button/button';

import style from './modal.module.scss';

interface IFooterButton {
  onClick?: () => void;
  text?: string;
  type?: 'submit' | 'button' | 'reset';
  formId?: string;
}

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  noFooter?: boolean;
  acceptBtn?: IFooterButton;
  cancelBtn?: IFooterButton;
}

CModal.setAppElement(document.body);

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  noFooter = false,
  acceptBtn,
  cancelBtn,
}: IProps): ReactElement => {
  const customStyles: Styles = useMemo(() => ({
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: 'calc(var(--size-step) * 2)',
      maxHeight: '70vh',
      background: 'var(--bg-primary)',
      border: 'none',
      boxShadow: 'var(--shadow-default)',
    },
    overlay: {
      backgroundColor: 'var(--bg-overlay)',
      zIndex: 'var(--z-modal-overlay)',
    },
  }), []);

  return (
    <CModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <header className={style.modalHeader}>
        {title && <h2 className={style.modalTitle}>{title}</h2>}
        <Button variant="ghost" icon={<RxCross2 />} type="button" onClick={onClose} aria-label="Close modal" />
      </header>
      <div className={style.modalContent}>
        {children}
      </div>
      {!noFooter && (
        <footer className={style.modalFooter}>
          {acceptBtn &&
            <Button onClick={acceptBtn.onClick} text={acceptBtn.text ?? 'OK'} type={acceptBtn.type ?? 'button'} />}
          {cancelBtn &&
            <Button variant="outlined" onClick={cancelBtn.onClick} text={cancelBtn.text ?? 'Cancel'} type="button" />}
        </footer>
      )}
    </CModal>
  );
};
