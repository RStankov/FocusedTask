import * as React from 'react';

export default function Emoji({ emoji, ...props }) {
  return (
    <span role="img" {...props}>
      {emoji}
    </span>
  );
}
