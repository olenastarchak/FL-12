import { TestBed } from "@angular/core/testing";

import { CreditCardService } from "./credit-card.service";

describe("CreditCardService", () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it("should create CreditCardService", async () => {
    expect(service).toBeTruthy();
  });

  it('should return "Credit card has a valid format" message if format of credit card is valid', () => {
    expect(service.testCreditCard("3400 0000 0000 009", "AmEx")).toEqual({
      isValid: true,
      message: "Credit card has a valid format",
    });
  });

  it('should return "Unknown card type" message if type of credit card is invalid', () => {
    expect(service.testCreditCard("0123 4567 8901", "Visaa")).toEqual({
      isValid: false,
      message: "Unknown card type",
    });
  });

  it('should return "Credit card number is invalid" message if ten digits module of card is invalid', () => {
    expect(service.testCreditCard("4903 0000 1111 0181", "Switch")).toEqual({
      isValid: false,
      message: "Credit card number is invalid",
    });
  });

  it('should return "Credit card number is invalid" message if prefix of credit card is invalid', () => {
    expect(service.testCreditCard("3530 1113 3330 0000", "Visa")).toEqual({
      isValid: false,
      message: "Credit card number is invalid",
    });
  });

  it('should return "Credit card number is in invalid format" message if number of credit card is too short', () => {
    expect(service.testCreditCard("0123 4567 8901", "Solo")).toEqual({
      isValid: false,
      message: "Credit card number is in invalid format",
    });
  });

  it('should return "Credit card number is in invalid format" message if number of credit card is too long', () => {
    expect(service.testCreditCard("0123 4567 8901 2345 6789", "JCB")).toEqual({
      isValid: false,
      message: "Credit card number is in invalid format",
    });
  });

  it('should return "Credit card number is in invalid format" message if number of credit card contains letters', () => {
    expect(
      service.testCreditCard("0123 4567 8901 2345 678a", "CarteBlanche")
    ).toEqual({
      isValid: false,
      message: "Credit card number is in invalid format",
    });
  });

  it('should return "Credit card number has an inappropriate number of digits" message if number of credit card`s has invalid length', () => {
    expect(service.testCreditCard("2149 0123 4567 8901", "enRoute")).toEqual({
      isValid: false,
      message: "Credit card number has an inappropriate number of digits",
    });
  });

  it('should return "Warning! This credit card number is associated with a scam attempt" message if card number is a scam number', () => {
    expect(service.testCreditCard("5490 9977 7109 2064", "DinersClub")).toEqual(
      {
        isValid: false,
        message:
          "Warning! This credit card number is associated with a scam attempt",
      }
    );
  });
});