import React from 'react'
import { LiteCreditCardInput } from 'react-native-credit-card-input';

import { cardTokenRequest } from '../../../services/checkout/checkout.service';

export const CreditCardInput = ({ name, onSuccess, onError }) => {

  const onChange = async (formData) => {
    // console.log('from creadit component', formData)
    const { values, status }  = formData;
    const isIncomplete = Object.values(status).includes('incomplete');
    const expiryMonthYear = values.expiry.split('/');
    const card = {
      number: values.number,
      exp_month: expiryMonthYear[0],
      exp_year: expiryMonthYear[1],
      cvc: values.cvc,
      name: name,
    }
    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (cardError) {
        onError();
      }
    }
  }

  return (
    <LiteCreditCardInput
      onChange={onChange}
    />
  )
}
