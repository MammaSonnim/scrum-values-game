import React from 'react';
import { icons } from '../../data';
import { FunctionWithMouseEvent } from '../../types';
import styles from './styles.module.css';

type Props = {
  onClick: FunctionWithMouseEvent;
};

export const Dropdown = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div className={styles.container} onClick={props.onClick} ref={ref}>
        {icons.map((icon) => (
          <span key={icon} className={styles.item}>
            {icon}
          </span>
        ))}
      </div>
    );
  }
);
