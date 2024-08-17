import React from "react";
import styles from "./loading.module.scss";
import { ImSpinner9 } from "react-icons/im";

function LoadingUI() {
  return (
    <div className={styles.container_loading}>
      <ImSpinner9 />
    </div>
  );
}

export default LoadingUI;
