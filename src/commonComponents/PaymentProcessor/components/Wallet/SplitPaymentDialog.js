import React from 'react';
import styles from "./wallet-prompt.module.css";

const SplitPaymentDialog = ({onClick, onCancel}) => {
    return (
        <div className={styles.splitContainer}>
            <h4 className={styles.header}>Insufficient Wallet Balance</h4>
            <hr className={styles.borderLine}/>
            <div className={styles.bodyContainer}>
                <p>
                    Pay the difference using a different payment method by selecting split
                    pay.
                </p>
            </div>

            <button className={styles.layoutBtn} onClick={onClick}>Split Pay</button>

            <p className={`${styles.redText} ${styles.linkText}`}
               onClick={onCancel}>Cancel</p>
        </div>
    );
}

export default SplitPaymentDialog;
