import { RefObject, useCallback, useEffect, useState } from 'react';
import { TextAreaRef } from 'antd/es/input/TextArea';

import { removeCounterElement, setLinesCounterElement } from '@shared/utils';

interface IProps {
  inputRef: RefObject<TextAreaRef>;
  value: string;
  maxLines: number;
}

interface IValue {
  lines: number;
}

export const useCountLines = ({ inputRef, value, maxLines }: IProps): IValue => {
  const [lines, setLines] = useState(1);

  const countLines = useCallback(() => {
    const element = inputRef.current?.resizableTextArea?.textArea;
    setLinesCounterElement(element);
  }, [inputRef]);

  useEffect(() => {
    if (!value) {
      setLines(1);

      return;
    }

    const el = document.querySelector('.temp-item');

    if (!el) {
      return;
    }

    el.textContent = value;
    const height = el.clientHeight;
    const lineHeight = getComputedStyle(el).lineHeight.replace('px', '');

    const lines = Math.max(height / Number(lineHeight));
    const result = lines > maxLines ? maxLines : lines;
    setLines(result);
  }, [value, maxLines]);

  useEffect(() => {
    countLines();

    return () => {
      removeCounterElement();
    };
  }, [countLines]);

  return {
    lines
  };
};
