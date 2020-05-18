import React from 'react';
import styles from './styles.module.css';
import Textarea from './Textarea';
import keyCodes from 'utils/keyCodes';
import classNames from 'classnames';

interface IProps {
  id?: string;
  value: string;
  onChange: (tvalue: string) => void;
  onPaste?: (value: string) => void;
  onKeyDown?: (e: any) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function Input({
  onChange,
  autoFocus = true,
  ...props
}: IProps) {
  const [isEditing, setIsEditing] = React.useState(autoFocus && !props.value);

  if (!isEditing) {
    return (
      <div
        className={classNames(styles.text, props.className)}
        onClick={() => setIsEditing(true)}
        id={props.id}>
        {props.value}
      </div>
    );
  }

  return (
    <InputInEditMode
      {...props}
      onChange={value => {
        setIsEditing(false);
        onChange && onChange(value);
      }}
    />
  );
}

function InputInEditMode({
  value: initalValue,
  className,
  onPaste,
  onChange,
  onKeyDown,
  multiline,
  placeholder,
}: IProps) {
  const [value, setValue] = React.useState(initalValue);

  return (
    <Textarea
      className={className}
      autoFocus={true}
      multiline={false}
      value={value}
      placeholder={placeholder}
      onChange={e => {
        setValue(e.target.value);
      }}
      onFocus={e => {
        e.target.setSelectionRange(
          e.target.value.length,
          e.target.value.length,
        );
      }}
      onBlur={() => {
        onChange(value);
      }}
      onPaste={e => {
        if (multiline || !onPaste) {
          return;
        }

        const clipboard = e.clipboardData.getData('Text');

        if (clipboard.indexOf('\n') === -1) {
          return;
        }

        e.preventDefault();

        onPaste(clipboard);
      }}
      onKeyDown={e => {
        if (!multiline && e.keyCode === keyCodes.enter) {
          e.preventDefault();

          onChange(value);
        }

        if (onKeyDown) {
          onKeyDown(e);
        }
      }}
    />
  );
}
