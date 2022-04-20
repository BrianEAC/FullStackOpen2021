import React from "react"

const Notification = ({ message, thisClass }) => {
    if (message === null) {
      return null;
    }
    return <div className={thisClass}>{message}</div>;
  };

export default Notification 