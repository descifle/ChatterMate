import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

export default function SimplePopover({user, users}) {
//   const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderUsers = () => {

    if (users !== null) {
        return users.map((user, index) => {

            return <Button key={index}>
                {user.user}
            </Button>
        })
    } else {
        return <div>
            empty
        </div>
    }
}

  return (
    <div className="online-users">
      <Button className="w-100" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        {user}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
        {renderUsers()}
      </Popover>
    </div>
  );
}