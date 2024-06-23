'use client';

import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

const items = [
  'lorem ipsum dolor sit amet',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
];

const ScrollFadeIn: React.FC = () => {
  return (
    <div className="container">
      {items.map((item, index) => (
        <FadeInSection key={index}>{item}</FadeInSection>
      ))}
    </div>
  );
};

interface FadeInSectionProps {
  children: ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  //Burada threshold: [0.1] ifadesi, useInView kancasına geçirilen bir parametredir. Bu parametre, bir nesnenin ne kadar görünür olması gerektiğini yüzde cinsinden belirtir. [0.1] değeri, nesnenin en az %10'u göründüğünde inView değişkeninin true olacağını gösterir. Yani, nesne tarayıcı penceresinde %10 veya daha fazla görünüyorsa, inView değişkeni true olur; aksi halde false olur.
  const { ref, inView } = useInView({
    threshold: [0.1],
  });

  return (
    <div ref={ref} className={`item my-[300px] ${inView ? 'fade-in' : ''}`}>
      {children}
    </div>
  );
};

export default ScrollFadeIn;
