import React from "react";
import styles from "./free-payment.module.css";

const FreePaymentDialog = ({ onClick }) => {
  return (
    <div className={styles.paymentContainer}>
      <h4 className={styles.header}>Free Reservation</h4>
      <hr className={styles.borderLine} />
      <div className={styles.bodyContainer}>
        <p>Please click on continue button to reserve your free tickets.</p>
      </div>

      <button className={styles.layoutBtn} onClick={onClick}>
        Continue
      </button>
    </div>
  );
};

export default FreePaymentDialog;
