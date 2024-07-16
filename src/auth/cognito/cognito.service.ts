import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  AdminUserGlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoConfig } from './config';

@Injectable()
export class CognitoService {
  private client = new CognitoIdentityProviderClient({
    region: cognitoConfig.region,
  });

  async signUp(username: string, password: string) {
    const command = new SignUpCommand({
      ClientId: cognitoConfig.clientId,
      Username: username,
      Password: password,
    });
    return await this.client.send(command);
  }

  async signIn(username: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: cognitoConfig.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });
    return await this.client.send(command);
  }

  async signOut(accessToken: string) {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async adminSignOut(username: string) {
    const command = new AdminUserGlobalSignOutCommand({
      UserPoolId: cognitoConfig.userPoolId,
      Username: username,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error signing out user:', error);
      throw error;
    }
  }
}
