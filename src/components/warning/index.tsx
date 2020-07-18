import React, { FC, useState, useCallback, Fragment } from 'react';
import classnames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

// TODO add normal type
type Props = {
  warning: string | null;
  note: string | null;
};

export const Warning: FC<Props> = ({ warning, note }) => {
  const [isNoteVisible, toggleNoteVisibility] = useState(false);

  const handleToggleNoteVisibility = useCallback(() => {
    toggleNoteVisibility(!isNoteVisible);
  }, [isNoteVisible]);

  if (!warning) {
    return null;
  }

  return (
    <p className={cx('nes-text', 'is-error')}>
      {warning}
      {note && (
        <Fragment>
          <button
            className={cx('info-button', 'nes-btn', 'is-error')}
            onMouseEnter={handleToggleNoteVisibility}
            onMouseLeave={handleToggleNoteVisibility}
          >
            i
          </button>
          <dialog
            className={cx('nes-dialog', 'dialog')}
            id="dialog-default"
            open={isNoteVisible}
          >
            <p className={cx('note')}>{note}</p>
          </dialog>
        </Fragment>
      )}
    </p>
  );
};
