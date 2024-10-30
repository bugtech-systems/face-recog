import { Link, Typography } from '@mui/material';
import React from 'react'

export default function CopyRight(props) {
  return (
    <>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" target="_blank" href="https:jaybee.bugtech.solutions/">
                    Bugtech Solutions
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            </>
  )
}
