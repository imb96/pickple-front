import styled from '@emotion/styled';

export const ManageContainer = styled.div`
  ${({ theme }) => theme.STYLES.LAYOUT}
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.PALETTE.GRAY_100};
`;

export const Main = styled.div`
  margin: 10px 0;
`;

export const AllowCardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;
