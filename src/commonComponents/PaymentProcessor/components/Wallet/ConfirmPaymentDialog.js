import React from 'react';
import styles from "./wallet-prompt.module.css";

const ConfirmPaymentDialog = ({onClick, onCancel}) => {
    return (
        <div className={styles.splitContainer}>
            <h4 className={styles.header}>Deducting payment from wallet</h4>
            <hr className={styles.borderLine}/>
            <div className={styles.bodyContainer}>
                <p>
                    Are you sure to proceed?
                </p>
            </div>

            <button className={styles.layoutBtn} onClick={onClick}>Pay</button>

            <p className={`${styles.redText} ${styles.linkText}`}
               onClick={onCancel}>Cancel</p>
        </div>
    );
}

export default ConfirmPaymentDialog;
