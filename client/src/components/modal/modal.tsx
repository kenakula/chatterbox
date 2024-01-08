import { MouseEvent, PropsWithChildren, ReactElement, useMemo } from 'react';
import { RxCross2 } from 'react-icons/rx';
import CModal, { Styles } from 'react-modal';

import { Button } from '@components/button/button';

import { IFooterActions } from './interface';
import style from './modal.module.scss';

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions?: IFooterActions;
  renderFooter?: () => ReactElement;
  formId?: string;
}

CModal.setAppElement(document.body);

export const Modal = ({
  isOpen,
  onClose,
  children,
  actions,
  renderFooter,
  title,
  formId,
}: IProps): ReactElement => {
  const customStyles: Styles = useMemo(() => ({
    overlay: {
      zIndex: 'var(--z-modal-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'calc(var(--size-step) * 2)',
      backgroundColor: 'var(--bg-overlay)',
    },
  }), []);

  const handleAccept = (e: MouseEvent<HTMLButtonElement>): void => {
    if (formId) return;

    e.preventDefault();

    if (actions && actions.accept) {
      actions.accept();

      return;
    }

    onClose();
  };

  const handleCancel = (): void => {
    if (actions && actions.cancel) {
      actions.cancel();

      return;
    }

    onClose();
  };

  return (
    <CModal isOpen={isOpen} onRequestClose={onClose} style={customStyles} className={style.modal}>
      <header className={style.modalHeader}>
        {title && <h2 className={style.modalTitle}>{title}</h2>}
        <Button variant="ghost" icon={<RxCross2 />} type="button" onClick={onClose} aria-label="Close modal" />
      </header>
      <div className={style.modalContent}>
        {children}
      </div>
      {renderFooter ? renderFooter() : (
        <footer className={style.modalFooter}>
          <Button text="OK" onClick={handleAccept} formId={formId} type={formId ? 'submit' : 'button'} />
          <Button text="Cancel" onClick={handleCancel} variant="outlined" />
        </footer>
      )}
    </CModal>
  );
};
