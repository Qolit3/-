import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<{element: number, state: ElementStates}[]>([]);
  const [isBubble, setIsBubble] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const randomArr = () => {
    setLoader(true)
    let workArr = new Array(3 + Math.floor(Math.random()*14));
    for(let i = 0; i < workArr.length; i++) {
      workArr[i] = {
        element: Math.floor(Math.random() * 100),
        state: ElementStates.Default
      };
    }
    setArr([...workArr]);
    setLoader(false)
  }
  
  async function upBubbleSort () {
    setLoader(true)
    let sortArr = [...arr];
    for(let i = 0; i + 1 < sortArr.length; i++) {
      for(let j = 0; j + 1 < sortArr.length - i; j++) {
        sortArr[j].state = ElementStates.Changing;
        sortArr[j+1].state = ElementStates.Changing;
        if(sortArr[j].element > sortArr[j + 1].element) {
          await swap(sortArr, j, j+1);
          setArr([...sortArr])
        } else {
          await timer(1000);
          setArr([...sortArr])
        }
        sortArr[j].state = ElementStates.Default;
        sortArr[j+1].state = ElementStates.Default;
      }
      sortArr[sortArr.length - i - 1].state = ElementStates.Modified;
      if(i === sortArr.length - 2) {
        sortArr[sortArr.length - i -2].state = ElementStates.Modified;
      }
      setArr([...sortArr])
    }
    setLoader(false)
  }

  async function downBubbleSort () {
    setLoader(true)
    let sortArr = [...arr];
    for(let i = 0; i + 1 < sortArr.length; i++) {
      for(let j = 0; j + 1 < sortArr.length - i; j++) {
        sortArr[j].state = ElementStates.Changing;
        sortArr[j+1].state = ElementStates.Changing;
        if(sortArr[j].element < sortArr[j + 1].element) {
          await swap(sortArr, j, j+1);
          setArr([...sortArr])
        } else {
          await timer(1000);
          setArr([...sortArr])
        }
        sortArr[j].state = ElementStates.Default;
        sortArr[j+1].state = ElementStates.Default;
      }
      sortArr[sortArr.length - i - 1].state = ElementStates.Modified;
      if(i === sortArr.length - 2) {
        sortArr[sortArr.length - i -2].state = ElementStates.Modified;
      }
      setArr([...sortArr])
    }
    setLoader(false)
  }

  async function downSelectionSort () {
    setLoader(true)
    let sortArr = [...arr];
    for(let i = 0; i < sortArr.length; i++) {
      for(let j = i + 1; j < sortArr.length; j++) {
        sortArr[j].state = ElementStates.Changing;
        sortArr[i].state = ElementStates.Changing;
        if(sortArr[j].element > sortArr[i].element) {
          await swap(sortArr, j, i);
          setArr([...sortArr])
        } else {
          await timer(1000);
          setArr([...sortArr])
        }
        sortArr[j].state = ElementStates.Default;
        sortArr[i].state = ElementStates.Default;
      }
      sortArr[i].state = ElementStates.Modified;
      if(i === sortArr.length - 2) {
        sortArr[sortArr.length - i -2].state = ElementStates.Modified;
      }
      setArr([...sortArr])
    }
    setLoader(false)
  }

  async function upSelectionSort () {
    setLoader(true)
    let sortArr = [...arr];
    for(let i = 0; i < sortArr.length; i++) {
      for(let j = i + 1; j < sortArr.length; j++) {
        sortArr[j].state = ElementStates.Changing;
        sortArr[i].state = ElementStates.Changing;
        if(sortArr[j].element < sortArr[i].element) {
          
          await swap(sortArr, j, i);
          setArr([...sortArr])
        } else {
          await timer(1000);
          setArr([...sortArr])
        }
        sortArr[j].state = ElementStates.Default;
        sortArr[i].state = ElementStates.Default;
      }
      sortArr[i].state = ElementStates.Modified;
      if(i === sortArr.length - 2) {
        sortArr[sortArr.length - i -2].state = ElementStates.Modified;
      }
      setArr([...sortArr])
    }
    setLoader(false)
  }

  const upSort = () => {
    isBubble 
    ? upBubbleSort()
    : upSelectionSort()
  }

  const downSort = () => {
    isBubble
    ? downBubbleSort()
    : downSelectionSort()
  }
 
  const timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms))
  }

  async function swap (arr: any, first: any, second: any) {
    await timer(1000);
    
    const tmp = arr[first].element;
    arr[first].element = arr[second].element;
    arr[second].element = tmp;
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
            onChange={() => setIsBubble(true)}/>
          <Button
            isLoader={loader}
            extraClass={styles.input}
            text="По возрастанию"
            onClick={upSort}
            sorting={Direction.Ascending}/>
          <Button
            isLoader={loader}
            extraClass={styles.input}
            text="По убыванию"
            onClick={downSort}
            sorting={Direction.Descending}/>
          <Button
            isLoader={loader}
            text="Новый массив"
            onClick={randomArr}/>
        </div>
      </form>
      
      <div className={styles.columns_box}>
        {arr.map((item, index) => {
          return <Column
            key={index}
            index={item.element}
            state={item.state}
            extraClass={styles.column}/>
        })}
      </div>
    </SolutionLayout>
  );
};
