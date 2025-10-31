import {
  TransferTransaction,
  TokenId,
  AccountId,
  PrivateKey,
  Hbar,
  TokenAssociateTransaction,
} from '@hashgraph/sdk';
import { createHederaClient, hederaConfig } from '../config/hedera.js';

// Transfer ECO tokens to user
export async function transferEcoTokens(recipientAccountId, amount) {
  try {
    const client = createHederaClient();
    const tokenId = TokenId.fromString(hederaConfig.ecoTokenId);
    const treasuryId = AccountId.fromString(hederaConfig.treasuryId);
    const treasuryKey = PrivateKey.fromString(hederaConfig.treasuryKey);
    const recipientId = AccountId.fromString(recipientAccountId);

    // Create token transfer transaction
    const transaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, treasuryId, -amount) // Deduct from treasury
      .addTokenTransfer(tokenId, recipientId, amount)  // Send to recipient
      .freezeWith(client);

    // Sign with treasury key
    const signedTx = await transaction.sign(treasuryKey);

    // Submit transaction
    const txResponse = await signedTx.execute(client);

    // Get receipt
    const receipt = await txResponse.getReceipt(client);

    client.close();

    return {
      success: receipt.status.toString() === 'SUCCESS',
      transactionId: txResponse.transactionId.toString(),
      amount,
      recipient: recipientAccountId,
    };
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw new Error(`Token transfer failed: ${error.message}`);
  }
}

// Get token balance for an account
export async function getTokenBalance(accountId) {
  try {
    const client = createHederaClient();
    const tokenId = TokenId.fromString(hederaConfig.ecoTokenId);
    const account = AccountId.fromString(accountId);

    // Query account balance
    const balance = await client.getAccountBalance(account);
    
    client.close();

    // Get specific token balance
    const tokenBalance = balance.tokens.get(tokenId);

    return {
      accountId,
      tokenId: hederaConfig.ecoTokenId,
      balance: tokenBalance ? tokenBalance.toNumber() : 0,
    };
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error(`Failed to get balance: ${error.message}`);
  }
}

// Calculate reward based on urgency
export function calculateReward(urgency) {
  const rewardMap = {
    low: 10,
    medium: 25,
    high: 50,
    critical: 75,
  };

  return rewardMap[urgency] || 25;
}

// Associate token with user account (must be done before first transfer)
export async function associateToken(userAccountId, userPrivateKey) {
  try {
    const client = createHederaClient();
    const tokenId = TokenId.fromString(hederaConfig.ecoTokenId);
    const accountId = AccountId.fromString(userAccountId);
    const privateKey = PrivateKey.fromString(userPrivateKey);

    const transaction = await new TokenAssociateTransaction()
      .setAccountId(accountId)
      .setTokenIds([tokenId])
      .freezeWith(client);

    const signedTx = await transaction.sign(privateKey);
    const txResponse = await signedTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    client.close();

    return {
      success: receipt.status.toString() === 'SUCCESS',
      transactionId: txResponse.transactionId.toString(),
    };
  } catch (error) {
    console.error('Error associating token:', error);
    throw new Error(`Token association failed: ${error.message}`);
  }
}
