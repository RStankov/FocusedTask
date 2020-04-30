import * as React from 'react';
import autosize from 'autosize';

type IProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default class Textarea extends React.Component<IProps> {
  textareaRef = React.createRef<HTMLTextAreaElement>();

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
    return <textarea ref={this.textareaRef} {...this.props} />;
  }
}
