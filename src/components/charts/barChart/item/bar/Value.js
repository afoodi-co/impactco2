import React from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.inside ? 'auto' : '100%')};
  right: ${(props) => (props.inside ? '1rem' : 'auto')};
  color: ${(props) => props.theme.colors[props.inside ? 'background' : 'main']};
  transform: translateY(-50%);
  display: flex;
  align-items: baseline;
  padding-left: ${(props) => (props.noBar ? 0 : 0.5)}rem;
  line-height: 0.7;
  transition: color 200ms ease-out;
`
const Number = styled.span`
  margin-right: 0.6rem;
  font-size: 1.25rem;
  font-weight: 700;

  ${(props) => props.theme.mq.small} {
    font-size: 0.8rem;
  }
`
const Unit = styled.span`
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
  ${(props) => props.theme.mq.small} {
    font-size: 0.7rem;
  }
`
export default function Value(props) {
  return (
    <Wrapper
      noBar={props.value / props.max === 0}
      inside={props.max > 1000 || props.value == "marge brut"}
    >
      <Number>{formatNumber(props.value)}</Number>
      {props.max > 1000 || props.value == "marge brut" ? (
          <Unit>
            {''}
            % {props.value < 72 ? '' : 'de marge brut'}
          </Unit>
        ) : (
          <Unit>
            {' '}
            kg CO
            <sub>2</sub>e
          </Unit>
      )}
    </Wrapper>
  )
}
