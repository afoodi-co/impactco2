import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Fuse from '../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'

import ModalContext from 'components/providers/ModalProvider'
import DataContext from 'components/providers/DataProvider'
import Modal from 'components/base/Modal'
import Button from 'components/base/Button'
import TextInput from 'components/base/TextInput'
import Equivalent from './tilesModal/Equivalent'

const StyledModal = styled(Modal)`
  height: 90vh;
`
const Title = styled.h1``
const Text = styled.p``
const SearchInput = styled(TextInput)`
  margin: 0.5rem;
`
const Equivalents = styled.div`
  margin-bottom: 3rem;
`
const StyledButtonWrapper = styled(Button.Wrapper)`
  position: fixed;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border-top: 0.0625rem solid ${(props) => props.theme.colors.textLight};
  border-radius: 0 0 1rem 1rem;
`
export default function TilesModal() {
  const { tiles: open, setTiles: setOpen } = useContext(ModalContext)

  const { equivalents, tiles, setTiles } = useContext(DataContext)

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  useEffect(() => {
    if (equivalents) {
      setFuse(
        new Fuse(equivalents, {
          keys: [
            {
              name: 'name',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle',
              weight: 0.4,
            },
            {
              name: 'synonyms',
              weight: 0.2,
            },
          ],
          threshold: 0.3,
          ignoreLocation: true,
        })
      )
    }
  }, [equivalents])
  useEffect(() => {
    setResults(
      fuse && search.length > 0
        ? fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        : equivalents
            .map((equivalent) => ({ item: equivalent }))
            .sort((a, b) => (a.item.slug > b.item.slug ? 1 : -1))
    )
  }, [search, fuse, equivalents])

  return (
    <StyledModal open={open} setOpen={setOpen}>
      <Title>Ajouter ou enlever des équivalents</Title>
      <Text>
        Sélectionnez (ou désélectionnez) des équivalents pour créer votre
        infographie personnalisée.
      </Text>
      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={'Entrez un objet, un geste...'}
      />
      {open && (
        <Equivalents>
          {results.map(({ item }) => (
            <Equivalent
              key={item.slug}
              equivalent={item}
              checked={tiles.find((tile) => tile === item)}
              setChecked={(checked) => {
                setTiles((prevTiles) =>
                  checked
                    ? [...prevTiles, item]
                    : prevTiles.filter((tile) => tile.id !== item.slug)
                )
                window?._paq?.push([
                  'trackEvent',
                  'Interaction',
                  'Ajouter tuile',
                  item.slug,
                ])
              }}
            />
          ))}
        </Equivalents>
      )}
      <StyledButtonWrapper>
        <Button onClick={() => setOpen(false)}>Valider et fermer</Button>
      </StyledButtonWrapper>
    </StyledModal>
  )
}
