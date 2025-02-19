import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Durée de rédaction</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={
            engine.evaluate(`${props.name} . terminaux . temps écriture`)
              .nodeValue
          }
          min={1}
          max={20}
          onChange={(value) =>
            setSituation({
              [`${props.name} . terminaux . temps écriture`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {
            engine.evaluate(`${props.name} . terminaux . temps écriture`)
              .nodeValue
          }{' '}
          min
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
