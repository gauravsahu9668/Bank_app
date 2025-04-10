"use server";

import { Client } from "dwolla-v2";
const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;
  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    console.log("step-10")
    console.log(`https://api-sendbox.dwolla.com/customers/${options.customerId}/funding-sources`)
    console.log(options)
    return await dwollaClient
      .post(`https://api-sendbox.dwolla.com/customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};
export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    const newCust={
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      email: newCustomer.email,
      type: 'personal',
      address1: newCustomer.Address,
      city: "New York City",
      state: newCustomer.State,
      postalCode: newCustomer.postalCode,
      dateOfBirth: newCustomer.dateOfBirth, // Format as "1990-01-01"
      ssn: newCustomer.SSN
    }
    return await dwollaClient
      .post("customers", newCust)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
  }
};
// export const createTransfer = async ({
//   sourceFundingSourceUrl,
//   destinationFundingSourceUrl,
//   amount,
// }: TransferParams) => {
//   try {
//     const requestBody = {
//       _links: {
//         source: {
//           href: sourceFundingSourceUrl,
//         },
//         destination: {
//           href: destinationFundingSourceUrl,
//         },
//       },
//       amount: {
//         currency: "USD",
//         value: amount,
//       },
//     };
//     return await dwollaClient
//       .post("transfers", requestBody)
//       .then((res) => res.headers.get("location"));
//   } catch (err) {
//     console.error("Transfer fund failed: ", err);
//   }
// };
export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};
export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    console.log("step-7")
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();
    console.log("step-8")
    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    console.log("step-9")
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};


