import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import styles from './string.module.css'

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {

  const [render, setRender] = useState<boolean>(false);
  const [arrWithState, setArrWithState] = useState<{ state: ElementStates, element: string }[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [arr, setArr] = useState<string[]>([])
  let renderArr: { state: ElementStates, element: string }[][] = [];
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArr(e.currentTarget.value.split(''));
  }

  const handleButtonClick = () => {
    setLoader(true)
    setArrWithState(arr.map((item, index) => {
      if (index === 0 || index === arr.length - 1) {
        return {
          element: item,
          state: ElementStates.Changing
        }
      }
      return {
        element: item,
        state: ElementStates.Default
      }
    }))

    setRender(!render);

  }

  useEffect(() => {
    if (arrWithState.length !== 0) {
      renderArr = reverse(arrWithState);
      let timer = 0;
      const renderInterval = setInterval(() => {
        if (timer < renderArr.length) {
          setArrWithState([...renderArr[timer]]);
        }
        timer++;
      }, 1000)
      setTimeout(() => {
        clearInterval(renderInterval)
        setLoader(false)
      }, renderArr.length * 1000 + 100)
    }

  }, [render])

  return (
    <SolutionLayout title="Строка">
      <div>
        <div className={styles.input_box}>
          <Input
            isLimitText={true}
            maxLength={11}
            onChange={handleInputChange}
            extraClass={styles.input} />
          <Button
            disabled={arr[0] ? false : true}
            isLoader={loader}
            text="Развернуть"
            type="button"
            onClick={handleButtonClick} />
        </div>
        <div className={styles.circle_box}>
          {arrWithState.map((item, index) => {
            return <Circle
              key={index}
              letter={item.element}
              state={item.state}
              extraClass={styles.circle} />
          })}
        </div>
      </div>
    </SolutionLayout>
  );
}

export const reverse = (arr: { state: ElementStates, element: string }[]): { state: ElementStates, element: string }[][] => {
  if (arr.length === 0) {
    throw Error('zero length');
  }

  let workArray = [...arr];
  let snapArr = [];
  let tmp;

  for (let start = 0; start < arr.length - start; start++) {
    const end = arr.length - 1 - start;
    if (start === end) {
      workArray[start] = {
        state: ElementStates.Modified,
        element: workArray[start].element
      }
    } else {
      tmp = { ...workArray[start] };
      workArray[start] = {
        state: ElementStates.Modified,
        element: workArray[end].element
      };
      workArray[end] = {
        state: ElementStates.Modified,
        element: tmp.element
      };
      if (!(start + 1 === end)) {
        workArray[start + 1] = {
          state: ElementStates.Changing,
          element: workArray[start + 1].element
        };
        workArray[end - 1] = {
          state: ElementStates.Changing,
          element: workArray[end - 1].element
        }
      }
    }
    snapArr.push([...workArray]);
  }
  console.log(snapArr)
  return snapArr
}