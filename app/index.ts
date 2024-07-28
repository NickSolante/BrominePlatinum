import Big from "big.js"

export class Customer {
  private name: string
  private balance: Big

  constructor(name: string, initialDeposit: Big) {
    this.name = name
    this.balance = initialDeposit
  }

  public getName(): string {
    return this.name
  }

  private getBalance(): Big {
    return this.balance
  }

  public setBalanceForBank(newBalance: Big): void {
    this.balance = newBalance
  }

  public getBalanceForBank(): Big {
    return this.getBalance()
  }
}

export class Bank {
  private customers: Customer[] = []

  public addCustomer(customer: Customer): void {
    this.customers.push(customer)
  }

  public findCustomer(name: string): Customer | undefined {
    return this.customers.find((customer) => customer.getName() === name)
  }

  public totalBalance(): Big {
    return this.customers.reduce(
      (total, customer) => total.plus(customer.getBalanceForBank()),
      new Big(0)
    )
  }

  public getCustomerBalance(customerName: string): Big {
    const customer = this.findCustomer(customerName)
    if (customer) {
      return customer.getBalanceForBank()
    } else {
      return Big(0)
    }
  }

  public deposit(customerName: string, amount: Big): void {
    const customer = this.findCustomer(customerName)
    if (customer) {
      const newBalance = customer.getBalanceForBank().plus(amount)
      customer.setBalanceForBank(newBalance)
    }
  }

  public withdraw(customerName: string, amount: Big): void {
    const customer = this.findCustomer(customerName)
    if (customer && customer.getBalanceForBank().gt(amount)) {
      const newBalance = customer.getBalanceForBank().minus(amount)
      customer.setBalanceForBank(newBalance)
    } else {
      throw new Error("Invalid withdrawal amount")
    }
  }

  public transfer(fromName: string, toName: string, amount: Big): void {
    const fromCustomer = this.findCustomer(fromName)
    const toCustomer = this.findCustomer(toName)
    if (
      fromCustomer &&
      toCustomer &&
      fromCustomer.getBalanceForBank().gt(amount)
    ) {
      const fromBalance = fromCustomer.getBalanceForBank().minus(amount)
      fromCustomer.setBalanceForBank(fromBalance)
      const toBalance = toCustomer.getBalanceForBank().plus(amount)
      toCustomer.setBalanceForBank(toBalance)
    } else {
      throw new Error("Invalid transaction")
    }
  }
}
