import { describe, test, expect } from "@jest/globals"
import { Customer } from "@app/index"
import Big from "big.js"

describe("Customer", () => {
  let customer1: Customer
  let customer2: Customer

  beforeEach(() => {
    customer1 = new Customer("kevin", Big(1000))
    customer2 = new Customer("faizl", Big(1200))
  })

  afterEach(() => {
    customer1 = new Customer("kevin", Big(1000))
    customer2 = new Customer("faizl", Big(1200))
  })

  test("can retrieve their name", () => {
    const customerName1 = "kevin"

    expect(customer1.getName()).toContain(customerName1)
  })
})
