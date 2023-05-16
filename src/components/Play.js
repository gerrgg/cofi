
import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Svg = styled(Icon)` 
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const Play = ({ className }) => ( 
  <Svg viewBox="0 0 24 24" className={className}>   
    <path fill="currentcolor" d="M3 22v-20l18 10-18 10z"/>
  </Svg>
)

export default Play;