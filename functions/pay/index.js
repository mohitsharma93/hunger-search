module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body);
  const { token, amount, name } = body;
  stripeClient.paymentIntents.create({
    amount,
    currency: 'INR',
    payment_method_types: ['card'],
    payment_method_data: {
      type: 'card',
      card: {
        token
      }
    },
    confirm: true,
  }).then((paymentIntent) => {
    response.status(200);
    return response.json(paymentIntent);
  }).catch(err => {
    console.log('payRequest error functions pay folder', err);
    response.status(400);
    return response.send(err);
  })
}