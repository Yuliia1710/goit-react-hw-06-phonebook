import React from 'react';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  FormContainer,
  InputWraper,
  FormInput,
  Button,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  name: Yup.string().required(),
  number: Yup.string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const onSubmitForm = value => {
    const newContact = {
      id: nanoid(4),
      ...value,
    };

    if (checkNameRepeat(value.name)) {
      alert(`${value.name} is already in contacts!`);
    } else {
      dispatch(addContact(newContact));
      value.name = ' ';
      value.number = ' ';
    }
  };

  const checkNameRepeat = name => {
    let arrNameToLowerCase = contacts.map(item => item.name.toLowerCase());
    return arrNameToLowerCase.includes(name.toLowerCase());
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={onSubmitForm}
      validationSchema={schema}
    >
      <FormContainer>
        <InputWraper>
          <label htmlFor="name">
            Name
            <FormInput type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </label>

          <label htmlFor="number">
            Number
            <FormInput type="tel" name="number" />
            <ErrorMessage name="number" component="div" />
          </label>
        </InputWraper>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </Formik>
  );
}
