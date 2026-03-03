import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonBox = styled.div<{ width?: string; height?: string; borderRadius?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;
