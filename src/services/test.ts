import { number } from 'card-validator';

const validateCardTest = (cardNumber:string) => {
    const result = number(cardNumber);
    console.log(result);
    
  }

  validateCardTest("5524434811672598")