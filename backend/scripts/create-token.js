import {
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  PrivateKey,
  AccountId,
} from '@hashgraph/sdk';
import { createHederaClient } from '../src/config/hedera.js';
import dotenv from 'dotenv';

dotenv.config();

async function createEcoToken() {
  try {
    console.log('🪙 Creating ECO Token on Hedera...\n');

    const client = createHederaClient();
    const treasuryId = AccountId.fromString(process.env.HEDERA_TREASURY_ID);
    const treasuryKey = PrivateKey.fromString(process.env.HEDERA_TREASURY_KEY);

    // Create the token
    const transaction = await new TokenCreateTransaction()
      .setTokenName('EcoClean Token')
      .setTokenSymbol('ECO')
      .setDecimals(0) // Whole tokens only
      .setInitialSupply(1000000) // 1 million tokens
      .setTreasuryAccountId(treasuryId)
      .setAdminKey(treasuryKey)
      .setSupplyKey(treasuryKey)
      .setTokenType(TokenType.FungibleCommon)
      .setSupplyType(TokenSupplyType.Infinite)
      .freezeWith(client);

    // Sign and submit
    const signedTx = await transaction.sign(treasuryKey);
    const txResponse = await signedTx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    console.log('✅ Token created successfully!');
    console.log(`Token ID: ${tokenId}`);
    console.log(`Token Name: EcoClean Token`);
    console.log(`Token Symbol: ECO`);
    console.log(`Initial Supply: 1,000,000 ECO`);
    console.log(`\n📝 Add this to your .env file:`);
    console.log(`ECO_TOKEN_ID=${tokenId}`);

    client.close();
  } catch (error) {
    console.error('❌ Error creating token:', error);
    process.exit(1);
  }
}

createEcoToken();
