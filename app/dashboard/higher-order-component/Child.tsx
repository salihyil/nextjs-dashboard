'use client';
import Parent from './Parent';

export interface IChildProps {
  count: number;
  handleClick: () => void;
}

const Child = (props: IChildProps) => {
  return (
    <>
      <h1>First Child</h1>
      <div>{props.count}</div>
      <button className='' onClick={props.handleClick}>Click me</button>
    </>
  );
};

export default Parent(Child);
