import React from 'react'

import usagenumerique from 'data/categories/usagenumerique.json'
import categories from 'data/categories.json'

import { RulesProvider } from 'components/numerique/RulesProvider'
import Web from 'components/layout/Web'
import Text from 'components/views/equivalent/Text'
import Equivalent from 'components/numerique/Equivalent'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'

const equivalents = [...usagenumerique].map((equivalent) => ({
  ...equivalent,
  id: equivalent.slug,
}))

export default function EmailPage(props) {
  return (
    <Web
      title={props.equivalent.meta.title}
      description={props.equivalent.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
        equivalent: props.equivalent,
      }}
    >
      <RulesProvider>
        <Equivalent
          equivalent={props.equivalent}
          category={props.category}
          name='email'
        />
        <VisualizationSlider equivalent={props.equivalent} />
      </RulesProvider>
      <Text equivalent={props.equivalent} />
    </Web>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      equivalent: equivalents.find((equivalent) => equivalent.slug === 'email'),
      category: categories.find(
        (category) => category.slug === 'usagenumerique'
      ),
    },
  }
}
