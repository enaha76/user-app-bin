import { createHederaClient } from '../src/config/hedera.js';
import { AccountBalanceQuery, AccountId } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('🔗 Testing Hedera connection...\n');

    const client = createHederaClient();
    const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);

    // Query account balance
    const balance = await new AccountBalanceQuery()
      .setAccountId(operatorId)
      .execute(client);

    console.log('✅ Connection successful!');
    console.log(`Account ID: ${operatorId}`);
    console.log(`HBAR Balance: ${balance.hbars}`);
    console.log(`Network: ${process.env.HEDERA_NETWORK}`);

    client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
