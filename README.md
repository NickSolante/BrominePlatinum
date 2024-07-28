
# Banking System

This project implements a simple banking system with two main classes: `Customer` and `Bank`. The `Customer` class represents a bank customer with a name and a balance, while the `Bank` class manages multiple customers and provides functionalities for deposits, withdrawals, and transfers.

## Features

- **Customer Management:** Add and manage customer information.
- **Account Operations:** 
  - **Deposit**: Increase the balance of a customer's account.
  - **Withdraw**: Decrease the balance of a customer's account, with validation to prevent overdrafts.
  - **Transfer**: Transfer funds between customers' accounts, with checks for sufficient balance.
- **Balance Inquiry:** Customers can check their balances through the bank.
- **Error Handling:** Provides feedback for invalid operations, such as insufficient funds.

## Classes and Methods

### `Customer` Class

#### Properties
- **name (string)**: The name of the customer.
- **balance (Big)**: The customer's account balance, using the `Big.js` library for precise decimal arithmetic.

#### Methods
- **constructor(name: string, initialDeposit: Big):** Initializes a new customer with a name and an initial deposit.
- **getName(): string**: Returns the customer's name.
- **setBalanceForBank(newBalance: Big): void**: Sets a new balance for the customer, intended for internal use by the `Bank`.
- **getBalanceForBank(): Big**: Retrieves the customer's balance for the `Bank` class to access.

### `Bank` Class

#### Properties
- **customers (Customer[])**: A list of `Customer` objects managed by the bank.

#### Methods
- **addCustomer(customer: Customer): void**: Adds a new customer to the bank.
- **findCustomer(name: string): Customer | undefined**: Finds a customer by name.
- **totalBalance(): Big**: Calculates the total balance of all customers in the bank.
- **getCustomerBalance(customerName: string): Big**: Retrieves the balance of a specified customer.
- **deposit(customerName: string, amount: Big): void**: Deposits an amount into the specified customer's account.
- **withdraw(customerName: string, amount: Big): void**: Withdraws an amount from the specified customer's account, with checks for sufficient balance.
- **transfer(fromName: string, toName: string, amount: Big): void**: Transfers an amount from one customer's account to another, with validation for sufficient funds.

## Design Considerations

- **Encapsulation:** Ensures that customer balances are not directly accessible or modifiable from outside the respective classes. The `Bank` class serves as the interface for all financial operations.
- **Error Handling:** Provides appropriate error messages and checks to ensure valid operations.
- **Single Responsibility Principle:** Each class has a distinct responsibility, making the code easier to understand, maintain, and extend.
- **Precision:** Uses `Big.js` to handle decimal arithmetic, ensuring precision in financial calculations.

## Getting Started

### Prerequisites
- **Node.js** and **pnpm**: Make sure you have Node.js and pnpm installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   https://github.com/NickSolante/BrominePlatinum.git
   cd BrominePlatinum
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Usage

Here is an example of how to use the system:

```typescript
import Big from "big.js";
import { Bank, Customer } from "./path-to-your-modules";

const bank = new Bank();

const customer1 = new Customer("Kevin", new Big(1000));
const customer2 = new Customer("Faizl", new Big(1200));

bank.addCustomer(customer1);
bank.addCustomer(customer2);

bank.deposit("Kevin", new Big(500));
bank.withdraw("Faizl", new Big(200));

console.log(\`Kevin's Balance: \${bank.getCustomerBalance("Kevin").toString()}\`);
console.log(\`Faizl's Balance: \${bank.getCustomerBalance("Faizl").toString()}\`);
console.log(\`Total Bank Balance: \${bank.totalBalance().toString()}\`);
```

### Running Tests

To run the tests, use the following command:

```bash
pnpm test
```
