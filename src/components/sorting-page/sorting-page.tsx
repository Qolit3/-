import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {
  enum ActiveSortButton {
    Ascending = 'ascending',
    Descending = 'descending',
    NewArr = 'newArr' 
  }

  const [arr, setArr] = useState<{ element: number, state: ElementStates }[]>([]);
  const [isBubble, setIsBubble] = useState<boolean>(false);
  const [loader, setLoader] = useState<ActiveSortButton | undefined>(undefined);

  const randomArr = () => {
    setLoader(ActiveSortButton.NewArr)
    
    let workArr = new Array(3 + Math.floor(Math.random() * 14));
    for (let i = 0; i < workArr.length; i++) {
      workArr[i] = {
        element: Math.floor(Math.random() * 100),
        state: ElementStates.Default
      };
    }
    console.log(loader);
    
    setArr([...workArr]);
    setLoader(undefined)
  }

  const upSort = () => {
    setLoader(ActiveSortButton.Ascending)
    let renderArr: { element: number, state: ElementStates }[][] = [];
    isBubble
      ? renderArr = upBubbleSort(arr)
      : renderArr = upSelectionSort(arr)
    
    for(let i = 0; i < renderArr.length; i++) {
      setTimeout(() => {
        setArr([...renderArr[i]]);
        setLoader(undefined);
      }, i*500)
    }
    
  }

  const downSort = () => {
    setLoader(ActiveSortButton.Descending)
    let renderArr: { element: number, state: ElementStates }[][] = [];
    isBubble
      ? renderArr = downBubbleSort(arr)
      : renderArr = downSelectionSort(arr)

    for(let i = 0; i < renderArr.length; i++) {
      setTimeout(() => {
        setArr([...renderArr[i]]);
        setLoader(undefined);
      }, i*500)
    }  
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form>
        <div className={styles.input_box}>
          <RadioInput
            extraClass={styles.input}
            label="Выбор"
            name="sort"
            value="choice"
            checked={!isBubble}
            onChange={() => setIsBubble(false)} />
          <RadioInput
            extraClass={styles.input}
            label="Пузырёк"
            name="sort"
            value="bubble"
            onChange={() => setIsBubble(true)} />
          <Button
            isLoader={loader === ActiveSortButton.Ascending ? true : false}
            disabled={
              arr.length
                ? loader && loader !== ActiveSortButton.Ascending
                  ? true
                  : false
                : true
            }
            extraClass={styles.input}
            text="По возрастанию"
            onClick={upSort}
            sorting={Direction.Ascending} />
          <Button
            isLoader={loader === ActiveSortButton.Descending ? true : false}
            disabled={
              arr.length
                ? loader && loader !== ActiveSortButton.Descending
                  ? true
                  : false
                : true
            }
            extraClass={styles.input}
            text="По убыванию"
            onClick={downSort}
            sorting={Direction.Descending} />
          <Button
            isLoader={loader === ActiveSortButton.NewArr ? true : false}
            disabled={loader && loader !== ActiveSortButton.NewArr ? true : false}
            text="Новый массив"
            onClick={randomArr} />
        </div>
      </form>

      <div className={styles.columns_box}>
        {arr.map((item, index) => {
          return <Column
            key={index}
            index={item.element}
            state={item.state}
            extraClass={styles.column} />
        })}
      </div>
    </SolutionLayout>
  );
};

function swap(arr: any, first: any, second: any) {
  const tmp = arr[first].element;
  arr[first].element = arr[second].element;
  arr[second].element = tmp;
}

export function upBubbleSort(array: { element: number, state: ElementStates }[]) {
  if(!array.length) {
    throw new Error('zero length')
  } else if(array.length === 1) {
    throw new Error('one symbol')
  }

  let sortArr = [...array];
  let snapArr = [];
  for (let i = 0; i + 1 < sortArr.length; i++) {
    for (let j = 0; j + 1 < sortArr.length - i; j++) {
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Changing
      };
      sortArr[j+1] = {
        element: sortArr[j+1].element,
        state: ElementStates.Changing
      };
      if (sortArr[j].element > sortArr[j + 1].element) {
        swap(sortArr, j, j + 1);
        snapArr.push([...sortArr])
      } else {
        snapArr.push([...sortArr])
      }
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Default
      };
      sortArr[j+1] = {
        element: sortArr[j+1].element,
        state: ElementStates.Default
      };
    }
    sortArr[sortArr.length - i - 1] = {
      element: sortArr[sortArr.length - i - 1].element,
      state: ElementStates.Modified
    };
    if (i === sortArr.length - 2) {
      sortArr[sortArr.length - i - 2] = {
        element: sortArr[sortArr.length - i - 2].element,
        state: ElementStates.Modified
      };
    }
    snapArr.push([...sortArr])
  }

  return [...snapArr];
}

export function downBubbleSort(array: { element: number, state: ElementStates }[]) {
  if(!array.length) {
    throw new Error('zero length')
  } else if(array.length === 1) {
    throw new Error('one symbol')
  }

  let snapArr = [];
  let sortArr = [...array];
  for (let i = 0; i + 1 < sortArr.length; i++) {
    for (let j = 0; j + 1 < sortArr.length - i; j++) {
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Changing
      };
      sortArr[j+1] = {
        element: sortArr[j+1].element,
        state: ElementStates.Changing
      };
      if (sortArr[j].element < sortArr[j + 1].element) {
        swap(sortArr, j, j + 1);
        snapArr.push([...sortArr])
      } else {
        snapArr.push([...sortArr])
      }
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Default
      };
      sortArr[j + 1] = {
        element: sortArr[j + 1].element,
        state: ElementStates.Default
      };
    }
    sortArr[sortArr.length - i - 1] = {
      element: sortArr[sortArr.length - i - 1].element,
      state: ElementStates.Modified
    };
    if (i === sortArr.length - 2) {
      sortArr[sortArr.length - i - 2] = {
        element: sortArr[sortArr.length - i - 2].element,
        state: ElementStates.Modified
      };
    }
    snapArr.push([...sortArr])
  }
  return [...snapArr]
}

export function downSelectionSort(array: { element: number, state: ElementStates }[]) {
  if(!array.length) {
    throw new Error('zero length')
  } else if(array.length === 1) {
    throw new Error('one symbol')
  }

  let snapArr = [];
  let sortArr = [...array];
  for (let i = 0; i < sortArr.length; i++) {
    for (let j = i + 1; j < sortArr.length; j++) {
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Changing
      };
      sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Changing
      };
      if (sortArr[j].element > sortArr[i].element) {
        swap(sortArr, j, i);
        snapArr.push([...sortArr])
      } else {
        snapArr.push([...sortArr])
      }
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Default
      };
      sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Default
      };
    }
    sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Modified
      };
    if (i === sortArr.length - 2) {
      sortArr[sortArr.length - i - 2] = {
        element: sortArr[sortArr.length - i -2].element,
        state: ElementStates.Modified
      };
    }
    snapArr.push([...sortArr])
  }
  return [...snapArr]
}

export function upSelectionSort(array: { element: number, state: ElementStates }[]) {
  if(!array.length) {
    throw new Error('zero length')
  } else if(array.length === 1) {
    throw new Error('one symbol')
  }
  
  let sortArr = [...array];
  let snapArr = [];
  for (let i = 0; i < sortArr.length; i++) {
    for (let j = i + 1; j < sortArr.length; j++) {
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Changing
      };
      sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Changing
      };
      if (sortArr[j].element < sortArr[i].element) {
        swap(sortArr, j, i);
        snapArr.push([...sortArr])
      } else {
        snapArr.push([...sortArr])
      }
      sortArr[j] = {
        element: sortArr[j].element,
        state: ElementStates.Default
      };
      sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Default
      };
    }
    sortArr[i] = {
        element: sortArr[i].element,
        state: ElementStates.Modified
      };
    if (i === sortArr.length - 2) {
      sortArr[sortArr.length - i - 2] = {
        element: sortArr[sortArr.length - i -2].element,
        state: ElementStates.Modified
      };
    }
    snapArr.push([...sortArr])
  }
  return [...snapArr];
}