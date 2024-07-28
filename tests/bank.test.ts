import { describe, test, expect } from "@jest/globals"
import { Bank, Customer } from "@app/index"
import Big from "big.js"

describe("Bank", () => {
  let customer1: Customer
  let customer2: Customer
  let bank: Bank

  beforeEach(() => {
    customer1 = new Customer("kevin", Big(1000))
    customer2 = new Customer("faizl", Big(1200))
    bank = new Bank()
    bank.addCustomer(customer1)
    bank.addCustomer(customer2)
  })

  afterEach(() => {
    customer1 = new Customer("kevin", Big(1000))
    customer2 = new Customer("faizl", Big(1200))
    bank = new Bank()
  })

  test("can find a customer by name after adding", () => {
    const expectedCustomerName = "kevin"
    bank.addCustomer(customer1)

    const foundCustomer = bank.findCustomer(expectedCustomerName)
    expect(foundCustomer).not.toBeNull()
    expect(foundCustomer?.getName()).toBe(expectedCustomerName)
  })

  test("can deposit", () => {
    const customerBalanceAfterDeposit = Big(1300)
    bank.deposit("kevin", Big(300))

    expect(
      bank.getCustomerBalance("kevin").eq(customerBalanceAfterDeposit)
    ).toBe(true)
  })

  test("customer can withdraw", () => {
    const customerBalanceAfterWithdrawal = 1000
    bank.withdraw("faizl", Big(200))

    expect(
      bank.getCustomerBalance("faizl").eq(customerBalanceAfterWithdrawal)
    ).toBe(true)
  })

  test("customers cant overdraw their account", () => {
    const expectOverdraw = "Invalid withdrawal amount"
    const withdrawOverLimit = () => {
      bank.withdraw("faizl", Big(1300))
    }

    expect(withdrawOverLimit).toThrow(expectOverdraw)

    const customerBalanceStill = 1200

    expect(bank.getCustomerBalance("faizl").eq(customerBalanceStill)).toBe(true)
  })

  test("customer can transfer", () => {
    const customer1BalanceAfterTransfer = 1500
    const customer2BalanceAfterTransfer = 700

    bank.transfer("faizl", "kevin", Big(500))

    expect(
      bank.getCustomerBalance("kevin").eq(customer1BalanceAfterTransfer)
    ).toBe(true)
    expect(
      bank.getCustomerBalance("faizl").eq(customer2BalanceAfterTransfer)
    ).toBe(true)
  })

  test("customer cant transfer to unknown customer", () => {
    const expectInvalidTransfer = "Invalid transaction"
    const transferOverLimit = () => {
      bank.transfer("faizl", "jeremy", Big(500))
    }

    expect(transferOverLimit).toThrow(expectInvalidTransfer)
  })

  test("customer cant over transfer funds", () => {
    const expectInvalidTransfer = "Invalid transaction"
    const transferOverLimit = () => {
      bank.transfer("faizl", "kevin", Big(1300))
    }

    expect(transferOverLimit).toThrow(expectInvalidTransfer)
  })

  test("can get totalBalance of bank", () => {
    const expectedTotalAmount = Big(2200)

    expect(bank.totalBalance().eq(expectedTotalAmount)).toBe(true)
  })
})
