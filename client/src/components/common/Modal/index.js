import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

import './index.css';
import theme from '../../../utils/themeUtil'
import Button from '../Button'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    variant: 'elevation'
  },
}));


export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // passed through props so we could reuse the modal component
  const buttonName = props.buttonName;
  const modalTitle = props.modalTitle;
  const modalContent = props.modalContent;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button 
          id='modalBtn'
          type='button'
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleOpen}>
            {buttonName}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          onSubmit={handleClose}
        >
          <div style={modalStyle} className={classes.paper} id="modal-container">
            <h2 id="simple-modal-title">{modalTitle}</h2>
            <div id="simple-modal-description">
            {modalContent}
              </div>
          </div>
        </Modal>
      </div>
    </ThemeProvider>
  );
}