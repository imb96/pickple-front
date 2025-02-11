import { useEffect, useMemo, useRef, useState } from 'react';

import {
  StyledCenterItem,
  StyledItem,
  StyledList,
  StyledVirtualScrollContainer,
} from './VirtualScroll.styles';

type VirtualScrollProps = {
  list: string[];
  onItemSelected: (item: string) => void;
  width: string;
};

export const VirtualScroll = ({
  list,
  onItemSelected,
  width,
}: VirtualScrollProps) => {
  const scrollList = useMemo(() => [null, null, ...list, null, null], [list]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current as HTMLDivElement;
      const updateCenterItemWithRef = () => {
        const containerHeight = scrollContainer.clientHeight;
        const itemHeight = 2.5 * 16;
        const scrollTop = scrollContainer.scrollTop;
        const centerScroll = containerHeight / 2;
        const centerItemIndex = Math.floor(
          (scrollTop + centerScroll) / itemHeight
        );
        setCenterIndex(centerItemIndex);
        onItemSelected(scrollList[centerItemIndex] as string);
      };
      scrollContainer.addEventListener('scroll', updateCenterItemWithRef);

      updateCenterItemWithRef();

      return () => {
        scrollContainer.removeEventListener('scroll', updateCenterItemWithRef);
      };
    }
  }, [scrollList, onItemSelected]);

  return (
    <StyledVirtualScrollContainer ref={scrollRef} width={width}>
      <StyledList>
        {scrollList.map((item, index) => (
          <div key={index}>
            {index === centerIndex ? (
              <StyledCenterItem>{item}</StyledCenterItem>
            ) : (
              <StyledItem>{item}</StyledItem>
            )}
          </div>
        ))}
      </StyledList>
    </StyledVirtualScrollContainer>
  );
};
