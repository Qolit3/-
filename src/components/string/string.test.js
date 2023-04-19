import { ElementStates } from "../../types/element-states";
import { reverse } from "./string"

describe('Проверка алгоритма разворота строки' ,() => {
  it('Нечётное количество', () => {
    expect(reverse([
      {state: ElementStates.Changing, element: '1'},
      {state: ElementStates.Default, element: '2'},
      {state: ElementStates.Changing, element: '3'}
    ])).toEqual([
      [
        {state: ElementStates.Modified, element: '3'},
        {state: ElementStates.Changing, element: '2'},
        {state: ElementStates.Modified, element: '1'}
      ],
      [
        {state: ElementStates.Modified, element: '3'},
        {state: ElementStates.Modified, element: '2'},
        {state: ElementStates.Modified, element: '1'}
      ]
    ]);
  })

  it('Чётное количество', () => {
    expect(reverse([
      {state: ElementStates.Changing, element: '1'},
      {state: ElementStates.Default, element: '2'},
      {state: ElementStates.Default, element: '3'},
      {state: ElementStates.Changing, element: '4'}
    ])).toEqual([
      [
        {state: ElementStates.Modified, element: '4'},
        {state: ElementStates.Changing, element: '2'},
        {state: ElementStates.Changing, element: '3'},
        {state: ElementStates.Modified, element: '1'}
      ],
      [
        {state: ElementStates.Modified, element: '4'},
        {state: ElementStates.Modified, element: '3'},
        {state: ElementStates.Modified, element: '2'},
        {state: ElementStates.Modified, element: '1'}
      ]
    ]);
  })

  it('Один символ', () => {
    expect(reverse([{state: ElementStates.Changing, element: '1'}]))
      .toEqual([[{state: ElementStates.Modified, element: '1'}]]);
  })

  it('Пустая строка', () => {
    expect(()=>reverse([])).toThrow('zero length');
  })
})