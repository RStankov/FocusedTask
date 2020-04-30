declare class ResizeObserver {
  constructor(callback: () => void);

  observe: (target: Element, options?: ResizeObserverObserveOptions) => void;
}

interface ResizeObserverObserveOptions {
  box?: 'content-box' | 'border-box';
}
