import React from "react";
import { render } from '@testing-library/react';
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Отрисовка Кружка', () => {
  it('Кружок с текстом', () => {
    const tree = render(<Circle letter="A"/>)
      expect(tree).toMatchSnapshot();
  })
  
  it('Кружок без текста', () => {
    const tree = render(<Circle />);
      expect(tree).toMatchSnapshot();
  })

  it('Кружок с head', () => {
    const tree = render(<Circle head={'A'}/>)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок с react-элементом в head', () => {
    const tree = render(<Circle head={<Circle />}/>)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок с tail', () => {
    const tree = render(<Circle head={'A'}/>)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок с react-элементом в tail', () => {
    const tree = render(<Circle head={<Circle />}/>)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок с индексом', () => {
    const tree = render(<Circle index={1} />)
      expect(tree).toMatchSnapshot();
  })

  it('Маленький кружок', () => {
    const tree = render(<Circle isSmall={true}/>)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок state: default', () => {
    const tree = render(<Circle state={ElementStates.Default} />)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок state: changing', () => {
    const tree = render(<Circle state={ElementStates.Default} />)
      expect(tree).toMatchSnapshot();
  })

  it('Кружок state: modified', () => {
    const tree = render(<Circle state={ElementStates.Default} />)
      expect(tree).toMatchSnapshot();
  })
})