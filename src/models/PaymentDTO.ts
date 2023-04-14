export type Payment = {
    id?: string; //opcional pois será adicionado na camada business
    amount: number;
    type: 'credit_card' | 'boleto';
    boleto_number?: string; // opcional, pois só será preenchido se o tipo for 'boleto'
    // opcional, pois só será preenchido se o tipo for 'credit_card'
      card_holder?: string;
      card_number?: string;
      card_expiration_date?: string;
      card_cvv?: string;
    client_id: string;
    status?: 'pending' | 'authorized' | 'paid' | 'refunded' | 'chargedback'; // opcional, pois será preenchido posteriormente

}