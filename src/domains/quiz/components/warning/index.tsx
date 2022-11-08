import React, { FC, useState, useCallback, Fragment } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

// TODO add normal type
type PropsT = {
  warning: string | null;
  note: string | null;
};

export const Warning: FC<PropsT> = ({ warning, note }) => {
  const [isNoteVisible, toggleNoteVisibility] = useState(false);

  const handleToggleNoteVisibility = useCallback(() => {
    toggleNoteVisibility(!isNoteVisible);
  }, [isNoteVisible]);

  if (!warning) {
    return null;
  }

  return (
    <div className={cn('nes-text', 'is-error')}>
      {warning}
      {note && (
        <Fragment>
          <button
            className={cn(styles['info-button'], 'nes-btn', 'is-error')}
            onMouseEnter={handleToggleNoteVisibility}
            onMouseLeave={handleToggleNoteVisibility}
          >
            i
          </button>
          <dialog
            className={cn('nes-dialog', styles.dialog)}
            id='dialog-default'
            open={isNoteVisible}
          >
            <p className={cn(styles.note)}>{note}</p>
          </dialog>
        </Fragment>
      )}
    </div>
  );
};
