import React, {
  FC,
  LegacyRef,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import cn from 'classnames';
import { TODO_ANY } from '../../types';
import styles from './styles.module.css';

export type Props = {
  className?: string;
  inputNode: LegacyRef<HTMLInputElement> | undefined;
  type: 'text' | 'number' | 'password';
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
};

export const Field: FC<Props> = ({
  className,
  inputNode,
  placeholder,
  type,
  value,
  autoFocus,
  onChange,
  onFocus,
}) => {
  return (
    <input
      className={cn([styles['field'], className])}
      ref={inputNode}
      placeholder={placeholder}
      type={type}
      value={value}
      autoFocus={autoFocus}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

// custom component for formik field
export const FieldForFormik: FC<{
  field?: TODO_ANY;
  className?: string;
}> = ({ field, className, ...props }) => {
  return (
    <input {...field} {...props} className={cn([styles['field'], className])} />
  );
};
