import React, { HTMLAttributes } from 'react';

import { Avatar, AvatarProps } from '../Avatar/Avatar';
import { AvatarGroupWrapper, OverlapedAvatar } from './AvatarGroup.styles';

export type AvatarGroupProps = {
  children: React.ReactNode;
  overlap?: number;
} & Omit<AvatarProps, 'src'> &
  HTMLAttributes<HTMLDivElement>;

export const AvatarGroup = ({
  children,
  size = 30,
  radius = '50%',
  border,
  overlap = 10,
  ...props
}: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<AvatarProps> => {
      if (!React.isValidElement(element)) {
        return false;
      }
      if (element.type !== Avatar) {
        return false;
      }
      return true;
    })
    .map(({ props: { src } }) => (
      <OverlapedAvatar
        src={src}
        size={size}
        border={border}
        radius={radius}
        overlap={overlap}
      />
    ));

  return (
    <AvatarGroupWrapper overlap={overlap} {...props}>
      {avatars}
    </AvatarGroupWrapper>
  );
};