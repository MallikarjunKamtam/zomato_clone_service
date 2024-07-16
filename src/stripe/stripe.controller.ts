import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { Controller, Post, Request, Response } from '@nestjs/common';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Request() req, @Response() res) {
    const userId: number = req?.headers?.['user']?.['userId'] ?? 1; // todo

    const result: Stripe.Response<Stripe.Checkout.Session> =
      await this.stripeService.createCheckoutSession({ userId });

    return res.status(200).json({ data: result, message: 'success' });
  }
}
