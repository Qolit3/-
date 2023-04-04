import { ElementStates } from "../../types/element-states"
import { upBubbleSort, upSelectionSort, downBubbleSort, downSelectionSort } from "./sorting-page"

describe('Проверка алгоритма сортировки', () => {
  it('массив из нескольких элементов, пузырёк, возрастание', () => {
    expect(upBubbleSort([
      { state: ElementStates.Default, element: '5' },
      { state: ElementStates.Default, element: '3' },
      { state: ElementStates.Default, element: '7' },
      { state: ElementStates.Default, element: '1' }
    ])).toEqual([
      [
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Changing, element: '1' },
        { state: ElementStates.Changing, element: '7' }
      ],
      [
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '1' },
        { state: ElementStates.Modified, element: '7' }
      ],
      [
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '1' },
        { state: ElementStates.Modified, element: '7' }
      ],
      [
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Changing, element: '1' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Modified, element: '7' }
      ],
      [
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '1' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '7' }
      ],
      [
        { state: ElementStates.Changing, element: '1' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '7' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '7' }
      ]
    ])
  })
  it('Массив из нескольких, пузырёк, убывание', () => {
    expect(downBubbleSort([
      { state: ElementStates.Default, element: '5' },
      { state: ElementStates.Default, element: '3' },
      { state: ElementStates.Default, element: '7' },
      { state: ElementStates.Default, element: '1' }
    ])).toEqual([
      [
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Changing, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ],
      [
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ]
    ])
  })

  it('Массив их нескольких, выбор, возрастание', () => {
    expect(upSelectionSort([
      { state: ElementStates.Default, element: '5' },
      { state: ElementStates.Default, element: '3' },
      { state: ElementStates.Default, element: '7' },
      { state: ElementStates.Default, element: '1' }
    ])).toEqual([
      [
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '1' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Changing, element: '3' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '3' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Default, element: '3' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Changing, element: '5' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '5' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '7' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Default, element: '7' }
      ],
      [
        { state: ElementStates.Modified, element: '1' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '7' }
      ]
    ])
  })

  it('Массив их нескольких, выбор, убывание', () => {
    expect(downSelectionSort([
      { state: ElementStates.Default, element: '5' },
      { state: ElementStates.Default, element: '3' },
      { state: ElementStates.Default, element: '7' },
      { state: ElementStates.Default, element: '1' }
    ])).toEqual([
      [
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '7' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Changing, element: '7' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Changing, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '5' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Changing, element: '5' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Changing, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Default, element: '3' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Changing, element: '3' },
        { state: ElementStates.Changing, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Default, element: '1' }
      ],
      [
        { state: ElementStates.Modified, element: '7' },
        { state: ElementStates.Modified, element: '5' },
        { state: ElementStates.Modified, element: '3' },
        { state: ElementStates.Modified, element: '1' }
      ]
    ])
  })

  it('Массив из одного, пузырёк, возрастание', () => {
    expect(()=>upBubbleSort([{ state: ElementStates.Default, element: '5' }])).toThrow('one symbol')
  })
  it('Массив из одного, пузырёк, убывание', () => {
    expect(()=>upBubbleSort([{ state: ElementStates.Default, element: '5' }])).toThrow('one symbol')
  })
  it('Массив из одного, выбор, возрастание', () => {
    expect(()=>upBubbleSort([{ state: ElementStates.Default, element: '5' }])).toThrow('one symbol')
  })
  it('Массив из одного, выбор, убывание', () => {
    expect(()=>upBubbleSort([{ state: ElementStates.Default, element: '5' }])).toThrow('one symbol')
  })

  it('Пустой массив, пузырёк, возрастание', () => {
    expect(()=>upBubbleSort([])).toThrow('zero length')
  })
  it('Пустой массив, пузырёк, убывание', () => {
    expect(()=>upBubbleSort([])).toThrow('zero length')
  })
  it('Пустой массив, выбор, возрастание', () => {
    expect(()=>upBubbleSort([])).toThrow('zero length')
  })
  it('Пустой массив, выбор, убывание', () => {
    expect(()=>upBubbleSort([])).toThrow('zero length')
  })
})