import React from "react";
import styles from "../FixLayout/BoxInput/BoxInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "../UI/Input/Input";
import classes from './FormContact.module.scss';
import {Button} from '@material-ui/core';

const FormContact = ({onClick}) => {
  return (
    <>
      <form className={`${styles.box}`}>
        <h4 className='text-center'>Ask A Question</h4>
        <div onClick={onClick} className={`${styles.close} d-flex justify-content-center align-items-center ${classes.btn}`}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Input
          input={{
            placeholder: `Your Name...`,
            label: "Name",
            minLength: "1",
            maxLength: "100",
            autoComplete: "off",
          }}
        />
        <Input input={{
            placeholder: 'Phone Number...',
            label: 'Phone Number',
            minLength: '1',
            maxLength: '20',
            autoComplete: 'off',
            type: 'number'
        }}/>
        <Input input={{
            placeholder: 'Your Email...',
            label: 'Email',
            minLength: '1',
            autoComplete: 'off',
            type: 'email'
        }}/>
        <textarea placeholder='Your Message...'/>
        <div className='pt-5'>
            <Button className={`w-100 ${classes.button}`} variant='contained'>Submit</Button>
        </div>
      </form>
    </>
  );
};

export default React.memo(FormContact);
