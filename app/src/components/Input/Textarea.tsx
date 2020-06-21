import * as React from 'react';
import autosize from 'autosize';
import { Omit } from 'utility-types';
import classNames from 'classnames';
import styles from './styles.module.css';

interface IKeyDownEvent {
  target: HTMLInputElement | HTMLTextAreaElement;
  metaKey: boolean;
  keyCode: number;
  shiftKey: boolean;
  preventDefault: () => void;
}

interface IProps  // NOTE(rstankov): have to overwrite IKeyDownEvent because target wasn't recognised
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onKeyDown'> {
  onKeyDown?: (e: IKeyDownEvent) => void;
  multiline?: boolean;
}
export default class InputTextarea extends React.Component<IProps> {
  textareaRef = React.createRef<HTMLTextAreaElement>();

  static defaultProps = {
    multiline: true,
  };

  componentDidMount() {
    const textarea = this.textareaRef.current;

    if (!textarea) {
      return;
    }

    autosize(textarea);
  }

  componentWillUnmount() {
    const textarea = this.textareaRef.current;

    if (!textarea) {
      return;
    }

    autosize.destroy(textarea);
  }

  render() {
    const { onKeyDown, multiline, className, value, ...props } = this.props;

    return (
      <textarea
        className={classNames(styles.common, styles.textarea, className)}
        onKeyDown={onKeyDown as any}
        ref={this.textareaRef}
        rows={multiline ? undefined : 1}
        value={value}
        {...props}
      />
    );
  }
}
