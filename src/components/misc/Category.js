import React, { useState, useContext, useMemo } from 'react'

import { formatName, formatTotal, formatUsage } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Wrapper from './category/Wrapper'
import Top from './category/Top'
import List from './category/List'
import CategoryLegend from './category/CategoryLegend'
import Bottom from './category/Bottom'
import Description from './category/Description'

export default function CategoryList(props) {
  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const equivalentsOfCategory = useMemo(
    () =>
      props.category &&
      equivalents
        .filter((equivalent) => equivalent.category === props.category.id)
        .filter((equivalent) => equivalent.default || displayAll)
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: `${formatName(equivalent.name, 1, true)}`,
          subtitle: displayAll ? formatName(equivalent.subtitle) : null,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: formatTotal(equivalent),
          usage: formatUsage(equivalent),
          gmargin: equivalent.gmargin,
          category: equivalent.category,
          price: equivalent.price,
          to: `/${
            categories.find((category) => category.id === equivalent.category)
              .slug
          }/${equivalent.slug}`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              equivalent.slug,
            ]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),

    [equivalents, categories, props.category, displayAll]
  )

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Description description={props.category.description} />
          <Top className='noscreenshot'>
            <Top.Checkboxes
              visible={
                equivalents
                  .filter(
                    (equivalent) => equivalent.category === props.category.id
                  )
                  .find((equivalent) => !equivalent.default) &&
                !props.category.list
              }
            >
              <Checkbox
                name='displayAll'
                checked={displayAll}
                onChange={() => {
                  setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                  window?._paq?.push([
                    'trackEvent',
                    'Interaction',
                    'Voir tous les équivalents',
                    props.category.name,
                  ])
                }}
              >
                Voir tous les équivalents
              </Checkbox>
            </Top.Checkboxes>
          </Top>
          {props.category.list ? (
            <List
              items={equivalentsOfCategory}
              max={
                equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value
              }
            />
          ) : (
            <>
              <BarChart
                items={equivalentsOfCategory}
                max={
                  equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value
                }
              />
              {![2, 3, 12, 13, 14].includes(props.category.id) && <CategoryLegend />}
            </>
          )}
          <Bottom category={props.category} iframe={props.iframe}/>
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
