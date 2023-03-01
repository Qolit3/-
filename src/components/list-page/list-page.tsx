import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "../list/list";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css'

export const ListPage: React.FC = () => {

  const [element, setElement] = useState<string>('');
  const [index, setIndex] = useState<string>('');
  const [arr, setArr] = useState<{ element: string, state: ElementStates }[]>([]);
  const [headTopCircle, setHeadTopCircle] = useState<string>('');
  const [tailTopCircle, setTailTopCircle] = useState<string>('');
  const [headBotCircle, setHeadBotCircle] = useState<string>('');
  const [tailBotCircle, setTailBotCircle] = useState<string>('');
  const [insertCircle, setInsertCircle] = useState<{ element: string, index: number } | undefined>();
  const [deleteCircle, setDeleteCircle] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  let numIndex = Number(index);

  const handleElementInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement(e.currentTarget.value);
  }

  const handleIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.currentTarget.value);
  }

  const handleAppendButton = async () => {
    setLoader(true);
    setTailTopCircle(element);

    await timer(500);

    list.append(element);
    const workArr = list.getList();
    setTailTopCircle('');

    setArr(workArr.map((item, index) => {
      if (index === workArr.length - 1) {
        return {
          element: item,
          state: ElementStates.Modified
        }
      }
      return {
        element: item,
        state: ElementStates.Default
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(false);
  }

  const handlePrependButton = async () => {
    setLoader(true);
    setHeadTopCircle(element);

    await timer(500);

    list.prepend(element);
    const workArr = list.getList();
    setHeadTopCircle('');

    setArr(workArr.map((item, index) => {
      if (index) {
        return {
          element: item,
          state: ElementStates.Default
        }
      }
      return {
        element: item,
        state: ElementStates.Modified
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(false);
  }

  const handlePopButton = async () => {
    setLoader(true);
    setTailBotCircle(arr[arr.length - 1].element);
    await timer(500);
    list.pop();
    
    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setTailBotCircle('');
    setLoader(false);
  }

  const handleShiftButton = async () => {
    setLoader(true);
    setHeadBotCircle(arr[0].element);
    await timer(500);

    list.shift();
    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setHeadBotCircle('');
    setLoader(false);
  }

  const handleInsertAtButton = async () => {
    setLoader(true);
    let jumpArr = [...arr];
    setInsertCircle({
      element: element,
      index: 0
    });

    let i = 1;

    let interval = setInterval(() => {
      setInsertCircle({
        element: element,
        index: i
      })
      setArr(jumpArr.map((item, index) => {
        if (index < i) {
          return {
            element: item.element,
            state: ElementStates.Changing
          }
        }
        return {
          element: item.element,
          state: ElementStates.Default
        }
      }))
      i++;
    }, 1000)
    setTimeout(() => { clearInterval(interval) }, numIndex * 1000);

    await timer(numIndex * 1000 + 500);

    list.insertAt(element, numIndex);
    const workArr = list.getList();
    setInsertCircle(undefined)
    setArr(workArr.map((item, index) => {
      if (index === numIndex) {
        return {
          element: item,
          state: ElementStates.Modified
        }
      } else if (index < numIndex) {
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

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(false);
  }

  const handleDeleteAtButton = async () => {
    setLoader(true);
    const jumpArr = [...arr];
    let i = 0;
    let interval = setInterval(() => {
      setArr(jumpArr.map((item, index) => {
        if (index <= i) {
          return {
            element: item.element,
            state: ElementStates.Changing
          }
        }
        return {
          element: item.element,
          state: ElementStates.Default
        }
      }))
      i++;
    }, 1000)

    setTimeout(() => clearInterval(interval), (numIndex + 1) * 1000)

    await timer((numIndex + 1) * 1000 + 500);

    setDeleteCircle(arr[numIndex].element);

    await timer(1000);
    
    list.deleteAt(numIndex);
    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setDeleteCircle('');
    setLoader(true);
  }

  const timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms))
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.control_box}>
        <div className={styles.input_box}>
          <Input
            value={element}
            onChange={handleElementInputChange}
            extraClass={styles.input}
            maxLength={4}
            isLimitText={true} />
          <Button
            isLoader={loader}
            onClick={handlePrependButton}
            text='Добавить в head'
            extraClass={styles.small_button}
          />
          <Button
            isLoader={loader}
            onClick={handleAppendButton}
            text='Добавить в tail'
            extraClass={styles.small_button}
          />
          <Button
            disabled={list.getSize() ? false : true}
            isLoader={loader}
            onClick={handleShiftButton}
            text='Удалить из head'
            extraClass={styles.small_button}
          />
          <Button
            disabled={list.getSize() ? false : true}
            isLoader={loader}
            onClick={handlePopButton}
            text='Удалить из tail'
            extraClass={styles.small_button}
          />

        </div>
        <div className={styles.input_box}>
          <Input
            value={index}
            onChange={handleIndexInputChange}
            extraClass={styles.input} />
          <Button
            disabled={numIndex ? false : true}
            isLoader={loader}
            onClick={handleInsertAtButton}
            text='Добавить по индексу'
            extraClass={styles.large_button}
          />
          <Button
            disabled={list.getSize() && numIndex ? false : true}
            isLoader={loader} 
            onClick={handleDeleteAtButton}
            text='Удалить по индексу'
            extraClass={styles.large_button}
          />
        </div>
      </div>
      <div className={styles.circle_box}>
        {arr.map((item, index) => {
          return (
            <div key={index} className={styles.flex}>
              <Circle
                letter={
                  numIndex === index && deleteCircle
                    ? ''
                    : tailBotCircle && index === arr.length - 1 && index 
                      ? ''
                      : headBotCircle && !index 
                        ? ''
                        : item.element
                }
                index={index}
                tail={
                  deleteCircle && numIndex === index
                    ? <Circle
                      letter={deleteCircle}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                    : tailBotCircle && index === arr.length - 1 && index
                      ? <Circle
                        letter={tailBotCircle}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                      : headBotCircle && !index
                        ? <Circle
                          letter={headBotCircle}
                          isSmall={true}
                          state={ElementStates.Changing}
                        />
                        : index === arr.length - 1 && index
                          ? 'tail'
                          : ''
                }
                state={item.state}
                head={
                  headTopCircle && !index
                    ? <Circle
                      letter={headTopCircle}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                    : tailTopCircle && index === arr.length - 1 && index
                      ? <Circle
                        letter={headTopCircle}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                      : insertCircle?.element && index === insertCircle.index
                        ? <Circle
                          letter={insertCircle.element}
                          isSmall={true}
                          state={ElementStates.Changing}
                        />
                        : index
                          ? ''
                          : 'head'
                }
                extraClass="mr-8" />
              {index !== arr.length - 1 ? <ArrowIcon /> : ''}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};


const list = new LinkedList<string>();