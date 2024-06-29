import React from 'react';

const Parent = (Component: any) => {
  const Children = () => {
    const [count, setCount] = React.useState<number>(0);
      const handleClick = () => setCount((count) => count + 1);
      
    return (
      <div className="my-4 border-4 border-black outline-double outline-2 outline-red-500">
        <Component count={count} handleClick={handleClick} />
      </div>
    );
  };

  return Children;
};

export default Parent;
