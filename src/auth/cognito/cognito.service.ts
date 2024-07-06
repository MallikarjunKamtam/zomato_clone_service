import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private client = new CognitoIdentityProviderClient({
    region: 'YOUR_AWS_REGION',
  });

  async signUp(username: string, password: string) {
    const command = new SignUpCommand({
      ClientId: 'YOUR_APP_CLIENT_ID',
      Username: username,
      Password: password,
    });
    return await this.client.send(command);
  }

  async signIn(username: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: 'YOUR_APP_CLIENT_ID',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });
    return await this.client.send(command);
  }
}
