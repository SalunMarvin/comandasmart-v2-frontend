import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import {SpeedDial} from 'components'

import {makeStyles} from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './index.module.scss'

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '20px',
  },
  button: {
    border: 'solid thin blue',
    float: 'right',
  },
})

const CardList = ({
  className,
  rows: defaultRows,
  columns,
  titleColumn,
  onViewClick,
  onEditClick,
  onDeleteClick,
  hasCheckbox,
  hasButtons,
}) => {
  const classes = useStyles()
  const [rows, setRows] = useState([])

  useEffect(() => {
    const result = hasCheckbox ? defaultRows.map(row => ({...row, checked: false})) : defaultRows
    setRows(result)
  }, [defaultRows, hasCheckbox, setRows])

  const checkRow = useCallback(
    (row, index) => {
      const newRow = {...row, checked: !row.checked}
      setRows(rows => {
        rows.splice(index, 1, newRow)
        return [...rows]
      })
    },
    [setRows]
  )

  const toggleAll = useCallback(
    () =>
      setRows(rows => {
        const hasUnchecked = rows.some(row => row.checked === false)
        return rows.map(row => ({...row, checked: hasUnchecked}))
      }),
    [setRows]
  )

  const buttons = useMemo(() => {
    const returnRows = hasCheckbox ? rows.filter(row => row.checked) : rows
    const newButtons = hasButtons ? hasButtons.map(button => ({...button, onClick: () => button.onClick(returnRows)})) : []

    return [...(hasCheckbox ? [{label: 'Select All', onClick: toggleAll}] : []), ...newButtons]
  }, [hasCheckbox, hasButtons, rows, toggleAll])

  return (
    <div className={styles.container}>
      {rows.map((row, rowIndex) => (
        <Card key={`card_item_${rowIndex}`} className={clsx(classes.root, className)}>
          <CardActionArea>
            <CardContent>
              {hasCheckbox && (
                <Checkbox
                  className={styles.checkbox}
                  color='primary'
                  checked={row.checked}
                  onChange={() => checkRow(row, rowIndex)}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              )}
              {titleColumn ? <div className={styles.title}>{row[titleColumn]}</div> : <div className={styles.emptyRow} />}
              {columns.map((column, columnIndex) => {
                const {key, value} = column
                if (key !== titleColumn) {
                  return (
                    <div key={`card_item_row_${rowIndex}_${columnIndex}`} className={styles.row}>
                      <div className={styles.name}>{value}</div>
                      <div className={styles.value}>{row[key]}</div>
                    </div>
                  )
                }
                return null
              })}
            </CardContent>
          </CardActionArea>
          <CardActions className={styles.buttons}>
            {onViewClick && (
              <Button className={clsx(styles.button, styles.view)} size='small' color='primary' onClick={() => onViewClick(row)}>
                <i className='far fa-eye' />
              </Button>
            )}
            {onEditClick && (
              <Button className={clsx(styles.button, styles.edit)} size='small' color='primary' onClick={() => onEditClick(row)}>
                <i className='far fa-edit' />
              </Button>
            )}
            {onDeleteClick && (
              <Button
                className={clsx(styles.button, styles.delete)}
                size='small'
                color='primary'
                onClick={() => onDeleteClick(row)}>
                <i className='fas fa-trash-alt' />
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
      {(hasButtons || hasCheckbox) && <SpeedDial positionFixed buttons={buttons} />}
    </div>
  )
}

CardList.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  titleColumn: PropTypes.string,
  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  hasButtons: PropTypes.array,
}

CardList.defaultProps = {
  hasCheckbox: false,
}

export default memo(CardList)