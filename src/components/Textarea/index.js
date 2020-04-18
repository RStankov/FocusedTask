import React from 'react';
import autosize from 'autosize';

export default class Textarea extends React.Component {
  textareaRef = React.createRef();

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
