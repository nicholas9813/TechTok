import React, { useState, createContext } from 'react';
import { Alert } from 'react-bootstrap';

const AlertContext = createContext();

function AlertProvider(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleClose = () => setShowAlert(false);
  const [alertType, setAlertType] = useState("primary");
  const value = {
    showAlert: (message, type) => {
      setAlertType(type)
      setShowAlert(true);
      setAlertMessage(message);
    }
  };

  return (
    <AlertContext.Provider value={value}>
      <>
        <Alert
          variant={alertType}
          show={showAlert}
          onClose={handleClose}
          dismissible
          style={{ position: "absolute", display: "flex", right: 0, top: 0, marginTop: '2rem', zIndex: 1 }}
        >
          {alertMessage}
        </Alert>
        {props.children}
      </>
    </AlertContext.Provider>
  );
}

export const withAlert = Component => {
  return props => (
    <AlertContext.Consumer>
      {context => <Component {...props} showAlert={context.showAlert} />}
    </AlertContext.Consumer>
  );
};

export default AlertProvider;