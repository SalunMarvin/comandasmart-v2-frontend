import React, {useMemo, memo} from 'react'
import PropTypes from 'prop-types'

import UIButton from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import {ronchi, lightestGray, mediumGray, darkGray, smallFontSize, robotoBoldFontFamily} from 'assets/styles/main.module.scss'

const Button = ({children, classes: {root}, onClick, color: buttonColor, type}) => {
  const backgroundColor = useMemo(() => {
    if (buttonColor === 'cancel') return lightestGray
    return ronchi
  }, [buttonColor])

  const color = useMemo(() => {
    if (buttonColor === 'cancel') return mediumGray
    return darkGray
  }, [buttonColor])

  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: backgroundColor,
      border: `solid thin transparent`,
      color: color,
      fontSize: smallFontSize,
      lineHeight: smallFontSize,
      borderRadius: '10px',
      padding: '11px 20px 9px',
      minWidth: '200px',
      fontFamily: robotoBoldFontFamily,
      ...root,
    },
  }))

  const buttonClasses = useStyles()

  return (
    <UIButton type={type} classes={buttonClasses} onClick={onClick}>
      {children}
    </UIButton>
  )
}

Button.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  type: PropTypes.string,
}

Button.defaultProps = {
  classes: {},
  children: 'button',
  onClick: () => {},
  color: 'default',
  type: 'submit',
}

export default memo(Button)
