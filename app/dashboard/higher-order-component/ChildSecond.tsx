'use client';
import { IChildProps } from './Child';
import Parent from './Parent';

const ChildSecond = (props: IChildProps) => {
  return (
    <>
      <h1>Second Child</h1>
      <div>{props.count}</div>
      <button onClick={props.handleClick}>Click me</button>
    </>
  );
};

export default Parent(ChildSecond);
