import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoConfig } from './cognito/config';

@Injectable()
export class AuthService {
  private client: CognitoIdentityProviderClient;

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: cognitoConfig.region,
    });
  }

  async signUp(username: string, password: string, email: string) {
    const command = new SignUpCommand({
      ClientId: cognitoConfig.clientId,
      Username: username,
      Password: password,
      UserAttributes: [{ Name: 'email', Value: email }],
    });
    return this.client.send(command);
  }

  async confirmSignUp(username: string, confirmationCode: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: String(cognitoConfig.clientId),
      Username: username,
      ConfirmationCode: String(confirmationCode),
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
    const response = await this.client.send(command);
    return response.AuthenticationResult;
  }
}
