import { number } from 'card-validator';

// export function validateCreditCardNumber(cardNumber: string): boolean {
//     const trimmedCardNumber = cardNumber.replace(/ /g, ''); // Remove espaços em branco
//     let sum = 0;
//     let shouldDouble = false;
  
//     // Percorre o número do cartão da direita para a esquerda
//     for (let i = trimmedCardNumber.length - 1; i >= 0; i--) {
//       let digit = parseInt(trimmedCardNumber.charAt(i), 10);
  
//       if (shouldDouble) {
//         digit *= 2;
//         if (digit > 9) {
//           digit -= 9;
//         }
//       }
  
//       sum += digit;
//       shouldDouble = !shouldDouble;
//     }
  
//     return sum % 10 === 0;
//   }

  export const validateCreditCardNumber = (cardNumber:string) => {
    const trimmedCardNumber = cardNumber.replace(/ /g, ''); // Remove espaços em branco
    const result = number(trimmedCardNumber);
    let response = {
      isValid:result.isValid,
      issuer:result.card?.niceType || result.card?.type || "Unknown"
    }

    return response
    
  }

  