import React, { useRef } from "react";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import styles from './Ripple.module.scss';
const Ripple = ({ className, children, onBlur, onFocus }) => {
    const rippleRef = useRef(null);
    const onRippleStart = event => {
        rippleRef.current.start(event);
    }
    const onRippleStop = event => {
        rippleRef.current.stop(event);
    }
  return (
    <div onBlur={onBlur ? onBlur : null} onFocus={onFocus ? onFocus : null} onMouseDown={onRippleStart} onMouseUp={onRippleStop} className={`${styles.ripple} ${className}`}>
      {children}
      <TouchRipple ref={rippleRef} center={false}/>
    </div>
  );
};

export default Ripple;
