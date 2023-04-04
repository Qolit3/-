import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from "./button";

describe('Отрисовка кнопки', () => {
  it('Кнопка с текстом', () => {
    const tree = render(<Button text="Test" />)
      expect(tree).toMatchSnapshot();
  })
  
  it('Кнопка без текста', () => {
    const tree = render(<Button />);
      expect(tree).toMatchSnapshot();
  })

  it('Заблокированная кнопка', () => {
    const tree = render(<Button disabled={true} />)
      expect(tree).toMatchSnapshot();
  })

  it('Кнопка с загрузкой', () => {
    const tree = render(<Button isLoader={true} />)
      expect(tree).toMatchSnapshot();
  })

  it('Корректный колбек кнопки', () => {
    window.alert = jest.fn();
  
    render(<Button text="Test" onClick={() => alert('Click test')} />)
  
    const button = screen.getByText('Test');
  
    fireEvent.click(button);
  
    expect(window.alert).toHaveBeenCalledWith('Click test');
  })
})