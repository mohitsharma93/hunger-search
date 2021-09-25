import createStripe from 'stripe-client';
import { host, stripeClientKey } from '../../utils/env';

const stripe = createStripe(stripeClientKey);

export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
}

export const payRequest = (token, amount, name) => {
  const data = JSON.stringify({
    token,
    name,
    amount,
  })
  return fetch(`${host}pay`, {
    body: data,
    method: "POST"
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment.");
    }
    return res.json();
  }).catch((err) => {
    console.log('error from checkout service', err)
    return err?.raw?.message;
  })
}