import { Client, PrivateKey, AccountId, TokenId } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Hedera client
export function createHederaClient() {
  const network = process.env.HEDERA_NETWORK || 'testnet';
  
  let client;
  if (network === 'testnet') {
    client = Client.forTestnet();
  } else if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    throw new Error('Invalid HEDERA_NETWORK. Use "testnet" or "mainnet"');
  }

  // Set operator
  const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
  const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY);
  
  client.setOperator(operatorId, operatorKey);
  
  return client;
}

// Hedera configuration
export const hederaConfig = {
  operatorId: process.env.HEDERA_OPERATOR_ID,
  operatorKey: process.env.HEDERA_OPERATOR_KEY,
  ecoTokenId: process.env.ECO_TOKEN_ID,
  treasuryId: process.env.HEDERA_TREASURY_ID,
  treasuryKey: process.env.HEDERA_TREASURY_KEY,
  network: process.env.HEDERA_NETWORK || 'testnet',
};

// Validate configuration
export function validateHederaConfig() {
  const required = [
    'HEDERA_OPERATOR_ID',
    'HEDERA_OPERATOR_KEY',
    'ECO_TOKEN_ID',
    'HEDERA_TREASURY_ID',
    'HEDERA_TREASURY_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required Hedera config: ${missing.join(', ')}`);
  }
  
  return true;
}
