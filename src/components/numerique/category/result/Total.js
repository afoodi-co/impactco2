import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import DataContext from 'components/providers/DataProvider'
import Tile from 'components/misc/tiles/Tile'

const Wrapper = styled.div`
  margin: 0;
`
const Text = styled.p`
  font-size: 1.125rem;
  text-align: center;
`
const Big = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
`
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const Tiles = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function Total(props) {
  const { engine, situation } = useContext(RulesContext)

  const { equivalents } = useContext(DataContext)
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ['voiturethermique', 'repasavecduboeuf', 'tshirtencoton'].includes(
          equivalent.slug
        )
      ),
    [equivalents]
  )
  const total = useMemo(
    () =>
      engine.evaluate('email').nodeValue * props.numberEmails +
      engine.evaluate('streaming').nodeValue +
      engine.evaluate('visio').nodeValue,
    [engine, situation, props.numberEmails]
  )
  const construction = useMemo(
    () =>
      engine.evaluate('email . terminaux . construction').nodeValue *
        props.numberEmails +
      engine.evaluate('streaming . terminaux . construction').nodeValue +
      engine.evaluate('visio . terminaux . construction').nodeValue,
    [engine, situation, props.numberEmails]
  )
  const totalToUse = useMemo(
    () => (props.construction ? total : total - construction),
    [total, props.construction]
  )

  return engine ? (
    <Wrapper>
      <Text>
        Vos usages émettent{' '}
        <Big>
          {formatNumber(totalToUse / 1000)} kg CO<sub>2</sub>e{' '}
          <Color>par semaine</Color>
        </Big>{' '}
        (hors construction), soit autant d’émissions que pour fabriquer,
        consommer ou parcourir :
      </Text>
      <Tiles>
        {equivalentsToShow.map((equivalent) => (
          <Tile
            key={equivalent.slug}
            equivalent={equivalent}
            weight={totalToUse / 1000}
            equivalentPage
            reference
            noAnimation
          />
        ))}
      </Tiles>
    </Wrapper>
  ) : null
}
