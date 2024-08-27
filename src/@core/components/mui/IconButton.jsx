'use client'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// Config Imports
import themeConfig from '@configs/themeConfig'

const CustomIconButton = styled(MuiButton)(({ color, size, theme, variant }) => {
  return {
    minInlineSize: 0,
    transition: 'none',
    ...(size === 'small'
      ? {
          fontSize: '20px',
          padding: theme.spacing(variant === 'outlined' ? 1 : 1.25),
          '& i, & svg': {
            fontSize: 'inherit'
          }
        }
      : {
          ...(size === 'large'
            ? {
                fontSize: '24px',
                padding: theme.spacing(variant === 'outlined' ? 2.75 : 3),
                '& i, & svg': {
                  fontSize: 'inherit'
                }
              }
            : {
                fontSize: '22px',
                padding: theme.spacing(variant === 'outlined' ? 1.75 : 2),
                '& i, & svg': {
                  fontSize: 'inherit'
                }
              })
        }),
    ...(!color && {
      color: 'var(--mui-palette-action-active)',
      '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
        backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
      },
      ...(themeConfig.disableRipple && {
        '&.Mui-focusVisible:not(.Mui-disabled)': {
          backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
        }
      }),
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-action-active)'
      },
      ...(variant === 'outlined' && {
        border: 'none !important',
        ...(size === 'small'
          ? {
              padding: theme.spacing(1.25)
            }
          : {
              ...(size === 'large'
                ? {
                    padding: theme.spacing(3)
                  }
                : {
                    padding: theme.spacing(2)
                  })
            })
      }),
      ...(variant === 'contained' && {
        boxShadow: 'none !important',
        backgroundColor: 'transparent'
      }),
      ...(variant === 'tonal' && {
        backgroundColor: 'transparent'
      })
    })
  }
})

export default CustomIconButton
