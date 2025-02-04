interface Props {
  name: string;
  email: string;
}

export default async function createCustomers({ name, email }: Props) {
  const stripe = require("stripe")(
    "sk_test_51QefNoE3e04v4dqwx3YFDBpLmbkNeoo55iRM0k88jVKAGYlPj1TGCoX0v4O1mCacIBFEFkZVjBZa0W5Bsa2ocTJy00cThUEs0k",
  );

  console.log(email, name);

  const customer = await stripe.customers.create({
    name: `${name}`,
    email: `${email}`,
  });

  console.log(customer);
}
