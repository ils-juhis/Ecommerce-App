import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './AlertModal.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  pb: 2
};

export default function AlertModal({alertModal, setAlertModal, name, onOK}) {
  const handleClose = () => setAlertModal(false);

  return (
    <div>
      <Modal
       sx={{".MuiBox-root": {
                border: "none", borderRadius: "10px", outline: "none"
            }
        }}
        open={alertModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="alert-modal">

            <div className="my-4">
              <div className="title mb-3">Alert!</div>
                {`Few items are unavailable for checkout. Are you sure, you want to checkout?`}
              </div>
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <div data-testid="cancel-btn" className="button" onClick={()=>{setAlertModal(false)}}>Cancel</div>
                <div className="vhr"></div>
                <div data-testid="confirm-del-btn" className="button delete" onClick={onOK}>Yes, Continue</div>
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}