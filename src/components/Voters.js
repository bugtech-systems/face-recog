import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import moment from 'moment';


function preventDefault(event) {
    event.preventDefault();
}

export default function Voters({ title, total, linkPath, date }) {
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                {total}
            </Typography>
            {date ?
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on {moment(date).format('LL')}
                </Typography>
                :
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                </Typography>

            }
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View more
                </Link>
            </div>
        </React.Fragment>
    );
}