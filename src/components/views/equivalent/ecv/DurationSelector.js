import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
  }
`
const Label = styled.div`
  font-weight: 300;
`
const Selector = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 1.5rem;
  margin: 0 0.5rem;
  padding: 0.375rem 0.375rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
`
const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    display: block;
    width: 0.625rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.background};
    }
  }
`
const Years = styled.span`
  flex: 1;
  text-align: center;
`
export default function DurationSelector(props) {
  return (
    <Wrapper>
      <Label>On considère une durée de vie de</Label>
      <Selector>
        <Button
          aria-label='moins'
          onClick={() =>
            props.setDuration((prevPosition) =>
              prevPosition - 1 < 1 ? 1 : prevPosition - 1
            )
          }
          className='noscreenshot'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z' />
          </svg>
        </Button>
        <Years>{props.duration}</Years>
        <Button
          aria-label='plus'
          onClick={() =>
            props.setDuration((prevPosition) =>
              prevPosition + 1 > 30 ? 30 : prevPosition + 1
            )
          }
          className='noscreenshot'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z' />
            <path d='M12 24C9.79086 24 8 22.2091 8 20L8 4C8 1.79086 9.79086 9.65645e-08 12 0C14.2091 -9.65645e-08 16 1.79086 16 4L16 20C16 22.2091 14.2091 24 12 24Z' />
          </svg>
        </Button>
      </Selector>
      <Label>an{props.duration > 1 ? 's' : ''}</Label>
    </Wrapper>
  )
}
